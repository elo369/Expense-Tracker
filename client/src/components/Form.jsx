import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { SERVER_URL } from '../helpers/Constants.js'
import { useList } from '../context/Context.jsx'

const Form = ({get}) => {

    // Extracting values and setter functions from context
    const {title, setTitle,amout, setAmout,category, setCategory,type, setType,fetchData} = useList()
    
    // Function to handle form submission
    const submitForm = async (e)=>{
        e.preventDefault();

          try {
            // Sending data to the server via POST request
            const data = await axios.post(`${SERVER_URL}/createList`,{
                Title:title,
                Amout:amout,
                Category:category,
                Type:type
            })
            setTitle("")
            setAmout("")
            setCategory("")
            setType("")
            
            fetchData()
            get()
            console.log(data.data)
          } catch (error) {
            console.log(error)
          }
    }
    
    return (
        <div className='lg:w-200 h-20 ml-10 top-20 sm:top-7 relative md:w-[70vw] sm:w-[70vw] w-[20vw] sm:left-0 left-8 '>
            <form onSubmit={submitForm} className='m-2 flex flex-wrap sm:w-auto w-[5vw]'>

                 {/* Input for Title */}
                <input
                    type="text"
                    name='Title'
                    placeholder='Title'
                    required
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 m-1 sm:w-[20vw] md:w-auto w-[100vw]' 
                    value={title}
                    onChange={(e)=> setTitle(e.target.value)}
                />

                {/* Input for Amount */}
                <input
                    type="number"
                    name='Amout'
                    placeholder='Amout'
                    required
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 m-1 sm:w-[20vw] md:w-auto w-[100vw] ' 
                    value={amout}
                    onChange={(e)=> setAmout(e.target.value)}
                />

                {/* Dropdown for Category Selection */}
                <select
                    name="Category"
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 m-1'
                    value={category}
                    onChange={(e)=> setCategory(e.target.value)}
                >
                    <option value="">--Category--</option>
                    <option value="Food" >Food</option>
                    <option value="Rent" >Rent</option>
                    <option value="Travel" >Travel</option>
                    <option value="Clothes" >Clothes</option>
                    <option value="Other" >Other</option>
                </select>

                {/* Dropdown for Cashflow Type (Expense or Income) */}
                <select
                    name="Type"
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 m-1'
                    value={type }
                    onChange={(e)=> setType(e.target.value)}
                >
                     <option value="">--Cashflow--</option>
                    <option value="Expense" >Expense</option>
                    <option value="Income" >Income</option>
                </select>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="text-white bg-gray-900 hover:bg-gray-950  font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 ml-2 sm:top-0 top-3 relative"
                >Submit</button>
            </form>
        </div>
    )
}

export default Form
