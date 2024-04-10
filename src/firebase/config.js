import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_REACT_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_REACT_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_REACT_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_REACT_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: "683145378767",
//   appId: "1:683145378767:web:06c4346b46f1a37cc2b0ba",
//   measurementId: "G-D95YNJWJWP",
// };

// const firebaseConfig = {
//   apiKey: "AIzaSyBZ7Ul8u-3SCXCriJHXXGQsNyhsU3q2Bko",
//   authDomain: "pla-de972.firebaseapp.com",
//   projectId: "pla-de972",
//   storageBucket: "pla-de972.appspot.com",
//   messagingSenderId: "164706219147",
//   appId: "1:164706219147:web:7ae1c0b9e0ad576785508e",
//   measurementId: "G-DSK4X6Q415"
// };
const firebaseConfig = {
  apiKey: "AIzaSyBTWjIlm9-X7649CmHlav7x8raGbzxsfmw",
  authDomain: "shop-551b8.firebaseapp.com",
  projectId: "shop-551b8",
  storageBucket: "shop-551b8.appspot.com",
  messagingSenderId: "108052303362",
  appId: "1:108052303362:web:11221b9561a043fd8fe11b",
  measurementId: "G-468BCYVN0G"
};
// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
// auth.languageCode = auth.useDeviceLanguage();
// auth.tenantId = "test-hp8l7";
export const adminUser = ["admin@gmail.com", "hoangtan@gmail.com",'nguyenquocviet@gmail.com','test@gmail.com'];

export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
export const analytics = getAnalytics(app);
export const updateProduct = async (oid, newTotal) => {
  const db = getFirestore();
  console.log(oid);
  const docRef = doc(db, 'products', oid);

  updateDoc(docRef, {
    sum: newTotal,
})
    .then(() => {
        // console.log('unliked');
    })
    .catch((e) => {
        console.log(e);
    });
};



// const firebaseConfig = {
//   apiKey: "AIzaSyBTWjIlm9-X7649CmHlav7x8raGbzxsfmw",
//   authDomain: "shop-551b8.firebaseapp.com",
//   projectId: "shop-551b8",
//   storageBucket: "shop-551b8.appspot.com",
//   messagingSenderId: "108052303362",
//   appId: "1:108052303362:web:11221b9561a043fd8fe11b",
//   measurementId: "G-468BCYVN0G"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);