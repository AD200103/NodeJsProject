import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).json("Bad auth!");
  }
  jwt.verify(token, process.env.PASSWORD, (err, decoded) => {
    if (err) {
      return res.status(403).json("Bad auth!");
    }
    req.body.userId = decoded.id;
    next();
  });
};

export default auth;
