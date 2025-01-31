import dotenv from 'dotenv';

dotenv.config();

const config = {
    SERVER_CONFIG: {
        LISTEN_PORT: 5000,
        LISTEN_HOST: "0.0.0.0",
        RUNNING_ENV: process.env.RUNNING_ENV,
    },
    MONGO_CONFIG: {
        MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
        MONGO_DB_NAME: process.env.DB_NAME
    },
    COLLECTION_NAMES_CONFIG: {
        KUDOS_COLLECTION: process.env.KUDOS_COLLECTION,
        EMPLOYEE_COLLECTION: process.env.EMPLOYEE_COLLECTION
    }
};

export { config };