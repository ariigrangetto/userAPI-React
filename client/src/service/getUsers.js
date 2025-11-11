const API_URL = import.meta.env.VITE_API_URL;

export default async function getUsers() {
  try {
    const result = await fetch(`${API_URL}/users`);
    if (!result.ok) {
      throw new Error("Error fetching data");
    }
    const data = await result.json();
    return data.users;
  } catch (e) {
    console.error("Error fetching data" + e.message);
  }
}
