var { User } = require('../model/userModel');

// create new account
exports.creatUser = async (req, res) => {

    let userInDB = await User.findOne({ username: req.body.username })
    if (userInDB) return res.status(500).json({
        success: false,
        message: 'User already exists',
    });

    const user = new User({
        username: req.body.username,
        password: req.body.password,
        mail: req.body.mail,
        idEmployment: req.body.idEmployment,
        roleAdmin: req.body.roleAdmin
    });


    return user
        .save()
        .then((newUser) => {
            return res.status(200).json({
                success: true,
                message: 'New user created successfully',
                User: newUser,
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: error.message,
            });
        });
}

exports.login = async (req, res) => {

    let userInDB = await User.findOne({ username: req.body.username })
    if (!userInDB) return res.status(500).json({
        success: false,
        message: 'User is not exits',
    });

    const result = userInDB.password == req.body.password
    if (!result) {
        return res.status(500).json({
            success: false,
            message: 'Wrong password',

        });
    }
    return res.status(200).json({
        success: true,
        message: 'Success',
        isAdmin: userInDB.roleAdmin,
        username: userInDB.username,
        idEmployment: userInDB.idEmployment
    });

}
