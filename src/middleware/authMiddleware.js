import jwt from "jsonwebtoken";

const requireAuth = (req, res) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                res.status(401).json({
                    message: "You need to log in",
                });
            } else {
                req.user = decodedToken;
                next();
            }
        });
    } else {
        res.status(401).json({
            message: "You need to log in",
        });
    }
};

export { requireAuth };
