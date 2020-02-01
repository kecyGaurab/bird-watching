const express = require ('express');
const bodyParser = require ('body-parser');

let birds = [
  {
    id: 1,
    name: 'sparrow',
    species: 'sparus sparus',
    rarity: 'common',
    location: [60.5, 45],
  },
  {
    id: 2,
    name: 'crow',
    species: 'korus kor',
    rarity: 'rare',
    location: [60.5, 45],
  },
  {
    id: 3,
    name: 'eagle',
    species: 'niggle giggle',
    rarity: 'rare',
    location: [60.5, 45],
  },
  {
    id: 4,
    name: 'hawk',
    species: 'hawky giggle',
    rarity: 'rare',
    location: [60.5, 45],
  },
];

const app = express ();
app.use (bodyParser.json ());
const port = process.env.PORT || 5000;

app.get ('/api/birds', (req, res) => {
  res.json (birds);
});

app.get ('/api/birds/:id', (request, response) => {
  const rid = Number (request.params.id);
  const bird = birds.find (bird => bird.id === rid);
  response.json (bird);
});

const generateId = () => {
  const maxId = birds.length > 0 ? Math.max (...birds.map (n => n.id)) : 0;
  return maxId + 1;
};

app.post ('/api/birds', (request, response) => {
  const body = request.body;
  console.log ('body :', body);
  console.dir ('body :', body.image);
  if (!body.commonname) {
    return response.status (400).json ({
      error: 'content missing',
    });
  }

  const bird = {
    name: body.name,
    species: body.species,
    date: new Date (),
    id: generateId (),
    rarity: body.rarity,
    location: body.location,
  };

  birds = birds.concat (bird);

  response.json (bird);
});

app.delete ('/birds/:id', (request, response) => {
  const id = Number (request.params.id);
  birds = birds.filter (bird => bird.id !== id);

  response.status (204).end ();
});

app.listen (port, () => console.log (`Listening on port ${port}`));
