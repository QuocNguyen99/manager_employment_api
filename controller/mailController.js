var nodemailer = require('nodemailer');
var fs = require('fs')
var path = require('path');
const { User } = require('../model/userModel');
const { Contract } = require('../model/contractModel');
const { Employment } = require('../model/employmentModel');
var filePath = path.join("./", 'TimeKeeping.json');


var sendMail = async (title, subject, content, mailTo, data) => {
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

    var listTimeKeeping = ""

    data.dayAtCompnany[data.dayAtCompnany.length - 1].days.forEach(item => {
        listTimeKeeping += `<span style="color: black">${item}, </span>`
    })

    var content = '';
    content += `
        <div style="padding: 10px; background-color: #003375">
            <div style="padding: 10px; background-color: white;">
                <h4 style="color: #0085ff">Bảng chấm công</h4>
                <h6 style="color: #0085ff">Có chấm công vào những ngày sau</h6>
               ${listTimeKeeping}
            </div>
        </div>
    `;


    var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
        from: title,
        to: mailTo,
        subject: subject,
        text: content,//Thường thi mình không dùng cái này thay vào đó mình sử dụng html để dễ edit hơn
        html: content //Nội dung html mình đã tạo trên kia :))
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
                        sendMail(element.name, element.name + "123123", "Bang cham cong", req.body.mailTest, data)
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
