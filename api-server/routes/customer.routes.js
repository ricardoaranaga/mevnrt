const { authJwt } = require("../middleware");
const controller = require("../controllers/customer.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get(
    '/api/customers/all', 
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.allCustomers
  ); 
  app.post(
    "/api/customers/add",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.custAdd
  );
  app.post("/api/customer/delete", [authJwt.verifyToken, authJwt.isAdmin], 
  controller.delete
  );
};
