const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const app = express();
const authRoutes = require("./routes/auth");
const teacherRoutes = require("./routes/teacher");
const childrenRoutes = require("./routes/children");
const classRoutes = require("./routes/class");
const adminRoutes = require("./routes/admin");
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "../", "uploads")));
app.use(authRoutes);
app.use(teacherRoutes);
app.use(childrenRoutes);
app.use(classRoutes);
app.use(adminRoutes);
app.use((req, res, next) => {
  res.status(404).json({ message: "not found" });
});
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});
module.exports = app;
