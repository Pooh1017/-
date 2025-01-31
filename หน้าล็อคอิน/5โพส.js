// การแสดงตัวอย่างรูปภาพก่อนโพสต์
document.getElementById('imageUpload').addEventListener('change', function() {
    const files = this.files;
    const preview = document.getElementById('imagePreview');
    preview.innerHTML = ''; // เคลียร์ตัวอย่างภาพเก่า

    if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.classList.add('img-fluid');
                img.style.maxWidth = '200px';
                img.style.marginRight = '10px';
                preview.appendChild(img);
            };
            reader.readAsDataURL(files[i]); // แปลงไฟล์เป็น URL
        }
    } else {
        preview.innerHTML = '<p>กรุณาเลือกรูปภาพ</p>';
    }
});

// การจัดการการส่งฟอร์ม
document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault(); // ป้องกันการรีเฟรชหน้าเว็บ

    const species = document.getElementById('species').value.trim();
    const breed = document.getElementById('breed').value.trim();
    const age = document.getElementById('age').value.trim();
    const province = document.getElementById('province').value.trim();
    const vaccinationHistory = document.getElementById('vaccinationHistory').value.trim();
    const price = document.getElementById('price').value.trim();
    const imageUpload = document.getElementById('imageUpload').files;

    // ตรวจสอบข้อมูลที่กรอก
    if (species === "" || breed === "" || age === "" || province === "" || vaccinationHistory === "" || price === "") {
        alert("กรุณากรอกข้อมูลทั้งหมดก่อนโพสต์!");
        return;
    }

    // เก็บโพสต์ใน localStorage
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const newPost = {
        species: species,
        breed: breed,
        age: age,
        province: province,
        vaccinationHistory: vaccinationHistory,
        price: price,
        date: new Date(),
        images: []
    };

    // หากมีการเลือกรูปภาพให้แปลงเป็น URL
    if (imageUpload.length > 0) {
        for (let i = 0; i < imageUpload.length; i++) {
            const reader = new FileReader();
            reader.onload = function(e) {
                newPost.images.push(e.target.result); // เพิ่มรูปภาพเข้าในอาร์เรย์

                // เมื่อเสร็จสิ้นการอ่านไฟล์ทั้งหมด
                if (newPost.images.length === imageUpload.length) {
                    posts.push(newPost);
                    localStorage.setItem('posts', JSON.stringify(posts));

                    // เคลียร์ฟอร์ม
                    document.getElementById('postForm').reset();
                    document.getElementById('imagePreview').innerHTML = ''; // เคลียร์การแสดงตัวอย่างภาพ

                    // แสดงโพสต์ใหม่
                    displayPosts();
                }
            };
            reader.readAsDataURL(imageUpload[i]); // แปลงไฟล์รูปภาพเป็น URL
        }
    } else {
        // หากไม่มีรูปภาพก็โพสต์เฉพาะข้อมูล
        posts.push(newPost);
        localStorage.setItem('posts', JSON.stringify(posts));

        // เคลียร์ฟอร์ม
        document.getElementById('postForm').reset();
        document.getElementById('imagePreview').innerHTML = ''; // เคลียร์การแสดงตัวอย่างภาพ

        // แสดงโพสต์ใหม่
        displayPosts();
    }
});

// ฟังก์ชันเพื่อแสดงโพสต์ที่เก็บไว้ใน localStorage
function displayPosts() {
    const postList = document.getElementById('postList');
    const posts = JSON.parse(localStorage.getItem('posts')) || [];

    postList.innerHTML = ''; // เคลียร์โพสต์เก่า

    posts.forEach((post, index) => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.classList.add('mb-3');
        postElement.classList.add('p-3');
        postElement.classList.add('border');
        postElement.classList.add('rounded');
        
        // แสดงข้อมูลโพสต์
        let postHTML = `
            <p><strong>ชนิด:</strong> ${post.species}</p>
            <p><strong>สายพันธุ์:</strong> ${post.breed}</p>
            <p><strong>อายุ:</strong> ${post.age} ปี</p>
            <p><strong>จังหวัด:</strong> ${post.province}</p>
            <p><strong>ประวัติการฉีดวัคซีน:</strong> ${post.vaccinationHistory}</p>
            <p><strong>ราคา:</strong> ${post.price} บาท</p>
            <small>โพสต์เมื่อ: ${new Date(post.date).toLocaleString()}</small>
        `;

        // ถ้ามีรูปภาพแสดงรูปภาพ
        if (post.images.length > 0) {
            post.images.forEach(image => {
                postHTML += `<br><img src="${image}" class="img-fluid" style="max-width: 100%; margin-top: 10px;">`;
            });
        }

        // เพิ่มปุ่มลบ
        postHTML += `
            <button class="btn btn-danger btn-sm mt-2" onclick="deletePost(${index})">ลบ</button>
        `;

        postElement.innerHTML = postHTML;

        postList.appendChild(postElement);
    });
}

// ฟังก์ชันลบโพสต์
function deletePost(index) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.splice(index, 1); // ลบโพสต์ที่เลือก
    localStorage.setItem('posts', JSON.stringify(posts)); // บันทึกการเปลี่ยนแปลง
    displayPosts(); // รีเฟรชการแสดงโพสต์
}

// แสดงโพสต์เมื่อหน้าโหลดเสร็จ
document.addEventListener('DOMContentLoaded', function() {
    displayPosts(); 
});

document.getElementById('postForm').addEventListener('submit', function(event) {
    const imageUpload = document.getElementById('imageUpload');
    if (imageUpload.files.length === 0) {
        // แสดงข้อความแจ้งเตือนหรือเปลี่ยนสีของ input
        alert("กรุณาเลือกรูปภาพ");
        event.preventDefault(); // ป้องกันการส่งฟอร์ม
    }
});


