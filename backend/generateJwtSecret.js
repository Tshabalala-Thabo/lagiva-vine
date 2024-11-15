import crypto from 'crypto';

const generateJwtSecret = () => {
  return crypto.randomBytes(64).toString('hex'); // Generate a random 64-byte hex string
};

const jwtSecret = generateJwtSecret();
console.log(`Your new JWT_SECRET is: ${jwtSecret}`); 