import express from "express";
import morgan from "morgan"; // GET / 304 63.205 ms - - 와 같은 요청과 반응 expess middleware
import session from "express-session"; // session을 만들어준다.
import MongoStore from "connect-mongo"; // 생성한 session을 DB에 연결해준다.
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter"; // user와 관련된 router
import videoRouter from "./routers/videoRouter"; // video와 관련된 router
import { localMiddleware } from "./middlewares"; // session의 전역변수 모음 파일

const app = express(); // express를 app 으로 치환
const logger = morgan("dev"); // 어떤 상태를 받아오고 어떤 상태인지 자세히 알려주는 morgan

app.set("view engine", "pug"); // express의 view engine 을 pug로 사용한다
app.set("views", process.cwd() + "/src/views"); // pug 파일의 위치 초기화 process.cwd() -> 기존위치

app.use(logger); // middleware 사용
app.use(express.urlencoded({ extended: true })); // form에 입력한 데이터를 post하는데 express가 이해할 수 있도록 해준다

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
); // session 생성

app.use((req, res, next) => {
  req.sessionStore.all((error, sessions) => {
    console.log(sessions);
    next();
  });
}); // session에 있는 정보를 모두 console.log 한다

app.use(localMiddleware); // 전역변수 사용하는 미들웨어
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

export default app;
