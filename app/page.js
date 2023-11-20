"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ImageSection from "@/app/components/ImageSection";
import TextBox from "@/app/components/TextBox";
import TaskList from "@/app/components/TaskList";

export default function Home() {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);

  const showErrorToast = (errorMessage) => {
    toast.error(errorMessage, {
      position: "bottom-right",
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
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const createTask = async (e) => {
    e.preventDefault();
    try {
      if (title.length <= 0) {
        return showErrorToast("Title cannot be empty");
      }
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
        title: title,
      });
      showSuccessToast("Task created successfully");
      getTasks();
    } catch (error) {
      setTitle("");
      console.error("Error creating task:", error);
      showErrorToast("Error creating task. Please try again.");
    }
  };

  const getTasks = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks`
      );
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      showErrorToast("Error fetching tasks. Please try again.");
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="container mx-auto p-8 flex flex-col items-center justify-center">
        <ImageSection />
        <TextBox
          title={title}
          onTitleChange={setTitle}
          createTask={createTask}
        />
        <TaskList tasks={tasks} getTasks={getTasks} />
      </div>
    </main>
  );
}
