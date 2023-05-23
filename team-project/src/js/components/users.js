let getUsers = async () => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(
      `https://team-project-d1243-default-rtdb.europe-west1.firebasedatabase.app/users.json`,
      options
    );
    const json = await response.json();
    console.log("getUsers");
    console.log(json);
    return json;
  } catch (err) {
    console.log("Error getting documents", err);
  }
};

class Users extends HTMLElement {
  constructor() {
    super();

    const getUsersData = async () => {
      const users = await getUsers();
      console.log("class Users");
      console.log(users);

      let usersHTML = "";

      // Loop through the users and generate HTML markup
      for (const userId in users) {
        const user = users[userId];
        usersHTML += `<div>
          <h2>${user.name}</h2>
          <p>${user.description}</p>
          <img src="${user.image}" alt="${user.name}" />
        </div>`;
      }

      this.innerHTML = /*html*/ `
        <h1>------------------Users</h1>
        ${usersHTML}
      `;
    }

    getUsersData();
  }
}

customElements.define("users-custom", Users);
