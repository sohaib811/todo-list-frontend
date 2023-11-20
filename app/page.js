"use client"

import Image from 'next/image'
import PlusIcon from './assets/icons/PlusIcon'
import Accordion from '@/components/Accordion'
import TaskViews from '@/components/TaskViews'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function Home() {
  const [title, setTitle] = useState("")
  const [tasks, setTasks] = useState([])

  const showErrorToast = (errorMessage) => {
    toast.error(errorMessage, {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const showSuccessToast = (errorMessage) => {
    toast.success(errorMessage, {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const createTask = async (e) => {
    e.preventDefault()
    try {
      if (title.length <= 0) {
        return showErrorToast("Title cannot be empty")
      }
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, { title: title });
      showSuccessToast("Task created successfully")
      getTasks()
    } catch (error) {
      setTitle("")
      console.error('Error creating task:', error);
      showErrorToast('Error creating task. Please try again.');
    }
  };


  const getTasks = async (e) => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tasks`);
      setTasks(data)
    } catch (error) {
      console.error('Error fetching tasks:', error);
      showErrorToast('Error fetching tasks. Please try again.');
    }
  };

  useEffect(() => {
    getTasks()
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">

      <div className="container mx-auto p-8 flex flex-col items-center justify-center">
        {/* Image Row */}
        <div className="mb-8 flex items-center justify-center">
          <img
            src="./assets/images/profile.jpg"
            alt="Your Image"
            className="rounded-full h-32 w-32 object-cover mr-4 border-4"
          />
        </div>

        {/* Text Box Row */}
        <form className="bg-white flex justify-between items-center mb-8 w-full md:w-[80%] lg:w-[50%] rounded"
          onSubmit={createTask}>
          <input placeholder="Add new task" className='m-2 ml-3 bg-transparent w-full' value={title} onChange={e => setTitle(e.target.value)} />
          <button type="submit" className="bg-[#b9af8b] text-white p-2 rounded m-1" >
            <PlusIcon />
          </button>
        </form>

        <Accordion title="Your todos">
          {
            tasks.length > 0 ?
              tasks?.map((task) =>
                <TaskViews _id={task._id} title={task?.title} isCompleted={task?.completed} createdAt={task?.createdAt} getTasks={getTasks} />
              )
              :
              <div className='p-12 bg-white opacity-80 rounded flex justify-center align-centr'>
                <span>No tasks today</span>
              </div>
          }
        </Accordion>

      </div>
    </main>
  )
}
