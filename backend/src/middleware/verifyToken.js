import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  const token = req.cookies["auth_token"];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = await jwt.verify(
      token,
      process.env.JWT_SECRET,
      (err, decode) => {
        if (err) {
          return res.status(401).json({ message: "Unauthorized" });
        }
        return decode;
      }
    );
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
