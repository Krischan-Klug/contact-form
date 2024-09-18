export default function Create() {
  let finalUser = {};
  const handleSubmit = (e) => {
    e.preventDefault();

    // get form data
    const formData = new FormData(e.target);
    const userObject = Object.fromEntries(formData.entries());

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
      <form onSubmit={handleSubmit}>
        <h1>Contact</h1>
        <label htmlFor="firstName">First name</label>
        <input type="text" name="firstName" id="firstName" required />
        <label htmlFor="lastName">Last name</label>
        <input type="text" name="lastName" id="lastName" required />
        <label htmlFor="address">Address</label>
        <input type="text" name="address" id="address" required />
        <label htmlFor="zipCode">Zipcode</label>
        <input type="text" name="zipCode" id="zipCode" required />
        <label htmlFor="city">City</label>
        <input type="text" name="city" id="city" required />
        <label htmlFor="country">Country</label>
        <input type="text" name="country" id="country" required />
        <label htmlFor="email">E-Mail</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="phone">Phone</label>
        <input type="text" name="phone" id="phone" />
        <br />

        <label htmlFor="ozon">Ozon</label>
        <input type="checkbox" name="ozon" id="ozon" value={"true"} />
        <label htmlFor="colon">Colon</label>
        <input type="checkbox" name="colon" id="colon" value={"true"} />
        <label htmlFor="veterinary">Veterinary</label>
        <input
          type="checkbox"
          name="veterinary"
          id="veterinary"
          value={"true"}
        />
        <label htmlFor="disposables">Disposables</label>
        <input
          type="checkbox"
          name="disposables"
          id="disposables"
          value={"true"}
        />
        <br />

        <label htmlFor="dsgvo">DSGVO</label>
        <input
          type="checkbox"
          name="dsgvo"
          id="dsgvo"
          required
          value={"true"}
        />

        <br />

        <button type="submit">Create</button>
      </form>
    </>
  );
}
