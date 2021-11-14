import React, {useState} from 'react'
import {gql, useMutation} from "@apollo/client";

const Card = ({id, characterName, actorName, imageUrl, bio}) => {

    /**
     * STATE DECLARATIONS
     */
    const [input, setInput] = useState();
    const [newBio, setNewBio] = useState(bio);

    /**
     * MUTATION DECLARATION
     * @type {DocumentNode}
     */
    const ADD_BIO = gql` mutation addBio($id: Int!, $bio: String){
        addBio(id: $id, bio: $bio){
            id
            characterName
            actorName
            imageUrl
            bio
        }}`;

    /**
     * USEMUTATION DEC
     */
    const [addBio] = useMutation(ADD_BIO);

    /**
     * RENDERS CARD
     */
    return (
        <div className="card">
            <img src={imageUrl}
                 alt={characterName}
                 onClick={() => setInput(!input)}/>
            <h1/>
            <h2/>
            <h3>{characterName}</h3>
            <small>Played by: {actorName}</small>
            <h4 style={{fontWeight: "normal", fontSize: "12px"}}>{newBio}</h4>
            {input ?
                <form onSubmit={async e => {
                    e.preventDefault()
                    await addBio({variables: {bio: newBio, id: id}})
                    setInput(false)
                }}>
                    <input value={newBio} onChange={(e) => setNewBio(e.target.value)}/>
                </form> : null}
        </div>
    )
}

export default Card;
