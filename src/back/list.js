const path = require('path');
const DB = require('./db.js').DB;
const configPath = path.join(__dirname, '../../config.json');
const escapeHtml = require('./escapehtml.js');

module.exports = async function list(req,res) {
  const tag = escapeHtml(req.body?.tag|| "");
  const db = new DB(configPath)
    await db.connect()
    const list_message = await db.query("SELECT * FROM chat WHERE tag = ?",[tag])
    await db.close()
    return res.json(list_message)
}