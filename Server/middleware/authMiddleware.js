import jwt from "jsonwebtoken";
const authMiddleware = async (req, res, next) => {
  try {
    const token =
      req.cookies.AccessToken || req?.header?.authorization?.split(" ")[1]; //convert into array ["Bearer","token"]

    if (!token) {
      return res.status(401).json({
        message: "Access token is missing",
        error: true,
        succes: false,
      });
    }

    const decodeJwt = await jwt.verify(
      token,
      process.env.SECRET_KEY_ACCESS_TOKEN
    );

    if (!decodeJwt) {
      return res.status(401).json({
        message: "Unauthorized access",
        error: true,
        succes: false,
      });
    }

    req.userId = decodeJwt.id;

    next();
  } catch (error) {
    console.log(error.name);
    return res.status(500).json({
      message: error.message || error,
      error: true,
      succes: false,
    });
  }
};

export default authMiddleware;
