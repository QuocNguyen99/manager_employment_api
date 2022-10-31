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

exports.searchContract = async (req, res) => {
    let { _id, } = req.body;
    let query = {};
    if (customer_id != null) query.customer_id = customer_id;
    if (customer_name != null) query.customer_name = customer_name;
    if (customer_email != null) query.customer_email = customer_email;
    if (no_of_items_purchased != null) query.no_of_items_purchased = no_of_items_purchased;
    let result = await Customer.find(query);
}