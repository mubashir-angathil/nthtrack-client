import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState({
    success: '',
    status: ''
  })
  useEffect(() => {
    fetch("http://localhost:5000/auth")
      .then((res) => res.json())
      .then((data) => setCount(data))
    }, [])

  return (
    <>
      <h1>{count.success} !!</h1>
    </>
  )
}

export default App
