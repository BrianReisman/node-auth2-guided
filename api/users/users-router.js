const router = require("express").Router();

const Users = require("./users-model.js");
const restricted = require("../auth/restricted-middleware.js");
const checkRole = require("../auth/check-role-middleware-factory.js");

router.get("/", restricted, async (req, res, next) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (err) {
    next({ apiCode: 500, apiMessage: 'db error getting users', ...err })
  }
});


//----------------------------------------------------------------------------//
// These methods are where we use checkRole(). When we created the token, the
// .findBy() method returned the role name for the user's role (using a table
// join), and the role name was added to the token as a claim (see the
// generateToken() function in the auth-router.js file.)
//
// Calling checkRole("admin") returns a middleware function that checks to see
// 1) if the decoded token on the req object as a "rolename" property, and 
// 2) if that property as the value of "admin".
//
// We could just as easily call checkRole("user") to ensure that the user has
// the "user" role. You could pass in more than a string - an entire "config"
// object, if you want. For example, you could pass in something like:
//
//     {rolename: "user", type: "exact"}
// 
// ...and configure checkRole() to create a middleware function that will only
// call next() if the user has the "user" role, whereas passing in:
// 
//     {rolename: "user", type: "atleast"}
// 
// ...could cause checkRole() to return a middleware function that checks to see
// if you have a role that is "at least" as capable/allowed as "user". In that
// case, "guest" would fail, while "user" and "admin" would work, etc. 
// 
// The topic of "role based access / role based security", "access control lists
// (ACL's)", etc. is vast. There are many, many ways to implement permissions
// and authorization schemes. What we are doing here is overly simplistic, but
// demonstrates the idea.
//----------------------------------------------------------------------------//
router.delete("/:id", restricted, checkRole("admin"), async (req, res, next) => {
  try {
    res.status(501).json({ message: "not implemented" });
  } catch (err) {
    next({ apiCode: 500, apiMessage: 'error deleting user', ...err });
  }
})

router.post("/", restricted, checkRole("admin"), (req, res, next) => {
  try {
    res.status(501).json({ message: "not implemented" });
  } catch (err) {
    next({ apiCode: 500, apiMessage: 'error deleting user', ...err });
  }
})

router.put("/:id", restricted, checkRole("admin"), (req, res, next) => {
  try {
    res.status(501).json({ message: "not implemented" });
  } catch (err) {
    next({ apiCode: 500, apiMessage: 'error deleting user', ...err });
  }
})





module.exports = router;
