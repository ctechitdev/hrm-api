const { createPool } = require("mysql");

const connected = createPool({
  host: "rm-0jo2g7pe17tc8x62kmo.mysql.ap-southeast-7.rds.aliyuncs.com",
  user: "scn_hrm_uat",
  database: "scn_hrm_uat",
  password: "scnhrm@123#",
});

module.exports = connected;
 