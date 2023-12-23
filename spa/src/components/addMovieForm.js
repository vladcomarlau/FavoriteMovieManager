import React, {useEffect, useState } from 'react';
import { Form, Link } from "react-router-dom"
import {useParams} from 'react-router-dom'
import IconMovieOpenPlus from '../icons/addMovie'
import {useNavigate} from 'react-router-dom'
import '../styles/global.css'

function AddMovieForm() {
    const {id} = useParams();
    const fetch = require('node-fetch');
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [insertedId, setInsertedId] = useState();
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        setMovies(searchResults.map((movie, index) => (
            <tr>
                <td>
                    <button onClick={()=> addToList(index)} className='addButton'>
                        <IconMovieOpenPlus/>
                    </button>
                </td>
                <td><img src={movie.posterPath} className='poster' alt='Movie Poster'/></td>
                <td>{movie.title}</td>
                <td>{movie.releaseDate}</td>
                <td>{movie.description}</td>
                <td>{movie.rating}</td>
            </tr>
        )))
      }, [searchResults])

    const returnToList = () =>{
        navigate(`/${id}`);
    }
    
    function addToList(x){
        const movie = searchResults[x];
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                title: movie.title,
                releaseDate: movie.releaseDate,
                rating: movie.rating,
                description: movie.description,
                posterPath: movie.posterPath,
                ListId: id
            })
        };
        fetch(process.env.REACT_APP_API_URL+'movies', requestOptions)
            .then(response => response.json());
        returnToList();
    }

    function fetchTMDB(){
        const url = 'https://api.themoviedb.org/3/search/movie?query='
            + searchTerm
            + '&include_adult=false&language=en-US&page=1';
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer '+ process.env.REACT_APP_TMDB_ACCESS_KEY}
        };
        (async () => {
            const data = await fetch(url, options)
            .then(res => res.json())
            .catch(err => console.error('error:' + err))
            setSearchResults(data.results.map((movie) => ({
                title: movie.original_title,
                releaseDate: movie.release_date,
                rating: movie.vote_average,
                description: movie.overview,
                posterPath: process.env.REACT_APP_TMDB_POSTER_PATH + movie.poster_path
            }
            )));
        })()
    }

    function handleSubmit(e){
        e.preventDefault();
        fetchTMDB();
    }

    return (
        <div>
            <Link to={`/${id}`}>Return</Link>
            <h1>Add movies from TMDB</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    placeholder='movie title'
                    autoComplete = "false"
                    autoFocus
                    type="text" 
                    name="owner" 
                    onChange={(e) => {setSearchTerm(e.target.value)}}
                    value = {searchTerm}/>
                <input
                    type='submit'
                    value='Search' className='searchButton'/>
            </form>
            {movies.length == 0 ? (
                <div>Your results will appear here</div>
            ):(<table className='searchResults'>
                <thead>
                    <tr>
                        <th></th>
                        <th>Poster</th>
                        <th>Title</th>
                        <th>Release Date</th>
                        <th>Description</th>
                        <th>Rating</th>
                    </tr>
                </thead>
                <tbody>{movies}</tbody>
            </table>)}  
        </div>
    );
}

export default AddMovieForm;
