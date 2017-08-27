var User = require('../models/user');

module.exports = function(router){

	//USER REGISETRATION ROUTE
	//http://localhost:8080/api/users
router.post('/users',function(req,res){
	var user = new User();
	user.username = req.body.username;
	user.password = req.body.password;
	user.email = req.body.email;
	if(req.body.username==null||req.body.username==""||req.body.password==null||req.body.password==""||req.body.email==null||req.body.email==""){
		res.json({success:false,message:'Ensure username, email and password were provided'});
	}else{
		user.save(function(err){
		if(err){
			res.json({ success:false,message:"Username or Email already exits."});
		}
		else{
			res.json({ success:true,message:"User Created!!"});
		}
	});
	}	
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
				res.json({success:true,message:"USER Authenticated!"});
			}
			} else {
				res.json({success:false,message:"Please enter the Password "+req.body.username});
			}
			
			
		}
	});
});
		return router;
}
