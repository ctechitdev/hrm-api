//call express function
const { Router } = require('express');

//set router
const router = Router();

 
 
 

//user
const user_controller = require("../module_masterdata/user/register/register_controller")
router.post('/user/addUser',user_controller.register_user)
// router.post('/user/getuser',verifyToken,user_controller.get_user)
// router.post('/user/getuserid',verifyToken,user_controller.get_userid)
// router.post('/user/updateuser',verifyToken,user_controller.update_user)
// router.delete('/user/deleteuser',verifyToken,user_controller.delete_user)


//depart
const depart_controller = require("../module_masterdata/depart/depart_controller")
router.post('/depart/addDepart',verifyToken,depart_controller.add_depart)
router.post('/depart/TableDepart',verifyToken,depart_controller.get_depart_table)
router.post('/depart/getDepartByDepartID',verifyToken,depart_controller.get_depart_by_depart_id)
router.post('/depart/updateDepart',verifyToken,depart_controller.update_depart)
router.delete('/depart/deleteDepart',verifyToken,depart_controller.delete_depart)
 


// route list function
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
      // Next middleware
      next();
    } else {
      // Forbidden
      res.sendStatus(403);
    }
  
  }

//export route to  server file
module.exports = router;