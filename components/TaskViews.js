"use client"

import CheckCircleIcon from '@/public/assets/icons/CheckCircleIcon';
import DotIcon from '@/public/assets/icons/DotIcon';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

const TaskViews = ({ _id, title, isCompleted, createdAt, getTasks }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

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

    const deleteTask = async (e) => {
        e.preventDefault()
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${_id}`);
            showSuccessToast("Task deleted successfully")
            getTasks()
        } catch (error) {
            console.error('Error creating task:', error);
            showErrorToast('Error deleting task. Please try again.');
        }
    };

    const completeTask = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${_id}`, { completed: !isCompleted });
            showSuccessToast("Task updated successfully")
            getTasks()
        } catch (error) {
            console.error('Error updating task:', error);
            showErrorToast('Error updating task. Please try again.');
        }
    };

    return (
        <div className="border rounded">
            {/* Accordion Trigger */}
            <button
                className={`w-full text-left p-4 bg-[#ddd4cc] border-t border-b border-l border-r border-gray-300 ${isOpen ? 'bg-gray-200' : ''
                    }`}
                onClick={toggleAccordion}
            >
                <div className="flex items-center justify-between">
                    {/* Checkbox Icon */}
                    <div className="flex items-center">
                        <CheckCircleIcon fill={`${isCompleted ? "green" : "white"}`} className="mr-2" onClick={completeTask} />
                        <span>{title}</span>
                    </div>

                    {/* Title (Centered) */}

                    {/* Expand/Collapse Icon */}
                    <span className={`transition-transform transform ${isOpen ? 'rotate-90' : 'rotate-0'}`}>
                        <DotIcon width="25px" height="25px" />
                    </span>
                </div>
            </button>

            {/* Accordion Content */}
            {isOpen && (
                <div className="p-4 bg-[#ece9e4] w-full">
                    <div className='flex'>
                        <h2 className='font-bold mr-1'>Completed: </h2> <p>{isCompleted ? "Completed" : "Not completed"}</p>
                    </div>
                    <div className='flex'>
                        <h2 className='font-bold mr-1'>Created at: </h2> <p>{createdAt}</p>
                    </div>
                    <button class="bg-[#fecaca] text-red-500 py-2 px-4 rounded w-full mt-2" onClick={deleteTask}>
                        Delete
                    </button>

                </div>
            )}
        </div>
    );
};

export default TaskViews;
