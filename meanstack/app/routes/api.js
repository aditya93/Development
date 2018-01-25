var User = require('../models/user');
var jwt = require('jsonwebtoken');
var secret ="Secret";
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');


module.exports = function(router){

	var options = {
		auth: {
			api_user: 'adityajaju93',
			api_key: 'Aditya123$'
		}
	}
	var client = nodemailer.createTransport(sgTransport(options));

	//USER REGISETRATION ROUTE
	//http://localhost:8080/api/users
	router.post('/users',function(req,res){
		var user = new User();
		user.username = req.body.username;
		user.password = req.body.password;
		user.email = req.body.email;
		user.name = req.body.name;
		user.temporary = jwt.sign({username:user.username,email:user.email}, secret, {expiresIn:'2h'});
		if(req.body.username==null||req.body.username==""||req.body.password==null||req.body.password==""||req.body.email==null||req.body.email==""||req.body.name==null||req.body.name==""){
			res.json({success:false,message:'Ensure username, email and password were provided'});
		}else{
			user.save(function(err){
				if(err){
					if(err.errors!=null){
						if(err.errors.name){
							res.json({ success:false,message:err.errors.name.message});
						}else if(err.errors.email){
							res.json({success:false,message:err.errors.email.message});
						}else if(err.errors.username){
							res.json({success:false,message:err.errors.username.message});
						}else if(err.errors.password){
							res.json({success:false,message:err.errors.password.message});
						}else {
							res.json({success:false,message:err});
						}
					}else if(err){
						if(err.code==11000){
							if(err.errmsg[50]=="u"){
								res.json({success:false,message:"Username already exits try something different."});
							}else if(err.errmsg[50]=="e"){
								res.json({success:false,message:"Email already exists try something different"});
							}
						}else{
							res.json({success:false,message:err});
						}
					}
				}
				else{

					var email = {
						from: 'Localhost Staff, Staff',
						to: user.email,
						subject: 'Localhost Activation Link',
						text: 'Hello '+user.name+',Thankyou for registering.Click on link for activation:'+user.temporarytoken+'http://localhost:8080/activate/',
						html: 'Hello '+user.name+',<br>Thankyou for registering.<br> Click on link for activation:<br><br><a href="http://localhost:8080/activate/"'+user.temporarytoken+'>http://localhost:8080/activate/</a>'
					};

					client.sendMail(email, function(err, info){
						if (err ){
							console.log(err);
						}
						else {
							console.log('Message sent: ' + info.response);
						}
					});

					res.json({ success:true,message:"Account registered. Please check your email for activation link."});
				}
			});
}	
});


router.post('/checkusername',function(req,res){
	User.findOne({username:req.body.username}).select("username").exec(function(err,user)
	{
		if(err) throw err;

		if(user){
			res.json({success:false, message:"The username is already taken"});
		}else{
			res.json({success:true, message:"Valid user"});
		}
	});
});

router.post('/checkemail',function(req,res){
	User.findOne({email:req.body.email}).select("email").exec(function(err,user)
	{
		if(err) throw err;

		if(user){
			res.json({success:false, message:"The email is already taken"});
		}else{ 
			res.json({success:true, message:"Valid email"});
		}
	});
});

	//USER LOGIN ROUTE
	//http://localhost:8080/api/authenticate
	router.post('/authenticate',function(req,res){
		User.findOne({username:req.body.username}).select("email username password").exec(function(err,user)
		{
			if(err) throw err;

			if(!user)
			{
				res.json({success:false, message:"Could not authenticate user!"});
			}else if (user)
			{
				if(req.body.password)
				{
					var validPassword=user.comparePassword(req.body.password);
					if(!validPassword){
						res.json({success:false,message:"Please enter a valid Password"});
					}else {
						var token=jwt.sign({username:user.username,email:user.email}, secret, {expiresIn:'2h'});
						res.json({success:true,message:"USER Authenticated!", token:token});
					}
				} else {
					res.json({success:false,message:"Please enter the Password "+req.body.username});
				}


			}
		});
	});

	router.put('/activate/:token',function(req,res){
		User.findOne({temporarytoken:req.params.token},function(err,user){
			var token = req.params.token;

			jwt.verify(token,secret,function(err,decoded){
				if(err)
				{
					res.json({success:false, message:"Token invalid"});
				}else if(!user){
					//activation link created multiple times
					res.json({success:false, message:"Token invalid"});
				}else{

				}
			});
		})
	})

	router.use(function(req,res,next){
		var token = req.body.token || req.body.query ||req.headers['x-access-token'];
		if(token){
			//verify then
			jwt.verify(token,secret,function(err,decoded){
				if(err)
				{
					res.json({success:false, message:"Token invalid"});
				}else{
					req.decoded=decoded;
					next();
				}
			});
		}else{
			res.json({success:false,message:"No token provided"});
		}
	})
	router.post('/me',function(req,res){
		res.send(req.decoded);
	})
	return router;
}
