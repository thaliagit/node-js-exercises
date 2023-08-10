import express from "express";
import dotenv from "dotenv";
import 'express-async-errors';
import morgan from "morgan";
import Joi from "joi";
import {getAll, getOneById, create, updateById, deleteById, createImage} from "./controllers/planets.js"
import {logIn, signUp} from "./controllers/users.js"
import multer from "multer";
dotenv.config();
const storage = multer.diskStorage({
  destination: (req,file,cb) => {
    cb(null, "./uploads")
  },
  filename: (req,file, cb) => {
    cb(null, file.originalname);
  }
})
const upload = multer({storage})
const app = express();

app.use(express.json());
app.use(morgan('dev'));

const planetSchema = Joi.object({
  name: Joi.string().required()
});

const validatePlanet = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { error } = planetSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};


app.get('/planets', getAll);
app.get('/planets/:id', getOneById);
app.post('/planets', validatePlanet, create)
app.put('/planets/:id', validatePlanet, updateById)
app.delete('/planets/:id', deleteById)
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});
app.post("/planets/:id/image",upload.single("image"), createImage)
app.post("/users/login", logIn);
app.post("/users/signup", signUp);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
