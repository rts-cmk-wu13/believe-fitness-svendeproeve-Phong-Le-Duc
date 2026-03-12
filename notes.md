cant find user age...
kun admin login ingen træner


added in the backend controllers/user.controller.js

async function createSingleUser(req, res, next) {
	try {
		let user = await User.create({
			username: req.fields.username,
            <!-- here to make it accept userFirstName to set it to the same value as username in the registeruser.js so name can be displayed on the profile route -->
			userFirstName: req.fields.userFirstName, // here to make it ac
			password: hashSync(req.fields.password, 15),
			role: "default"
		});
		res.json(user);
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
}