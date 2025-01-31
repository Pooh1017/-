      // Import Firebase
        import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
        import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
      
        // กำหนดค่าการเชื่อมต่อ Firebase
        const firebaseConfig = {
          apiKey: "YOUR_FIREBASE_API_KEY", // ใช้ Firebase API Key ของคุณ
          authDomain: "YOUR_FIREBASE_PROJECT.firebaseapp.com", // ใช้ Firebase project ID ของคุณ
          projectId: "YOUR_PROJECT_ID", // Firebase project ID
          storageBucket: "YOUR_PROJECT_BUCKET", // Firebase storage bucket
          messagingSenderId: "YOUR_MESSAGING_SENDER_ID", // Firebase messaging sender ID
          appId: "YOUR_APP_ID" // Firebase app ID
        };
      
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
      
        document.getElementById("forgotPasswordForm").addEventListener("submit", function(event) {
            event.preventDefault();
            
            let email = document.getElementById("email").value.trim();
            
            sendPasswordResetEmail(auth, email)
              .then(() => {
                alert("ลิงก์รีเซ็ตรหัสผ่านถูกส่งไปที่อีเมลของคุณแล้ว!");
              })
              .catch((error) => {
                alert("เกิดข้อผิดพลาด: " + error.message);
              });
        });