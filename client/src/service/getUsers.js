const API_URL = import.meta.env.VITE_API_URL; // Replace with your server's port number

export async function getUsers() {
  try {
    const result = await fetch(`${API_URL}/users`);
    const data = await result.json();
    return data.users;
  } catch (e) {
    console.error("Error fetching data" + e.message);
  }
}
