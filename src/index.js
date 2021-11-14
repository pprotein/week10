// import를 통해 쓰려고하는 module를 불러올 수 있다.
import express from "express";
import logger from "morgan";
import path from "path"; //path는 경로설정할때 쓰인다
//from - 어떠한 모듈을 불러올 것인지 정한다.
// 이방식은 nodemodules에서 사용하는 방식

//아래는 사용자가 만든 폴더에 있는 기능 불러오기
// (현재 파일 위치 기준으로 경로 작성)
//.js 쓰지 않아도 js파일임을 인식하기 때문에 안써도 됨.
import loginRouter from "../routes/login";  
// home화면에 관련된 router
import selectRouter from "../routes/select"; 
// 수정하는 주소에서 동작
import deleteRouter from "../routes/delete"; 
// 조회하는 동작

//port number, 수정가능하지만 변하지 않는 값이기에 const사용
const PORT = 3000; 
//3000번 포트를 사용한다. 다르곳에서 사용한다면 변경가능

//app이라는 객체를 만들어서 express 활용
const app = express(); // express기능
//http 기능을 래핑해서 내부적으로 자동으로 연결해주는 모듈이다.
//app은 다양한 기능이 존재한다.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//웹에서 데이터를 전달할때 다루기 편하게 설정하는 부분

app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "hbs");
// 어떤폴더의 어떤 형식의 파일을 사용하겠다고 선언하는것

app.use(logger("dev"));//로그를 자세하게 보기위해 쓰는 용도

//기본적인 라우터 주소 설정
app.use("/", loginRouter);
// 그냥 /는 home을 의미
app.use("/select", selectRouter);
//update 주소에 해당하는 화면 추가
app.use("/delete", deleteRouter);
//select 주소에 해당하는 화면을 보여줌
app.listen(PORT, () => {
  //listen해서 서버를 실행시키는 것이다.
  //route선언 다 하고 마지막에 해줘야함.
  console.log(`Example app listending at http://localhost:${PORT}`);
});
//그 후, npm run start를 하면 실행된다.