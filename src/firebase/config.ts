import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDW2NNAWAPHPDrOKSzJ8NeTWmX4tLRxYcc",
    authDomain: "testtask-blogapp.firebaseapp.com",
    projectId: "testtask-blogapp",
    storageBucket: "testtask-blogapp.firebasestorage.app",
    messagingSenderId: "1088891304284",
    appId: "1:1088891304284:web:c68300265d56aa548fe999",
    measurementId: "G-DQNV4XG1DZ"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);