const birdsRouter = require ('express').Router ();
const Bird = require ('../models/bird');

birdsRouter.get ('/', (request, response) => {
  Bird.find ({}).then (birds => {
    response.json (birds);
  });
});

birdsRouter.post ('/', (request, response) => {
  const bird = new Bird (request.body);

  bird.save ().then (result => {
    response.status (201).json (result);
  });
});

module.exports = birdsRouter;
