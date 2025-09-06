# Todo App


A full-stack Todo Application built with Node.js, Express, MongoDB, and vanilla JavaScript (DOM manipulation).

The app allows users to register, log in, and manage their todos. Each user can add, update, mark as done, or delete tasks. We implemented a custom "diffing mechanism" that updates only the changed DOM elements instead of re-rendering everything, making the frontend more efficient and unique.



## Features

- User authentication with JWT
- Add new todos (title + description)
- Update todos (edit or mark as done)
- Delete todos
- Custom diffing algorithm for DOM updates (React-like, but built manually)
- Secure backend with Express.js and MongoDB



## Tech Stack

- Backend: Node.js, Express.js, MongoDB, Mongoose
- Frontend: HTML, CSS, JavaScript (Vanilla DOM manipulation)
- Authentication: JWT
- Password Hashing: bcrypt
- Other: CORS, nodemon



## Installation

1. Clone the repository
   git clone https://github.com/ganesh-012/Todo-App.git
   cd Todo-App

2. Install dependencies
   npm install

3. Create a .env file in backend folder with:
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   PORT=your_server_port

4. Run the project
   node index.js
   open the html file through vs code by right clicking and open with live server
    
## Usage/Examples
1. Register or login to your account
2. Add todos with title & description
3. Update tasks (edit details or mark as done)
4. Delete tasks you no longer need
5. Experience real-time UI updates via custom diffing logic


## Lessons Learned

- Building a full-stack app from scratch
- JWT authentication and middleware
- Managing frontend state without frameworks
- Writing a custom diffing algorithm for DOM updates
- Debugging MongoDB + Express + JS frontend integration



## Contributing

Pull requests are welcome!
Please open an issue if you’d like to suggest new features.



## Authors

**Ganesh**  
GitHub: [ganesh-012](https://github.com/ganesh-012)  
LinkedIn: [Ganesh Pandrameesu](www.linkedin.com/in/)



## Screenshots

![App Screenshot](https://github.com/ganesh-012/Todo-App/blob/72668312b57fc5a3bbb06fc4866c749344a9c148/Screenshot%202025-09-06%20203933.png)


