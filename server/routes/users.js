const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

//register
router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});
// get all users 
router.get("/fetch" , async(req,res)=>{
	User.find({},function(err,users){
		if(err){
			res.send("something wrong");
			next();
		}
		res.json(users);
	})
});

// update user 
router.patch("/:id",async(req,res)=>{
	const newUser = {
		firstName :req.body.firstName,
		lastName: req.body.lastName,
		email:req.body.email
	}
	User.findByIdAndUpdate(req.params.id, {$set: req.body,}).
	then(
		res.status(200).json("Account has been updated")
	).
	catch(err =>{
		res.status(404).json({
			message:err
		})
	})
});
// delete user 
router.delete("/:id", async (req, res) => {
      try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Account has been deleted");
      } catch (err) {
        return res.status(500).json(err);
      }
    
  });

module.exports = router;