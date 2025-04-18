import { useEffect, useState } from 'react'
import React from 'react'
import './App.css'
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'
import authService from './appwrite/auth'
import { useDispatch } from 'react-redux'
import { login, logout } from './store/authSlice'

function App() {
  const [loading,setLoading] = useState(true)

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
          if (userData) {
            useDispatch(login(userData))
          }else{
            useDispatch(logout())
          }
    }).catch((error)=>{
            throw error
    }).finally(()=>{
      setLoading(false)
    })
  })

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between  bg-blue-400'>
      <div className='w-full block'>
        <Header/>
        <main>
        TODO:  <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ) : (null)
}

export default App
