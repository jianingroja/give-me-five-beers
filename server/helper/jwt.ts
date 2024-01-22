import jwt from 'jsonwebtoken';

// Generate JWT
const JWT_SECRET = process.env.JWT_SECRET as string;

export const generateToken = (id: string) => {
  const token = jwt.sign(
    {
      id,
    },
    JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );

  return token;
};
