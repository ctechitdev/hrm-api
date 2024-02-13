const connected = require("../../../../setting/connect");
const queries = require("./register_query");

const jwt = require('jsonwebtoken');
const token_key = require("../../../key/token_key");
const bcrypt = require('bcrypt');

const secretkey = token_key.token_secret_ket;

const register_user = async(request, respond) => {
  
  const { staff_id, user_name, role_id, add_by } = request.body;

  const encryptPassword = await bcrypt.hash("123",10);
 
  connected.query(queries.check_user, [user_name], (error, results) => {
 
    if (error) throw error;
 
    if (results.length) {     
  
      respond.json({ resultCode: "ຜູ້ໃຊ້ນີ້ມີໃນລະບົບແລ້ວ" });
    } else {
 
      connected.query( queries.add_user,  [staff_id, user_name, encryptPassword, role_id,  add_by], (error, results) => {
       
          if (error) throw error;
      
          respond.json({ resultCode: "ລົງທະບຽນສຳເລັດ" });
        }
      );
    }
  });
};

const get_user = (req ,res )=>{
  jwt.verify(req.token,secretkey,(error,rtoken)=>{
      if (error){
          res.json("token expire")
    } else {
      connected.query(queries.get_user , (error,result)=>{
          if (error) throw error;
          res.json(result)
      })
    }
})}
  
const get_userid =(req,res )=>{
  const {user_id}=req.body;
  jwt.verify(req.token,secretkey,(error,rtoken)=>{
    if (error){
      res.json("token expire")
    }else{
      connected.query(queries.get_userid,[user_id],(error,result)=>{
        if (error) throw error;
        if (result.length){
          res.json(result)
        }else{
         res.json("ບໍ່ພົບເຫັນຂໍ້ມູນ")
        }
      })
    }
  })
}

const update_user =(req,res)=>{
  const {user_id}=req.body;
  const {full_name,user_name,user_password,role_id,agent_id,user_status,add_by,date_add}=req.body;
  jwt.verify(req.token,secretkey,(error,rtoken)=>{
    if (error){
      res.json("token expire")
    }else{
    connected.query(queries.update_user,[full_name,user_name,user_password,role_id,agent_id,user_status,add_by,date_add,user_id],(error,result)=>{
      if(error) throw error;
      if(error){ 
        res.json("ແກ້ໄຂບໍສຳເລັດ")
    }else{
      res.json("ແກ້ໄຂສຳເລັດແລ້ວ");
    }
    })
}
})}

const delete_user = (req,res)=>{
  const {user_id}=req.body;
  jwt.verify(req.token,secretkey,(error,rtoken)=>{
    if (error){
      res.json("token expire")
    }
    connected.query(queries.delete_user[user_id],(error,result)=>{
      if (error) throw error;
      res.json("ຂໍ້ມູນຖືກລົບອອກແລ້ວ")
    })
})}



module.exports = {
  register_user,
  get_user,
  get_userid,
  update_user,
  delete_user,
};
