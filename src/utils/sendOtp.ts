declare global {
  interface Window {
    recaptchaVerifier: import("firebase/auth").RecaptchaVerifier;
  }
}

// src/utils/sendOtp.ts

import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from "firebase/auth";
import { auth } from "@/firebase/config"; // adjust the path if your firebase.ts is elsewhere

export const setupRecaptcha = () => {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: () => {
          // reCAPTCHA solved
        },
        "expired-callback": () => {
          alert("Recaptcha expired. Please try again.");
        },
      }
    );
    window.recaptchaVerifier.render();
  }
};

export const sendOTP = async (phone: string): Promise<ConfirmationResult> => {
  try {
    setupRecaptcha();
    const fullPhone = phone.startsWith("+91") ? phone : `+91${phone}`;
    const confirmationResult = await signInWithPhoneNumber(
      auth,
      fullPhone,
      window.recaptchaVerifier
    );
    return confirmationResult;
  } catch (err: any) {
    console.error("OTP sending error:", err);
    throw new Error(err.message || "Failed to send OTP. Try again.");
  }
};
