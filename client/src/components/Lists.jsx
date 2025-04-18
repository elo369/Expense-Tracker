import axios from 'axios'
import React, { useEffect, useState } from 'react'
// import { TbCircleX } from 'react-icons/tb'
// import { BiEdit } from 'react-icons/bi'
import { useList } from '../context/Context.jsx'
import { SERVER_URL } from '../helpers/Constants.js'
// import { CiEdit } from "react-icons/ci";

const Lists = ({ data, get }) => {
    // State for tracking the item being edited
    const [editId, setEditId] = useState(null)

    // Extracting values and setter functions from context
    const { title,
        setTitle,
        amout,
        setAmout,
        category,
        setCategory,
        type,
        setType,
        setLists,
        fetchData
    } = useList()

    // Function to handle edit button click
    const handleEditClick = (e) => {
        setEditId(e._id) // Set the ID of the item being edited
        setTitle(e.Title)
        setAmout(e.Amout)
        setCategory(e.Category)
        setType(e.Type)
        console.log("handle", e.Type)
    }

     // Function to update data on the server
    const updatedData = async (e) => {
        e.preventDefault()
        if (!editId) return  // If no item is being edited, return

        try {
            const update = await axios.put(`${SERVER_URL}/updateData/${editId}`, {
                Title: title,
                Amout: amout,
                Category: category,
                Type: type
            })
            console.log("updated:",update)

             // Reset edit state and refresh data
            setEditId(null) // Reset edit mode
            setTitle("")
            setAmout("")
            setCategory("")
            setType("")
            fetchData()
            get()
        } catch (error) {
            console.log("updated :", error)
        }
    }

    // Function to delete an item
    const deletedData = async (id) => {
        try {
            const deleted = await axios.delete(`${SERVER_URL}/deleted/${id}`)
            console.log("Deleted:",deleted)

            // Remove item from local state and refresh data
            setLists((prev) => prev.filter((e) => e._id !== id))
            fetchData()
            get()
        } catch (error) {
            console.log("deleted: ", error)
        }
    }
    return (
        <div className='overflow-x-scroll h-[490px] scrollbar-hide'>
            {data.length > 0 ? (data?.map((e) => (
                <div key={e._id} className={`flex border border-black/10 rounded-lg sm:px-3 sm:py-1.5 gap-x-3 lg:w-[67vw] md:w-[80vw] sm:w-[90vw] w-[95vw] h-12 sm:left-12 left-2 p-1.5 shadow-sm shadow-white/50 duration-300  text-black relative lg:top-8 md:top-15 sm:top-25 top-70 mb-2 ${(editId === e._id ? type : e.Type) === "Income" ? "bg-[#59e527]" : "bg-[#dd733e]"}`}>

                    {/* Input for Title */}
                    <input
                        type="text"
                        name='Title'
                        placeholder='Title'
                        value={editId === e._id ? title : e.Title}
                        readOnly={editId !== e._id}
                        className="md:w-35 p-2 bg-white border border-gray-300 rounded-md text-black sm:w-25 w-12 text-sm sm:text-lg"
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    {/* Input for Amount */}
                    <input
                        type="text"
                        name='Amout'
                        value={editId === e._id ? amout : e.Amout}
                        readOnly={editId !== e._id}
                        className="md:w-30 p-2 bg-white border border-gray-300 rounded-md text-black sm:w-25 w-12 text-sm sm:text-lg"
                        onChange={(e) => setAmout(e.target.value)}
                    />

                     {/* Dropdown for Category */}
                    <select
                        name="Category"
                        disabled={editId !== e._id}
                        value={editId === e._id ? category : e.Category}
                        className="md:w-35 sm:w-25 bg-white  border-gray-300 rounded-md text-black w-15 text-sm sm:text-lg"
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="Food" >Food</option>
                        <option value="Rent" >Rent</option>
                        <option value="Travel" >Travel</option>
                        <option value="Clothes" >Clothes</option>
                        <option value="Other" >Other</option>
                    </select>

                    {/* Dropdown for Type (Expense/Income) */}
                    <select
                        name="Type"
                        disabled={editId !== e._id}
                        value={editId === e._id ? type : e.Type}
                        className={`md:w-35 sm:w-25 w-15 rounded-md text-black text-sm sm:text-lg`}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="Expense" >Expense</option>
                        <option value="Income" >Income</option>
                    </select>

                    {/* Display Date */}
                    <h1 className="text-center text-black font-medium pt-1 ml-2 lg:block hidden">
                        <span className='font-bold'>Date:</span> {e.Date.substring(0, 10)}
                    </h1>

                     {/* Edit Button */}
                    <div className="text-center text-black font-medium sm:pt-1 sm:ml-3 bg-[#f0f4f9] sm:p-2 p-1 rounded-md sm:right-0 right-3">
                        {editId === e._id ? (
                            <button onClick={updatedData} className="text-green-600 text-sm bg-white ">Save</button>
                        ) : (
                            <button className='text-green-400' onClick={() => handleEditClick(e)}>edit</button>                            
                        )}
                    </div>

                    {/* Delete Button */}
                    <div className="text-center text-black font-medium sm:pt-1 sm:ml-5 bg-[#f0f4f9] sm:p-2 p-1 rounded-md">
                        <button onClick={() => deletedData(e._id)} className='text-red-500 w-6'>Del</button>
                    </div>
                </div>
            )))
                : (
                    <p className='font-bold text-lg text-white ml-10'>Data Loading...</p>
                )}
        </div>
    )
}

export default Lists
