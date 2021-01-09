const prodEmail = {
    name: "prod",
    port: process.env.SMTP_PORT || 25,
    ignoreTLS: true,
    host: process.env.SMTP_HOST || "localhost",
};

const devEmail = {
    name: "test",
    streamTransport: true,
    newline: "unix",
    buffer: true,
};

export default {
    port: process.env.PORT || 3432,
    authKey: process.env.AUTH_KEY || "secret",
    nodemailer: process.env.NODE_ENV === "production" ? prodEmail : devEmail,
};
