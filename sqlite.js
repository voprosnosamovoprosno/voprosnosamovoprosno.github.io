const fs = require("fs");
const dbFile = "./.data/vss.db";
const exists = fs.existsSync(dbFile);
const sqlite3 = require("sqlite3").verbose();
const dbWrapper = require("sqlite");
const casual = require("casual");
let db;
//SQLite wrapper for async / await connections https://www.npmjs.com/package/sqlite
dbWrapper
  .open({
    filename: dbFile,
    driver: sqlite3.Database
  })
  .then(async dBase => {
    db = dBase;

    try {
      if (!exists) {
        await db.run(
          "CREATE TABLE vsst (vssid INTEGER PRIMARY KEY AUTOINCREMENT, vsstxt TEXT)"
        );
      }
    } catch (dbError) {
      console.error(dbError);
    }
  });
// Server script calls these methods to connect to the db
module.exports = {
  
  vssgetf: async () => {
    try {
      return await db.all("SELECT * from vsst");
    } catch (dbError) {
      console.error(dbError);
    }
  },
  
  vssaddf: async vsstxtfp => {
    let success = false;
    try {
      success = await db.run("INSERT INTO vsst (vsstxt) VALUES (?)", [
        vsstxtfp
      ]);
    } catch (dbError) {
      console.error(dbError);
    }
    return success.changes > 0 ? true : false;
  },
  
  vssdelf: async vssidfp => {
    let success = false;
    try {
      success = await db.run("Delete from vsst WHERE vssid = ?", vssidfp);
    } catch (dbError) {
      console.error(dbError);
    }
    return success.changes > 0 ? true : false;
  }
};
  
/*// Update message text
  updateMessage: async (id, message) => {
    let success = false;
    try {
      success = await db.run(
        "Update Messages SET message = ? WHERE id = ?",
        message,
        id
      );
    } catch (dbError) {
      console.error(dbError);
    }
    return success.changes > 0 ? true : false;
  }
*/
