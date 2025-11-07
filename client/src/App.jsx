import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import { getUsers } from "./service/getUsers";
import WithoutUsers from "./mocks/without-users.jsx";
import WithUsers from "./mocks/with-users.jsx";

function App() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const RESULTS_PER_PAGE = 4;

  useEffect(() => {
    async function getApiUser() {
      const data = await getUsers();
      console.log(data);
      setUsers(data);
    }
    getApiUser();
  }, []);

  const totalPages = Math.ceil(users.length / RESULTS_PER_PAGE);

  const resultsPerPage = users.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  );

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <>
      <header></header>
      <main>
        <section className='users-lists'>
          {resultsPerPage.length > 0 ? (
            <WithUsers users={resultsPerPage} />
          ) : (
            <WithoutUsers />
          )}
          {pages.map((_, index) => (
            <button onClick={() => setCurrentPage(index + 1)} key={index}>
              {index + 1}
            </button>
          ))}
        </section>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
