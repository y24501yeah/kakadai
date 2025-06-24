// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';//認証機能用
// Firebase構成オブジェクト(コンソールからコピペ)
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBBYgMe116hEWsC1RKEGIbJD8W6cMmNObs",
    authDomain: "kakadai-945e8.firebaseapp.com",
    projectId: "kakadai-945e8",
    storageBucket: "kakadai-945e8.firebasestorage.app",
    messagingSenderId: "683233272424",
    appId: "1:683233272424:web:0c57e32631c8b3415f91dd"
  };
// 初期化
const app = initializeApp(firebaseConfig);
// Firestoreデータベースを使う準備
const db = getFirestore(app);
// Firebase認証(Auth)を使う準備
const auth = getAuth(app); // 認証サービス本体
const provider = new GoogleAuthProvider(); // Googleログイン専用の「認証プロバイダ」
// 他のファイルでも使えるように、エクスポート
export { db, auth, provider };