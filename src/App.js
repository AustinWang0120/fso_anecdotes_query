import axios from "axios"
import { useQuery } from "react-query"

const App = () => {
  const { isLoading, error, data } = useQuery("anecdotes", () => {
    return axios.get("http://localhost:3003/anecdotes").then(res => res.data)
  })

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
      {data.map((anecdote) => (
        <div>
          {anecdote.content} -- has {anecdote.votes} votes 
        </div>
      ))}
    </div>
  )
}

export default App
