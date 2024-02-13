const check_depart_name = "select * from tbl_depart where company_id = ? and depart_name = ?  ";
const add_depart = "insert into tbl_depart(company_id, depart_name  )values(?,? )";
const get_depart_table = "select  depart_id,company_name,depart_name from tbl_depart a left join tbl_company b on a.company_id = b.company_id order by depart_id desc  ";
const get_depart_by_depart_id = "select * from tbl_depart where depart_id = ?  ";
const check_depart_name_edit = "select * from tbl_depart where company_id = ? and depart_name = ? and depart_id != ? ";
const update_depart = "update tbl_depart set company_id = ?, depart_name = ? where depart_id = ? ";
const check_depart_delete = "select * from tbl_staff where depart_id = ?  ";
const delete_depart = "delete from tbl_depart where depart_id = ?  ";

module.exports = {
    check_depart_name,
    add_depart, 
    get_depart_table,
    get_depart_by_depart_id,
    check_depart_name_edit,
    update_depart,
    check_depart_delete,
    delete_depart,
};