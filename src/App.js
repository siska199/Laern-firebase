import "./App.css";
import { useState, useEffect } from "react";
import { db } from "./firebase.config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { async } from "@firebase/util";

function App() {
  useEffect(() => {
    handleGetUsers();
  }, []);
  const userCollectionRes = collection(db, "users");

  //Get Data
  const [users, setUsers] = useState();
  const handleGetUsers = async () => {
    const res = await getDocs(userCollectionRes);
    console.log("res:", res);
    const data = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setUsers(data);
    console.log("Data: ", data);
  };

  //Create data
  const [userData, setUserData] = useState({
    name: "",
    age: "",
  });

  const handleAddUser = async (e) => {
    e.preventDefault();
    console.log("Data yang akan dikirim: ", userData);
    const res = await addDoc(userCollectionRes, userData);
    console.log("res add user: ", res);
  };

  //Update user
  const handleUpdateUser = async (id, age) => {
    const userDoc = doc(db, "users", id); //get specified document
    const updateData = {
      age: age + 1,
    };
    const res = await updateDoc(userDoc, updateData);
    console.log("res update data: ", res);
  };

  //Delete user
  const handleDeleteUser = async (id) => {
    const userDoc = doc(db, "users", id); //get specified document
    await deleteDoc(userDoc);
  };
  return (
    <div className="App">
      <form className="form-add-user">
        <input
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          placeholder="name"
        />
        <input
          type="number"
          onChange={(e) => setUserData({ ...userData, age: e.target.value })}
          placeholder="age"
        />
        <button onClick={(e) => handleAddUser(e)}>Add User</button>
      </form>

      {users?.map((user) => (
        <div key={user.id}>
          <h1>{user.name}</h1>
          <h2>{user.age}</h2>
          <button onClick={() => handleUpdateUser(user.id, user.age)}>
            Increase Age
          </button>
          <button onClick={() => handleDeleteUser(user.id)}>Delete User</button>
        </div>
      ))}
    </div>
  );
}

export default App;
