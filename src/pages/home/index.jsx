import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { getMovieById, getMovieTrailer } from '../../server/moviesApi'
import { RadioLanguages, SizesExample } from './ratio'
import { FormFloatingBasicExample } from './ratio'
import { BasicExample } from './ratio'
import { GenreList } from '../../server/moviesApi'
import { CloseButton, InputGroup } from 'react-bootstrap'

function Home() {
  document.title = 'Home'
  const [movieList, setMovieList] = useState()
  const [movieTitle, setMovieTitle] = useState('')
  const [movieInfo, setMovieInfo] = useState('')
  const [language, setLanguage] = useState('')
  const [trailerLink, setTrailerLink] = useState('')
  const genreList = GenreList()

  function searchMovie(title) {
    setMovieTitle(title)
    getMovieById(title, language).then((response) => {
      setMovieList(response.data)
    })
  }

  // converte os ids dos gêneros em nomes
  function transformGenres(movieInfo, genreList) {
    const genreIdToName = {}
    genreList.forEach((genre) => {
      genreIdToName[genre.id] = genre.name
    })

    const genres = movieInfo.map((genreId) => genreIdToName[genreId])

    return genres
  }

  async function selectMovie(movie) {
    setMovieTitle(movie.title)
    setMovieInfo(movie)

    const key = await getTrailerLink(movie.id)
    if (key) {
      setTrailerLink(key)
    }
    setMovieList()
  }

  function handleLanguageChange(event) {
    setLanguage(event.target.value)
  }

  async function getTrailerLink(movieId) {
    try {
      const response = await getMovieTrailer(movieId)

      const trailers = response.data.results
      if (trailers.length > 0) {
        // 1. Oficial = true, Name contém "Trailer", Type = "Trailer".
        const firstPriorityTrailer = trailers.find(
          (trailer) => trailer.official && trailer.name.toLowerCase().includes('trailer') && trailer.type === 'Trailer'
        )
        if (firstPriorityTrailer) {
          const key = firstPriorityTrailer.key
          console.log('Chave do vídeo (Primeira Prioridade):', key)
          return key
        }

        // 2. Name contém "Trailer", Oficial = true.
        const secondPriorityTrailer = trailers.find(
          (trailer) => trailer.name.toLowerCase().includes('trailer') && trailer.official
        )
        if (secondPriorityTrailer) {
          const key = secondPriorityTrailer.key
          console.log('Chave do vídeo (Segunda Prioridade):', key)
          return key
        }

        // 3. Oficial = true, Type = "Trailer".
        const thirdPriorityTrailer = trailers.find((trailer) => trailer.official && trailer.type === 'Trailer')
        if (thirdPriorityTrailer) {
          const key = thirdPriorityTrailer.key
          console.log('Chave do vídeo (Terceira Prioridade):', key)
          return key
        }

        console.log('Nenhum trailer com as prioridades encontradas para o filme com ID:', movieId)
        return null
      } else {
        console.log('Nenhum vídeo encontrado para o filme com ID:', movieId)
        return null
      }
    } catch (error) {
      console.error('Erro ao buscar o link do trailer:', error)
      return null
    }
  }

  return (
    <div>
      <div style={{ padding: '2em' }}>
        <h1>ÁREA DE TESTES</h1>
        <hr />
        <div style={{ border: '1px solid', borderColor: '#002e5b', padding: '2em', borderRadius: '16px' }}>
          <p>Idioma de Busca</p>
          <RadioLanguages language={language} onLanguageChange={handleLanguageChange} />
        </div>
        <div
          style={{
            border: '1px solid',
            borderColor: '#002e5b',
            padding: '2em',
            borderRadius: '16px',
            marginTop: '16px',
          }}
        >
          <br />
          <FormFloatingBasicExample
            searchMovie={searchMovie}
            movieList={movieList}
            movieTitle={movieTitle}
            selectMovie={selectMovie}
          />
          <br />

          {/*console.log(movieInfo)*/}
          {/* {movieInfo && console.log(transformGenres(movieInfo.genre_ids, genreList))} */}
          <CloseButton />
          <div className="area" style={{ display: 'flex' }}>
            {movieInfo && (
              <div style={{ flex: 1 }}>
                <BasicExample
                  img={movieInfo.poster_path}
                  title={movieInfo.title}
                  description={movieInfo.overview}
                  trailer_link={trailerLink}
                  genres={transformGenres(movieInfo.genre_ids, genreList)}
                />
              </div>
            )}

            <div style={{ flex: 1, marginLeft: '32px' }}>
              <SizesExample />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
