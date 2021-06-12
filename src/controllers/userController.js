import User from "../models/User";
import bcrypt from "bcrypt"; // db 에 기록된 hash값와 동일한지 비교

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = async (req, res) => {
  const { username, email, name, password, password2, location } = req.body;
  const pageTitle = "Join"; // 여러번 사용 되어서 변수로 사용
  if (password !== password2) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "Password confirmation does not match.",
    }); // 회원가입시 password 확인이 일치하지 않으면 에러 발생
  }
  const exists = await User.exists({ $or: [{ username }, { email }] }); // user데이터에 동일한 username이나 email이 있는지 확인
  if (exists) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "This username/email is already taken.",
    });
  } // 동일한 username이 존재할 경우 에러 발생
  try {
    await User.create({
      name,
      email,
      username,
      password,
      location,
    }); // user 생성
    return res.redirect("/login");
  } catch (error) {
    // 생각하지 못한 에러가 발생 할 경우를 대비
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: error._message,
    });
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });
export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const pageTitle = "Login";
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "An account with this username does not exists.",
    });
  }
  const ok = await bcrypt.compare(password, user.password); // 저장된 hash값과 비교
  if (!ok) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "Wrong password",
    });
  }
  req.session.loggedIn = true; // 로그인 했는지 나타냄
  req.session.user = user; // DB에서 찾은 user
  return res.redirect("/");
};

export const edit = (req, res) => res.send("Edit User");

export const remove = (req, res) => res.send("Remove User");

export const logout = (req, res) => res.send("logout");

export const see = (req, res) => res.send("See User");
