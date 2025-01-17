import http, { URL } from './utils';

const API = {
  SEARCH_BY_NAME: (name: string) => `${URL}&s=${name}`,
  SEARCH_BY_ID: (id: string) => `${URL}&i=${id}&plot=full`,   // &plot=full -> prosi o cala fabule filmu
};

// Typy danych z API
interface IMovieSearchResponseMovie {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

interface IMovieResposeProps {
  Error?: string;
  Response: string;
}

interface IMovieSearchResponse extends IMovieResposeProps {
  totalResults: string;
  Search: IMovieSearchResponseMovie[];
}

interface IMovieBasicProps {
  poster: string;
  title: string;
  type: string;
  year: string;
  id: string;
}

export interface IMoviesProps {
  movies: IMovieBasicProps[];
  totalResults: number;
}


interface IMovieResponseRating {
  Source: string;
  Value: string;
}

export interface IMovieResponse extends IMovieResposeProps {
  Actors: string;
  Awards: string;
  BoxOffice: string;
  Country: string;
  DVD: string;
  Director: string;
  Genre: string;
  Language: string;
  Metascore: string;
  Plot: string;
  Poster: string;
  Production: string;
  Rated: string;
  Ratings: IMovieResponseRating[];
  Released: string;
  Runtime: string;
  Title: string;
  Type: string;
  Website: string;
  Writer: string;
  Year: string;
  imdbID: string;
  imdbRating: string;
  imdbVotes: string;
}

interface IMovieProps {
  production: string;
  plot: string;
  title: string;
  ageRating: string;
  releaseDate: string;
  writer: string;
  director: string;
  actors: string;
  awards: string;
  rating: string;
  votes: string;
  poster: string;
}

const movieService = {
  searchByName: async (name: string) => {
    try {
      const searchResult: IMovieSearchResponse = await http.get(API.SEARCH_BY_NAME(name));   // pobiera liste filmow z API
      if (searchResult?.Error) {          // W razie bledu wywal blad
        console.log(searchResult.Error);
        return null;
      } else {
        const result: IMoviesProps = {    // Przypisz dane do zmiennej
          totalResults: parseInt(searchResult.totalResults, 10),
          movies: searchResult.Search.map((movie) => ({
            id: movie.imdbID,
            poster: movie.Poster,
            title: movie.Title,
            type: movie.Type,
            year: movie.Year
          })),
        };
        return result;                    // Zwraca liste
      }
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  searchById: async (id: string) => {
    try {
      const resultById: IMovieResponse = await http.get(API.SEARCH_BY_ID(id));    // Pobiera film po ID
      if (resultById?.Error) {              // W razie bledu wywal blad
        console.log(resultById.Error);
        return null;
      } else {
        console.log(resultById);
        return resultById;                  // Zwroc film
      }
    } catch (e) {
      console.log(e);
      return null;
    }
  },

};

export default movieService;