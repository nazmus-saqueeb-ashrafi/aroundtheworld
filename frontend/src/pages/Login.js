import React from 'react'
import { Link } from "react-router-dom";
import { motion } from "framer-motion"
import { useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({
    
    email: '',
    password: '',

  })

  const {  email, password } = formData

  const onChange = (e)=>{
    setFormData((prevState)=>({
      ...prevState,
      [e.target.name] : e.target.value
    }))
  }
  const onSubmit = (e)=>{
    e.preventDefault()
  }

  return (
    
        <div>
          <section class="text-gray-600 bg-white body-font flex h-screen">
            <div class="container px-5 py-24 mx-auto flex flex-wrap items-center">
              <div class="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">

                <h1 class="font-['Abril'] font-bold italic text-5xl text-sky-500">Around the world</h1>

                <p class="leading-relaxed mt-0">Document your travel journey, share with your friends and family.</p>
                
              </div>
              <div class="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
                
                <div class="relative mb-4">
                  <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
                  <input type="email" id="email" name="email" class="w-full bg-white rounded border border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                </div>
                <div class="relative mb-4">
                  <label for="password" class="leading-7 text-sm text-gray-600">Password</label>
                  <input type="password" id="password" name="password" class="w-full bg-white rounded border border-gray-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                </div>

                <Link to="/dashboard">
                  <button class="text-white bg-sky-600 hover:bg-sky-700 border-0 py-2 w-full focus:outline-none rounded text-lg">
                    Log in
                  </button>
                </Link>
               
                <Link class="text-s text-sky-500 hover:text-sky-600 mt-3 cursor-pointer m-auto" to="/">
                  Forgotten password?

                </Link>

                <hr class="mt-3"/>
                
                <div class="m-auto">
                  <Link to="/register">
                    <button class="text-white bg-purple-400 border-0 py-2 px-8 focus:outline-none hover:bg-purple-500 rounded text-lg mt-3 w-40 content-center">Register</button>
                  </Link>
                  
                </div>
                
              </div>
            </div>
          </section>

        </div>


      
    
  )
}

export default Login
