import axios from 'axios'
import { useEffect, useState } from 'react'

function getMovieById(id, language) {
  return axios.get(`https://api.themoviedb.org/3/search/movie?query=${id}&include_adult=false&language=${language}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYWIzNTBhNWY5OTZjM2Y0ZDY3YmM5ODc1ZWJiMTY5MyIsInN1YiI6IjY1NDJmZmMxMjg2NmZhMDBhYjBmM2ZhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uXRLDSwxKNjaSB2k3iWsc5ZRdpCC0dQDEDOu6-fucB0',
    },
  })
}

export { getMovieById }

// usada para buscar a key que completa o link do trailer do filme
function getMovieTrailer(id) {
  return axios.get(`https://api.themoviedb.org/3/movie/${id}/videos`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYWIzNTBhNWY5OTZjM2Y0ZDY3YmM5ODc1ZWJiMTY5MyIsInN1YiI6IjY1NDJmZmMxMjg2NmZhMDBhYjBmM2ZhMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uXRLDSwxKNjaSB2k3iWsc5ZRdpCC0dQDEDOu6-fucB0',
    },
  })
}

export { getMovieTrailer }

function GenreList() {
  const [genres, setGenres] = useState([])

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/genre/movie/list`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer SEU_TOKEN_AQUI',
        },
      })
      .then((response) => {
        setGenres(response.data.genres)
      })
      .catch((error) => {
        console.error('Erro ao obter a lista de gêneros:', error)
      })
  }, [])

  return genres
}

export { GenreList }
