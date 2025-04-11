const express = require("express");
const cors = require("cors"); // Import the cors package
const errorHandler = require("./middlewares/errorHandler");
const connectDb = require("./config/dbConnections");

const app = express();
const port = 1000;

// Connect to the database
connectDb();

// Use cors middleware
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Set up routes
app.use("/api/contacts", require("./routes/contactRoutes"));

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
