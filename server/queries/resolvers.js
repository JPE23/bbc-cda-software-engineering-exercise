const mysql = require('serverless-mysql')({
  config: {
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD
  }
})


const characters = () => {
  return mysql.query('SELECT * FROM characters')
}

const addBio = async (args) => {
  await mysql.query("UPDATE characters SET bio = ? WHERE id = ?", [args.bio, args.id])
  const characters = await mysql.query("SELECT * FROM characters WHERE" +
      " id =" +
      " ?", [args.id])
  if (characters.length) return characters[0];
  throw new Error("No character found");
}


module.exports = {
  characters, addBio
}
