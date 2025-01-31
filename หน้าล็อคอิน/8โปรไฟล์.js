// ฟังก์ชันแสดงตัวอย่างรูปโปรไฟล์ที่เลือก
function previewImage(event) {
    const reader = new FileReader();
    reader.onload = function() {
        const output = document.getElementById('displayProfilePicture');
        output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
}

// ฟังก์ชันเมื่อกดปุ่มบันทึกข้อมูล
document.getElementById('profileForm').addEventListener('submit', function(event) {
    event.preventDefault(); // ป้องกันการโหลดใหม่ของหน้าเว็บ

    // ดึงค่าจากฟอร์ม
    const fullName = document.getElementById('fullName').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const profilePicture = document.getElementById('profilePicture').files[0];

    // บันทึกข้อมูลใน localStorage
    localStorage.setItem('profileFullName', fullName);
    localStorage.setItem('profileAddress', address);
    localStorage.setItem('profilePhone', phone);
    localStorage.setItem('profileEmail', email);

    // ถ้ามีรูปโปรไฟล์ให้บันทึก
    if (profilePicture) {
        const reader = new FileReader();
        reader.onload = function() {
            localStorage.setItem('profilePicture', reader.result);
        };
        reader.readAsDataURL(profilePicture);
    }

    // ซ่อนฟอร์มกรอกข้อมูลและแสดงข้อมูลโปรไฟล์
    document.getElementById('profileFormContainer').style.display = 'none';
    document.getElementById('profileDisplayContainer').style.display = 'block';

    // แสดงข้อมูลโปรไฟล์
    displayProfile();
});

// ฟังก์ชันแสดงข้อมูลโปรไฟล์จาก localStorage
function displayProfile() {
    const fullName = localStorage.getItem('profileFullName');
    const address = localStorage.getItem('profileAddress');
    const phone = localStorage.getItem('profilePhone');
    const email = localStorage.getItem('profileEmail');
    const profilePicture = localStorage.getItem('profilePicture');

    // แสดงข้อมูลในส่วนโปรไฟล์
    document.getElementById('displayFullName').textContent = fullName || 'ไม่ระบุ';
    document.getElementById('displayAddress').textContent = address || 'ไม่ระบุ';
    document.getElementById('displayPhone').textContent = phone || 'ไม่ระบุ';
    document.getElementById('displayEmail').textContent = email || 'ไม่ระบุ';

    if (profilePicture) {
        document.getElementById('displayProfilePicture').src = profilePicture;
    }
}

// ฟังก์ชันเมื่อกดปุ่มแก้ไขข้อมูล
document.getElementById('editProfileButton').addEventListener('click', function() {
    // แสดงฟอร์มกรอกข้อมูลใหม่
    document.getElementById('profileFormContainer').style.display = 'block';
    document.getElementById('profileDisplayContainer').style.display = 'none';

    // เติมข้อมูลลงในฟอร์มกรอกข้อมูล
    document.getElementById('fullName').value = localStorage.getItem('profileFullName') || '';
    document.getElementById('address').value = localStorage.getItem('profileAddress') || '';
    document.getElementById('phone').value = localStorage.getItem('profilePhone') || '';
    document.getElementById('email').value = localStorage.getItem('profileEmail') || '';
});

// เรียกใช้ฟังก์ชันเมื่อหน้าเว็บโหลด
window.addEventListener('DOMContentLoaded', function() {
    const profileDataExists = localStorage.getItem('profileFullName') && 
                              localStorage.getItem('profileAddress') && 
                              localStorage.getItem('profilePhone') && 
                              localStorage.getItem('profileEmail');

    if (profileDataExists) {
        // ถ้ามีข้อมูลโปรไฟล์แล้วให้แสดงข้อมูลโปรไฟล์
        document.getElementById('profileFormContainer').style.display = 'none';
        document.getElementById('profileDisplayContainer').style.display = 'block';
        displayProfile();
    }
});