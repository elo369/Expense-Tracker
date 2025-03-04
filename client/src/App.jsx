import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Form from './components/Form.jsx'
import Lists from './components/Lists.jsx'
import { SERVER_URL } from './helpers/Constants.js'
import axios from 'axios'
import { ListProvider, useList } from './context/Context.jsx'
import BudgetTracker from './components/Budget.jsx'

function App() {
  
  const {lists, setLists} = useList()

  const getData = async () => {
    try {
      let listsData = await axios.get(`${SERVER_URL}/getData`)
      setLists(listsData.data)
    } catch (error) {
      console.log("listsdata", error)
    }
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <ListProvider >
      <div className='relative min-h-screen bg-[#172842]'>
        <h1 className='flex justify-center text-3xl sm:text-5xl pt-5 font-bold bg-gradient-to-t from-orange-500 to-orange-800 text-transparent bg-clip-text'>Expense Tracker</h1>
        <div className='flex'>
        <Form get={getData} />
        <BudgetTracker />
        </div>
        <Lists ssh={lists} get={getData}/>
      </div>
    </ListProvider>
  )
}

export default App
