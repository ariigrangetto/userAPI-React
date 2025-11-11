import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import WithoutUsers from "./mocks/without-users";
import WithUsers from "./mocks/with-users.js";
import { SearchUser } from "./Components/SearchUser";
import type { filterTypes, USERS } from "./type.d.ts";
import useSearch from "./hooks/useUsers";

function App() {
  const [users, setUsers] = useState<USERS[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [textToFilter, setTextToFilter] = useState<string>("");
  const [sortByName, setSortByName] = useState<boolean>(false);
  const [sortByAge, setSortByAge] = useState<boolean>(false);
  const { isLoading, isError, data } = useSearch();
  const [filters, setFilter] = useState<filterTypes>({
    role: "",
    gender: "",
  });

  useEffect(() => {
    setUsers(data);
  }, []);

  const RESULTS_PER_PAGE = 4;

  const filteredByFilters = users?.filter((user) => {
    return (
      //forma para aplicar ningun filtro = ""
      (filters.gender === "" || user.gender === filters.gender) &&
      (filters.role === "" || user.role === filters.role)
    );
  });

  const filteredByText = filteredByFilters?.filter(
    (user) =>
      user.firstName.toLowerCase().includes(textToFilter.toLowerCase()) ||
      user.lastName.toLowerCase().includes(textToFilter.toLocaleLowerCase())
  );

  const handleSearch = (filters: filterTypes) => {
    setFilter(filters);
    setCurrentPage(1);
  };

  function handleDeleteUser(id: number | string) {
    const updatedUsers = filteredByText.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    setCurrentPage(1);
  }

  const handleFilterByText = (text: string) => {
    setTextToFilter(text);
    setCurrentPage(1);
  };

  const handleSortUserByName = () => {
    setSortByName((prev) => !prev);
  };

  const handleSortByAge = () => {
    setSortByAge((prev) => !prev);
  };

  const sortedUsersByName = sortByName
    ? filteredByText.toSorted((a, b) => a.firstName.localeCompare(b.firstName))
    : filteredByText;

  const sortedUsers = sortByAge
    ? sortedUsersByName.toSorted((a, b) => a.age - b.age)
    : sortedUsersByName;

  const totalPages = Math.ceil(sortedUsers?.length / RESULTS_PER_PAGE);
  const resultsPerPage = sortedUsers?.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  );
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const isLastPage = currentPage === totalPages;
  const isFirstPage = currentPage === 1;

  const stylePrevButton = isFirstPage ? "opacity-50 pointer-events-none" : "";
  const styleNextButton = isLastPage ? "opacity-50 pointer-events-none" : "";

  const handlePrevPage = () => {
    if (!isFirstPage) {
      setCurrentPage((prev) => prev - 1);
    }
    return;
  };

  const handleNextPage = () => {
    if (!isLastPage) {
      setCurrentPage((prev) => prev + 1);
    }
    return;
  };

  return (
    <>
      <header></header>
      <main>
        <section className='users-lists'>
          {resultsPerPage?.length > 0 ? (
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
                onSortUsersName={handleSortUserByName}
                onSortUsersAge={handleSortByAge}
              />
              <button onClick={handlePrevPage} className={stylePrevButton}>
                prev
              </button>
              {pages.map((_, index) => (
                <>
                  <button
                    onClick={() => setCurrentPage(index + 1)}
                    className={currentPage === index + 1 ? "isActive" : ""}
                    key={index}
                  >
                    {index + 1}
                  </button>
                </>
              ))}
              <button onClick={handleNextPage} className={styleNextButton}>
                next
              </button>
            </>
          ) : (
            <WithoutUsers />
          )}
        </section>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
