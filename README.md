README
1. การเตรียมฐานข้อมูลก่อนสร้างโปรเจค
ก่อนเริ่มต้นใช้งานโปรเจคเว็บซื้อขายสัตว์เลี้ยง คุณต้องเตรียมฐานข้อมูล MySQL ตามขั้นตอนดังนี้:

ติดตั้ง MySQL Server (หากยังไม่มี)

ดาวน์โหลดและติดตั้ง MySQL จาก MySQL Official Website
ตั้งค่ารหัสผ่าน root และจดบันทึกไว้
สร้างฐานข้อมูลใหม่

เปิด MySQL Command Line หรือใช้ MySQL Workbench
รันคำสั่งต่อไปนี้เพื่อสร้างฐานข้อมูล: sql CREATE DATABASE petshop_db;
สร้างผู้ใช้ใหม่ (ถ้าต้องการ)

สร้างบัญชีผู้ใช้ที่มีสิทธิ์เข้าถึงฐานข้อมูลนี้โดยเฉพาะ: sql CREATE USER 'petshop_user'@'localhost' IDENTIFIED BY 'password123'; GRANT ALL PRIVILEGES ON petshop_db.* TO 'petshop_user'@'localhost'; FLUSH PRIVILEGES;

2. การตั้งค่าฐานข้อมูลในโปรเจค
หลังจากสร้างฐานข้อมูลแล้ว ให้กำหนดค่าการเชื่อมต่อในไฟล์ .env หรือไฟล์คอนฟิกของโปรเจค:

DB_HOST=localhost
DB_PORT=3306
DB_NAME=petshop_db
DB_USER=petshop_user
DB_PASS=password1234
ตั้งค่าการเชื่อมต่อฐานข้อมูลใน Node.js โดยใช้ Sequelize:

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('petshop_db', 'petshop_user', 'password1234', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));

3. คำสั่ง Build Project และ Run

3.1 ติดตั้ง Dependencies
npm install

3.2 รันการ Migrate Database
npx sequelize-cli db:migrate

3.3 เริ่มต้นเซิร์ฟเวอร์
npm start
หลังจากรันเซิร์ฟเวอร์สำเร็จแล้ว ให้เปิดเว็บเบราว์เซอร์และเข้าถึงโปรเจคของคุณผ่าน URL:

http://localhost:3000
หมายเหตุ
หากใช้ Docker สามารถเพิ่ม docker-compose.yml เพื่อจัดการฐานข้อมูล MySQL
ตรวจสอบว่าไฟร์วอลล์หรือแอนตี้ไวรัสไม่ได้บล็อก MySQL
เปลี่ยนรหัสผ่านฐานข้อมูลให้ปลอดภัยก่อนนำไปใช้ในโปรเจคจริง
หากมีข้อสงสัยเพิ่มเติม โปรดตรวจสอบเอกสารของแพลตฟอร์มที่คุณใช้งาน!
