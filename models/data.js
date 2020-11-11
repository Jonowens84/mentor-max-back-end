const { query } = require("../db/index");

async function getData() {
  const questions = await query(`SELECT * FROM weeklyQuestions`);
  return questions.rows;
}

async function getDataByDate(date) {
  const questions = await query(
    `SELECT * FROM weeklyQuestions WHERE weekNum= $1 `,
    [weekNum]
  );

  return questions.rows[0];
}

async function createData(data) {
  console.log(data);
  const { weekNum, q1, q2, q3, q4, q5 } = data;

  const res = await query(
    `INSERT INTO weeklyQuestions (
      weekNum,
            q1
            ,q2
            ,q3
            ,q4
            ,q5
        ) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
    [weekNum, q1, q2, q3, q4, q5]
  );
  return res.rows[0];
}

async function deleteData(id) {
  const res = await query(
    `DELETE FROM weeklyQuestions WHERE id = $1 RETURNING id`,
    [id]
  );
  return res.rows[0];
}

module.exports = {
  getData,
  createData,
  getDataByDate,
  deleteData,
};
