var { Contract } = require('../model/contractModel');

// create new account
exports.creatContract = async (req, res) => {

    let contractInDB = await Contract.findOne({ idEmployment: req.body.idEmployment })
    if (contractInDB) return res.status(500).json({
        success: false,
        message: 'Contract already exists',
    });

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