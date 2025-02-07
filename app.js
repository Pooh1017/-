console.log("Server is running...");

const connection = require('./db');

// เพิ่มข้อมูล
const insertUser = (name, email, password) => {
    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    connection.query(sql, [name, email, password], (err, result) => {
        if (err) throw err;
        console.log('✅ User added:', result.insertId);
    });
};

// ดึงข้อมูล
const getUsers = () => {
    connection.query('SELECT * FROM users', (err, results) => {
        if (err) throw err;
        console.log('📌 Users List:', results);
    });
};

// ทดลองเรียกใช้ฟังก์ชัน
insertUser('John Doe', 'john@example.com', '123456');
getUsers();
