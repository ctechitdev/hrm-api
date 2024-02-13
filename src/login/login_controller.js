const connected = require("../../setting/connect");
const queries = require("./login_query"); 
const jwt = require("jsonwebtoken");

const token_key = require("../key/token_key");


const bcrypt = require('bcrypt');
const secretkey = token_key.token_secret_ket;

const login = (request, respond) => {
  const { user_name,  pass_word } = request.body;
 
  connected.query(queries.login_user,[user_name], (error, results) =>{
 
    if(error) throw error;
 
    if(results.length){
 
        const users = results[0];
        bcrypt.compare(pass_word, users.user_password, (error, isMatch)=>{

          if(isMatch){
            const accessToken = jwt.sign({ id: users.id_user, full_name: users.full_name, role_id: users.role_id, company_id:users.company_id, depart_id:users.depart_id, position_id:users.position_id },secretkey);
        
            respond.json({'resultCode':'OK','id_users' : users.user_id,'full_name': users.full_name,'role_id' : users.role_id,'company_id' : users.company_id, 'depart_id' : users.depart_id, 'position_id' : users.position_id ,accessToken});
          }else{

            respond.json({'resultCode':'wrong password' });
          }

        })
   
    }else{
    
      respond.json({'resultCode':'no user' });
    }
  })
};

module.exports = {
    login,
  };