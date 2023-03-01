import jwt from 'jsonwebtoken';


export default (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        // return next(createError({ status: 401, message: 'Unauthorized' }));
        return res.json("no token avialable");
    }
    return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.json("invalid token");
        }
        req.user = decoded;
        return next();
    });
};