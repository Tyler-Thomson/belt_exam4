let mongoose = require('mongoose');
let User = mongoose.model('User');

module.exports = {
  create: function(req, res){
    User.findOne({name: req.body.name}, (err, user) => {
      if(err){return res.json(err)}
      else if(!user){
        User.create(req.body, (err, user) => {
          if(err){return res.json(err)}
          req.session.user_id = user._id; //Save user into session
          return res.json(user);
        })
      }else{
        req.session.user_id = user._id; //Save user into session
        return res.json(user);
      }
    })
  }
}