import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import {useParams} from 'react-router-dom'
import IconTrashFill from '../icons/trash';
import '../styles/global.css'


function List() {
    const [movieList, setMovieList] = useState([]);
    const [listName, setListName] = useState(null);
    const [listDescription, setListDescription] = useState(null);
    const [listOwner, setListOwner] = useState(null);
    const {id} = useParams();

    useEffect(() => {
        (async () => {
            const listDetails = await fetch(process.env.REACT_APP_API_URL+'list/'+id)
                .then(res => res.json());
            
            setListName(listDetails[0].name);
            setListDescription(listDetails[0].description);
            setListOwner(listDetails[0].owner);

            var movies = await fetch(process.env.REACT_APP_API_URL+'movies')
                .then(res => res.json());
            movies=movies.filter(movie => movie.ListId == id).reverse();

            setMovieList(movies.map((movie) => (
                <tr key={movie.id}>
                    <td><img src={movie.posterPath} className='poster'/></td>
                    <td>{movie.title}</td>
                    <td>{movie.releaseDate}</td>
                    <td>{movie.description}</td>
                    <td>{movie.rating}</td>
                    <td>
                        <button onClick={()=> removeMovie(movie.id)} className='trashButton'>
                        <IconTrashFill/>
                        </button>
                    </td>
                </tr>
            )))
        })()
    }, [])
    
    function refreshPage() {
        setTimeout(()=>{
            window.location.reload(false);
        }, 200);
        console.log('page to reload')
    }

    function removeMovie(x){
        if(window.confirm("Are you sure you want to delete the movie?")) {
            const requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({})
            };
            fetch(process.env.REACT_APP_API_URL+'movies/'+x, requestOptions)
                .then(response => response.json());
            refreshPage();
        }
    }

    return (
        <div>
            <Link to={`/`}>Return</Link>
            <h1>{listName}</h1>
            <h6>
                <p>Description: {listDescription}</p>
                <p>Owner: {listOwner}</p>
            </h6>

            <div className='addMovieDiv'>
                <Link to={`/${id}/addmovie`} className='addMovieButton'>Add movie</Link>
            </div>

            {movieList.length == 0 ? (
                <div>No movies in this list</div>
            ):(<table>
                <thead>
                    <tr>
                        <th>Poster</th>
                        <th>Title</th>
                        <th>Release Date</th>
                        <th>Description</th>
                        <th>Rating</th>
                        <th>Remove Button</th>
                    </tr>
                </thead>
                <tbody>{movieList}</tbody>
            </table>)}
        </div>
    );
}

export default List;
