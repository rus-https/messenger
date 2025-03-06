const path = require('path');
const DB = require('./db.js').DB;
const configPath = path.join(__dirname, '../../config.json');
const escapeHtml = require('./escapehtml')

module.exports = async function add(req,res) {
  const tag = escapeHtml(req.body?.tag|| "");
  const name = escapeHtml(req.body?.name || "");
  const message = escapeHtml(req.body?.message || "");
  console.log(tag,name,message)

  if(!tag){
    return res.json({code: 1, type: "tag", message:"Не может быть пустым!"})
  }
  if(!name){
    return res.json({code: 1, type: "name", message:"Не может быть пустым!"})
  }
  if(!message){
    return res.json({code: 1, type: "message", message:"Не может быть пустым!"})
  }
  const db = new DB(configPath)
    await db.connect()
    const add_message = await db.query("INSERT INTO chat (tag, name, message) VALUES (?, ?, ?)",[tag,name,message])
    await db.close()
}