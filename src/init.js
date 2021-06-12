import "dotenv/config"; // .env 파일을 사용할 수 있도록 해주는 것
import "./db"; // 데이타베이스 사용
import "./models/Video"; // 등록할 Video 양식
import "./models/User"; // 등록할 user 양식
import app from "./server"; // server 생성

const PORT = 4000;

const handleListening = () =>
  console.log(`✔ Server listening on port : http://localhost:${PORT}`);

app.listen(PORT, handleListening); // 서버 연결
