import { API_BASE_URL, API_OPTIONS } from '../App';

export const getRandomMovie = async () => {
    try {
        // Fetch a page of popular movies
        const response = await fetch(
            `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`,
            API_OPTIONS
        );

        if (!response.ok) {
            throw new Error('Failed to fetch movies');
        }

        const data = await response.json();
        
        // Get a random movie from the results
        const randomMovie = data.results[Math.floor(Math.random() * data.results.length)];
        
        // Return the poster URL and movie ID
        return {
            poster_url: randomMovie.poster_path 
                ? `https://image.tmdb.org/t/p/w500/${randomMovie.poster_path}`
                : '/no-movie.png',
            movie_id: randomMovie.id
        };
    } catch (error) {
        console.error('Error fetching random movie:', error);
        return null;
    }
};

// Example usage:
getRandomMovie().then(movie => {
    if (movie) {
        console.log('Random Movie Info:');
        console.log('Poster URL:', movie.poster_url);
        console.log('Movie ID:', movie.movie_id);
    }
});