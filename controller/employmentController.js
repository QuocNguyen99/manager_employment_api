var { Employment } = require('../model/employmentModel');
var fs = require('fs')
var path = require('path');
var filePath = path.join("./", 'TimeKeeping.json');

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

exports.getAllListEmployment = (req, res) => {
    var list = Employment.find({})
    return list
        .then((newEmployment) => {
            return res.status(200).json({
                success: true,
                message: 'Get success',
                employment: newEmployment,
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

exports.getEmploymentTimeKeeping = (req, res) => {
    fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
        console.log("asdasdsada");

        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: err.message,
            });
        }

        var timeKeepingList = [];
        var dataJson = JSON.parse(data)
        for (var i = 0; i < dataJson.length; i++) {
            timeKeepingList.push({
                "idEmployment": dataJson[i].idEmployment,
                "dayAtCompnany": dataJson[i].dayAtCompnany.map((e) => ({
                    "month": e.month,
                    "days": e.days
                }))
            })
        }

        var data = timeKeepingList.find(item => item.idEmployment == req.body._id)
        if (data) {
            return res.status(200).json({
                success: true,
                message: data,
            })
        } else {
            return res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: "Can not find data",
            });
        }
    })
}
