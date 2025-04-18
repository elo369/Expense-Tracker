import React, { useState } from "react"
import Input from "./Input"
import Button from "./Button"
import {useForm} from 'react-hook-form'
import authService from "../appwrite/auth"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import Logo from "./Logo"

function Signup() {
    const [error, setError] = useState("")
    const { register, handleSubmit } = useForm()

    const create = async (data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    useDispatch(login(userData))
                }
                useNavigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                <span className="inline-block w-full max-w-[100px]">
                    <Logo width="100%" />
                </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                Already have an account?&nbsp;
                <Link
                    to="/login"
                    className="font-medium text-primary transition-all duration-200 hover:underline"
                >
                    Sign In
                </Link>
            </p>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(create)}>
                    <div className="space-y-5">
                    <Input
                        type="text"
                        placeHolder="Enter your name"
                        label="Name"
                        {...register("name", {
                            require: true
                        })}
                    />
                    <Input
                        type="email"
                        placeHolder="Enter your Email"
                        label="Email"
                        {...register("email", {
                            require: true
                        })}
                    />
                    <Input
                        type="password"
                        placeHolder="Enter your password"
                        label="Password"
                        {...register("password", {
                            require: true
                        })}
                    />
                    <Button
                        type="submit"
                    >
                        create Account
                    </Button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Signup