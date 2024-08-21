/* eslint-disable indent */
const authMiddleware = (req, res, next) => {
    const passwordFromRequest = req.headers["x-password"];

    if (!passwordFromRequest) {
        return res.status(401).json({ message: "No password provided" });
    }

    if (passwordFromRequest !== process.env.DB_PASSWORD) {
        return res.status(403).json({ message: "Unauthorized" });
    }

    next();
};

export default authMiddleware;
