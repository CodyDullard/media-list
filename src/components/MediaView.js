import React, { Component } from 'react';
import './styles/mediaView.css';
let backdrop;

class MediaView extends Component {
    render() {
        return (
            <DisplayMediaData media={this.props.data}/>
        )
    }

    componentDidMount() {
        document.body.style.backgroundImage = 'url(' + backdrop + ')';
    }
}

function DisplayMediaData(props) {
    const media = props.media
    const poster = 'https://image.tmdb.org/t/p/original' + media.poster_path
    backdrop = 'https://image.tmdb.org/t/p/original' + media.backdrop_path
    const genres = extractStrings(media.genres)
    if (media.runtime !== undefined) {
        const productionCompanies = extractStrings(media.production_companies);
        const revenue = (media.revenue !== 0) ? "$" + media.revenue.toLocaleString() : "no info availiable";
        return (
            <div id='view-container'>
                <div id='poster-container'>
                    <img alt='The movie poster for the current movie' id='poster' src={poster}/>
                </div>
                <div id='text-container'>
                    <h1 className="special-text">{media.title}</h1>
                    <h4 className="special-text">{media.tagline}</h4>
                    <p>{media.overview}</p>
                    <p className="special-text">{genres}</p>
                    <p><span className="special-text">Released on:</span> {media.release_date}</p>
                    <p><span className="special-text">Runtime:</span> {media.runtime} mins</p>
                    <p><span className="special-text">Revenue:</span> {revenue}</p>
                    <p><span className="special-text">Runtime:</span> {media.runtime}</p>
                    <p><span className="special-text">Rating(TMDB):</span> {media.vote_average}</p>
                    <p>{productionCompanies}</p>
                </div>
            </div>
        )
    }
    else {
        const productionCompanies = extractStrings(media.networks);
        const createdBy = (media.created_by.length > 0) ? extractStrings(media.created_by) : "no info available";
        return (
            <div id='view-container'>
                <div id='poster-container'>
                    <img alt='The movie poster for the current movie' id='poster' src={poster}/>
                </div>
                <div id='text-container'>
                    <h1 className="special-text">{media.name}</h1>
                    <h4 className="special-text">{media.tagline}</h4>
                    <p>{media.overview}</p>
                    <p className="special-text">{genres}</p>
                    <p><span className="special-text">First aired on:</span> {media.first_air_date}</p>
                    <p><span className="special-text">Seasons:</span> {media.number_of_seasons}</p>
                    <p><span className="special-text">Rating(TMDB):</span> {media.vote_average}</p>
                    <p><span className="special-text">Creator(s):</span> {createdBy}</p>
                    <p>{productionCompanies}</p>
                </div>
            </div>
        )
    }
}

function extractStrings(arr) {
    let stringList = [];
    if (arr !== undefined) {
        arr.forEach(element => {
            stringList.push(element.name);
        });
    }
    return stringList.join(', ');
}

export { MediaView };