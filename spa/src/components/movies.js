import React, { useEffect, useState } from 'react';

function Movies() {
  const [movieList, setMovieList] = useState(null);

  useEffect(() => {
    (async () => {
        const data = await fetch(process.env.REACT_APP_API_URL+'movies')
            .then(res => res.json());
        setMovieList(data.map((movie) => (
            <tr key={movie.id}>
              <td>{movie.title}</td>
              <td>{movie.description}</td>
              <td>{movie.rating}</td>
            </tr>
        )))
    })()
  }, [])

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>{movieList}</tbody>
      </table>
    </div>
  );
}

export default Movies;
