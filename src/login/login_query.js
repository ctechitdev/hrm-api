
const login_user = " SELECT user_id, concat( first_name, ' ',last_name ) as full_name,user_password,company_id,role_id,depart_id,user_status,position_id  FROM tbl_user a left join tbl_staff b on a.staff_id = b.staff_id WHERE user_name = ? ";


module.exports = {
    login_user,
};