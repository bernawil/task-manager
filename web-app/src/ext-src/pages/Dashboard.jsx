import React, { useState } from 'react';
import { useQuery } from '../../queries';
import { useAction } from '../../actions';
import createTask from '../../actions/createTask';
import updateTask from '../../actions/updateTask';
import deleteTask from '../../actions/deleteTask';
import getTasks from '../../queries/getTasks';

export function Dashboard() {
  const { data: tasks, isLoading, error } = useQuery(getTasks);
  const createTaskFn = useAction(createTask);
  const updateTaskFn = useAction(updateTask);
  const deleteTaskFn = useAction(deleteTask);

  const [newTask, setNewTask] = useState({
    name: '',
    description: '',
    type: '',
    dueDate: '',
    label: ''
  });

  const handleCreateTask = () => {
    createTaskFn(newTask);
    setNewTask({
      name: '',
      description: '',
      type: '',
      dueDate: '',
      label: ''
    });
  };

  const handleUpdateTask = (taskId, updatedTask) => {
    updateTaskFn({ taskId, ...updatedTask });
  };

  const handleDeleteTask = (taskId) => {
    deleteTaskFn({ taskId });
  };

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  console.log({ tasks })
  return (
    <div className='p-4'>
      <div className='mb-4'>
        <input
          type='text'
          placeholder='Task Name'
          className='px-1 py-2 border rounded text-lg'
          value={newTask.name}
          onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
        />
        <input
          type='text'
          placeholder='Task Description'
          className='px-1 py-2 border rounded text-lg'
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <input
          type='text'
          placeholder='Task Type'
          className='px-1 py-2 border rounded text-lg'
          value={newTask.type}
          onChange={(e) => setNewTask({ ...newTask, type: e.target.value })}
        />
        <input
          type='date'
          className='px-1 py-2 border rounded text-lg'
          value={newTask.dueDate}
          onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
        />
        <button
          onClick={handleCreateTask}
          className='bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded'
        >
          Add Task
        </button>
      </div>
      <div>
        {tasks.map((task) => (
          <div
            key={task.id}
            className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'
          >
            <div>{task.name}</div>
            <div>{task.description}</div>
            <div>{task.type}</div>
            <div>{task.dueDate.toLocaleDateString()}</div>
            <div>{task.label}</div>
            <div>
              <button
                onClick={() => handleUpdateTask(task.id, { label: 'Urgent' })}
                className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
              >
                Urgent
              </button>
              <button
                onClick={() => handleUpdateTask(task.id, { label: 'Can be postponed' })}
                className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded'
              >
                Can be postponed
              </button>
              <button
                onClick={() => handleUpdateTask(task.id, { label: 'Not important' })}
                className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'
              >
                Not important
              </button>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}