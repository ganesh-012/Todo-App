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

        const data = await response.json();
        if (response.status === 200) {
          alert(data.msg);
          const token = data.token
          localStorage.setItem("token",token);
          window.location.href ='http://127.0.0.1:5500/TODO-APP/frontend/dashboard.html'
        } else {
          alert(data.msg || "Registration failed");
        }
      } catch (error) {
        alert("Something went wrong: " + error.message);
      }
}