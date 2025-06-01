import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  GoogleAuthProvider,
  signInWithPopup,
  linkWithPhoneNumber,
  PhoneAuthProvider,
  RecaptchaVerifier,
  linkWithCredential,
} from "firebase/auth";

export type AuthUser = User | null;
//Sign Up
export const signup = async (
  email: string,
  password: string,
  userName: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
             localStorage.setItem('user profile', JSON.stringify({name: userName}))


    return userCredential.user;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

//Sign In
export const signin = async (email: string, password: string) => {
  
  try {
     if (auth.currentUser && auth.currentUser.email !== email) {
      await signOut(auth);
    }
    const userCredential = await signInWithEmailAndPassword(
      auth,  
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};
/// SIgn In With GOOGLE
export const signInWithGoogle = async () => {
  if (auth.currentUser) {
    await signOut(auth)
  }
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result.user;

};
//Sign Out
export const signout = async (): Promise<void> => {
  try {
    await signOut(auth);

  } catch (error) {
    console.error("Error signing out:", error);
  }
};
export const setupRecaptcha = () => {
  if (typeof window !== "undefined" && !window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: () => {
          console.log("recaptcha solved");
        },
        "expired-captcha": () => {
          console.warn("captcha-expired");
        },
      }
    );
  }
};
export const linkPhoneNumberWithUser = async (
  user: User,
  phoneNumber: string
) => {
  if (!window.recaptchaVerifier) {
    throw "captcha had not initalized";
  }
  const phoneNumberProvider = new PhoneAuthProvider(auth);
  const verificationId = phoneNumberProvider.verifyPhoneNumber(
    phoneNumber,
    window.recaptchaVerifier
  );
  return verificationId;
};
export const confirmPhoneVerificationCode = async (
  user: User,
  verificationId: string,
  code: string
) => {
  const credential = PhoneAuthProvider.credential(verificationId, code);
  return await linkWithCredential(user, credential);
};

