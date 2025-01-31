 document.getElementById("registerForm").addEventListener("submit", function(event) {
            event.preventDefault();

            let username = document.getElementById("username").value.trim();
            let email = document.getElementById("email").value.trim();
            let password = document.getElementById("password").value.trim();
            let confirmPassword = document.getElementById("confirmPassword").value.trim();

            if (username === "" || email === "" || password === "" || confirmPassword === "") {
                alert("กรุณากรอกข้อมูลให้ครบทุกช่อง!");
                return;
            }

            if (password !== confirmPassword) {
                alert("รหัสผ่านไม่ตรงกัน!");
                return;
            }

            let users = JSON.parse(localStorage.getItem("users")) || [];
            let userExists = users.some(user => user.email === email);

            if (userExists) {
                alert("อีเมลนี้มีอยู่แล้ว!");
            } else {
                users.push({ username: username, email: email, password: password });
                localStorage.setItem("users", JSON.stringify(users));
                
                alert("สมัครสมาชิกสำเร็จ! ระบบกำลังนำคุณไปที่หน้า Login...");
                
                setTimeout(function() {
                    window.location.href = "login.html"; // กลับไปหน้า Login
                }, 1500); // หน่วงเวลา 1.5 วินาที
            }
        });