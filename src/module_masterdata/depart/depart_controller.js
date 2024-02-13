const connected = require("../../../setting/connect");
const queries = require("./depart_query");

const jwt = require("jsonwebtoken");

const token_key = require("../../key/token_key");

const secretkey = token_key.token_secret_ket;

//add depart
const add_depart = (req, res) => {
  const { company_id, depart_name } = req.body;

  jwt.verify(req.token, secretkey, (error, rtoken) => {
    if (error) {
      res.json("token expire");
    } else {
      connected.query(
        queries.check_depart_name,
        [company_id, depart_name],
        (error, results) => {
          if (error) throw error;
          if (results.length) {
            res.json({ resultCode: "ບໍ່ສາມາດເພິ່ມໄດ້ ມີຊື່ນີ້ແລ້ວ" });
          } else {
            connected.query(
              queries.add_depart,
              [company_id, depart_name],
              (error, result) => {
                if (error) throw error;
                res.json("ເພີ່ມຂໍ້ມູນໄປແລ້ວ");
              }
            );
          }
        }
      );
    }
  });
};

//get depart table
const get_depart_table = (req, res) => {
  jwt.verify(req.token, secretkey, (error, rtoken) => {
    if (error) {
      res.json("token expire");
    } else {
      connected.query(queries.get_depart_table, (error, result) => {
        if (error) throw error;
        if (result.length) {
          res.json(result);
        } else {
          res.json("ບໍພົບເຫັນຂໍ້ມູນ");
        }
      });
    }
  });
};

//get depart by id for view edit
const get_depart_by_depart_id = (req, res) => {
  const { depart_id } = req.body;

  jwt.verify(req.token, secretkey, (error, rtoken) => {
    if (error) {
      res.json("token expire");
    } else {
      connected.query(
        queries.get_depart_by_depart_id,
        [depart_id],
        (error, result) => {
          if (error) throw error;
          if (result.length) {
            res.json(result);
          } else {
            res.json("ບໍພົບເຫັນຂໍ້ມູນ");
          }
        }
      );
    }
  });
};

//update depart
const update_depart = (req, res) => {
  const { depart_id, company_id, depart_name } = req.body;

  jwt.verify(req.token, secretkey, (error, rtoken) => {
    if (error) {
      res.json("token expire");
    } else {
      connected.query(
        queries.check_depart_name_edit,
        [company_id, depart_name, depart_id],
        (error, results) => {
          if (error) throw error;
          if (results.length) {
            res.json({ resultCode: "ບໍ່ສາມາດເພິ່ມໄດ້ ມີຊື່ນີ້ແລ້ວ" });
          } else {
            connected.query(
              queries.update_depart,
              [company_id, depart_name, depart_id],
              (error, result) => {
                if (error) throw error;
                res.json("ແກ້ໄຂສຳເລັດ");
              }
            );
          }
        }
      );
    }
  });
};

//delete depart
const delete_depart = (req, res) => {
  const { depart_id } = req.body;

  jwt.verify(req.token, secretkey, (error, rtoken) => {
    if (error) {
      res.json("token expire");
    } else {
      connected.query(
        queries.check_depart_delete,
        [depart_id],
        (error, results) => {
          if (error) throw error;
          if (results.length) {
            res.json({ resultCode: "ບໍ່ສາມາດລືບໄດ້ມີການນຳໃຊ້ແລ້ວ" });
          } else {
            connected.query(
              queries.delete_depart,
              [depart_id],
              (error, result) => {
                if (error) throw error;
                res.json("ລືບຂໍມູນສຳເລັດ");
              }
            );
          }
        }
      );
    }
  });
};

module.exports = {
  add_depart,
  get_depart_table,
  get_depart_by_depart_id,
  update_depart,
  delete_depart,
};
