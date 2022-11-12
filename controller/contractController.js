const { isValidObjectId } = require('mongoose');
var { Contract } = require('../model/contractModel');
const { Employment } = require('../model/employmentModel');
var ObjectId = require('mongodb').ObjectId;

// create new account
exports.creatContract = async (req, res) => {

    let contractInDB = await Contract.findOne({ employmentId: req.body.employmentId })
    if (contractInDB) return res.status(500).json({
        success: false,
        message: 'Contract already exists',
    });
    console.log(req.body.employmentId);
    const contract = new Contract({
        employmentId: req.body.employmentId,
        createAt: req.body.createAt,
        content: req.body.content,
        descriptionWork: req.body.descriptionWork,
        salary: req.body.salary,
        socialInsurance: req.body.socialInsurance,
        bonusProject: req.body.bonusProject,
    });

    return contract
        .save()
        .then((newContract) => {
            return res.status(200).json({
                success: true,
                message: 'New user created successfully',
                Contract: newContract,
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

exports.getListContract = async (req, res) => {
    var list = Contract.find({})

    return list.then((list) => {
        return res.status(200).json({
            success: true,
            message: 'New user created successfully',
            Contracts: list,
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

exports.deleteContract = async (req, res) => {
    console.log(req.body.idContract)
    if (!req.body.idContract)
        return res.status(500).json({
            success: false,
            message: 'Server error. Please try again.',
            error: error.message,
        });
    var removeContract = Contract.findByIdAndRemove(req.body.idContract)
    var removeEmployment = Employment.findByIdAndRemove(req.body.idEmployment)

    return removeContract.then(() => {
        removeEmployment.then(() => {
            return res.status(200).json({
                success: true,
                message: 'Remove contract successfully',
            });
        })
            .catch((error) => {
                console.log(error);
                res.status(500).json({
                    success: false,
                    message: 'Server error. Please try again.',
                    error: error.message,
                })
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

exports.editContract = async (req, res) => {
    var editContract = Contract.findByIdAndUpdate({ _id: req.body.idContract }, req.body.newContract, { new: true })

    return editContract.then(() => {
        return res.status(200).json({
            success: true,
            message: 'Edit contract successfully',
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