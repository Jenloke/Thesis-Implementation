import { useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  // const [array1, setArray1] = useState('')
  // const [array2, setArray2] = useState('')
  // const [value, setValue] = useState('')
  // const [result, setResult] = useState(null)
  // const [error, setError] = useState('')
  
  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   setError('')

  //   try {
  //     // Parse string inputs to arrays of integers
  //     const parsedArray1 = array1.split(',').map(num => parseInt(num.trim()))
  //     const parsedArray2 = array2.split(',').map(num => parseInt(num.trim()))
  //     const parsedValue = parseInt(value)

  //     // Check for NaN values
  //     if (parsedArray1.some(isNaN) || parsedArray2.some(isNaN) || isNaN(parsedValue)) {
  //       setError('Please enter valid integers')
  //       return
  //     }

  //     const response = await fetch('http://localhost:8000/process-data', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         array1: parsedArray1,
  //         array2: parsedArray2,
  //         value: parsedValue
  //       })
  //     })

  //     if (!response.ok) {
  //       const errorData = await response.json()
  //       throw new Error(errorData.detail || 'API request failed')
  //     }

  //     const data = await response.json()
  //     setResult(data)
  //   } catch (err) {
  //     setError(err.message || 'An error occurred')
  //   }
  // }

  // const [length, setLength] = useState(10);
  // const [min, setMin] = useState(1);
  // const [max, setMax] = useState(100);
  // const [numbers, setNumbers] = useState([]);
  // const [error, setError] = useState("");
  // const generateRandomNumbers = () => {
  //   // Validate inputs
  //   if (min > max) {
  //     setError("Minimum value cannot be greater than maximum value");
  //     return;
  //   }

  //   if (length <= 0) {
  //     setError("Length must be greater than 0");
  //     return;
  //   }
    
  //   // Generate random numbers
  //   const randomNumbers = Array.from({ length }, () => 
  //     Math.floor(Math.random() * (max - min + 1)) + min
  //   );
    
  //   setNumbers(randomNumbers);
  // };

  useEffect(() => {
    const getShips = async () => {
      try {
        const response = await axios.get('/api/ships')
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    const getContainers = async () => {
      try {
        const response = await axios.get('/api/containers')
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    getShips()
    getContainers()
  }, [])

  const handleSolve = async () => {
    try {
      const response = await axios.post('/api/', {
        weight: [1, 2, 3, 4, 5],
        value: [1, 2, 3, 4, 5],
        capacity: 10,
        algo: 'pso' // hsa, pso, e-pso
      })
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  return (
    <div className='m-5 p-0 flex flex-col gap-3'>
      <p>Metaheuristic Algorithm</p>
      <button
        className='w-1/4 border-1' 
        onClick={() => handleSolve()}
      >
        Solve
      </button>

      <div>
        <p>Problem Length</p>
        <input type="number" name="" id="" className='border-1'/>
      </div>

      <div className='flex gap-5'>
        <div>
          <p>Minimum Value</p>
          <input type="number" name="" id="" className='border-1'/>
        </div>
        <div>
          <p>Maximum Value</p>
          <input type="number" name="" id="" className='border-1'/>
        </div>
      </div>
      
      <div className='flex gap-5'>
        <div>
          <p>Minimum Weight</p>
          <input type="number" name="" id="" className='border-1'/>
        </div>
        <div>
          <p>Maximum Weight</p>
          <input type="number" name="" id="" className='border-1'/>
        </div>
      </div>
      
      {/* <div>
        <div>
          <input type="radio" id="huey" name="drone" value="huey" defaultChecked />
          <label>Huey</label>
        </div>
        <div>
          <input type="radio" id="dewey" name="drone" value="dewey" />
          <label>Dewey</label>
        </div>
        <div>
          <input type="radio" id="louie" name="drone" value="louie" />
          <label>Louie</label>
        </div>
      </div> */}
    </div>
  )
}

export default App
