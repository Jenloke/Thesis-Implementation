import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  // Generated Data
  const [shipsCapacity, setShipsCapacity] = useState([])

  // Default Values
  const container_list = [100, 200, 500]
  const algo = [
    { label: 'HSA', value: 'hsa' },
    { label: 'PSO', value: 'pso' },
    { label: 'EPSO', value: 'epso' },
  ]

  // Form Inputs
  const [selectedCapacity, setSelectedCapacity] = useState('')
  const [selectedContainer, setContainer] = useState('')
  const [selectedAlgo, setAlgo] = useState('')

  // Solutions
  const [problem, setProblem] = useState([])
  const [solution, setSolution] = useState({})
  const [solArray, setSolArray] = useState([])
  const [runtime, setRuntime] = useState(0)

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
    console.log(selectedCapacity, selectedContainer, selectedAlgo)
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
      const data = response.data

      setProblem(data.problem)

      const { solArray, ...metrics } = data.solution
      setSolArray(solArray)
      setSolution(metrics)

      setRuntime(data.runtime)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return (
    <div className='m-5 p-0 flex flex-col gap-3'>
      <p>Metaheuristic Algorithm</p>
      <button className='w-1/2 border-1' onClick={() => handleSolve()}>
        Solve
      </button>

      <fieldset className='flex flex-col gap-5'>
        <legend>Available Ships</legend>
        {shipsCapacity.map((ship) => (
          <div key={ship.Cargo_Weight_tons} className='flex gap-1'>
            <input
              type='radio'
              name='capacity'
              id={`${ship.Cargo_Weight_tons}-weight`}
              value={ship.Cargo_Weight_tons}
              onChange={() => setSelectedCapacity(ship.Cargo_Weight_tons)}
            />
            <div className='flex flex-col'>
              <p>Ship Type: {ship.Ship_Type}</p>
              <p>Carrying Capacity: {ship.Cargo_Weight_tons} tons</p>
              <p>Operating Cost: {ship.Operational_Cost_USD} USD</p>
            </div>
          </div>
        ))}
      </fieldset>

      <fieldset className='flex gap-5'>
        <legend>Containers</legend>
        {container_list.map((length) => (
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

      {Object.keys(solution).length !== 0 ? (
        <>
          <div className='w-full max-w-md border border-gray-300 overflow-hidden'>
            <div className='bg-gray-100 border-b border-gray-300'>
              <table className='w-full'>
                <thead>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>
                      Container
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>
                      Value
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>
                      Weight
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className='h-64 overflow-y-auto'>
              <table className='w-full'>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {solArray.map((value, index) => (
                    <tr key={index} className='hover:bg-gray-50'>
                      {value == 1 ? (
                        <>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                            {index + 1}
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                            {problem[index].value} USD
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                            {problem[index].weight} kg
                          </td>
                        </>
                      ) : null}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <p>Cargo List</p>
            <p>Value: {solution.solValue} USD</p>
            <p>Weight: {solution.solWeight} tons</p>
            <p>Time to Find: {runtime} secs</p>
          </div>
          <div className='w-full max-w-md border border-gray-300 overflow-hidden'>
            <div className='bg-gray-100 border-b border-gray-300'>
              <table className='w-full'>
                <thead>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>
                      Container
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>
                      Value
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider'>
                      Weight
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className='h-64 overflow-y-auto'>
              <table className='w-full'>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {problem.map(({ value, weight }, index) => (
                    <tr key={index} className='hover:bg-gray-50'>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                        {index + 1}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        {value}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        {weight} kg
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}

export default App
