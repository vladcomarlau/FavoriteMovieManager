import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"
import IconTrashFill from '../icons/trash'
import '../styles/global.css'

function Lists() {
  const [listList, setListList] = useState([]);

  function removeList(id){
    if(window.confirm("Are you sure you want to delete the list?")) {
      var requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      };
      fetch(process.env.REACT_APP_API_URL+'movies/inlist/'+id, requestOptions)
        .then(response => response.json());
      requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      };
      fetch(process.env.REACT_APP_API_URL+'lists/'+id, requestOptions)
        .then(response => response.json());
  
      refreshPage();
    }
  }

  function refreshPage() {
    setTimeout(()=>{
        window.location.reload(false);
    }, 200);
    console.log('page to reload')
}

  useEffect(() => {
    (async () => {
        const data = await fetch(process.env.REACT_APP_API_URL+'lists')
            .then(res => res.json());
        setListList(data.map((list ,index) => (
            <tr key={list.id} >
              <td>
                <Link to={`/${list.id}`}>
                  {list.name}
                </Link>
              </td>
              <td>
                <Link to={`/${list.id}`}>
                  {list.description}
                </Link>
              </td>
              <td>
              <Link to={`/${list.id}`}>
                  {list.owner}
                </Link>
              </td>
              <td>
                <button onClick={()=> removeList(list.id)} className='trashListButton'>
                  <IconTrashFill/>
                </button>
              </td>
            </tr>
        )))
    })()
  }, [])

  return (
    <div>
      <h1>All lists</h1>
      <div className='addMovieDiv'>
        <Link to='/createlist' className='addMovieButton' >Create new list</Link>
      </div>
      {listList.length == 0 ? (
         <div>Please create a list</div>
         ):(
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Owner</th>
            </tr>
          </thead>
          <tbody>
              {listList}
          </tbody>
        </table>
        )}
    </div>
  );
}

export default Lists;
