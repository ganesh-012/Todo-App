async function registerUser() {
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      try {
        if(!username || !password){
            return alert('please fill all the fields')
        }
        const response = await fetch("http://localhost:3000/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }) 
        });

        if (response.status === 200) {
          alert("User registered successfully");
          window.location.href = "file:///C:/Users/pandr/OneDrive/Desktop/0-100%20Development/TODO-APP/frontend/dashboard.html"; 
        } else {
          const data = await response.json();
          alert(data.msg || "Registration failed");
        }
      } catch (error) {
        alert("Something went wrong: " + error.message);
      }
}