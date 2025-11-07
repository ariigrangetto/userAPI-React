export default function WithUsers({ users }) {
  return (
    <>
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
    </>
  );
}
