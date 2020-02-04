const app = require ('./app'); // the actual Express app
const config = require ('./utils/config');

const server = http.createServer (app);

let birds = [
  {
    id: 1,
    commonname: 'crow',
    species: 'corvus',
    rarity: 'common',
    location: [25, 56],
    image: 'crow.png',
    date: '2020-01-03T19:22:17.740Z',
  },
  {
    id: 2,
    commonname: 'sparrow',
    species: 'passer domesticus',
    rarity: 'common',
    location: [25, 56],
    image: 'crow.png',
    date: '2010-02-01T19:35:17.740Z',
  },
  {
    id: 3,
    commonname: 'danfe',
    species: 'Lophophorus impejanus',
    rarity: 'extremely-rare',
    location: [25, 56],
    image: 'crow.png',
    date: '2020-02-01T19:35:17.740Z',
  },
];

const generateId = () => {
  return Math.floor (Math.random () * 100000) + 1;
};

app.use (morgan ('tiny'));
app.use (bodyParser.json ());

const port = process.env.PORT || 5000;

// app.get ('/api/birds', (req, res) => {
//   res.json (birds);
// });

app.get ('/api/birds', (req, res) => {
  db
    .all ()
    .then (result => {
      res.json (result);
    })
    .catch (error => {
      res.status (400).json ({
        error: error,
      });
    });
});

app.get ('/api/birds/:id', (request, response) => {
  const id = Number (request.params.id);
  const bird = birds.find (bird => bird.id === id);
  response.json (bird);
});

app.post ('/api/birds', upload.single ('image'), (request, response, next) => {
  const file = request.file;
  const {commonname, species, rarity, location} = request.body;
  if (!file || !commonname) {
    return response.status (400).json ({
      error: 'Bird detail not found. Please make sure image and name exist',
    });
  }
  const image = file.filename;
  const bird = {commonname, species, rarity, location, image};

  return db
    .insert (bird)
    .then (() => db.all ())
    .then (birds => {
      response.json (birds);
    })
    .catch (error => {
      response.status (400).json ({error: error});
    });
});

//   const image = file.filename;
//   // const bird = {
//   //   id: generateId (),
//   //   commonname,
//   //   species,
//   //   rarity,
//   //   location,
//   //   image,
//   //   date: new Date (),
//   // };
//   // console.log ('bird :', bird);
//   // birds = birds.concat (bird);
//   // response.json (bird);
// });

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

server.listen (config.PORT, () => {
  console.log (`Server running on port ${config.PORT}`);
});
