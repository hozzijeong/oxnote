// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyDF0uiL7u90rUJOKlrNSQC-srE9LwTJtMA',
	authDomain: 'oxnote-a10a9.firebaseapp.com',
	projectId: 'oxnote-a10a9',
	storageBucket: 'oxnote-a10a9.appspot.com',
	messagingSenderId: '253160493773',
	appId: '1:253160493773:web:3ba71177f4b4b947308f84',
	measurementId: 'G-TDFJN9W529',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
