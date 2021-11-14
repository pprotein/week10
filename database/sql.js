import mysql from "mysql2";
//database 연결
const pool = mysql.createPool(
  process.env.JAWSDB_URL ?? {
    host: "localhost",
    user: "root",
    database: "week10",
    password: "ajdcjddl12!", //mysql 비밀번호
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  }
);
//async / await 사용
//async - await가 끝날때까지 기다려주겠다.
const promisePool = pool.promise();

//select query
//async 존재시 await가 끝날때 까지 wait해주겠다.
export const selectSql = {
  //외부에서 함수를 불러오려면 export를 사용하여야 한다.
  getUsers : async () => {
    const [rows] = await promisePool.query(`select * from user`);
    //employee 테이블
    return rows;
  },
  getEmployee : async () => {
    const [rows] = await promisePool.query(`select * from Employee`);
    return rows;
  },
};


//delete query
//조건을 설정해 줘야 함 where
export const deleteSql = {
  deleteEmployee : async (data) => {
    //department에 대해서만 delete를 진행
    //where 조건을 만족하는 행에 대해서 salary 수정
    
    console.log('deleteSql.deleteEmployee:',data.Dnumber);
    //버튼을 눌렀을때 작동하게 해준다
    const sql = `delete from Employee where Dnumber='${data.Dnumber}'`;
    //조건을 걸어준다- dnumber값을 보고 그 값에 해당하는 행을 지우는sql문
    await promisePool.query(sql);
  },
};
