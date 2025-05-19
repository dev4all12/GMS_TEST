const database = require('../service/database.js');
const oracledb = require('oracledb');




async function GetPISData(context) {
    const numRows = 1;
    const order_data = {
        get_pis_fno: context.get_pis_fno,   };
            console.log(numRows);
            const sql = `BEGIN GMS10112017D.SP_GET_PIS(:get_pis_fno,:cursor); END;`;
            const data = { cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR } };
            const binds = Object.assign({}, order_data, data);
            const result = await database.ProcedureExecute(sql, binds, numRows,);
            // console.log(result);
            return result;
    }



// async function update_mob(context) {
//     const user_date={
//         I_FORCE_NO: context.I_FORCE_NO,
//         I_NAME: context.I_NAME,
//         I_MOBILE: context.I_MOBILE,
//         O_STATUS: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
//         O_MESSAGE: { dir: oracledb.BIND_OUT, type: oracledb.STRING }

//     };
//     const query = `
//     BEGIN 
//         GMS10112017D.SBV_TEST_MOB(:I_FORCE_NO, :I_NAME, :I_MOBILE, :O_STATUS, :O_MESSAGE); 
//     END;
// `;
// const binds= Object.assign({},user_date); 

// const result= await database.ProcedureExecuteInsert(query, binds);
// const resultBinds= result.outBinds;
// return resultBinds;
// }

// async function update_mob(context) {
//     try {
//         // ✅ Prepare user data
//         const query = `
//             BEGIN 
//                 GMS10112017D.SP_UPDATE_MOB(:I_FORCE_NO, :I_NAME, :I_MOBILE, :O_STATUS, :O_MESSAGE); 
//             END;
//         `;

//         // ✅ Bind the parameters
//         const binds = {
//             I_FORCE_NO: context.I_FORCE_NO,
//             I_NAME: context.I_NAME,
//             I_MOBILE: context.I_MOBILE,
//             O_STATUS: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
//             O_MESSAGE: { dir: oracledb.BIND_OUT, type: oracledb.STRING }
//         };

//         // ✅ Execute the stored procedure
//         const result = await database.ProcedureExecuteInsert(query, binds);

//         // ✅ Get the output values
//         const { O_STATUS, O_MESSAGE } = result.outBinds;

//         console.log("Procedure Output: ", O_STATUS, O_MESSAGE);

//         // ✅ Return the result
//         return { status: O_STATUS, message: O_MESSAGE };

//     } catch (error) {
//         console.error("Error executing stored procedure:", error.message);
//         throw error;
//     }
// }

// module.exports = { update_mob };


exports.pis_api={GetPISData,update_mob

}




