//import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Movies from './components/movies'
import Lists from './components/lists'
import List from './components/list'
import AddListForm from './components/addListForm'
import AddMovieForm from './components/addMovieForm'

function App() {
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    (async () => {
        const data = await fetch(process.env.REACT_APP_API_URL+'lists')
            .then(res => res.json())
        setJsonData(data)
    })()
  }, [])

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/movies' element={<Movies />}/>
          <Route path='/' element={<Lists />}/>
          <Route path='/:id' element={<List />}/>
          <Route path='/createlist' element={<AddListForm />}/>
          <Route path='/:id/addmovie' element={<AddMovieForm />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
