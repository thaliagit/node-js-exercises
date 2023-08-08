let planets = [
    {
        id: 1,
        name: 'Earth',
    },
    {
        id: 2,
        name: 'Mars',
    },
];
//creating controllers, getting the functions we used 
//during the requests
const getAll = (req, res) => {
    res.status(200).json(planets);
};
const getOneById = (req, res) => {
    const { id } = req.params;
    const planet = planets.find(p => p.id === Number(id));
    res.status(200).json(planet);
};
const create = (req, res) => {
    const { id, name } = req.body;
    const newPlanet = { id, name };
    planets = [...planets, newPlanet];
    console.log(planets);
    res.status(201).json({ msg: "new planet has been created" });
};
const updateById = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    console.log("this is the req body: ", req.body);
    planets = planets.map(p => p.id === Number(id) ? Object.assign(Object.assign({}, p), { name }) : p);
    console.log(planets);
    res.status(200).json({ message: "planet has been updated with app.put" });
};
const deleteById = (req, res) => {
    const { id } = req.params;
    planets = planets.filter(p => p.id !== Number(id));
    console.log(planets);
    res.status(200).json({ msg: `plane has been deleted with app.delete` });
};
export { getAll, getOneById, create, updateById, deleteById };
