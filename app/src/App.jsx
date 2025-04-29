import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  // Generated Data
  const [shipsCapacity, setShipsCapacity] = useState([])
  const [problem, setProblem] = useState([])

  // Default Values
  const container_list = [100, 200, 500]

  // App State
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form Inputs
  const [selectedCapacity, setSelectedCapacity] = useState('')
  const [selectedOpCost, setOpCost] = useState('')
  const [selectedContainer, setContainer] = useState('')

  // Solutions
  const [problemAPI, setProblemAPI] = useState([])
  const [solution, setSolution] = useState({})
  const [solArray, setSolArray] = useState([])
  const [runtime, setRuntime] = useState(0)
  // Base on Solved Solutions
  const [finalOpCost, setfinalOpCost] = useState(0)
  const [profit, setProfit] = useState(0)

  const fetchShips = async () => {
    try {
      const response = await axios.get('/api/ships')
      // console.log(response.data)
      setShipsCapacity(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const fetchContainers = async (length) => {
    if (!selectedContainer) {
      alert('Select Container Size')
      return
    }
    try {
      const response = await axios.post('/api/containers', {
        length: length,
      })
      // console.log(response.data)
      setProblem(response.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    const fetchContainers = async (length) => {
      try {
        const response = await axios.post('/api/containers', {
          length: length,
        })
        // console.log(response.data)
        setProblem(response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchShips()
    fetchContainers(100)
  }, [])

  const handleSolve = async () => {
    if (!selectedCapacity) {
      alert('Please Complete')
      return
    }
    if (!problem) {
      alert('Container List Should not be Empty')
    }
    setIsSubmitting(true)

    const finalOpCost = selectedOpCost
    // console.log(selectedCapacity, selectedContainer)
    const capacity = selectedCapacity

    try {
      const response = await axios.post('/api/', {
        capacity: capacity,
        problem: problem,
      })
      // console.log(response.data)
      const data = response.data
      const { solArray, ...metrics } = data.solution
      setProblemAPI(data.problem)
      setSolArray(solArray)
      setSolution(metrics)
      setfinalOpCost(finalOpCost)
      setProfit(metrics.solValue - finalOpCost)
      setRuntime(data.runtime)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const clearAll = () => {
    setShipsCapacity([])
    setProblem([])

    setIsSubmitting(false)

    // Form Inputs
    setSelectedCapacity('')
    setContainer('')

    // Solutions
    setSolution({})
    setSolArray([])
    setRuntime(0)
    setfinalOpCost(0)
    setProfit(0)
  }

  return (
    <div className="m-5 p-0 flex flex-col gap-3 font-[Verdana]">
      <div className="flex place-content-center w-full gap-5">
        <img src="assets/logo.svg" alt="icon" width={48} height={48} />
        <p className="text-4xl">Meta-Logistics</p>
      </div>

      <div className="flex gap-2">
        <button
          className="w-1/2 py-2 m-auto border-1 rounded-md text-xl"
          onClick={() => handleSolve()}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Finding Optimal Cargo' : 'Optimize Cargo'}
        </button>
        <button
          className="w-1/2 py-2 m-auto border-1 rounded-md text-xl"
          onClick={() => clearAll()}
          disabled={isSubmitting}
        >
          Clear All
        </button>
      </div>

      <div className="w-full flex place-content-center gap-2">
        <div className="w-1/2 flex flex-col gap-5 place-content-center">
          <div className="w-full">
            <button
              className="w-full py-2 mx-auto border-1 rounded-md text-xl"
              onClick={() => fetchContainers(selectedContainer)}
            >
              Gather Containers
            </button>
            <legend>Containers</legend>
            <fieldset className="flex mx-auto gap-5">
              {container_list.map((length) => (
                <div key={length} className="flex gap-1">
                  <input
                    type="radio"
                    name="containers"
                    id={`${length}-container`}
                    value={length}
                    onChange={() => setContainer(length)}
                  />
                  <label>{length}</label>
                </div>
              ))}
            </fieldset>
          </div>
          <div className="w-full max-w-md border border-gray-300 rounded-md overflow-hidden">
            <div className="bg-gray-100 border-b border-gray-300">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="pt-3" colSpan={3}>
                      Container List
                    </th>
                  </tr>
                </thead>
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Container
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Value
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Weight
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="h-64 overflow-y-auto">
              <table className="w-full">
                <tbody className="bg-white divide-y divide-gray-200">
                  {problem.map(({ value, weight }, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        $ {value.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {weight.toLocaleString()} {weight == 1 ? 'ton' : 'tons'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="w-1/2 flex flex-col gap-5">
          <button
            className="w-full py-2 border-1 rounded-md text-xl"
            onClick={() => fetchShips()}
          >
            Gather Available Ships
          </button>
          <fieldset className="flex flex-col gap-5">
            <legend>Available Ships</legend>
            {shipsCapacity.map((ship) => (
              <div key={ship.Cargo_Weight_tons} className="flex gap-1">
                <input
                  type="radio"
                  name="capacity"
                  id={`${ship.Cargo_Weight_tons}-weight`}
                  value={ship.Cargo_Weight_tons}
                  onChange={() => {
                    setSelectedCapacity(ship.Cargo_Weight_tons)
                    setOpCost(ship.Operational_Cost_USD)
                  }}
                />
                <div className="flex flex-col">
                  <p>Ship Type: {ship.Ship_Type}</p>
                  <p>
                    Carrying Capacity: {ship.Cargo_Weight_tons.toLocaleString()}{' '}
                    tons
                  </p>
                  <p>
                    Operating Cost: {ship.Operational_Cost_USD.toLocaleString()}{' '}
                    USD
                  </p>
                </div>
              </div>
            ))}
          </fieldset>
        </div>
      </div>

      {Object.keys(solution).length !== 0 ? (
        <div className="flex justify-center gap-10">
          <div className="flex flex-col justify-center text-right">
            <p className="text-2xl">Cargo Information</p>
            <p>Value: $ {solution.solValue.toLocaleString()}</p>
            <p>Operating Cost: $ {finalOpCost.toLocaleString()}</p>
            <p>Profit: $ {profit.toLocaleString()}</p>
            <p>Weight: {solution.solWeight.toLocaleString()} tons</p>
            <p>Time to Find: {runtime} secs</p>
          </div>

          <div className="w-full max-w-md border border-gray-300 rounded-md overflow-hidden">
            <div className="bg-gray-100 border-b border-gray-300">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="pt-3" colSpan={3}>
                      Selected Containers
                    </th>
                  </tr>
                </thead>
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Container
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Value
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Weight
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="h-64 overflow-y-auto">
              <table className="w-full">
                <tbody className="bg-white divide-y divide-gray-200">
                  {solArray.map((value, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      {value == 1 ? (
                        <>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            $ {problemAPI[index].value.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {problemAPI[index].weight.toLocaleString()}{' '}
                            {problemAPI[index].weight == 1 ? 'ton' : 'tons'}
                          </td>
                        </>
                      ) : null}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default App
