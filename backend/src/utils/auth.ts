import jwt from 'jsonwebtoken';

export const generateToken = (userId: string): string => {
    return jwt.sign(
        { userId },
        process.env.JWT_SECRET || 'default-secret',
        { expiresIn: '24h' }
    );
}; 