import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { ListGroup } from "react-bootstrap";

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    const getData = async () => {
      let result = [];
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        result.push(doc.data());
      });
      setData(result);
    };
    getData();
  }, []);

  useEffect(() => {
    (async () => {
      let dataRoles = [];
      const roles = await getDocs(collection(db, "roles"));
      roles.forEach((doc) => {
        dataRoles.push(doc.data());
      });

      if (dataRoles && data) {
        let newData = data.map((item) => {
          let role = dataRoles.find((role) => role.role === item.role);
          return { ...item, job: role.type };
        });
        setData(newData);
      }
    })();
  }, [data]);

  return (
    <div className="flex justify-content-center align-items-center h-100">
      <div className="container w-25 h-auto">
        <h1 className="text-center">Firebase Storage</h1>
        <ListGroup>
          {data &&
            data.map((item, index) => {
              return (
                <ListGroup.Item key={index}>
                  <img
                    src={item.image}
                    alt=""
                    width="50"
                    height="50"
                    className="rounded-circle me-2 background-position-center background-size-cover background-repeat-no-repeat"
                  />
                  {item.name} - {item.job}
                </ListGroup.Item>
              );
            })}
        </ListGroup>
      </div>
    </div>
  );
}

export default App;
