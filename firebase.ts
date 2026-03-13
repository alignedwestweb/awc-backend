import admin from "firebase-admin";

let serviceAccount: any = null;

const envVar = process.env.FIREBASE_SERVICE_ACCOUNT;

if (envVar) {
  try {
    // If the string starts with '{', parse it. 
    // If it's already an object (rare), use it.
    serviceAccount = typeof envVar === 'string' ? JSON.parse(envVar) : envVar;
    
    if (serviceAccount.private_key) {
      serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
    }
  } catch (e) {
    console.error("CRITICAL: Firebase Env Var exists but is not valid JSON.");
  }
}

if (!admin.apps.length) {
  if (serviceAccount) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
    console.log("Firebase Admin Initialized Successfully");
  } else {
    console.error("Firebase Admin NOT initialized: No Service Account found.");
  }
}

export const db = admin.apps.length ? admin.firestore() : null;
export { admin };