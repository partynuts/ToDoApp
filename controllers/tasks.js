const Tasks = require('../views/tasks');
const TasksModel = require('../models/tasks.db');
const { Router } = require("express");
const controller = Router();

controller.get('/tasks', async (req, res) => {
  const tasks = await TasksModel.findAll();
  res.send(Tasks.index(tasks))
});
controller.post('/tasks', async (req, res) => {
  await TasksModel.create(req.body, {fields: ['title', 'description']});
  res.redirect('/tasks');
});
// controller.post('/tasks/:id/delete', (req, res) => {
//   TasksModel.deleteTask(req.params.id);
//   res.redirect('/tasks');
// });
controller.patch('/tasks/:taskId', async (req, res) => {
  // const task = await TasksModel.find({where: {id: req.params.taskId}})
  // task.state = req.body.state;
  // await task.save();
  // res.json(task.get());

  await TasksModel.update(req.body, {where: {id: req.params.taskId}, fields: ['state']});
  res.sendStatus(204);
});
controller.delete('/tasks/:taskId', async (req, res) => {
  await TasksModel.destroy({where: {id: req.params.taskId}});
  res.sendStatus(204);
});

module.exports = controller;


