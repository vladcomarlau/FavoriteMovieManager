import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import {useNavigate} from 'react-router-dom'
import '../styles/global.css'


function AddListForm() {
  
    const[name,setName] = useState("");
    const[description,setDescription] = useState("");
    const[owner,setOwner] = useState("");
    const navigate = useNavigate();
    const returnToLists = () =>{
        navigate('/');
    }

    function handleSubmit(e) {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                name: name,
                description: description,
                owner: owner
            })
        };
        fetch(process.env.REACT_APP_API_URL+'lists', requestOptions)
            .then(response => response.json());
        returnToLists();
    }

  return (
    <div>
        <Link to={`/`}>Return</Link>
        <h1>Create new list</h1>
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input 
                    type="text"
                    name="name"
                    onChange={(e) => {setName(e.target.value)}}/>
            </label>
            <br></br>
            <label>
                Description:
                <input 
                    type="text" 
                    name="description" 
                    onChange={(e) => {setDescription(e.target.value)}}/>
            </label>
            <br></br>
            <label>
                Owner:
                <input 
                    type="text" 
                    name="owner" 
                    onChange={(e) => {setOwner(e.target.value)}}/>
            </label>
            <br></br>
                <input 
                    type="submit" 
                    value="Submit" 
                    className='searchButton'/>
        </form>
    </div>
  );
}

export default AddListForm;