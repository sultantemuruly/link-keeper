import { getUsers } from "@/lib/users";

export default async function LinksPage() {
  const users = await getUsers();

  return (
    <div>
      <h1>Users</h1>
      {users.length > 0 ? (
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user.name ?? "No Name Provided"}</li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}
