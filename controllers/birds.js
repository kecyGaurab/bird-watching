const birdsRouter = require ('express').Router ();
const Bird = require ('../models/bird.js');

birdsRouter.get ('/', async (request, response) => {
  const birds = await bird.find ({});
  response.json (birds.map (bird => bird.toJSON ()));
});

birdsRouter.post ('/', async (request, response, next) => {
  const body = request.body;

  bird.save ().then (result => {
    response.status (201).json (result);
  });
  const bird = new Bird ({
    commonname: body.commonname,
    species: body.species,
    rarity: body.rarity,
    location: body.location,
    image: body.image,
  });
  if (!body.commonname || !body.image) {
    response.status (400).send ('Bad Request').end ();
  }
  try {
    const savedBird = await bird.save ();
    response.json (savedBird.toJSON ());
  } catch (exception) {
    next (exception);
  }
});

birdsRouter.get ('/:id', async (request, response, next) => {
  try {
    const bird = await Bird.findById (request.params.id);
    if (bird) {
      response.json (bird.toJSON ());
    } else {
      response.status (404).end ();
    }
  } catch (exception) {
    next (exception);
  }
});

birdsRouter.delete ('/:id', async (request, response, next) => {
  const bird = await Bird.findById (request.params.id);

  try {
    await Bird.findByIdAndRemove (request.params.id);
    response.status (204).end ();
  } catch (exception) {
    next (exception);
  }
});

module.exports = birdsRouter;
