# PopCorn

## Description
PopCorn is a web application designed to let users search for movies dynamically. Users can explore a wide range of movie details, including titles, IMDb ratings, synopses, actors, and directors. Additionally, users can add movies to their watched list and contribute with reviews.

## Built With
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React icon" />
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite icon" />
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript icon" />
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5 icon" />
<img src="https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS icon" />

## Decisions and Some Considerations
- **React**: Chosen for its powerful component-based architecture, which allows for efficient and dynamic rendering of movie search results and user interactions. React's ecosystem also includes hooks and state management that facilitate a smooth user experience.
- **Vite**: Selected for its fast build times and efficient development server. Vite provides a modern development experience with support for fast hot module replacement (HMR) and optimized builds.
- **OMDb API**: Integrated for fetching movie data, including details like title, IMDb rating, synopsis, actors, and directors. OMDb API provides comprehensive and up-to-date movie information.
- **Font Awesome**: Utilized for providing a rich set of icons, enhancing the visual appeal of the application and improving the user interface with recognizable movie-related icons.
- **CSS Modules**: Used for styling components with scoped styles, ensuring that styles are modular and do not conflict with other parts of the application. This approach helps in maintaining a clean and manageable CSS codebase.
- **Environment Variables**: Managed using Vite's support for `.env` files, keeping sensitive information like API keys secure and configurable.
- **State Management**: Leveraging React's `useState` and `useEffect` hooks for managing application state and side effects, providing a responsive and interactive user experience.

## Features
- **Search for Movies**: Explore a wide range of movies using dynamic search functionality.
- **View Movie Details**: Access detailed information about movies, including title, IMDb rating, synopsis, actors, and director.
- **Add to Watched List**: Save movies to a personal watched list for easy reference.
- **Rate Movies**: Contribute with ratings for movies you’ve watched.

## Getting Started
### Installation
```bash
git clone https://github.com/yourusername/popcorn.git
cd path/to/popcorn
```
```
npm install
```
### Environment Variables
Create a `.env` file in the root directory of the project and add the following environment variables:
```
VITE_API_KEY=<your-omdb-api-key>
```
### Starting the Server
1. Run the server
```
npm run dev
```
2. View PopCorn in your browser
- Open your web browser and navigate to http://localhost:5173 (or another port specified in your Vite configuration).
### Usage
- Search for Movies: Use the search bar to find movies and view their details.
- Add a rating and add the movie to your watched list.

## Contacts
- **https://www.linkedin.com/in/diogo-borges-coelho/**
- **diogocoelho19988@gmail.com**
