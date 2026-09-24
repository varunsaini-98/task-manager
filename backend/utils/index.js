import jwt from "jsonwebtoken";

const createJWT = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  const isDev = process.env.NODE_ENV === "development";

  res.cookie("token", token, {
    httpOnly: true,
    secure: !isDev, // false in local development
    sameSite: isDev ? "lax" : "none", // 'lax' for local HTTP, 'none' for HTTPS production
    maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
  });
};

export default createJWT;
