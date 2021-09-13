import React, { Component } from 'react';
import './styles/searchView.css';

class SearchView extends Component {

    constructor(props) {
        super(props)

        this.state = {
            query: "",
        };
    }

    updateQuery = (event) => {
        this.setState({
            query: event.target.value
        });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.search(this.state.query);
    }

    render() {
        return (
            <div id='search-container'>
                <form onSubmit={this.submitHandler}>
                    <input type='text' onChange={this.updateQuery} name="query" value={this.state.query} placeholder='Search for movie or tv show'/>
                </form>
            </div>
        );
    }
}

export { SearchView }; 