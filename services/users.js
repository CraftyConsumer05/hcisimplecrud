const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultipleUsers(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, studentno,firstname, lastname,year,course FROM express_crud LIMIT ${offset},${config.listPerPage}`
  );
  const users = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    users,
    meta
  }
}
async function getUser(id){
  const row = await db.query(
    `SELECT id,studentno,firstname,lastname,year,course 
    FROM express_crud
    WHERE id= ${id}`
  );
  const user = helper.emptyOrRows(row);
  return user[0]
}

async function saveUser(newUser){
    const row = await db.query(
      `INSERT INTO express_crud(studentno,lastname,firstname,year,course) 
      VALUES ('${newUser.studentno}','${newUser.lastname}','${newUser.firstname}','${newUser.year}','${newUser.course}')`
    );
    
}

async function updateUser(newUser){
  const row = await db.query(
    `UPDATE express_crud
    SET studentno='${newUser.studentno}',
        lastname='${newUser.lastname}',
        firstname= '${newUser.firstname}',
        year='${newUser.year}',
        course='${newUser.course}' 
         
    WHERE id='${newUser.id}'`
  );
}
async function deleteUser(id){
  const row = await db.query(
    `DELETE FROM express_crud
     WHERE id='${id}'`
  );
}

module.exports = {
  getMultipleUsers,
  getUser,
  saveUser,
  updateUser,
  deleteUser
}