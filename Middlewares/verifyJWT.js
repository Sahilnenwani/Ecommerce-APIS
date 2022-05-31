const res = require("express/lib/response");
const jwt = require("jsonwebtoken");
const JWT_Secret = "mysecretvalue";
const session = require("../Models/session");

const verifyJWT = async (req, res, next) => {
    // console.log("getting the request")
  const accessToken = req.headers.authorization;
  if (!accessToken) return res.sendStatus(401);
  // console.log(accessToken)

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  // let userData= await user.findById(req.params.userId);
  // console.log("user data",userData)

  const sessionData = await session.findOne({ accessToken });
  // console.log(sessionData)

  if (!sessionData || sessionData?.refreshToken != refreshToken) {
    // const token = authHeader.split('')[0];
    // console.log("token it self",token)

    jwt.verify(accessToken, JWT_Secret, (err, decodedtoken) => {
      if (err) {
        return res.sendStatus(403);
      }
      if (decodedtoken != null) {
        if (decodedtoken.role === "admin") {
          req.body.role = decodedtoken.role;
          // console.log(req.body.role);
          next();
        } else if (decodedtoken.role == "user") {
          req.body.role = decodedtoken.role;
          // console.log(req.body.role);
          next();
        }
      }
    });
  } else {
    res.json({
      message: "you are logged out",
    });
  }
};

const authRole = (role) => {
  return (req, res, next) => {
    // console.log(req.body.role);
    // console.log(role);
    if (req.body.role === role) {
      next();
    } else {
      res.status(401).json({ message: "you are not allowed!" });
    }
  };
};

module.exports = {
  verifyJWT,
  authRole,
};
