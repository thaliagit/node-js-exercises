// const TODO: string = "start writing your Express API server here :)";

// console.log(TODO);

import express from "express";
import dotenv from "dotenv";
import 'express-async-errors';
import morgan from "morgan";

dotenv.config();

type Planet = {
  id: number;
  name: string;
};

type Planets = Planet[];

let planets: Planets = [
  {
    id: 1,
    name: 'Earth',
  },
  {
    id: 2,
    name: 'Mars',
  },
];

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.get('/planets', (req, res) => {
  res.status(200).json(planets);
});
app.get('/planets/:id', (req, res) => {
  const {id} = req.params
  const planet = planets.find(p => p.id === Number(id))
  res.status(200).json(planet);
});
app.post('/planets', (req, res) => {
  const {id, name} = req.body 
  const newPlanet = {id, name}
  planets = [...planets, newPlanet]
  console.log(planets)
  res.status(201).json({msg: "new planet has been created"})
})
app.put('/planets/:id', (req, res) => {
  const {id} = req.params;
  const {name} = req.body;
  console.log("this is the req body: ", req.body)
  planets = planets.map(p => p.id === Number(id) ? {...p, name} : p)
  console.log(planets)

  res.status(200).json({message: "planet has been updated with app.put"})
})
app.delete('/planets/:id', (req, res) => {
  const {id} = req.params;
  planets = planets.filter(p => p.id !== Number(id))
  console.log(planets)
  res.status(200).json({msg: `plane has been deleted with app.delete`})
})
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
