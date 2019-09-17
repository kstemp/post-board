export const SECRET = 'JNIMFY.IVILWH,AIAVAOAI.IM,WCITTAH?';

export const POSTGRES_USER = 'postgres';
export const POSTGRES_PASSWORD = 'postgres';
export const POSTGRES_HOST = 'localhost';
export const POSTGRES_PORT = 5432;
export const POSTGRES_DB =
	process.env.NODE_ENV === 'production' ? 'post_db' : 'post_db_test';
