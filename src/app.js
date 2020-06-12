const express = require("express");
const cors = require("cors");

 const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs} = request.body;
  const repository = {
    id : uuid(), title, url, techs, likes : 0
  };
  repositories.push(repository);
return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {title, url, techs} = request.body;
    const find = repositories.findIndex( find => find.id == id);

    if (find === -1){
      return response.status(400).json('Repository not found');
    }

      const editRepository = {
        title, url, techs
      };
        repositories[find] = editRepository;
      return response.json(editRepository);

});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const find = repositories.findIndex(find => find.id === id );

    if(find === -1){
      return response.status(400).json('This repository not found');
    }

  repositories.splice(find, 1);
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;
  const find = repositories.findIndex(find => find.id === id);

  if(find === -1){
    return response.json('This repository is not found');
  }
    const likes = repositories[find].likes += 1;

  return response.json({likes});
});

module.exports = app;
