import jwt from "jsonwebtoken";

export const generateWebToken = (username, id) => {
  return jwt.sign({ username, id }, process.env.TOKEN_SECRET, {
    expiresIn: "5000s",
  });
};

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};
