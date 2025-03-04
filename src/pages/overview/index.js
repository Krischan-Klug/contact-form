import { useState, useEffect } from "react";

export default function Overview() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState([]);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    const data = await res.json();

    if (data.success) {
      setIsAuthenticated(true);
      setError(null);
    } else {
      setError(data.message);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      async function fetchData() {
        try {
          const response = await fetch("/api/users/users");
          const data = await response.json();
          setUsers(data);
          console.log(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }

      fetchData();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <>
        <h1>Overview</h1>
        <h2>Bitte Passwort eingeben</h2>
        <form onSubmit={handlePasswordSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Passwort"
          />
          <button type="submit">Einloggen</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </>
    );
  }
  if (isAuthenticated) {
    return (
      <>
        <h1>Overview</h1>
        <h2>Benutzer</h2>
        {users.map((user) => (
          <div key={user._id}>
            <h3>{user.company}</h3>
            <p>{user.title}</p>
            <p>{user.firstName}</p>
            <p>{user.lastName}</p>
            <p>{user.address}</p>
            <p>{user.zipCode}</p>
            <p>{user.city}</p>
            <p>{user.country}</p>
            <p>{user.phone}</p>
            <p>{user.interests}</p>
            <p>{user.information}</p>
            <p>{user.createdAt}</p>
            <p>{user.email}</p>
          </div>
        ))}
      </>
    );
  }
}
