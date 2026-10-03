import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuración de tu proyecto RadioPerla
const firebaseConfig = {
  apiKey: "AIzaSyBGli_dXQoaR2tqrb_nekcVsqJMjRlTk71o",
  authDomain: "radioperla-6fd1b.firebaseapp.com",
  projectId: "radioperla-6fd1b",
  storageBucket: "radioperla-6fd1b.firebasestorage.app",
  messagingSenderId: "29992320840",
  appId: "1:29992320840:web:5573a7817bd7863472bd7d",
  measurementId: "G-CK87EPG1F7"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar la base de datos para usarla en los componentes
export const db = getFirestore(app);