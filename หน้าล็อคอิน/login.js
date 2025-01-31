// เมื่อฟอร์มถูกส่ง
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // ป้องกันการรีเฟรชหน้า

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // ตรวจสอบอีเมลและรหัสผ่าน (อาจจะเช็คกับฐานข้อมูลในกรณีจริง)
    if (email && password) {
        // เก็บข้อมูลอีเมลใน localStorage
        localStorage.setItem('userEmail', email);

        // เปลี่ยนไปยังหน้าหลักหลังจากล็อกอินสำเร็จ
        window.location.href = 'หน้าหลัก.html';
    } else {
        alert('กรุณากรอกข้อมูลให้ครบ');
    }
});

// ดึงข้อมูลอีเมลจาก localStorage
const userEmail = localStorage.getItem("userEmail");

if (userEmail) {
    // แสดงอีเมลในหน้า
    document.getElementById("userEmailDisplay").innerText = `คุณได้ล็อกอินด้วยอีเมล: ${userEmail}`;
} else {
    // ถ้าไม่ได้ล็อกอินแสดงข้อความ
    document.getElementById("userEmailDisplay").innerText = "กรุณาล็อกอินก่อนใช้งาน";
}
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    if (username === "" || password === "") {
      alert("กรุณากรอกชื่อผู้ใช้และรหัสผ่าน!");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let userExists = users.some(user => user.email === username && user.password === password);

    if (!userExists) {
      alert("ไม่พบบัญชีนี้ หรือ รหัสผ่านไม่ถูกต้อง!");
    } else {
      window.location.href = "4หน้าหลัก.html";
    }
  });

  document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let newUsername = document.getElementById("newUsername").value.trim();
    let newPassword = document.getElementById("newPassword").value.trim();

    if (newUsername === "" || newPassword === "") {
      alert("กรุณากรอกชื่อผู้ใช้และรหัสผ่าน!");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let userExists = users.some(user => user.email === newUsername);

    if (userExists) {
      alert("บัญชีนี้มีอยู่แล้ว!");
    } else {
      users.push({ email: newUsername, password: newPassword });
      localStorage.setItem("users", JSON.stringify(users));
      alert("สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ");
      document.getElementById("registerWrapper").style.display = "none";
      document.querySelector(".wrapper").style.display = "block";
    }
  });

  document.getElementById("showRegister").addEventListener("click", function() {
    document.querySelector(".wrapper").style.display = "none";
    document.getElementById("registerWrapper").style.display = "block";
  });

  document.getElementById("showLogin").addEventListener("click", function() {
    document.getElementById("registerWrapper").style.display = "none";
    document.querySelector(".wrapper").style.display = "block";
  });