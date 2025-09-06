const express = require("express");
const router = express.Router();
const { middleWare } = require("../middleware/authMiddleware");
const { User, Todo } = require("../models/Todo");
const cors = require('cors');

const app = express();
app.use(cors());

router.post("/todos", middleWare, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.username });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const { title, description } = req.body;
    const newTodo = new Todo({
      title,
      description,
      userId: user._id,
    });

    await newTodo.save();
    res.status(200).json({ msg: "Todo added successfully", newTodo : newTodo });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

router.get("/todos", middleWare, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.username });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const todos = await Todo.find({ userId: user._id });
    res.status(200).json({ todos });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

router.put("/todos/:id", middleWare, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.username });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const todo = await Todo.findOne({ _id: req.params.id, userId: user._id });
    if (!todo) return res.status(404).json({ msg: "Todo not found" });

    todo.title = req.body.title ?? todo.title
    todo.description = req.body.description ??  todo.description;
    todo.completed = req.body.completed ?? todo.completed ;
    await todo.save();

    res.status(200).json({ msg: "Todo updated successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

router.delete("/todos/:id", middleWare, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.username });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      userId: user._id,
    });

    if (!todo) return res.status(404).json({ msg: "Todo not found" });

    res.status(200).json({ msg: "Todo is deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

module.exports = router;
