import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
// import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container'

const Books = () => {
  const [books, setbooks] = useState([])
  const [query, setQuery] = useState('game+of+thrones')
  const apiKey = process.env.REACT_APP_API_KEY
  console.log('api', apiKey)

  useEffect(() => {
    axios
      // .get(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`
      )
      .then(res => {
        const response = res.data
        console.log('response', response)
        setbooks(response.items)
      })
  }, [])

  return (
    <Container style={{padding: '10px 0'}}>
      <Grid container justify="space-around" direction="row" spacing={6}>
        {books.map((book, index) => (
          <Grid key={book.id} item xs="auto">
            {book.volumeInfo.imageLinks ? (
              <img src={book.volumeInfo.imageLinks.thumbnail} />
            ) : null}
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Books
