import express from "express";
import { selectSql, deleteSql } from "../database/sql";
//삭제하기 위해서는 선택해서 업데이트 해야하기에 두개의 sql을 불러온다


const router = express.Router(); // 라우터기능을 사용 - express기능을 이용

//localhost:3000/delete ~~
//기존의 입력값 불러오기
router.get('/', async (req, res) => { // / 뒤에 붙는건 update뒤에 붙는것,
  const Employee = await selectSql.getEmployee(); //직원테이블 생성
  res.render('delete', {
    title: "삭제기능",
    Employee
  })
});
// 기존의 값 불러오기

//삭제 쿼리를 진행
router.post('/', async (req, res) => {
  console.log('delete router:',req.body.delBtn); // 진짜 변수를 받았는지 console을 통해 확인한다.

  const data = {
    Dnumber: req.body.delBtn,
  };
  await deleteSql.deleteEmployee(data);

  res.redirect('/delete'); // localhost : 3000/select - 수정후 select 화면에서 조회된다
  //바꾼값이 반영되었는지 확인 가능
});

module.exports = router;
