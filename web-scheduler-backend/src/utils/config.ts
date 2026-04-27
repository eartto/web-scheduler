import 'dotenv/config';

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET

export default {
    PORT, JWT_SECRET
};