const jwt = require("jsonwebtoken");
export const checkAuth = async ({ res, req }: ContextType) => {
  const jwtToken = process.env.JWT_TOKEN || "";
  try {
    const token = await req.cookies[jwtToken];
    if (token) {
      const { user } = jwt.verify(token, process.env.JWT_SECRET);
      if (!user)
      return { message: "Unauthorized", status: 401 };
        
      return { message: "authorized", status: 200 };
    } else {
      return { message: "Unauthorized", status: 401 };
    }
  } catch (error) {
     return { message: "Unauthorized", status: 401 };
  }
};
