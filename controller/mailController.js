var nodemailer = require('nodemailer');

exports.sendMail = async (req, res) => {
    console.log("Test");
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
        from: 'NQH-Test nodemailer',
        to: "huynhquocnguyen11@gmail.com",
        subject: 'Test Nodemailer',
        text: 'Your text is here',//Thường thi mình không dùng cái này thay vào đó mình sử dụng html để dễ edit hơn
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