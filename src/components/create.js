import styled from "styled-components";
import Image from "next/image";

import logo from "/public/logo.jpg";

const StyledFormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  box-sizing: border-box;
  overflow-y: auto;
`;

const StyledImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: 300px;
  max-width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f2f2f2;
`;

const StyledTextarea = styled.textarea`
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const StyledInput = styled.input`
  margin-top: 5px;
  margin-bottom: 10px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const StyledInterestWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const StyledInterestBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const StyledInterestItem = styled.div`
  display: flex;
  width: 100%;
  margin-left: 10px;
  margin-right: 10px;

  justify-content: space-between;
`;

const StyledLink = styled.a`
  color: black;
`;

const StyledButton = styled.button`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  width: 100%;
`;

export default function Create() {
  let finalUser = {};

  const handleSubmit = (e) => {
    e.preventDefault();

    // get form data
    const formData = new FormData(e.target);

    // get checked interests
    const interests = Array.from(formData.getAll("interests")).filter(
      (interest) => interest !== ""
    );

    // combine user object
    const userObject = {
      ...Object.fromEntries(formData.entries()),
      interests,
    };

    finalUser = userObject;
    createUser();
    e.target.reset();

    console.log(finalUser);
  };

  async function createUser() {
    const response = await fetch("/api/users/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalUser),
    });

    if (!response.ok) {
      console.error(response.status);
    }
  }

  return (
    <>
      <StyledFormWrapper>
        <StyledForm onSubmit={handleSubmit}>
          <StyledImageWrapper>
            <Image priority src={logo} alt="logo" width={100} height={100} />
          </StyledImageWrapper>
          <label htmlFor="company">Company</label>
          <StyledInput type="text" name="company" id="company" required />

          <label htmlFor="title">Title</label>
          <StyledInput type="text" name="title" id="title" required />

          <label htmlFor="firstName">First name*</label>
          <StyledInput type="text" name="firstName" id="firstName" required />

          <label htmlFor="lastName">Last name*</label>
          <StyledInput type="text" name="lastName" id="lastName" required />

          <label htmlFor="address">Address*</label>
          <StyledInput type="text" name="address" id="address" required />

          <label htmlFor="zipCode">Zipcode*</label>
          <StyledInput type="text" name="zipCode" id="zipCode" required />

          <label htmlFor="city">City*</label>
          <StyledInput type="text" name="city" id="city" required />

          <label htmlFor="country">Country*</label>
          <StyledInput type="text" name="country" id="country" required />

          <label htmlFor="email">E-Mail</label>
          <StyledInput type="email" name="email" id="email" />

          <label htmlFor="phone">Phone</label>
          <StyledInput type="text" name="phone" id="phone" />
          <br />
          <StyledInterestWrapper>
            <StyledInterestBox>
              <StyledInterestItem>
                <label htmlFor="ozon">Ozon</label>
                <input
                  type="checkbox"
                  name="interests"
                  id="ozon"
                  value="ozon"
                />
              </StyledInterestItem>

              <StyledInterestItem>
                <label htmlFor="colon">Colon</label>
                <input
                  type="checkbox"
                  name="interests"
                  id="colon"
                  value="colon"
                />
              </StyledInterestItem>
            </StyledInterestBox>
            <StyledInterestBox>
              <StyledInterestItem>
                <label htmlFor="veterinary">Veterinary</label>
                <input
                  type="checkbox"
                  name="interests"
                  id="veterinary"
                  value="veterinary"
                />
              </StyledInterestItem>
              <StyledInterestItem>
                <label htmlFor="disposables">Disposables</label>
                <input
                  type="checkbox"
                  name="interests"
                  id="disposables"
                  value="disposables"
                />
              </StyledInterestItem>
            </StyledInterestBox>
          </StyledInterestWrapper>
          <br />
          <label htmlFor="information">Information</label>
          <StyledTextarea type="text" name="information" id="information" />
          <br />

          <div>
            <StyledLink
              href="/HAB_Datenschutzerklaerung_2019_12.pdf"
              target="_blank"
            >
              Privacy Policy
            </StyledLink>
            <input
              type="checkbox"
              name="dsgvo"
              id="dsgvo"
              required
              value={"true"}
            />
          </div>

          <br />

          <StyledButton type="submit">Submit</StyledButton>
        </StyledForm>
      </StyledFormWrapper>
    </>
  );
}
