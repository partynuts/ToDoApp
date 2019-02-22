const uuid = require("uuid/v4");

let tasks = [];

const TaskModel = module.exports = {
    find: (id) => tasks.find(task => task.id === id),
    findAll: () => tasks,
    saveTask: (title, description) => tasks.push({
        title,
        description,
        id: uuid(),
        state: 'open'
    }),
    deleteTask: (id) => tasks = tasks.filter(task => task.id !== id),
    updateTask: (taskId, data) => {
        console.log(data);
        tasks = tasks.map(task => task.id === taskId ? {...task, ...data} : task);
        return TaskModel.find(taskId);
    }
};