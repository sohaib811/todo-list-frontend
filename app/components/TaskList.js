import React from "react";
import TaskViews from "@/app/components/TaskViews";
import Accordion from "@/app/components/Accordion";

const TaskList = ({ tasks, getTasks }) => {
  return (
    <Accordion title="Your todos">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskViews
            key={task._id}
            _id={task._id}
            title={task?.title}
            isCompleted={task?.completed}
            createdAt={task?.createdAt}
            getTasks={getTasks}
          />
        ))
      ) : (
        <div className="p-12 bg-white opacity-80 rounded flex justify-center align-center">
          <span>No tasks today</span>
        </div>
      )}
    </Accordion>
  );
};

export default TaskList;
