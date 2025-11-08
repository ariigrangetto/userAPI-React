import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import { getUsers } from "./service/getUsers";
import WithoutUsers from "./mocks/without-users.jsx";
import WithUsers from "./mocks/with-users.jsx";
import SearchUser from "./Components/SearchUser.jsx";

function App() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [textToFilter, setTextToFilter] = useState("");
  const [filters, setFilter] = useState({
    rol: "",
    gender: "",
  });

  const RESULTS_PER_PAGE = 4;

  useEffect(() => {
    async function getApiUser() {
      const data = await getUsers();
      setUsers(data);
    }
    getApiUser();
  }, []);

  const filteredByFilters = users.filter((user) => {
    return (
      //forma para aplicar ningun filtro
      (filters.gender === "" || user.gender === filters.gender) &&
      (filters.rol === "" || user.rol === filters.rol)
    );
  });

  const filteredByText = filteredByFilters.filter((user) =>
    user.firstName.toLowerCase().includes(textToFilter.toLowerCase())
  );

  const handleSearch = (filters) => {
    setFilter(filters);
    setCurrentPage(1);
  };

  function handleDeleteUser(id) {
    const updatedUsers = filteredByText.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    setCurrentPage(1);
  }

  const handleFilterByText = (text) => {
    setTextToFilter(text);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredByText.length / RESULTS_PER_PAGE);
  const resultsPerPage = filteredByText.slice(
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
            <>
              <SearchUser
                onTextToFilter={handleFilterByText}
                setFilter={setFilter}
                filters={filters}
                onSearch={handleSearch}
              />
              <WithUsers
                users={resultsPerPage}
                onDeleteUser={handleDeleteUser}
              />
            </>
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

//cuando utilizar useState y cuando no
//Utilizarlo cuando quiero mostrar los cambios en la ui
//no utilizarlo cuando solo es algo temporal como filtrados de select e inputs

//tiene que ser algo que quiero que se muestre en la ui como eliminar un usuario
