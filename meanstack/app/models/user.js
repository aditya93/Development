var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt=require('bcrypt-nodejs');
var titlize = require('mongoose-title-case');
var validate = require('mongoose-validator');


var nameValidator = [
  validate({
  validator: 'matches',
  arguments: /^(([a-zA-Z]{3,20})+[ ]+([a-zA-z]{3,20}))+$/,
  message:'Name must have atleast 3 characters, max 30, no special characters, must have space in between name.'
}),
  validate({
    validator:'isLength',
    arguments:[3,30],
    message:'Name should be between {ARGS[0]} to {ARGS[1]} characters'
  })
];

var emailValidator = [
  validate({
  validator: 'matches',
  message:'Is not a valid Email'
  }),
  validate({
    validator:'isLength',
    arguments:[3,25],
    message:'Email should be between {ARGS[0]} to {ARGS[1]} characters'
  })
];

var usernameValidator = [
  validate({
  validator: 'isAlphanumeric',
  message:'Username must contain letters and numbers only'
  }),
  validate({
    validator:'isLength',
    arguments:[3,25],
    message:'Username should be between {ARGS[0]} to {ARGS[1]} characters'
  })
];

var passwordValidator = [
  validate({
  validator: 'matches',
  arguments: /^(?=.*?[a-z])(?=.*?[A-z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/,
  message:'Password needs to have atleast one lowercase, one uppercase, one number, one special character number, and must atleast 8 characters but no more than 35'
}),
  validate({
    validator:'isLength',
    arguments:[8,35],
    message:'Password should be between {ARGS[0]} to {ARGS[1]} characters'
  })
];


var UserSchema = new Schema({
   name:{type:String, required:true, validate:nameValidator},
   username: {type:String, lowercase:true, required:true, unique:true, validate:usernameValidator},
   password: {type:String, validate:passwordValidator},
   email: {type:String, lowercase:true, required:true, unique:true, validate:emailValidator }
 });


UserSchema.pre('save', function(next) {
  var user=this;
  bcrypt.hash(user.password,null,null,function(err,hash){
  	if(err) return next(err);
  	user.password=hash;
  	next();
  });
});

UserSchema.plugin(titlize, {
  paths: [ 'name' ]
});

UserSchema.methods.comparePassword = function(password){
	return bcrypt.compareSync(password,this.password);
};


module.exports = mongoose.model('User',UserSchema);
