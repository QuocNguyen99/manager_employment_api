var nodemailer = require('nodemailer');
var fs = require('fs')
var path = require('path');
const { User } = require('../model/userModel');
const { Contract } = require('../model/contractModel');
var filePath = path.join("./", 'TimeKeeping.json');


var sendMail = async (title, subject, content, mailTo) => {
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

    var content = '';
    content += `
        <div style="padding: 10px; background-color: #003375">
            <div style="padding: 10px; background-color: white;">
                <h4 style="color: #0085ff">Nguyên Nodejs test send mail</h4>
                <span style="color: black">Đây là mail test</span>
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
            var list = Contract.find({})

            list.then((list) => {
                list.forEach(element => {
                    var user = User.findById(element.employmentId)
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
            console.log("NOT OK")
            return JSON.parse([])
        }
    });

}