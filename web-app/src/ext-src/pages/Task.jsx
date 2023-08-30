import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '../../queries';
import { useAction } from '../../actions';
import getTask from '../../queries/getTask';
import updateTask from '../../actions/updateTask';
import deleteTask from '../../actions/deleteTask';

export function Task() {
  const { taskId } = useParams();
  const { data: task, isLoading, error } = useQuery(getTask, { taskId });
  const updateTaskFn = useAction(updateTask);
  const deleteTaskFn = useAction(deleteTask);

  const [editedTask, setEditedTask] = useState({
    name: task?.name || '',
    description: task?.description || '',
    type: task?.type || '',
    dueDate: task?.dueDate || '',
    label: task?.label || ''
  });

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleUpdateTask = () => {
    updateTaskFn({ taskId, ...editedTask });
  };

  const handleDeleteTask = () => {
    deleteTaskFn({ taskId });
  };

  return (
    <div className='p-4'>
      <div className='mb-4'>
        <label htmlFor='name' className='block'>Name:</label>
        <input
          type='text'
          id='name'
          className='border rounded p-2'
          value={editedTask.name}
          onChange={(e) => setEditedTask({ ...editedTask, name: e.target.value })}
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='description' className='block'>Description:</label>
        <textarea
          id='description'
          className='border rounded p-2'
          value={editedTask.description}
          onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
        ></textarea>
      </div>
      <div className='mb-4'>
        <label htmlFor='type' className='block'>Type:</label>
        <input
          type='text'
          id='type'
          className='border rounded p-2'
          value={editedTask.type}
          onChange={(e) => setEditedTask({ ...editedTask, type: e.target.value })}
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='dueDate' className='block'>Due Date:</label>
        <input
          type='date'
          id='dueDate'
          className='border rounded p-2'
          value={editedTask.dueDate}
          onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
        />
      </div>
      <div className='mb-4'>
        <label htmlFor='label' className='block'>Label:</label>
        <input
          type='text'
          id='label'
          className='border rounded p-2'
          value={editedTask.label}
          onChange={(e) => setEditedTask({ ...editedTask, label: e.target.value })}
        />
      </div>
      <div className='flex gap-4'>
        <button
          onClick={handleUpdateTask}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Update Task
        </button>
        <button
          onClick={handleDeleteTask}
          className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
        >
          Delete Task
        </button>
      </div>
    </div>
  );
}