import { Request, Response } from "express";
import pgPromise from "pg-promise"

const db = pgPromise()("postgres://postgres:postgres@localhost:5432/postgres")

const setupDb = async () => {
  await db.none(`
  DROP TABLE IF EXISTS planets;

  CREATE TABLE planets(
    id SERIAL NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    image TEXT
  );
  `)

  await db.none(`INSERT INTO planets (name) VALUES ('Earth')`);
  await db.none(`INSERT INTO planets (name) VALUES ('Mars')`);
  await db.none(`INSERT INTO planets (name) VALUES ('Venus')`);
  
}
setupDb();



//creating controllers, getting the functions we used 
//during the requests
const getAll = async (req: Request, res: Response) => {
  const planets = await db.many(`SELECT * FROM planets;`);
  res.status(200).json(planets);
}
const getOneById = async (req: Request, res: Response) => {
  const {id} = req.params
  const planet = await db.oneOrNone(`SELECT * FROM planets WHERE id=$1;`, Number(id));
  res.status(200).json(planet);
}
const create = (req: Request, res: Response) => {
  const {name} = req.body 
  const newPlanet = {name}
  db.none(`INSERT INTO planets (name) VALUES ($1)`, name)
  res.status(201).json({msg: "new planet has been created"})
}
const updateById = async (req: Request, res: Response) => {
  const {id} = req.params;
  const {name} = req.body;
  await db.none(`UPDATE planets SET name=$2 WHERE id=$1`, [id, name])
  console.log("this is the req body: ", req.body)

  res.status(200).json({message: "planet has been updated with app.put"})
}
const deleteById= async (req: Request, res: Response) => {
  const {id} = req.params;
  await db.none(`DELETE FROM planets WHERE id=$1`, Number(id))
  res.status(200).json({msg: `plane has been deleted with app.delete`})
}
const createImage = async (req: Request, res: Response)=>{
  console.log(req.file)
  const {id} = req.params;
  const fileName = req.file?.path;

  if (fileName){
    db.none('UPDATE planets SET image=$2 WHERE id=$1', [id, fileName])
    res.status(201).json({msg: "Planet image uploaded"})
  }else {
    res.status(400).json({msg: "Failed upload"})
  }

}


export {getAll, getOneById, create, updateById, deleteById, createImage};
