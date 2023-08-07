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
  res.json(planets);
});

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
