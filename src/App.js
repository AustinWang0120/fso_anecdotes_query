import axios from "axios"
import { useMutation, useQuery, useQueryClient } from "react-query"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  
  const { mutate } = useMutation("anecdotes", (content) => {
    return axios.post("http://localhost:3003/anecdotes", { content, votes: 0 }).then(res => res.data)
  }, {
    onMutate: (content) => {
      if (content.length < 5) {
        throw new Error("at least 5 characters long")
      }
      return { validationError: null}
    },
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes")
    }
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const content = formData.get("content")
    mutate(content)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="content" />
        <button type="submit">add</button>
      </form>
    </div>
  )
}

const App = () => {
  const queryClient = useQueryClient()
  
  const { isLoading, error, data } = useQuery("anecdotes", () => {
    return axios.get("http://localhost:3003/anecdotes").then(res => res.data)
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes")
    }
  })

  const { mutate } = useMutation("anecdotes", (newAnecdote) => {
    return axios.put(`http://localhost:3003/anecdotes/${newAnecdote.id}`, newAnecdote)
  })

  const handleVote = (anecdote) => {
    const newAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    mutate(newAnecdote)
    console.log("haha")
  }

  if (isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  if (error) {
    return (
      <div>Error: {error.message}</div>
    )
  }
  
  return (
    <div>
      <AnecdoteForm />
      {data.map((anecdote) => (
        <div key={anecdote.id} onClick={() => handleVote(anecdote)}>
          {anecdote.content} -- has {anecdote.votes} votes 
        </div>
      ))}
    </div>
  )
}

export default App
