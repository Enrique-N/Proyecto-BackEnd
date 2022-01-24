let admin = require("firebase-admin");

let serviceAccount = require("./config/dbcoder-97950-firebase-adminsdk-xwvgp-f56666dd9f.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


const db = admin.firestore();

module.exports = { db }