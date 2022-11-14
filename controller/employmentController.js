var { Employment } = require('../model/employmentModel');
var { Contract } = require('../model/contractModel');
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

exports.updateEmployment = (req, res) => {
    var editEmployment = Employment.findByIdAndUpdate({ _id: req.body.idEmployment }, req.body.newEmployment, { new: true })

    return editEmployment.then(() => {
        return res.status(200).json({
            success: true,
            message: 'Edit employment successfully',
        });
    })
        .catch((error) => {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: error.message,
            });
        });
}

exports.deleteEmployment = (req, res) => {
    if (!req.body.idEmployment)
        return res.status(500).json({
            success: false,
            message: 'Server error. Please try again.',
            error: error.message,
        });

    var removeEmployment = Employment.findByIdAndRemove(req.body.idEmployment)

    return removeEmployment.then(() => {
        return res.status(200).json({
            success: true,
            message: 'Remove employment successfully',
        });
    }).catch((error) => {
        return res.status(500).json({
            success: false,
            message: 'Server error. Please try again.',
            error: error.message,
        });
    })
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

        if (timeKeepingList) {
            return res.status(200).json({
                success: true,
                message: "get success",
                list: timeKeepingList
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

exports.getSalary = async (req, res) => {
    fs.readFile(filePath, { encoding: 'utf-8' }, async function (err, data) {
        if (!err) {

            var dataJson = JSON.parse(data)

            var dataContract = await Contract.findOne({ employmentId: req.body._id })
            if (!dataContract) {
                return
            }
            var salary = dataContract.salary

            var salaryDay = parseFloat(salary) / 30

            var timeKeepingEmployment = dataJson.find(item => item.idEmployment == req.body._id)
            if (!timeKeepingEmployment) {
                return
            }

            var list = []
            timeKeepingEmployment.dayAtCompnany.forEach((element, index) => {
                var countTime = timeKeepingEmployment.dayAtCompnany[index].days.length
                list.push({
                    "month": element.month,
                    "totalSalary": parseInt((countTime * salaryDay) + parseFloat(dataContract.bonusProject) - parseFloat(dataContract.socialInsurance)).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
                })
            });

            return res.status(200).json({
                success: true,
                message: 'Success',
                data: list
            });

        } else {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: error.message,
            });
        }
    })
}
