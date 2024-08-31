
import { ENDPOINTS } from './api/handlers'
import './App.css'
import { useFetchSWR } from './swr'

function App() {
  return (
    <div>
      <ByUseEffectWithMutation/>
    </div>
  )
}

const ByUseEffectWithMutation = () => {
  const {data} = useFetchSWR(ENDPOINTS.USER)
  console.log(data)

  return <div>ByUseEffectWithMutation</div>
}

export default App
