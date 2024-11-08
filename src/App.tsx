import { useState } from 'react'
import { Button } from "@/components/ui/button"
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Button onClick={() => setCount(count+1)}>AgriPact {count}</Button>
    </div>
  )
}

export default App
