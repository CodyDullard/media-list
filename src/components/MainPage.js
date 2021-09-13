import React, { Component } from 'react';
import { SearchView } from './SearchView'
import {MediaView} from './MediaView';
import './styles/mainPage.css';

class MainPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            view: "search",
            table: null,
            mediaData: null
        }

        this.search = this.search.bind(this)
    }

    render() {
        return (
            <div>
                <SearchView search= { this.search }/>
                <CurView view={this.state.view} table={this.state.table} mediaData={this.state.mediaData}/>
            </div>
            
        )
    }

    async getMediaView(id, type) {
        let url = `https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&lang=en-US`;
        const response = await fetch(url);
        const data = await response.json();
        this.setState({
            view: "media",
            mediaData: data
        })
    }

    async getMedia(query) {
        let url;
        if (query === "") {
            url = `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}`;
        }
        else {
            url = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_API_KEY}&lang=en-US&query=${query}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        return data.results;
    }

    search = async (query) => {
        const results = await this.getMedia(query)
        this.generateTable(results)
    }

    generateTable(media) {
        let rows = [];
        let count = 0;
        let curRow = [];
        for (let item of media) {
            const poster = `https://image.tmdb.org/t/p/w500/${item.poster_path}`;
            const altText = (item.title !== undefined) ? item.title : item.name;
            curRow.push(<td><img alt={altText} role="button" src={poster} onClick={() => this.getMediaView(item.id, item.media_type)}/></td>)
            count++;
            if (count === 4) {
                rows.push(<tr>{curRow}</tr>)
                count = 0;
                curRow = [];
            }
        }
        this.setState({
            view: "search",
            table: <tbody>{rows}</tbody>
        })
    }
    
    // getMedia(url) {
    //     fetch(url).then((res) => res.json()).then((data) => {
    //         this.setState({
    //             mediaId: data.id,
    //             title: data.title,
    //             tagline: data.tagline,
    //             description: data.overview,
    //             genres: data.genres,
    //             releaseDate: data.release_date,
    //             productionCompanies: data.production_companies,
    //             poster: data.poster_path,
    //             backdrop: data.backdrop_path
    //         })
    //     })
    // }

    async componentDidMount() {
        let url = `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}`
        const response = await fetch(url);
        const data = await response.json();
        this.generateTable(data.results);
    }
}

function CurView(props) {
    if (props.view === "search") {
        document.body.style.backgroundImage = 'none';
        return(
            <div id='media-results'>
                <table>
                    {props.table}
                </table>
            </div>
        )
    }
    else {
        return( <MediaView data={props.mediaData}/> )
    }
}

export { MainPage };