import dotenv from "dotenv";

dotenv.config();

const requiredVariables = [
    "MONGO_URI",
    "JWT_SECRET"
];

for (const variable of requiredVariables) {
    if (!process.env[variable]) {
        throw new Error(
            `${variable} is not defined in the environment variables`
        );
    }
}

export const ENV = {
    PORT: process.env.PORT || 5000,
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET
};