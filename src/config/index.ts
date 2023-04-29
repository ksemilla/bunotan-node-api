const DEVELOPMENT = 'development';

export default () => {
  const NODE_ENV = process.env.NODE_ENV ?? DEVELOPMENT;

  return NODE_ENV === DEVELOPMENT
    ? {
        APP_KEY: 'bunotan-node-api',
        DB_HOST: 'postgres',
        DB_PORT: 5432,
        DB_USERNAME: 'bunotan',
        DB_PASSWORD: 'bunotan',
        DB_DATABASE_NAME: 'bunotan',
        NODE_ENV,
        SALT_ROUNDS: 10,
        PRICE_ID: process.env.PRICE_ID,
        FRONT_END_URL: 'http://localhost:5173',
      }
    : {
        APP_KEY: process.env.APP_KEY,
        DB_HOST: process.env.DB_HOST,
        DB_PORT: process.env.DB_PORT,
        DB_USERNAME: process.env.DB_USERNAME,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_DATABASE_NAME: process.env.DB_DATABASE_NAME,
        SALT_ROUNDS: process.env.SALT_ROUNDS || 10,
        NODE_ENV,
        PRICE_ID: process.env.PRICE_ID,
        FRONT_END_URL: process.env.FRONT_END_URL,
      };
};
