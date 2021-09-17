
import {useState,useEffect} from 'react'

export default function Home() {
  const [data, dataSet] = useState()
  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch('api/ticket/1')
      console.log(response)
      // response = await response.json()
      dataSet(response)
    }
    fetchMyAPI()
  }, [])
  return (
    <div>
      Hello
    </div>
  )
}
