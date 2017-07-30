let mongoose = require('mongoose');
let Appointment = mongoose.model('Appointment');
let User = mongoose.model('User');

module.exports = {
  index: function(req, res){
    Appointment.find({}).
    populate('user').exec((err, appointments) => {
      if(err){return res.json(err)}
      return res.json(appointments);
    })
  },
  create: function(req, res){
    Appointment.create(req.body, (err, appointment) => {
      if(err){return res.json(err)}
      User.findByIdAndUpdate(req.body.user, {$push:{appointments: appointment._id} }, {new: true,}, (err, user) => {
        if(err){return res.json(err)}
        return res.json(appointment);
      })
    })
  },
  delete: function(req, res){
    Appointment.findByIdAndRemove(req.params.id, (err, appointment) => {
      if(err){return res.json(err)}
      return res.json(appointment);
    })
  }
}