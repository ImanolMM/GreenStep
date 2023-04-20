import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {useEffect, useState} from "react";
import "./app.css"

firebase.initializeApp({
    apiKey: "AIzaSyCrhi8K1XQVuzVX0jTiF3xXG-Jo-YYQVYw",
    authDomain: "greenstep-72aa5.firebaseapp.com",
    projectId: "greenstep-72aa5",
    storageBucket: "greenstep-72aa5.appspot.com",
    messagingSenderId: "824927867442",
    appId: "1:824927867442:web:bbb82a4f759b383b1aa22b"
})

const firestore = firebase.firestore();
const auth = firebase.auth();
/*
firestore.collection('imanoltxitu').where('nombre', '==', 'imanol').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        console.log(doc.data());
    })
});
firestore.collection('imanoltxitu').add({nombre : "imanol"}


 */
firestore.collection('imanoltxitu').add({nombre : "imanol"});
// Deleting document with nombre imanol from the collection
// firestore.collection('imanoltxitu').where('nombre', '==', 'imanol').get().then((snapshot) => {

firestore.collection('imanoltxitu').where('nombre', '==', 'imanol').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        doc.ref.delete().catch((error) => {console.log("hola")});
    })
});

// Updating document with nombre imanol from the collection
firestore.collection('imanoltxitu').where('nombre', '==', 'imanol').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        doc.ref.update({nombre : "imanol updated"}).catch((error) => {console.log("hola2")});
    });
});

function App() {
  const [user] = useAuthState(auth);
  const [datos] = useCollectionData(firestore.collection('imanoltxitu'));
  const [imagen, setImagen] = useState('');
  const [contador, setContador] = useState(0);

  useEffect(() => {
      fetch('https://dog.ceo/api/breeds/image/random').then((response) => response.json()).then
      ((data) => {
          setImagen(data.message);
      });
  }, [contador]);

console.log(datos);

  return (
    <div>
      <header>
          <div>
              <h1  className="title">Chap</h1>
          </div>
        </header>
        <section className="container">
            {user ? <ChatRoom /> : <SignIn style="button" />}
            <SignOut style="button"/>
            <img src={imagen} alt="imagen" />
            <button className="button" onClick={() => setContador(contador + 1)}>Contador</button>
        </section>
    </div>
  );
}

function ChatRoom() {}
function SignIn({style}) {
const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  return (
    <button className={style ? style : ""} onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

function SignOut({ style }) {
  return auth.currentUser && (
    <button className={style ? style : ""} onClick={() => auth.signOut()}>Sign Out</button>
  )
}

export default App;
