import HttpError from '../core/HttpError.js';
import { isTomorrow, isWithinInterval, addDays, endOfDay } from 'date-fns';
function isWithinThreeDays(date) {
    const today = new Date();
    const threeDaysLater = endOfDay(addDays(today, 3));
    return isWithinInterval(date, { start: today, end: threeDaysLater });
}
function isWithinAWeek(date) {
    const today = new Date();
    const oneWeekLater = endOfDay(addDays(today, 7));
    return isWithinInterval(date, { start: today, end: oneWeekLater });
}
function isWithinFiveDays(date) {
    const today = new Date();
    const fiveDaysLater = endOfDay(addDays(today, 5));
    return isWithinInterval(date, { start: today, end: fiveDaysLater });
}
function isWithinAMonth(date) {
    const today = new Date();
    const oneMonthLater = endOfDay(addDays(today, 30));
    return isWithinInterval(date, { start: today, end: oneMonthLater });
}
function isMoreThanAWeek(date) {
    const today = new Date();
    const oneWeekLater = endOfDay(addDays(today, 7));
    return date > oneWeekLater;
}
export const createTask = async (args, context) => {
    if (!context.user) {
        throw new HttpError(401);
    }
    const { name, description, type } = args;
    const dueDate = new Date(args.dueDate);
    let label;
    const _type = type.toLowerCase();
    if (_type === 'work' && isTomorrow(dueDate)) {
        label = 'Urgent';
    }
    else if (_type === 'health' && isWithinThreeDays(dueDate) && !description.toLowerCase().includes('treatment')) {
        label = 'Urgent';
    }
    else if (_type === 'personal' && isWithinAWeek(dueDate)) {
        label = 'Can be postponed';
    }
    else if (_type === 'other' && isWithinFiveDays(dueDate)) {
        label = 'Can be postponed';
    }
    else if ((_type === 'work' && (name.includes('PLO') || name.includes('GJL'))) && isWithinAMonth(dueDate)) {
        label = 'Can be postponed';
    }
    else if (isMoreThanAWeek(dueDate) || (_type === 'other' && !dueDate)) {
        label = 'Not important';
    }
    else {
        label = 'No label';
    }
    return context.entities.Task.create({
        data: {
            name,
            description,
            type,
            dueDate,
            label,
            user: { connect: { id: context.user.id } }
        }
    });
};
export const updateTask = async (args, context) => {
    if (!context.user) {
        throw new HttpError(401);
    }
    ;
    const task = await context.entities.Task.findUnique({
        where: { id: args.taskId }
    });
    if (task.userId !== context.user.id) {
        throw new HttpError(403);
    }
    ;
    const updatedTask = await context.entities.Task.update({
        where: { id: args.taskId },
        data: {
            name: args.name,
            description: args.description,
            type: args.type,
            dueDate: args.dueDate,
            label: args.label
        }
    });
    return updatedTask;
};
export const deleteTask = async ({ taskId }, context) => {
    if (!context.user) {
        throw new HttpError(401);
    }
    ;
    const task = await context.entities.Task.findUnique({
        where: { id: taskId }
    });
    if (task.userId !== context.user.id) {
        throw new HttpError(403);
    }
    ;
    await context.entities.Task.delete({
        where: { id: taskId }
    });
    return true;
};
//# sourceMappingURL=actions.js.map