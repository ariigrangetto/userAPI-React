import { memo, useId } from "react";
import "./SearchUser.css";
import type { filterTypes } from "../type.js";

interface SearchUserProps {
  onTextToFilter: (text: string) => void;
  setFilter: React.Dispatch<React.SetStateAction<filterTypes>>;
  onSearch: (filters: filterTypes) => void;
  filters: filterTypes;
}

export const SearchUser = memo(function SearchUser({
  onTextToFilter,
  setFilter,
  onSearch,
  filters,
}: SearchUserProps) {
  const searchUserForm = useId();
  const labelGender = useId();
  const labelRole = useId();
  const idRole = useId();
  const idGender = useId();
  const idInput = useId();

  const handleSearchUser = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const filter = {
      role: formData.get(idRole),
      gender: formData.get(idGender),
    };

    onSearch(filter);
  };

  const handleChangeRole = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRol = e.target.value;
    setFilter((filter) => ({
      ...filter,
      role: newRol,
    }));

    onSearch({ ...filters, role: newRol });
  };

  const handleChangeGender = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newGender = e.target.value;
    setFilter((filter) => ({
      ...filter,
      gender: newGender,
    }));

    //esto asincrono, me aseguro de pasar el dato actualizado
    onSearch({ ...filters, gender: newGender });
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    setTimeout(() => {
      onTextToFilter(search);
    }, 1000);
  };

  return (
    <>
      <section className='users-search'>
        <form action='submit' onSubmit={handleSearchUser} name={searchUserForm}>
          <div className='search-bar'>
            <input
              type='text'
              name={idInput}
              placeholder='Emily, Oliva...'
              onChange={handleChangeInput}
            />
            <button type='submit'>Search</button>
          </div>
          <div className='search-filters'>
            <label htmlFor={labelGender}>Gender </label>
            <select name={idGender} id={idGender} onChange={handleChangeGender}>
              <option value=''>All</option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
            </select>
            <label htmlFor={labelRole}>Role</label>
            <select name={idRole} id={idRole} onChange={handleChangeRole}>
              <option value=''>All</option>
              <option value='moderator'>Moderator</option>
              <option value='admin'>Admin</option>
            </select>
          </div>
        </form>
      </section>
    </>
  );
});
