import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [selectedOption, setSelectedOption] = useState('')

  const handleChange = (e) => {
    setSelectedOption(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!selectedOption) {
      alert('Please select an option.')
      return
    }
    // try {
    //   const response = await axios.post('/your-endpoint', {
    //     choice: selectedOption,
    //   })
    //   console.log('Response:', response.data)
    // } catch (error) {
    //   console.error('Error posting data:', error)
    // }
  }

  useEffect(() => {
    const getShips = async () => {
      try {
        const response = await axios.get('/api/ships')
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    getShips()
    // const getContainers = async () => {
    //   try {
    //     const response = await axios.get('/api/containers')
    //     console.log(response.data)
    //   } catch (error) {
    //     console.error('Error fetching data:', error)
    //   }
    // }
    // getContainers()
  }, [])

  const handleSolve = async () => {
    try {
      const response = await axios.post('/api/', {
        // weight: [1, 2, 3, 4, 5],
        // value: [1, 2, 3, 4, 5],
        length: 5,
        capacity: 10,
        algo: 'pso', // hsa, pso, e-pso
      })
      console.log(response.data)

      // update state after response
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const carryingCapacity = [100, 200, 500]
  const containers = [100, 200, 500]
  const algo = [
    { label: 'hsa', value: 'hsa' },
    { label: 'pso', value: 'pso' },
    { label: 'epso', value: 'epso' },
  ]

  return (
    <div className='m-5 p-0 flex flex-col gap-3'>
      <p>Metaheuristic Algorithm</p>
      <button className='w-1/5 border-1' onClick={() => handleSolve()}>
        Solve
      </button>

      <fieldset className='flex gap-5'>
        <legend>Max Carrying Capacity</legend>
        <div className='flex gap-1'>
          <input type='radio' name='max_weight' id='100-weight' value='100' />
          <label>100</label>
        </div>
        <div className='flex gap-1'>
          <input type='radio' name='max_weight' id='200-weight' value='200' />
          <label>200</label>
        </div>
        <div className='flex gap-1'>
          <input type='radio' name='max_weight' id='500-weight' value='500' />
          <label>500</label>
        </div>
      </fieldset>

      <fieldset className='flex gap-5'>
        <legend>Containers</legend>
        <div className='flex gap-1'>
          <input
            type='radio'
            name='containers'
            id='100-container'
            value='100'
          />
          <label>100</label>
        </div>
        <div className='flex gap-1'>
          <input
            type='radio'
            name='containers'
            id='200-containers'
            value='200'
          />
          <label>200</label>
        </div>
        <div className='flex gap-1'>
          <input
            type='radio'
            name='containers'
            id='500-containers'
            value='500'
          />
          <label>500</label>
        </div>
      </fieldset>

      <fieldset className='flex gap-5'>
        <legend>Algorithm</legend>
        <div className='flex gap-1'>
          <input type='radio' name='algo' id='pso' value='pso' />
          <label>PSO</label>
        </div>
        <div className='flex gap-1'>
          <input type='radio' name='algo' id='hsa' value='hsa' />
          <label>HSA</label>
        </div>
        <div className='flex gap-1'>
          <input type='radio' name='algo' id='epso' value='epso' />
          <label>EPSO</label>
        </div>
      </fieldset>
    </div>
  )
}

export default App

{
  /* <div>
        <p>Problem Length</p>
        <input type='number' name='' id='' className=' w-1/5 border-1' />
      </div> */
}
{
  /*<div className='flex gap-5'>
        <div>
          <p>Minimum Value</p>
          <input type='number' name='' id='' className='border-1' />
        </div>
        <div>
          <p>Maximum Value</p>
          <input type='number' name='' id='' className='border-1' />
        </div>
      </div>
      <div className='flex gap-5'>
        <div>
          <p>Minimum Weight</p>
          <input type='number' name='' id='' className='border-1' />
        </div>
        <div>
          <p>Maximum Weight</p>
          <input type='number' name='' id='' className='border-1' />
        </div>
      </div> */
}
