var { Employment } = require('../model/employmentModel');

// create new employment
exports.createEmployment = (req, res) => {
    const employment = new Employment({
        name: req.body.name,
        birthday: req.body.birthday,
        sex: req.body.sex,
        email: req.body.email,
        phone: req.body.phone,
        joinDate: req.body.joinDate,
        roleEmployment: req.body.roleEmployment,
    });

    return employment
        .save()
        .then((newEmployment) => {
            return res.status(200).json({
                success: true,
                message: 'New user created successfully',
                Employment: newEmployment,
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
