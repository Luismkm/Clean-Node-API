export default {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/clean-node-api',
  port: process.env.PORT || 3333,
  jwtSecret: process.env.JWT_SECRET || 'default',
};
