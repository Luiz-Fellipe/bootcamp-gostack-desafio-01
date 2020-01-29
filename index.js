const express = require('express');

const server = express();

server.use(express.json());

const projects = [];

server.get('/projects',(req, res) => {
  return res.json(projects);
})

server.post('/projects', (req, res) => {
  const { id, title } = req.body;

  projects.push({
    id,
    title,
    tasks: []
  })
  return res.json(projects);
});


server.put('/projects/:id', (req, res) => {
  
  const { title } = req.body;
  const { id } = req.params;

  const index = projects.findIndex(project => project.id == id);
  projects[index].title = title;
  
  return res.json(projects);
})

server.delete('/projects/:id', (req,res) => {
  const { id } = req.params;

  const index = projects.findIndex(project => project.id == id);
 
  projects.splice(index, 1);
  
  return res.json(projects);
})


server.post('/projects/:id/tasks', (req,res) => {
  const {id} = req.params;
  const {title} = req.body;

  const index = projects.findIndex(project => project.id == id);

  projects[index].tasks.push(title);

  return res.json(projects);
})

server.listen(3000);