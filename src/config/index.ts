export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    type: process.env.PG_TYPE,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT || 5432,
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
  },
  jwt: {
    access_secret: process.env.JWT_ACCESS_SECRET,
    refresh_secret: process.env.JWT_REFRESH_SECRET,
  },
  aws: {
    s3_bucket: process.env.AWS_S3_BUCKET,
    s3_accessKeyId: process.env.AWS_S3_ACCESSKEYID,
    s3_secretAccessKey: process.env.AWS_S3_SECRETACCESSKEY,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
  },
});
