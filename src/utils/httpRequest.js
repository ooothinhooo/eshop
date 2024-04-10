import axios from "axios";
import firebase from "firebase/compat/app";
import { auth } from "~/firebase/config";

// const apiUrl = "http://127.0.0.1:5173";
const apiUrl = "http://localhost:3000";
const httpRequest = axios.create({
  baseURL: apiUrl,
});

export const get = async (path, options = {}) => {
  const response = await httpRequest.get(path, options);

  return response.data;
};

export const post = async (path, options = {}) => {
  const response = await httpRequest.post(path, options);
  console.log(response)
  return response.data;
};

const getFirebaseToken = async () => {
  const currentUser = auth.currentUser;
  if (currentUser) return currentUser.getIdToken();

  const rememberAccount = window.indexedDB.open("firebaseLocalStorage");
  if (!rememberAccount) return null;

  return new Promise((resolve, reject) => {
    const waitTimeout = setTimeout(() => {
      reject(null);
      console.log("rejec timeout");
    }, 10000);

    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(async (user) => {
        if (!user) {
          reject(null);
        }
        const token = await user.getIdToken();
        console.log("[AXIOS] Logged in user token :" + token);
        resolve(token);

        unregisterAuthObserver();
        clearTimeout(waitTimeout);
      });
  });
};

// httpRequest.interceptors.request.use(async (config) => {
//   //Fix race condition
//   const token = await getFirebaseToken();
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default httpRequest;
