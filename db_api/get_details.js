const database = require('../service/database.js');
const oracledb = require('oracledb');


async function GetGmsData(context) {
    const numRows = 1;
    const order_data = {
        get_ID: context.get_ID,
    };
    console.log(numRows);
    const sql = `BEGIN GMS10112017D.TEST_PROCEDURE(:get_ID,:cursor); END;`;
    const data = { cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR } };
    const binds = Object.assign({}, order_data, data);
    const result = await database.ProcedureExecute(sql, binds, numRows,);
    console.log(result);
    return result;
}

async function getGMSDetailsBy_ID(context) {
    const numRows=1;
    const order_data={
        P_FORCE_NO: context.P_FORCE_NO,
    };
    const sql= `BEGIN GMS10112017D.GET_GMS_DETAILS(:P_FORCE_NO, :cursor); END;`;
    const data= {cursor: {dir:oracledb.BIND_OUT,type:oracledb.CURSOR}};
    const binds= Object.assign({},order_data,data);
    const result= await database.ProcedureExecute(sql,binds,numRows);
    return result;
    
}
exports.nok_api = {
    GetGmsData,getGMSDetailsBy_ID
};

