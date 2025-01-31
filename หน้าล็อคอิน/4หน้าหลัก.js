// ฟังก์ชัน login
function loginUser() {
    // บันทึกสถานะการ login ใน localStorage
    localStorage.setItem("isLoggedIn", "true");
    
    // รีเฟรชหน้าเว็บเพื่อทำการแสดงผลใหม่
    window.location.reload();
}

// สมมติว่าเมื่อผู้ใช้กดปุ่ม Login
const loginButton = document.querySelector(".login-btn");
if (loginButton) {
    loginButton.addEventListener("click", loginUser);
}

// เรียกใช้ฟังก์ชันเมื่อหน้าโหลด
document.addEventListener("DOMContentLoaded", checkLoginStatus);
// ฟังก์ชันออกจากระบบ
function logout() {
    // ลบค่า isLoggedIn ใน localStorage
    localStorage.removeItem("isLoggedIn");

    // รีเฟรชหน้าเว็บเพื่ออัปเดตสถานะการแสดงปุ่ม
    window.location.reload();
}
// ฟังก์ชันตรวจสอบสถานะการ login
function checkLoginStatus() {
    const loggedIn = localStorage.getItem("isLoggedIn");

    const loginButton = document.querySelector(".login-btn");
    const signUpButton = document.querySelector(".sign-up-btn");
    const profileButton = document.querySelector(".profile-btn");
    const logoutButton = document.querySelector(".logout-btn");

    if (loggedIn === "true") {
        // ถ้า login แล้ว ซ่อนปุ่ม Login, Sign Up และแสดงปุ่มโปรไฟล์
        if (loginButton) loginButton.style.display = "none";
        if (signUpButton) signUpButton.style.display = "none";
        if (profileButton) profileButton.style.display = "inline-block"; // แสดงปุ่มโปรไฟล์
        if (logoutButton) logoutButton.style.display = "inline-block"; // แสดงปุ่มออกจากระบบ
    } else {
        // ถ้ายังไม่ได้ login ให้แสดงปุ่ม Login, Sign Up
        if (loginButton) loginButton.style.display = "inline-block";
        if (signUpButton) signUpButton.style.display = "inline-block";
        if (profileButton) profileButton.style.display = "none"; // ซ่อนปุ่มโปรไฟล์
        if (logoutButton) logoutButton.style.display = "none"; // ซ่อนปุ่มออกจากระบบ
    }
}

// เรียกใช้ฟังก์ชันเมื่อหน้าโหลด
document.addEventListener("DOMContentLoaded", checkLoginStatus);

// ฟังก์ชันโหลดโพสต์จาก LocalStorage
function loadPosts() {
    const postsContainer = document.getElementById('postsContainer');
    postsContainer.innerHTML = ""; // ล้างเนื้อหาก่อนแสดงโพสต์ใหม่

    const posts = JSON.parse(localStorage.getItem('posts')) || [];

    posts.forEach((post, index) => {
        const postElement = document.createElement('div');
        postElement.classList.add('post', 'mb-3', 'p-3', 'border', 'rounded');

        let postHTML = `
            <p><strong>ชนิด:</strong> ${post.species}</p>
            <p><strong>สายพันธุ์:</strong> ${post.breed}</p>
            <p><strong>อายุ:</strong> ${post.age} ปี</p>
            <p><strong>จังหวัด:</strong> ${post.province}</p>
            <p><strong>ราคา:</strong> ${post.price} บาท</p>
        `;

        // ถ้ามีรูปภาพให้แสดง
        if (post.images && post.images.length > 0) {
            post.images.forEach(image => {
                postHTML += `<br><img src="${image}" class="img-fluid" style="max-width: 100%; margin-top: 10px;">`;
            });
        }

        // ปุ่มดูรายละเอียด
        postHTML += ` 
            <br>
            <a href="รายละเอียด.html?id=${index}&user=${encodeURIComponent(post.userName || 'ไม่ระบุ')}" 
                class="btn btn-info mt-2">ดูรายละเอียด</a>`;

        postElement.innerHTML = postHTML;
        postsContainer.appendChild(postElement);
    });
}