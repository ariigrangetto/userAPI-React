import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import { getUsers } from "./service/getUsers";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getApiUser() {
      const data = await getUsers();
      console.log(data);
      setUsers(data);
    }

    getApiUser();
  }, []);
  return (
    <>
      <header></header>
      <main>
        <section className='users-lists'>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <p>{user.firstName}</p>
                <p>{user.lastName}</p>
                <p>{user.maidenName}</p>
                <p>{user.age}</p>
                <p>{user.phone}</p>
                <p>{user.role}</p>
                <p>{user.birthDate}</p>
                <p>{user.email}</p>
                <p>{user.eyeColor}</p>
                <p>{user.gender}</p>
                <p>{user.university}</p>
                <p>{user.username}</p>
                <p>{user.weight}</p>
                <p>{user.height}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
