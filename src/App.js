import React, {Fragment, useState, useEffect} from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import NavBar from './components/navBar';
import Book from './components/book';
import {CssBaseline} from '@material-ui/core';

const App = () => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [books, setbooks] = useState ([]);
  const [query, setQuery] = useState ('');
  const [searchParameter, setSearchParameter] = useState ('');

  const handleSearchParameter = e => {
    setSearchParameter (e.target.value);
  };

  const handleSearch = e => {
    setQuery (e.target.value);
  };

  function getByBookName (query, apiKey) {
    return axios.get (
      `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}&maxResults=40`
    );
  }

  function getByAuthor (query, apiKey) {
    return axios.get (
      `https://www.googleapis.com/books/v1/volumes?q=''+inauthor:${query}&orderBy=newest&key=${apiKey}&maxResults=40`
    );
  }

  useEffect (
    () => {
      searchParameter === 'Book-Name'
        ? getByBookName (query, apiKey)
        : getByAuthor (query, apiKey)
            .then (res => {
              const response = res.data;
              console.log ('response', response);
              setbooks (response.items);
            })
            .catch (err => {
              console.log ('error is:', err);
              setQuery ('a');
            });
    },
    [query, searchParameter, apiKey]
  );

  return (
    <Fragment>
      <CssBaseline />
      <NavBar
        handleSearch={handleSearch}
        handleSearchParameter={handleSearchParameter}
      />

      <Container style={{padding: '10px 0'}}>
        <Grid container justify="space-around" direction="row" spacing={6}>
          {books
            ? books.map (book => (
                <Fragment key={book.etag}>
                  {book.volumeInfo.imageLinks
                    ? <Grid key={book.etag} item xs={3}>
                        <Book book={book} />
                      </Grid>
                    : null}
                </Fragment>
              ))
            : <p> No results</p>}
        </Grid>
      </Container>
    </Fragment>
  );
};

export default App;
