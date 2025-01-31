const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();

// ตั้งค่าให้ใช้ body-parser เพื่อดึงข้อมูลจากฟอร์ม
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ตั้งค่า Nodemailer (กรุณากรอกข้อมูล SMTP ของคุณ)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',  // กรอกอีเมลของคุณที่นี่
        pass: 'your-email-password'    // กรอกรหัสผ่านของคุณที่นี่
    }
});

// ตั้งค่า route สำหรับรับฟอร์ม
app.post('/send-report', (req, res) => {
    const { postTitle, postDescription, animalType, reportedReason, contactMethod } = req.body;

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'thaitanapooh@gmail.com',  // กรอกอีเมลของผู้รับที่ต้องการ
        subject: 'รายงานโพสต์ใหม่',
        text: `
        หัวข้อโพสต์: ${postTitle}
        รายละเอียดโพสต์: ${postDescription}
        ประเภทของสัตว์: ${animalType}
        เหตุผลการรายงาน: ${reportedReason}
        วิธีติดต่อ Admin: ${contactMethod}
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Error sending email');
        }
        res.status(200).send('รายงานถูกส่งเรียบร้อย');
    });
});

// เริ่มเซิร์ฟเวอร์
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
