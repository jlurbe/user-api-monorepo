export const config = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  username: process.env.DB_USERNAME || 'admin',
  password: process.env.DB_PASSWORD || 'admin',
  database: process.env.DB_DATABASE || 'test_db',
  synchronize: process.env.DB_SYNCHRONIZE == 'true' ? true : false,
  logging: process.env.DB_LOGGING == 'true' ? true : false,
};
