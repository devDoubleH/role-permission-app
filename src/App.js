import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { db } from "./firebase";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

function App() {
  const [data, setData] = React.useState([]);
  const [role, setRole] = React.useState();
  const [images, setImages] = React.useState([]);

  const capitialize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  React.useEffect(() => {
    (async () => {
      try {
        const q = await getDocs(collection(db, "users"));
        const data = q.docs.map((doc) => doc.data());
        setData(data);
      } catch (error) {
        console.log(error);
      } finally {
        console.log("sent");
      }
    })();

    (async () => {
      try {
        const q = await getDocs(collection(db, "roles"));
        const data = q.docs.map((doc) => doc.data());
        setRole(data);
      } catch (error) {
        console.log(error);
      } finally {
        console.log("sent");
      }
    })();

    (async () => {})();
  }, []);

  return (
    <div className="w-100 h-auto">
      <div className="d-flex flex-column align-items-center justify-content-center">
        <h1>Users</h1>
        <ListGroup className="w-50">
          {data.map((item, i) => (
            <ListGroup.Item key={i}>{JSON.stringify(item)} </ListGroup.Item>
          ))}
        </ListGroup>

        <h1>Roles</h1>
        <ListGroup className="w-50">
          {role?.map((item, i) => (
            <ListGroup.Item key={i}>{JSON.stringify(item)} </ListGroup.Item>
          ))}
        </ListGroup>

        <h1>Images</h1>
        <ListGroup className="w-50">
          {images.map((item, i) => (
            <ListGroup.Item key={i}>{JSON.stringify(item)} </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
}

export default App;
