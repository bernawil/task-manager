import express from 'express';
import auth from '../../core/auth.js';
import createTask from './createTask.js';
import updateTask from './updateTask.js';
import deleteTask from './deleteTask.js';
import getTasks from './getTasks.js';
import getTask from './getTask.js';
const router = express.Router();
router.post('/create-task', auth, createTask);
router.post('/update-task', auth, updateTask);
router.post('/delete-task', auth, deleteTask);
router.post('/get-tasks', auth, getTasks);
router.post('/get-task', auth, getTask);
export default router;
//# sourceMappingURL=index.js.map