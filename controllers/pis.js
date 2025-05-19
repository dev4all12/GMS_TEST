const { pis_api } = require("../db_api/get_pis");



const getPISDetails = async (req, res) => {

    const userdata = req.query['get_pis_fno'] ;
    console.log(userdata);
     //const userdata = req.body.payload['rs'][0]['ID'];
    // const userdata = req.payload['rs'][0]['ID'];
    try {
        const context = {};

        context.get_pis_fno = userdata;
        const dataInfo = await pis_api.GetPISData(context);
        // console.log(dataInfo);
        if (dataInfo.length) {
            const data = {};
            data['FORCE_NO'] = dataInfo[0]['FORCE_NO'] ? dataInfo[0]['FORCE_NO'] : "";
            data['UNIT'] = dataInfo[0]['UNIT'] ? dataInfo[0]['UNIT'] : "";
            data['NAME'] = dataInfo[0]['NAME'] ? dataInfo[0]['NAME'] : "";
            data['RANK'] = dataInfo[0]['RANK'] ? dataInfo[0]['RANK'] : "";
            data['SUBRANK'] = dataInfo[0]['SUBRANK'] ? dataInfo[0]['SUBRANK'] : "";
            data['EMAIL_ID'] = dataInfo[0]['EMAIL_ID'] ? dataInfo[0]['EMAIL_ID'] : "";
            data['BLOOD_GROUP'] = dataInfo[0]['BLOOD_GROUP'] ? dataInfo[0]['BLOOD_GROUP'] : "";
           
            return res.status(200).json({  data });
        }
        else {
            const data = {};
            data['FORCE_NO']="";
            data['UNIT']="";
            data['NAME']="";
            data['RANK']="";
            data['SUBRANK'] ="";
            data['EMAIL_ID'] ="";
            data['BLOOD_GROUP']="";
            
            return res.status(404).json({  message: "No Data found", "response": data });
        }

    } catch (error) {
        return res.status(500).json({ status: 0, message: "Error while getting data.", response: [] });
    }
}


// Controller Function to Handle Form Data
async function postMobUpdate(req, res) {
    try {
        // Parse the JSON payload from the request body
        console.log(req.body);
        const { FORCE_NO, name, mobile } = req.body;

        // Check if FORCE_NO is present
        if (!FORCE_NO) {
            return res.status(400).json({ status: 0, message: "Force Number is required.", response: [] });
        }

        // Prepare the context for the database update  
        const context ={};
        context.I_FORCE_NO = FORCE_NO;
        context.I_NAME = name;
        context.I_MOBILE = mobile;
        

        // Call the database update function (this should be your own implementation)
        const mob = await pis_api.update_mob(context);

        // Respond with appropriate status and message
        if (mob) {
            return res.status(200).json({ status: 1, message: "Mobile No. Updated.", response: [] });
        } else {
            return res.status(404).json({ status: 0, message: "Mobile No. not Updated.", response: [] });
        }
    } catch (error) {
        console.error("Error in postMobUpdate:", error.message);
        return res.status(500).json({ status: 0, message: "Oops! Something went wrong.", response: [] });
    }
}



// async function postMobUpdate(req, res) {
//     const forceno = req.payload[0]['FORCE_NO'];
//     try {
//         const { body } = req;
//         // console.log(body);
//         let context = {};
//         context.I_FORCE_NO = forceno;
//         context.I_NAME = body.name;
//         context.I_MOBILE = body.mobile;
        
//         const mob = await pis_api.update_mob(context);
        
//         if (mob) {
//             return res.status(200).json({ status: 1, message: "Mobile No.  Updated.", response: [] });
//         }
//         else {
//             return res.status(404).json({ status: 0, message: "Mobile No. not Updated.", response: [] });
//         }

//     } catch (error) {

//         return res.status(500).json({ status: 0, message: "!Oops something went wrong.", response: [] });
//     }
// }


exports.pis_controller={getPISDetails,postMobUpdate}