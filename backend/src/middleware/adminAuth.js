export const adminAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).json({ message: 'Authentication required' });
        return;
    }
    const [type, credentials] = authHeader.split(' ');
    if (type !== 'Basic' || !credentials) {
        res.status(401).json({ message: 'Invalid authentication format' });
        return;
    }
    const [user, pass] = Buffer.from(credentials, 'base64').toString().split(':');
    const ADMIN_USER = process.env.ADMIN_USER || 'admin';
    const ADMIN_PASS = process.env.ADMIN_PASS || 'password';
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
        next();
    }
    else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};
//# sourceMappingURL=adminAuth.js.map