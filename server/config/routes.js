let path = require('path');
let Users = require('../controllers/users');
let Appointments = require('../controllers/appointments');

module.exports = function(app){
  app.post('/users', Users.create);

  app.get('/appointments', Appointments.index);
  app.post('/appointments', Appointments.create);
  app.delete('/appointments/:id', Appointments.delete);

  app.all('*', (req, res, next) => {
      res.sendFile(path.resolve('./public/dist/index.html'));
    });
};