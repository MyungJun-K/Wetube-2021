import mongoose from "mongoose"; // mongoosee는 mongodb와 연결한다

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
}); // warning 방지

const db = mongoose.connection;

const handleOpen = () => console.log("✔ Connected Server"); // 연결되면 console에 나타나는 내용
const handleError = (error) => console.log("❌ DB Eroor", error); // 에러 발생시 나타나는 내용

db.on("error", handleError);
db.once("open", handleOpen);
