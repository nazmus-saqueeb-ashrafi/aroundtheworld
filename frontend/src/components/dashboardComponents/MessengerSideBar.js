import React from 'react'

const MessengerSideBar = () => {
  return (
    <>

    <div class="messengerSidebarController md:relative transition duration-100 ease-in-out">
        <div class="flex flex-col w-64 h-screen px-4 py-8 bg-white border-r dark:bg-base-200 dark:border-base-100 translate-x-full md:translate-x-0 transform  md:relative transition duration-100 ease-in-out">
        <h2 class="text-1xl font-regular text-gray-800 dark:text-white">Contacts</h2>

        <div class="relative mt-6">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg class="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                    <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
            </span>

            <input type="text" class="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" placeholder="Search"/>
        </div>
        
        <div class="flex flex-col justify-between flex-1 mt-6">
            <nav>
                <a class="flex items-center px-4 py-2 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" href="#">

                    <img class="object-cover mx-1 rounded-full h-6 w-6" src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="avatar"/>

                    <span class="mx-2 font-medium">Walkin Phoenix</span>
                </a>

            

                <hr class="my-6 border-gray-200 dark:border-gray-600" />


                <a class="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" href="#">

                    <img class="object-cover mx-1 rounded-full h-6 w-6" src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="avatar"/>

                    <span class="mx-2 font-medium">Walkin Phoenix</span>
                </a>

                <a class="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" href="#">

                    <img class="object-cover mx-1 rounded-full h-6 w-6" src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" alt="avatar"/>

                    <span class="mx-2 font-medium">Walkin Phoenix</span>
                </a>


                

                

                
            </nav>

            
        </div>
    </div>


    </div>

    
    </>
  )
}

export default MessengerSideBar


