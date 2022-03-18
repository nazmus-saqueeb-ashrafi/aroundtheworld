import React from 'react'
import { Link } from "react-router-dom";
import { motion } from "framer-motion"

import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { register, reset } from '../features/auth/authSlice'
import { toast } from 'react-toastify'

import { useState,useEffect } from 'react';

import Spinner from '../components/Spinner'

const Register = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  

  const { name, email, password, password2 } = formData

  // redux

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])


  if (isLoading) {
    return <Spinner />
  }

  //

  const onChange = (e)=>{
    setFormData((prevState)=>({
      ...prevState,
      [e.target.name] : e.target.value
    }))
  }
  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      toast.error('Passwords do not match')
    } else {

      const userData = {
        name,
        email,
        password,
      }

      dispatch(register(userData))
      
    }
  }


  return (
      <>
        <div class="bg-white body-font relative min-h-screen">
        <div class="container px-5 py-24 mx-auto   ">


          <div class=" bg-gray-100 rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0 lg:w-1/2 md:w-2/3 mx-auto">

            <div class="flex flex-col text-center w-full mb-2">
                <h1 class="sm:text-2xl text-2xl font-medium title-font mb-0 text-gray-600">Sign up for</h1>
                <h1 class="font-['Abril'] italic font-bold text-2xl text-sky-500 pb-1 flex flex-col text-center w-full mb-1">Around the world</h1>
                <p class="lg:w-2/3 mx-auto leading-relaxed text-base">It's quick and easy.</p>
            </div>

            <form  onSubmit={onSubmit}>
              

              <div class="relative mb-4">
                <label for="name" class="leading-7 text-sm text-gray-600">Name</label>
                <input type="name" id="name" name="name" onChange={onChange} value={name} class="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
              </div>

              <div class="relative mb-4">
                <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
                <input type="email" id="email" name="email" onChange={onChange} value={email} class="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
              </div>

              <div class="relative mb-4">
                <label for="password" class="leading-7 text-sm text-gray-600">Password</label>
                <input type="password" id="password" name="password" onChange={onChange} value={password} class="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
              </div>

              <div class="relative mb-4">
                <label for="password2" class="leading-7 text-sm text-gray-600">Password2</label>
                <input type="password2" id="password2" name="password2" value={password2} onChange={onChange} class="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
              </div>

              <button type='submit' class="w-full text-white bg-purple-400 hover:bg-purple-500 border-0 py-2 px-8 focus:outline-none rounded text-lg">Sign Up</button>

            </form>
            <Link class="text-s text-purple-400 hover:text-purple-500 mt-3 cursor-pointer m-auto" to="/login">
                Back to login

            </Link>

            
          
          </div>
          
        </div>
      </div>

      </>
      
  )
}

export default Register