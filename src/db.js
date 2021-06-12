import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const db = mongoose.connection;

const handleOpen = () => console.log("✔ Connected Server");
const handleError = (error) => console.log("❌ DB Eroor", error);

db.on("error", handleError);
db.once("open", handleOpen);
