const gmsFullDetails = async (req, res) => {

    const userdata = req.query['P_FORCE_NO'] ;
//    console.log(userdata);
    //const userdata = req.body.payload['rs'][0]['ID'];
   // const userdata = req.payload['rs'][0]['ID'];
   try {
       const context = {};

       context.P_FORCE_NO = userdata;
       const dataInfo = await nok_api.getGMSDetailsBy_ID(context);
       // console.log(dataInfo);
       if (dataInfo.length) {
           const data = {};
           data['ID'] = dataInfo[0]['ID'] ? dataInfo[0]['ID'] : "";
           data['GTG_FORCE_NO'] = dataInfo[0]['GTG_FORCE_NO'] ? dataInfo[0]['GTG_FORCE_NO'] : "";
           data['GTG_MOBILE_NO'] = dataInfo[0]['GTG_MOBILE_NO'] ? dataInfo[0]['GTG_MOBILE_NO'] : "";
           data['GTG_FIRST_LOG_DATE'] = dataInfo[0]['GTG_FIRST_LOG_DATE'] ? dataInfo[0]['GTG_FIRST_LOG_DATE'] : "";
           data['GTG_DUE_DATE'] = dataInfo[0]['GTG_DUE_DATE'] ? dataInfo[0]['GTG_DUE_DATE'] : "";
           data['GTG_ORIG_REQUEST_ID'] = dataInfo[0]['GTG_ORIG_REQUEST_ID'] ? dataInfo[0]['GTG_ORIG_REQUEST_ID'] : "";
           data['GTG_CUR_OFFICE_CODE'] = dataInfo[0]['GTG_CUR_OFFICE_CODE'] ? dataInfo[0]['GTG_CUR_OFFICE_CODE'] : "";
           data['GTG_CATEGORY_ID'] = dataInfo[0]['GTG_CATEGORY_ID'] ? dataInfo[0]['GTG_CATEGORY_ID'] : "";
           data['GTG_SUBCATEGORY_ID'] = dataInfo[0]['GTG_SUBCATEGORY_ID'] ? dataInfo[0]['GTG_SUBCATEGORY_ID'] : "";
           data['GTG_REMARKS'] = dataInfo[0]['GTG_REMARKS'] ? dataInfo[0]['GTG_REMARKS'] : "";

           return res.status(200).json({  data });
        console.log(res.data);
       }


       else {
        //    const data = {};
        //    data['ID'] = "";
        //    data['GML_CODE'] = "";
        //    data['GML_DESCP'] = "";
           
           return res.status(404).json({  message: "No Data found", "response": data });
       }

   } catch (error) {
       return res.status(500).json({ status: 0, message: "Error while getting data from new.", response: [] });
   }
}

exports.gms_controller = {
    getGMSDetails,gmsFullDetails
}
