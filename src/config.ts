/* eslint-disable no-magic-numbers */
export const PORT = process.env.PORT || 4000;
export const JWT_SECRET = process.env.JWT_SECRET || 'LOLIDK';
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'LOLIDK2';
export const AWS_REGION = process.env.AWS_REGION || 'eu-west-2';
export const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME || 'inst-graphql-api';
export const AWS_USER_KEY = process.env.AWS_USER_KEY || 'AKIAUGSVZHSWUXN4Q5QO';
export const AWS_USER_SECRET_KEY = process.env.AWS_USER_SECRET_KEY || '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';
export const SIGN_URL_EXPIRES = process.env.SIGN_URL_EXPIRES || '3600';
export const WEB_SOCKET_SERVER_PORT = process.env.WEB_SOCKET_SERVER_PORT || 4001;
export const DEFAULT_IMAGE = 'https://aws-sign-url.s3.eu-west-2.amazonaws.com/SadCalendar.svg';
export const SERVER_TYPE = process.env.SERVER_TYPE || 'dev';
export const MAIL_URL = process.env.MAIL_URL;
export const MAIL_PASS = process.env.MAIL_PASS;
export const LOG_DIR = process.env.LOG_DIR || 'logs';
export const LOG_FILE = process.env.LOG_FILE || 'app.log';
