const express = require ('express');
const bodyParser = require ('body-parser');
const morgan = require ('morgan');
const uploader = require ('./uploader');
const app = express ();
const upload = uploader.configure (app);

let birds = [
  {
    commonname: 'crow',
    species: 'corvus',
    rarity: 'common',
    location: [25, 56],
    image: 'crow.png',
  },
  {
    commonname: 'sparrow',
    species: 'passer domesticus',
    rarity: 'common',
    location: [25, 56],
    image: 'sparrow.png',
  },
  {
    commonname: 'danfe',
    species: 'Lophophorus impejanus',
    rarity: 'extremely-rare',
    location: [25, 56],
    image: 'danfe.png',
  },
];

app.use (morgan ('tiny'));
app.use (bodyParser.json ());

const port = process.env.PORT || 5000;

app.get ('/api/birds', (req, res) => {
  res.json (birds);
});

app.get ('/api/birds/:id', (request, response) => {
  const id = Number (request.params.id);
  const bird = birds.find (bird => bird.id === id);
  response.json (bird);
});

app.post ('/api/birds', upload.single ('image'), (request, response, next) => {
  const file = request.file;
  console.log ('file :', file);
  const {commonname, species, rarity, location} = request.body;
  if (!file && !commonname) {
    return response.status (400).json ({
      error: 'Bird detail not found. Please make sure image and name exist',
    });
  }

  const image = file.filename;
  const bird = {name: commonname, species, rarity, location, image};
  console.log ('bird :', bird);

  // return db
  //   .insert (bird)
  //   .then (() => db.all ())
  //   .then (birds => {
  //     response.json (birds);
  //   })
  //   .catch (error => {
  //     response.status (400).json ({error: error});
  //   });
  birds = birds.concat (bird);
  response.json (bird);
});

app.delete ('/birds/:id', (request, response) => {
  const id = Number (request.params.id);
  birds = birds.filter (bird => bird.id !== id);

  response.status (204).end ();
});

app.listen (port, error => {
  if (error) {
    throw error;
  }
  console.log (`Listening on port ${port}`);
});
