import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useState } from 'react'
import './styles.css'
import { Button, Card, InputGroup, Modal } from 'react-bootstrap'
import CloseButton from 'react-bootstrap/CloseButton'

// usar essa funcao para criar um checkbox com duas opcoes
// essas opcoes dirao qual o idioma usado para pesquisar um filme ✅

// criar nova chamada de api para trazer o link do video de um filme especifico ✅
// e vincular ao botao `https://www.youtube.com/watch?v=${link}`
// o nome do argumento é key  pode ser que não tenha trailer no youtube, ai paciencia.

// TROCAR O PLACEHOLDER DO CASO DE N TER IMAGEM ✅

//* modal funcionando, porém talvez seja interessante mostrar somente o poster por completo
// necessario alguns ajustes na estilização
function BasicExample({ img, title, description, trailer_link, genres }) {
  const [showModal, setShowModal] = useState(false)
  const [modalImage, setModalImage] = useState('')
  const [modalOverview, setModalOverview] = useState('')

  const openModal = (image, overview) => {
    setModalImage(image)
    setModalOverview(overview)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <>
      <Card style={{ display: 'flex', width: '300px', height: 'auto' }}>
        <Card.Img
          className="hoverImg"
          variant="top"
          src={
            img
              ? `https://image.tmdb.org/t/p/original/${img}`
              : 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg'
          }
          onClick={() => openModal(img, description)}
        />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Button href={`https://www.youtube.com/watch?v=${trailer_link}`} target="_blank">
            Trailer
          </Button>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={`https://image.tmdb.org/t/p/original/${modalImage}`}
            alt={title}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
          <div style={{ textAlign: 'center', paddingTop: '8px' }}>
            {genres.map((genre, index) => (
              <span
                key={index}
                style={{
                  display: 'inline-block',
                  padding: '4px 8px',
                  borderRadius: '8px',
                  margin: '8px',
                  border: '1px solid #ccc',
                }}
              >
                {genre}
              </span>
            ))}
          </div>
          {/* <p style={{paddingTop: '8px'}}>{modalOverview}</p> */}
        </Modal.Body>
      </Modal>
    </>
  )
}

export { BasicExample }

function Close() {
  return <CloseButton />
}

export { Close }

function RadioLanguages({ language, onLanguageChange }) {
  return (
    <Form>
      {[
        { label: 'Português', value: 'pt-BR', flag: '/flagBR.png' },
        { label: 'Inglês*', value: 'en-US', flag: '/flagUS.png' },
      ].map((option) => (
        <div key={`inline-${option.value}`} className="mb-3">
          <Form.Check
            inline
            label={
              <div>
                <img
                  src={option.flag}
                  alt={option.label}
                  style={{ width: '24px', height: '24px', marginRight: '8px' }}
                />
                {option.label}
              </div>
            }
            name="group1"
            type="radio"
            id={`inline-${option.value}`}
            value={option.value}
            checked={language === option.value}
            onChange={onLanguageChange}
          />
        </div>
      ))}
    </Form>
  )
}
export { RadioLanguages }

function SizesExample() {
  const [comment, setComment] = useState('')
  const maxCharCount = 500 // Defina o limite de caracteres desejado
  const minHeight = '3em' // Defina a altura mínima desejada
  const maxHeight = '10em' // Defina a altura máxima desejada

  const handleCommentChange = (e) => {
    const inputComment = e.target.value
    if (inputComment.length <= maxCharCount) {
      setComment(inputComment)
    }
  }

  const calculateTextAreaHeight = () => {
    const lineHeight = 1.2 // Altura da linha estimada
    const lines = Math.min(Math.ceil(comment.length / 30), maxCharCount / 30) // Estimativa do número de linhas com base na largura máxima de 30 caracteres por linha

    const newHeight = `${Math.max(lines * lineHeight, parseFloat(minHeight))}em`
    return newHeight
  }

  const isMaxCharReached = comment.length === maxCharCount
  const charCountLabelColor = isMaxCharReached ? '#f79f8f' : 'inherit'

  return (
    <>
      <FloatingLabel controlId="floatingTextarea" label="Sua crítica" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Leave a comment here"
          value={comment}
          onChange={handleCommentChange}
          style={{ height: calculateTextAreaHeight(), maxHeight, paddingTop: '32px' }}
        />
      </FloatingLabel>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <div
          style={{
            border: '1px solid #00000040', // Adicione um estilo de borda
            borderRadius: '8px', // Defina o raio da borda
            padding: '4px', // Espaçamento interno
          }}
        >
          <p style={{ color: charCountLabelColor, textAlign: 'right', margin: 0 }}>
            {comment.length}/{maxCharCount}
          </p>
        </div>
      </div>
      <Button variant="primary">Publicar</Button>{' '}
    </>
  )
}

export default SizesExample

export { SizesExample }

function FormFloatingBasicExample({ searchMovie, movieList, movieTitle, selectMovie }) {
  const [nota, setNota] = useState('') // Inicializa o estado da nota

  const handleNotaChange = (value) => {
    console.log('entrando no change')
    setNota(value)
  }

  const handleNotaBlur = () => {
    console.log('entrando no blur')
    let notaWithPoint = nota.replace(/,/, '.')
    notaWithPoint = parseFloat(notaWithPoint)

    // faz o arrendondamento da nota
    notaWithPoint = Math.round(notaWithPoint * 10) / 10

    console.log(notaWithPoint)
    setNota(notaWithPoint.toString())
  }

  // Verifica se a nota está fora do intervalo desejado
  const isNotaInvalid = isNaN(nota) || nota < 0 || nota > 10

  return (
    <Row className="g-2">
      <Col md={10}>
        <FloatingLabel controlId="floatingInputGrid" label="Escolha o filme">
          <Form.Control
            value={movieTitle}
            placeholder="Pesquise seu filme"
            onChange={(e) => searchMovie(e.target.value)}
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </FloatingLabel>
        {/* simula um dropdown menu */}
        <div style={{ position: 'absolute', zIndex: 10, background: 'white', padding: '10px' }}>
          {movieList &&
            movieList.results.slice(0, 7).map((movie, i) => (
              <div
                key={i}
                onClick={(event) => selectMovie(movie)}
                style={{
                  cursor: 'pointer',
                  padding: '5px',
                  transition: 'background-color 0.2s',
                  backgroundColor: 'transparent',
                }}
                onMouseEnter={(event) => {
                  event.target.style.backgroundColor = '#c4dcfc'
                }}
                onMouseLeave={(event) => {
                  event.target.style.backgroundColor = 'transparent'
                }}
              >
                {movie.title}
              </div>
            ))}
        </div>
      </Col>
      <Col md={2}>
        <FloatingLabel controlId="floatingSelectGrid" label="Nota">
          <input
            value={nota}
            type="number" // type number impede que o usuario digite letras ou outros caracteres que não sejam numeros e virgula ou ponto
            min="0"
            max="10"
            step="0.01"
            onChange={(e) => handleNotaChange(e.target.value)}
            onBlur={handleNotaBlur}
            className={`form-control ${isNotaInvalid ? 'is-invalid' : 'no-spinners'}`}
          />
        </FloatingLabel>
      </Col>
    </Row>
  )
}

export { FormFloatingBasicExample }
