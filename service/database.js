const oracledb = require('oracledb');
const dbConfig = require('../config/database.js');
oracledb.fetchAsBuffer = [oracledb.BLOB];

// Tell node-oracledb where to find the Oracle Instant Client 'Basic' package on macOS and Windows
if (process.platform === 'win32') {
  oracledb.initOracleClient({ libDir: 'D:/instantclient_23_6' });   // note the double backslashes
} // else you must set the system library search path before starting Node.js

/*async function initialize() {
   await oracledb.createPool(dbConfig.gmsPool,"");
   
}*/

// Create the connection pool (this step is necessary)
async function initialize() {
  try {
    // Create the pool with the alias "GMSPool"
    await oracledb.createPool({
      ...dbConfig.gmsPool,
      poolAlias: 'GMSPool'  // Pool alias to be used later when getting connections
    });
    console.log('Connection pool created');
  } catch (err) {
    console.error('Error creating pool:', err);
  }
}
console.log("One");
initialize();

module.exports.initialize = initialize;

async function close() {
  try {
    await oracledb.getPool().close(1);
  } catch (err) {
    console.log(err.message)
  }
}

module.exports.close = close;


async function ProcedureExecute(sql, binds, numRows) {

  const sessionTagNeeded = Math.random() > 0.5 ? "TIME_ZONE=UTC" : "TIME_ZONE=Australia/Melbourne";
  var conn;
  let resultRecord = [];
  oracledb.outFormat = oracledb.OBJECT;
  try {

    //conn = await oracledb.getConnection({ poolAlias: 'GMSpool', tag: sessionTagNeeded /*, matchAnyTag: true */ });
    console.log(conn);
    conn = await oracledb.getConnection('GMSPool');
    console.log(conn);
    const result = await conn.execute(sql, binds);
    
    const resultSet = result.outBinds.cursor;
    resultRecord = await resultSet.getRows(numRows); // get numRows rows at a time    
    await resultSet.close();
    return (resultRecord);
  } catch (err) {
    console.error(err);
    throw (err);
  } finally {
    if (conn) {
      try {
      await conn.close({ drop: false });
       
      } catch (err) {
        console.error(err);
      }
    }
  }
}


module.exports.ProcedureExecute = ProcedureExecute;

async function ProcedureExecuteInsert(sql, binds) {
  const sessionTagNeeded = Math.random() > 0.5 ? "TIME_ZONE=UTC" : "TIME_ZONE=Australia/Melbourne";
  var conn;
  let resultRecord = [];
  oracledb.outFormat = oracledb.OBJECT;
  try {
    conn = await oracledb.getConnection({ poolAlias: 'GMSPool', tag: sessionTagNeeded /*, matchAnyTag: true */ });
    const result = await conn.execute(sql, binds);
    return (result);
  } catch (err) {
    console.error(err);
    throw (err);
  } finally {
    if (conn) {
      try {
        await conn.close({ drop: false });
      } catch (err) {
        console.error(err);
      }
    }
  }

}

module.exports.ProcedureExecuteInsert = ProcedureExecuteInsert;




