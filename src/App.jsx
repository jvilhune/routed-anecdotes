//npm install react-router-dom

import ReactDOM from 'react-dom/client'
import { useState } from 'react'
import { useRef } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  useMatch
} from "react-router-dom"


const refresh = () => {
  window.location.reload(true)
}

/*

<Menu />

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <a href='#' style={padding}>anecdotes</a>
      <a href='#' style={padding}>create new</a>
      <a href='#' style={padding}>about</a>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} >{anecdote.content}</li>)}
    </ul>
  </div>
)
*/

const Anecdote = ({ anecdote }) => {
  //<div>{anecdote.info}</div>
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <div>{anecdote.author}</div>
      <div><a href={ anecdote.info }>{ anecdote.info }</a></div>
      <div>{anecdote.votes}</div>
    </div>
  )
}

const Anecdotes = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote =>
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      )}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/tree/main'>https://github.com/fullstack-hy2020/routed-anecdotes/tree/main</a> for the source code.
  </div>
)

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset
  }
}


const CreateNew = (props) => {
  const { reset: resetContent, ...content } = useField("text");
  const { reset: resetAuthor, ...author } = useField("text");
  const { reset: resetInfo, ...info } = useField("text");

  /*
  console.log('CreateNew occurred')
  console.log('props', props)
  console.log('content', content)
  console.log('author', author)
  console.log('info', info)
  */


  /* Hook call. Hooks can only be called inside of the body of a function component */
  const navigate = useNavigate()

  const handleSubmit = (e) => {

    /*
    console.log('e', e)
    console.log('e.target.value', e.target.value)
    console.log('handleSubmit occurred')
    */

    e.preventDefault()

    const newanec =
    {
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    }

    props.addNew(newanec)

    /* After user has has created new anecdote and clicked create button go to the root and show all anecdotes */
    navigate('/')
  }

  const resetData = (e) => {
    e.preventDefault();

    console.log('resetForm occurred')
    console.log('e', e)
    console.log('e.target.value', e.target.value)

    console.log('content', content)
    console.log('author', author)
    console.log('info', info)

    content.value = ""
    author.value = ""
    info.value = ""

    refresh()
    navigate('/create')
  }

  const handleReset = (event) => {
    console.log('event', event);
    console.log('content', content);
    console.log('author', author);
    console.log('info', info);
    resetContent();
    resetAuthor();
    resetInfo();
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form id="frm1" onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>create</button>
        <button type="button" onClick={handleReset}>reset</button>
      </form>

    </div>
  )
}

/*

<Form />

const Form = () => {
  const [status, setStatus] = useState(" ");
  return(
    <form>

<h2> Vaccination Form</h2>
      <div><span> Full Name:</span><input/></div>
      <br/>
      <div><span> Address:</span><input/></div>
      <br/>
      <div><span>Contact Number:</span><input/></div>
      <br></br>
      <div><span>Vacination Status:</span>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">Select</option>
              <option value="Dose 1">Dose 1</option>
              <option value="Dose 2">Dose 2</option>
            </select>
      </div>
      <br/>
      <div><input type="reset" value="Reset Form"/></div>
    </form>
  )
}
*/

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    console.log('anecdote', anecdote)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const padding = {
    padding: 5
  }

  const match = useMatch('/anecdotes/:id')
  const anecdote = match 
    ? anecdotes.find(anecdote => anecdote.id === Number(match.params.id))
    : null

  return (

     <div>
      <h1>Software anecdotes</h1>
      <div>
        <Link style={padding} to="/">anecdotes</Link>
        <Link style={padding} to="/create">create new</Link>
        <Link style={padding} to="/about">about</Link>
      </div>
 
      <Routes>
        <Route path="/anecdotes/:id" element={<Anecdote anecdote={anecdote} />} />
        <Route path="/" element={<Anecdotes anecdotes={anecdotes} />} />

        <Route path="/create" element={<CreateNew addNew={addNew} />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <p>
      </p>
    <div>
      <Footer />
    </div>

      </div>
  )
}

export default App
