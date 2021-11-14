import express from "express";
//사용자가 만든 모듈 불러올 때 {}
import { selectSql } from "../database/sql";
// 중괄호는 사용자가 만드는 모듈을 가져올때 쓰인다

const router = express.Router();

router.get("/", async function (req, res) {
  // /select를 /로 표현한 것임
  
  const Employee = await selectSql.getEmployee();

  
  res.render("select", { // select.hbs파일을 의미한다
    title: "노동자",
    Employee,
  });//render로 데이터를 넘겨준다.
});

module.exports = router;
