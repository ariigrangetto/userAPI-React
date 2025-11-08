import { useId } from "react";

export default function SearchUser({
  onTextToFilter,
  setFilter,
  onSearch,
  filters,
}) {
  const searchUserForm = useId();
  const labelGender = useId();
  const labelRol = useId();
  const idRol = useId();
  const idGender = useId();
  const idInput = useId();

  const handleSearchUser = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const filter = {
      rol: formData.get(idRol),
      gender: formData.get(idGender),
    };

    onSearch(filter);
  };

  const handleChangeRol = (e) => {
    const newRol = e.target.value;
    setFilter((filter) => ({
      ...filter,
      rol: newRol,
    }));

    onSearch({ ...filters, rol: newRol });
  };

  const handleChangeGender = (e) => {
    const newGender = e.target.value;
    setFilter((filter) => ({
      ...filter,
      gender: newGender,
    }));

    //esto asincrono, me aseguro de pasar el dato actualizado
    onSearch({ ...filters, gender: newGender });
  };

  const handleChangeInput = (e) => {
    const search = e.target.value;
    onTextToFilter(search);
    //realizar el debounce
  };

  return (
    <>
      <section>
        <form action='submit' onSubmit={handleSearchUser} name={searchUserForm}>
          <div>
            <input
              type='text'
              name={idInput}
              placeholder='Emily, Oliva...'
              onChange={handleChangeInput}
            />
            <button type='submit'>Search</button>
          </div>
          <div>
            <label htmlFor={labelGender}>Gender:</label>
            <select name={idGender} id={idGender} onChange={handleChangeGender}>
              <option value=''>All</option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
            </select>
            <label htmlFor={labelRol}>Rol:</label>
            <select name={idRol} id={idRol} onChange={handleChangeRol}>
              <option value=''>All</option>
              <option value='moderator'>Moderator</option>
              <option value='admin'>Admin</option>
            </select>
          </div>
        </form>
      </section>
    </>
  );
}
