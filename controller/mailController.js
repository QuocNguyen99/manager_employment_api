var nodemailer = require('nodemailer');
var fs = require('fs')
var path = require('path');
const { User } = require('../model/userModel');
const { Contract } = require('../model/contractModel');
const { Employment } = require('../model/employmentModel');
const { parse } = require('path');
var filePath = path.join("./", 'TimeKeeping.json');


var sendMail = async (title, subject, content, mailTo, html) => {
    var transporter = nodemailer.createTransport({ // config mail server
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'devnguyen1110@gmail.com', //Tài khoản gmail vừa tạo
            pass: 'rmvuyjqreuthsihc'
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    });

    console.log();
    var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
        from: title,
        to: mailTo,
        subject: subject,
        text: content,//Thường thi mình không dùng cái này thay vào đó mình sử dụng html để dễ edit hơn
        html: html //Nội dung html mình đã tạo trên kia :))
    }

    transporter.sendMail(mainOptions, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log('Message sent: ' + info.response);
        }
    });
}

exports.sendReportTimekeeping = async (req, res) => {
    fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
        if (!err) {
            var employmens = Employment.find({})
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

            employmens.then((listEmployment) => {
                listEmployment.forEach(async (element) => {
                    var data = timeKeepingList.find(item => item.idEmployment == element._id)
                    if (data) {
                        var listTimeKeeping = ""

                        data.dayAtCompnany[data.dayAtCompnany.length - 1].days.forEach(item => {
                            listTimeKeeping += `<span style="color: black">${item}, </span>`
                        })

                        var htmlText = '';
                        htmlText += `
                            <div style="padding: 10px; background-color: #003375">
                                <div style="padding: 10px; background-color: white;">
                                    <h4 style="color: #0085ff">Bảng chấm công</h4>
                                    <h6 style="color: #0085ff">Có chấm công vào những ngày sau</h6>
                                   ${listTimeKeeping}
                                </div>
                            </div>
                        `;
                        sendMail(element.name, element.name, "Bang cham cong", element.email, htmlText)
                    }
                });
                return res.status(200).json({
                    success: true,
                    message: 'Send success',
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
        } else {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: error.message,
            });
        }
    });
}

exports.sendSalary = async (req, res) => {
    fs.readFile(filePath, { encoding: 'utf-8' }, async function (err, data) {
        if (!err) {
            var employmens = await Employment.find({})

            var dataJson = JSON.parse(data)

            employmens.forEach(async (employment) => {
                var dataContract = await Contract.findOne({ employmentId: employment._id })
                if (!dataContract) {
                    return
                }
                var salary = dataContract.salary

                var salaryDay = parseFloat(salary) / 30

                var timeKeepingEmployment = dataJson.find(item => item.idEmployment == employment._id)
                if (!timeKeepingEmployment) {
                    return
                }
                var countTime = timeKeepingEmployment.dayAtCompnany[timeKeepingEmployment.dayAtCompnany.length - 1].days.length

                console.log("dataContract " + countTime);


                var htmlText = '';
                htmlText += `
                    <div style="padding: 10px; background-color: #003375">
                        <div style="padding: 10px; background-color: white;">
                            <h4 style="color: #0085ff">Bảng lương</h4>
                            <h6 style="color: #0085ff">Lương ngày ${parseInt(salaryDay).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })} VND</h6>
                            <h6 style="color: #0085ff">Thưởng dự án ${parseInt(dataContract.bonusProject).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })} VND</h6>
                            <h6 style="color: #0085ff">Tổng ngày nhận lương ${countTime}</h6>
                            <h6 style="color: #0085ff">Tổng lương ${parseInt((countTime * salaryDay) + parseFloat(dataContract.bonusProject)).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })} VND</h6>
                        </div>
                    </div>
                `;

                sendMail(employment.name, "Bảng lương", "Bảng lương chi tiết", employment.email, htmlText)

            })

            return res.status(200).json({
                success: true,
                message: 'Success',
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
