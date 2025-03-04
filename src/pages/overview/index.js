import { useState, useEffect } from "react";
import styled from "styled-components";

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  min-width: 100vw;
`;

const StyledUserCard = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  min-width: 300px;
  max-width: 90vw;
  box-sizing: border-box;
  overflow-y: auto;
`;

const StyledCardText = styled.p`
  margin: 6px;
`;

const StyledInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: 5px;
`;

const StyledInterestsWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledH3 = styled.h3`
  margin: 3px;
`;

const CopyButton = styled.button`
  margin-top: 10px;
  padding: 6px 12px;
  cursor: pointer;
`;

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
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }

      fetchData();
    }
  }, [isAuthenticated]);

  const handleCopy = (user) => {
    const formattedText = `${user.title} ${user.firstName} ${user.lastName}
${user.address}
${user.country}
${user.zipCode} ${user.city}
${user.email}
${user.phone}`;

    navigator.clipboard.writeText(formattedText);
  };

  if (!isAuthenticated) {
    return (
      <ContentWrapper>
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
      </ContentWrapper>
    );
  }
  if (isAuthenticated) {
    return (
      <ContentWrapper>
        <h1>Overview</h1>
        {users.map((user) => (
          <StyledUserCard key={user._id}>
            <StyledH3>{user.company}</StyledH3>
            <StyledCardText>
              {user.title} {user.firstName} {user.lastName}
            </StyledCardText>
            <StyledCardText>{user.address}</StyledCardText>
            <StyledCardText>
              {user.zipCode} {user.city}
            </StyledCardText>
            <StyledCardText>{user.country}</StyledCardText>
            <StyledCardText>{user.phone}</StyledCardText>
            <StyledCardText>{user.email}</StyledCardText>
            <StyledInfoWrapper>
              <StyledH3>Interessen:</StyledH3>
              <StyledInterestsWrapper>
                {user.interests.map((interest) => (
                  <StyledCardText key={interest}>{interest}</StyledCardText>
                ))}
              </StyledInterestsWrapper>
              <StyledH3>Info:</StyledH3>
              <StyledCardText>{user.information}</StyledCardText>
            </StyledInfoWrapper>

            <StyledCardText>Erstellt am: {user.createdAt}</StyledCardText>
            <CopyButton onClick={() => handleCopy(user)}>
              Daten kopieren
            </CopyButton>
          </StyledUserCard>
        ))}
      </ContentWrapper>
    );
  }
}
