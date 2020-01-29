const express = require('express');

const server = express();

server.use(express.json());

const projects = [];
let qtdReqs = 0;

//Middleware global
server.use((req,res, next) =>{
  qtdReqs++;
  console.log(`Foram feitas ${qtdReqs} requisições.`);
  next();
})

//Middleware para verificar se o projeto existe
function checkProjectExists(req, res, next){
  const { id } = req.params;

  const index = projects.findIndex(project => project.id == id);

  if(index === -1){
    return res.status(400).json({error: 'The project does not exist.'})
  }

  req.index = index;
  
  next();
}

//ROTAS
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

  return res.status(201).json(projects);
});

server.put('/projects/:id',checkProjectExists,  (req, res) => {
  const { title } = req.body;

  projects[req.index].title = title;
  
  return res.json(projects);
})

server.delete('/projects/:id',checkProjectExists,(req,res) => {
  projects.splice(req.index, 1);
  
  return res.json(projects);
})

server.post('/projects/:id/tasks',checkProjectExists, (req,res) => {
  const {title} = req.body;

  projects[req.index].tasks.push(title);

  return res.json(projects);
})

server.listen(3000);