//사이트에 처음 접속하면 로그인하도록 화면설정
import express from "express";
import { selectSql } from "../database/sql";
//데이터베이스에 데이터 삽입을 구현하는 쿼리이다.
//views폴더의 home.hbs파일과 연동한다.
//form을 구현한다.

const router = express.Router(); //express로 선언

//home.hbs파일을 찾아서 그리겠다
router.get('/', (req, res) => {
  res.render('login'); //view에서 home.hbs파일을 열어서 
}); //render - 그리겠다는 의미

router.post('/', async(req, res) => { // 삽입한 값을 받아준다.
  //이곳에 저장된다.
  const vars = req.body; 
  // 내가 입력한 값.
  const users = await selectSql.getUsers(); //데이터 가져오기
  let whoAmI = ''; // admin과 user 비교
  //let 값을 바꿀수 있는 변수
  let checkLogin = false;
  //데이터베이스에 넣은 값중에서 admin일때와 user의 화면을 바꾸어주는것
  //데이터 베이스의 값을불러와서 admin =delet page
  //user =select page로 이동
  
  users.map((user) => { //map함수 사용
    //like forloop
    console.log(user.Id);
    if (vars.id === user.Id && vars.password === user.Password){
      //입력한 값이 동일한지 확인
      console.log('login success!');
      //로그인이 성공했는지 확인
      checkLogin = true;
      //로그인이 한 대상이 누구인지 확인 - 한번더 조건문
      if(vars.id ==='admin'){
        whoAmI = 'admin';
      }else{
        whoAmI = 'users';
      }

    }
  })

  console.log('whoAmI:', whoAmI);

  if(checkLogin && whoAmI === 'admin'){ //로그인 대상 확인후
    res.redirect('/delete'); // 페이지 지정
  }else if(checkLogin && whoAmI === 'users'){
    res.redirect('/select');
    //users 는 select admin은 delet페이지
  }else{
    console.log('login falied!');
    res.send("<script>alert('로그인에 실패했습니다.');location.herf='/';</script>");
    //실패시 팝업창을 띄워준다.
  }


})

module.exports = router;
