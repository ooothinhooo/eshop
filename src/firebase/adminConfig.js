import admin from "firebase-admin";
import serviceAccount from "~/secret/ecomerce-duck-acba153957d4.json";

export const adminConfig = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const expiresMinutes = 15;
const expirationTime = new Date().getTime() + expiresMinutes * 60 * 1000;

export const generateToken = (uid) => {
  admin
    .auth()
    .createCustomToken(uid, {
      expiresIn: expirationTime * 60,
    })
    .then((customToken) => {
      return customToken;
    })
    .catch((error) => {
      console.error("Error creating custom token", error);
    });
};

// export const revokeRefreshToken = (uid) => {
//     getAuth().
// }
