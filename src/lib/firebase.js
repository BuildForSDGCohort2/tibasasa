import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import shortid from "shortid";

const firebaseConfig = {
  apiKey: "AIzaSyAholaJfeEAp4bhfBn8P9GPA4ReHqmQ0Vk",
  authDomain: "tibasasa.firebaseapp.com",
  databaseURL: "https://tibasasa.firebaseio.com",
  projectId: "tibasasa",
  storageBucket: "tibasasa.appspot.com",
  messagingSenderId: "252993570627",
  appId: "1:252993570627:web:f86d477c33f1cf866f51f6",
  measurementId: "G-FEY36HR4X2",
};

class Firebase {
  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.auth = firebase.auth();
    this.firestore = firebase.firestore();
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  getCurrentUser() {
    return this.auth.currentUser;
  }

  timestampFromDate(date) {
    return firebase.firestore.Timestamp.fromDate(date);
  }

  isInitialized() {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged(resolve);
    });
  }

  createDoc(collection, data) {
    return this.firestore
      .collection(collection)
      .doc(shortid.generate())
      .set(data);
  }

  async getAllDocs(
    collection,
    condition = { attribute: null, comparator: null, value: null }
  ) {
    let docs = [];
    let snapshot;
    condition.attribute
      ? (snapshot = await this.firestore
          .collection(collection)
          .where(condition.attribute, condition.comparator, condition.value)
          .get())
      : (snapshot = await this.firestore.collection(collection).get());
    snapshot.forEach((doc) => {
      let docData = doc.data();
      docData.id = doc.id;
      docs.push(docData);
    });
    return docs;
  }

  updateDoc(collection, docId, data) {
    return this.firestore.collection(collection).doc(docId).update(data);
  }

  deleteDoc(collection, docId) {
    return this.firestore.collection(collection).doc(docId).delete();
  }
}

export default new Firebase();
