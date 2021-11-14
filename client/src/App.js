import React, {Fragment, useState} from 'react'
import './App.css'

/**
 * COMPONENTS
 */
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import Card from './components/Card'
import {useQuery} from '@apollo/client'
import {GET_CHARACTERS} from './queries'

/**
 * MAIN FUNCTION
 * @returns {false|JSX.Element}
 * @constructor
 */
const App = () => {

    const {loading, error, data} = useQuery(GET_CHARACTERS);
    const characters = data?.characters;
    const [userInput, setUserInput] = useState([]);
    let displayCharacters = [...characters || []];
    const [displaySortedByFirstName, setDisplaySortedByFirstName] = useState();
    const [displaySortedByActorName, setDisplaySortedByActorName] = useState();

    /**
     * CONTROLS SEARCH BAR FILTER
     * @param event
     */
    const filterCharacters = (event) => {
        const searchTerm = event.target.value;
        setUserInput(searchTerm);
    };

    /**
     * CONDITIONALS FOR SORTING
     */
    if (displaySortedByFirstName) {
        displayCharacters.sort((a, b) => (a.characterName > b.characterName ? 1 : -1));
    }
    if (displaySortedByActorName) {
        displayCharacters.sort((a, b) => (a.actorName > b.actorName ? 1 : -1));
    }
    if (userInput) {
        displayCharacters = displayCharacters.filter((item) =>
            item.characterName.toLowerCase().includes(userInput) ||
            item.actorName.toLowerCase().includes(userInput)
        )
    }

    /**
     * CLICK HANDLERS FOR BUTTONS
     */
    const characterNameClickHandler = () => {
        setDisplaySortedByFirstName(true);
        setDisplaySortedByActorName(false);
    };
    const actorNameClickHandler = () => {
        setDisplaySortedByFirstName(false);
        setDisplaySortedByActorName(true);
    };

    /**
     * RENDER FUNCTION
     */
    return (
        !loading &&
        !error && (
            <Fragment>
                <Header>
                    <SearchBar onChange={filterCharacters}/>
                </Header>
                <button id="sortByFirstName" onClick={() => characterNameClickHandler()}>
                    Sort by character first name (A-Z)
                </button>
                <button id="sortByActorName" onClick={() => actorNameClickHandler()}>
                    Sort by actor name (A-Z)
                </button>
                <br/>
                <br/>
                <div className="App">
                    <div className="grid">
                        {
                            displayCharacters.length > 0 ? (
                                    displayCharacters.map((item) => (
                                        <Card {...item} key={item.id}/>
                                    )))
                                : (<h1>No Characters Found</h1>)
                        }
                    </div>
                </div>
            </Fragment>
        )
    );
};

export default App
