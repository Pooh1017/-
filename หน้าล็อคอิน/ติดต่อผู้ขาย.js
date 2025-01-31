// โหลดรายละเอียดโพสต์
function loadPostDetail() {
    const postId = getQueryParam('id');
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const userEmail = localStorage.getItem('userEmail'); // ดึงอีเมลจาก localStorage

    if (postId !== null && posts[postId]) {
        const post = posts[postId];
        const postDetail = document.getElementById('postDetail');

        let postHTML = `
            <h3 class="text-primary">${post.species} - ${post.breed}</h3>
            <p><strong>อายุ:</strong> ${post.age} ปี</p>
            <p><strong>จังหวัด:</strong> ${post.province}</p>
            <p><strong>ประวัติการฉีดวัคซีน:</strong> ${post.vaccinationHistory}</p>
            <p><strong>ราคา:</strong> <span class="text-success">${post.price} บาท</span></p>
            <p><small>โพสต์โดย: ${post.userName || "ไม่ระบุ"} | ${new Date(post.date).toLocaleString()}</small></p>
        `;

        // แสดงรูปภาพถ้ามี
        if (post.images && post.images.length > 0) {
            postHTML += `<div class="mt-3"><h5>รูปภาพ</h5>`;
            post.images.forEach(image => {
                postHTML += `<img src="${image}" class="img-fluid rounded mb-3" style="max-width: 100%; height: auto;">`;
            });
            postHTML += `</div>`;
        }

        // ถ้ามีอีเมลและเบอร์โทร ให้แสดงปุ่มติดต่อ
        if (post.email || post.phone) {
            postHTML += `
                <div class="mt-3">
                    <p><strong>ติดต่อผู้โพสต์:</strong></p>
                    ${post.email ? `<p>อีเมล: <a href="mailto:${post.email}">${post.email}</a></p>` : ""}
                    ${post.phone ? `<p>เบอร์โทร: <a href="tel:${post.phone}">${post.phone}</a></p>` : ""}
                    <div>
                        ${post.email ? `<a href="mailto:${post.email}" class="btn btn-primary">ติดต่อทางอีเมล</a>` : ""}
                        ${post.phone ? `<a href="tel:${post.phone}" class="btn btn-primary ml-2">ติดต่อทางโทรศัพท์</a>` : ""}
                    </div>
                </div>
            `;
        }

        // แสดงอีเมลของผู้ใช้งานที่ล็อกอิน
        if (userEmail) {
            postHTML += `<div class="mt-3"><p><strong>คุณได้ล็อกอินด้วยอีเมล:</strong> ${userEmail}</p></div>`;
        }

        postDetail.innerHTML = postHTML;
    } else {
        document.getElementById('postDetail').innerHTML = "<p class='text-danger'>ไม่พบโพสต์นี้</p>";
    }
}
