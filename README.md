# Favourite Movie Manager
 
## Project description
Favourite movie manager single page web application with TMDB integration. </br>
Faculty project for the Web Technologies course.
<table>
 <tr>
    <th>Subject</th>
    <td>Tema 6 - Manager de filme favorite integrat cu TMDB</td>
  </tr>
  <tr>
    <th>Student</th>
    <td>COMARLAU Vlad-Constantin</td>
  </tr>
  <tr>
    <th>Group</th>
    <td>1115</td>
  </tr>
  <tr>
    <th>Year</th>
    <td>3 ID</td>
  </tr>
</table>

## Specifications
Backend:
- RESTful APIs (CRUD operations exposed for database tables)
- Web server using NODEjs
  - using Router in order to execute CRUD operations for each table separately
- Database using Sequelize (SQLite dialect):
  - 2 entities:
      - List (Contains list name, list description and list owner's name)
      - Movie (Contains movie poster image URL, movie title, overview, release date, rating and the ID of the list the movie is associated to)
  - associated in a 1-to-Many relationship
  - persistent (data is kept even after server restart)
- Integrated with external service - TMDB API using node-fetch, JSON authenticated

Frontend:</br>
- Single Page Application
- Made with React.js
  - Used React Router in order to separate different UI parts lke different lists and add / remove, search functionalities 
- Functionalities:
  - Create / remove lists 
  - Search movies with TMDB and add them to a list

## Running instructions
1. Open a terminal in the root directory
2. Run "npm i"
3. Run "npm run dev"
4. Open a second terminal in the spa directory located in the root directory
5. Run "npm i"
6. Run "npm start"
7. If web browser did not appear navigate to localhost:3000/

## Screenshots
<img width="571" alt="1" src="https://github.com/vladcomarlau/FavouriteMovieManager/assets/102293760/136de71d-b11e-4cb0-99a8-feec5102fd40">
<img width="571" alt="2" src="https://github.com/vladcomarlau/FavouriteMovieManager/assets/102293760/41423211-400c-41d7-a294-d99a5f91da74">
<img width="571" alt="3" src="https://github.com/vladcomarlau/FavouriteMovieManager/assets/102293760/9fe8f292-8475-40e1-8126-2927308404c8">
