const check_user = "select * from tbl_user where user_name = ? ";
const add_user = "insert into tbl_user(staff_id, user_name,user_password,role_id,add_by, user_status,date_add)values(?,?,?,?,?,1,now())";

module.exports = {
    check_user,
    add_user, 
};