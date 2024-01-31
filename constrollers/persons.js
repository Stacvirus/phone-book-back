const personsRouter = require('express').Router();
const Person = require('../models/person');
const { info } = require('../utils/logger');

// infos route
personsRouter.get('/info', (req, res) => {
  res.send(`<h2>there are ${Person.length} contacts in the phone book </h2> <br> <p> ${new Date()} </p>`);
});

// persons route
personsRouter.get('/', async (req, res) => {
  const per = await Person.find({});
  res.json(per);
  info('fetching data complete sucessfully');
});

// access a specific element
personsRouter.get('/:id', async (req, res, next) => {
  try {
    const per = await Person.findById(req.params.id)
    if (per) res.json(per)
    else { res.status(404).end() };
    info('fetching single data complete sucessfully')
  } catch (error) {
    next(error)
  }
});

// delete a specefic element
personsRouter.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    await Person.findByIdAndDelete(id)
    res.status(204).end();
    info('deleting data complete sucessfully');
  } catch (error) {
    next(error)
  }
});

// posting data
personsRouter.post('/', async (req, res, next) => {
  const input = req.body;
  const person = new Person({
    name: input.name,
    number: input.number,
  });

  const savePer = await person.save()
  try {
    res.json(savePer);
    info('posting data complete sucessfully');
  } catch (error) {
    next(error)
  }
});

// updating data info in DB
personsRouter.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const per = {
    name: req.body.name,
    number: req.body.number,
  };
  try {
    const result = await Person.findByIdAndUpdate(
      id,
      per,
      { new: true, runValidators: true, context: 'query' },
    );
    res.json(result);
    info('update data complete sucessfully');
  } catch (error) {
    next(error)
  }

});

module.exports = personsRouter;
