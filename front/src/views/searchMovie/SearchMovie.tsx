import React from 'react';
import NavPanel from '../../components/navPanel/NavPanel'
import movieService, { IMoviesProps, IMovieResponse } from '../../services/movies.service';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  background:{
    backgroundColor:"#6EB4D1",
    textAlign:"center",
  },
  tableBody:{
    
    width:"50%",
    margin: "10px auto 10px auto",
  },
  input:{
    padding:"10px 20px 10px 20px",
    textAlign:"center",
    backgroundColor:"#dae8ee",
    color:"black",
    border: "1.3px solid #000",
  },
  content:{ 
    backgroundColor:"#91B7C7",
    border: "2px solid",
    margin: "10px auto 1px auto",
    width: "25em",

  },
  contentUl:{ 
    backgroundColor:"#91B7C7",
    border: "2px solid",
    margin: "10px auto 1px auto",
    width: "40em",

  },
  favorite:{
    textAlign: "center",
    width: "100%",
    margin: "0px 1px",
    backgroundColor: "#6EB4D1",
  },
  textContent:{
    width:"60%",
    margin:"20px auto 20px auto",
    textAlign: "justify",
  },
  textContentUl:{
    width:"90%",
    margin:"20px auto 20px auto",
    textAlign: "justify",
  },
  button:{
    marginTop:"10px",
    width:"10em"
  },
  buttonUs:{
    marginTop:"10px",
    width:"10em",
    marginBottom: "20px"
  },
  buttonFav:{
    marginTop:"10px",
    width:"10em",
    padding:"10px"
  }
});

const SearchMovie = () => {
  const classes = useStyles();
  const [movies, setMovies] = React.useState<IMoviesProps | null>(null);    // Wszystkie pobrane filmy
  const [movieToSearch, setMovieToSearch] = React.useState('');             // Nazwa filmu do szukania

  const [movie, setMovie] = React.useState<IMovieResponse | null>(null);    // Wybrany film
  const [subSite, setSubSite] = React.useState<number>(0);   /// 0 - search, 1 - detail // 2 - to watch list  -> Który ekran otworzyć

  const [watchList, setWatchList] = React.useState<Array<IMovieResponse>>([]);  // Tablica filmów dodanych do ulubionych/WatchList

  React.useEffect(() => {
    movieService.searchByName(movieToSearch).then(resp => {
      if (resp) {
        setMovies(resp);
      }
    });

  }, [movieToSearch]);

  let addToWatch = () => {    // Dodaje obecnie oglądany film do listy "watchList"
    let newWathList = new Array<IMovieResponse>();
    let isAdded = false;

    watchList.forEach(el => {             // Przechodze przez kazdy film
      newWathList.push(el);               // Dodaje go do nowe listy

      if(el?.imdbID === movie?.imdbID) {  // Jesli film juz jest dodany, to zapamietujemy to
        isAdded = true;
      }
    });

    if(movie !== null && !isAdded) {      // Jesli nie dodany, wrzuc na koniec listy
      newWathList.push(movie);
    }

    setWatchList(newWathList);

    selectSearchlist();                   // Wroc na ekran wyszukiwania
  }
  
  let removeFromWatch = (id: string) => {   // Usuwamy film z listy
    let newWathList = new Array<IMovieResponse>();

    watchList.forEach(el => {       // Przechodze przez kazdy film
      if(el?.imdbID !== id) {       // Jeżeli dany film, jest do usunięcia, to nie dodajemy go do listy
        newWathList.push(el);
      }
    });

    setWatchList(newWathList);
  }

  /// Przejscie miedzy oknami
  let selectSearchlist = () => {
    setSubSite(0);
  }
  
  let selectWatchList = () => {
    setSubSite(2);
  }

  let selectMovie = (id: string) => {
    movieService.searchById(id).then(resp => {
      if (resp) {
          setMovie(resp);
      }
    });

    setSubSite(1);
  }

  if(subSite === 0) {
    return (
      <div className={classes.background}>
        <NavPanel/>
        <TableContainer className={classes.background} component={Paper}>
          <Table className={classes.tableBody}>
            <TableHead>
              <TableRow>
                <input
                  className={classes.input}
                  placeholder="Enter movie name"
                  onChange={event => setMovieToSearch(event.target.value)}
                />

              </TableRow>
              <TableRow><button className={classes.buttonFav} onClick={selectWatchList}>Ulubione</button></TableRow>
            </TableHead>
          </Table>
            <Table className={classes.tableBody}>

            <TableBody >
              {!!movies?.movies.length &&
              movies?.movies.map(movie => (

                <TableRow key={movie.id} onClick={event => selectMovie(movie.id)}>
                  <Table className={classes.content}>
                    <TableRow> {movie.title}</TableRow>
                    <TableRow> {movie.year}</TableRow>
                    <TableRow>
                      <img src={movie.poster}
                          alt={movie.title}/>
                    </TableRow>   
                  </Table>            
                </TableRow>
              ))
              }
            </TableBody>
            </Table>

        </TableContainer>
      </div>
    );
  }else if(subSite === 1) {
    return (
      <div>
        <NavPanel />
        <Table className={classes.favorite}>
        <TableBody >
          <TableCell><button className={classes.button} onClick={selectSearchlist}><h3>Powrót</h3></button></TableCell>
          <TableCell><button className={classes.button} onClick={addToWatch}><h3>Dodaj</h3></button></TableCell>
          <TableRow>{movie?.Title}</TableRow>
          <TableRow> {movie?.Year}</TableRow>
          <TableRow> {movie?.Type}</TableRow>
          <TableRow><img src={movie?.Poster} alt={movie?.Title}/></TableRow>
          <TableRow><div className={classes.textContent}>{movie?.Plot}</div></TableRow>

        </TableBody>
        </Table>
      </div>
    );
  }else {
    return (
      <div className={classes.background}>
      <NavPanel/>
      <TableContainer className={classes.background} component={Paper}>
        <Table className={classes.tableBody}>
          <TableHead>
          <TableRow><button className={classes.button} onClick={selectSearchlist}><h3>Powrót</h3></button></TableRow>

          </TableHead>
        </Table>
          <Table className={classes.tableBody}>

          <TableBody >
              { watchList.map((e:IMovieResponse) => (

                <TableRow>
                  <Table className={classes.contentUl}>

                    <TableRow> {e?.Title}</TableRow>
                    <TableRow> {e?.Year}</TableRow>
                    <TableRow>
                      <img src={e?.Poster}
                          alt={e?.Title}/>
                    </TableRow>   
                    <TableRow><div className={classes.textContentUl}>{e?.Plot}</div></TableRow>

                    <TableRow><button className={classes.buttonUs} onClick={()=>removeFromWatch(e?.imdbID)}><h3>Usuń</h3></button></TableRow>
                    
                  </Table>            
                </TableRow>
              ))
              }
            </TableBody>
          </Table>

      </TableContainer>
    </div>
    )
  }
  
};

export default SearchMovie;