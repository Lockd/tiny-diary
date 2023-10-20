import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  doc,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence } from "firebase/auth";
import {
  GoogleAuthProvider,
  signInWithPopup,
  browserLocalPersistence,
  signOut,
  User,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_APP_MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence).then(() =>
  console.log("[Firebase]: Auth persistence is set to local")
);

export const authProvider = new GoogleAuthProvider();

export const googleSignIn = () => signInWithPopup(auth, authProvider);

export const appSignOut = () => signOut(auth);

export const saveUserInfo = async (user: User) => {
  const { displayName: name, email, uid } = user;
  const userInfo = { name, email, uid };

  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      await addDoc(collection(db, "users"), userInfo);
    } else {
      console.log("[saveUserInfo]: User was already present");
    }
  } catch (e) {
    console.error("[saveUserInfo]: error occurred during user creation", e);
  }
};
