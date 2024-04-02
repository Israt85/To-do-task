import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import CreateTask from './ToDo/CreateTask.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <div className='container overflow-y-auto overflow-x-hidden mx-auto min-h-screen bg-yellow-200'>
    <CreateTask/>
    </div>
 </QueryClientProvider>
  </React.StrictMode>,
)
