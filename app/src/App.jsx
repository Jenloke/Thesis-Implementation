import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [shipsCapacity, setShipsCapacity] = useState([])

  const [selectedCapacity, setSelectedCapacity] = useState('')
  const [selectedContainer, setContainer] = useState('')
  const [selectedAlgo, setAlgo] = useState('')

  const containers = [100, 200, 500]
  const algo = [
    { label: 'HSA', value: 'hsa' },
    { label: 'PSO', value: 'pso' },
    { label: 'EPSO', value: 'epso' },
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/ships')
        console.log(response.data)
        setShipsCapacity(response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  const handleSolve = async () => {
    if (!selectedAlgo || !selectedCapacity || !selectedContainer) {
      alert('Please Complete')
      return
    }
    console.log(selectedCapacity)
    console.log(selectedContainer)
    console.log(selectedAlgo)
    const capacity = selectedCapacity
    const length = selectedContainer
    const algo = selectedAlgo

    try {
      const response = await axios.post('/api/', {
        length: length,
        capacity: capacity,
        algo: algo, // hsa, pso, e-pso
      })
      console.log(response.data)

      // update state after response
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return (
    <div className='m-5 p-0 flex flex-col gap-3'>
      <p>Metaheuristic Algorithm</p>
      <button className='w-1/5 border-1' onClick={() => handleSolve()}>
        Solve
      </button>

      <fieldset className='flex gap-5'>
        <legend>Max Carrying Capacity</legend>
        {shipsCapacity.map((capacity) => (
          <div key={capacity} className='flex gap-1'>
            <input
              type='radio'
              name='capacity'
              id={`${capacity}-weight`}
              value={capacity}
              onChange={() => setSelectedCapacity(capacity)}
            />
            <label>{capacity}</label>
          </div>
        ))}
      </fieldset>

      <fieldset className='flex gap-5'>
        <legend>Containers</legend>
        {containers.map((length) => (
          <div key={length} className='flex gap-1'>
            <input
              type='radio'
              name='containers'
              id={`${length}-container`}
              value={length}
              onChange={() => setContainer(length)}
            />
            <label>{length}</label>
          </div>
        ))}
      </fieldset>

      <fieldset className='flex gap-5'>
        <legend>Algorithm</legend>
        {algo.map(({ label, value }) => (
          <div key={value} className='flex gap-1'>
            <input
              type='radio'
              name='algo'
              id={value}
              value={value}
              onChange={() => setAlgo(value)}
            />
            <label>{label}</label>
          </div>
        ))}
      </fieldset>
    </div>
  )
}

export default App
