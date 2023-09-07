const express = require("express");
const bodyParser = require("body-parser");

const { setStatics } = require("./utils/statics");
const adminRoutes = require("./routes/admin");
const indexRoutes = require('./routes/index');
const errorController = require('./controllers/error');

const app = express();

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
//End of Middlewares

//EJS
app.set("view engine", "ejs");
//END of EJS

//Statics
setStatics(app);

//Routes
app.use("/admin", adminRoutes);
app.use(indexRoutes)
//End of Routes

//404
app.use(errorController.get404);

app.listen(3000, () => console.log("Server is running..."));
