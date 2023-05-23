let getItemsData = async (category) => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(
      `https://team-project-d1243-default-rtdb.europe-west1.firebasedatabase.app/categories/${category}/items.json`,
      options
    );
    const json = await response.json();
    console.log("getItemsData");
    console.log(json);
    return json;
  } catch (err) {
    console.log("Error getting documents", err);
  }
};

class Items extends HTMLElement {
  constructor() {
    super();

    const getItems = async () => {
      const category = extractCategoryFromPath();
      const items = await getItemsData(category);
      console.log("class Items");
      console.log(items);

      let itemsHTML = "";

      // Loop through the items and generate HTML markup
      for (const itemId in items) {
        const item = items[itemId];
        itemsHTML += `<div>
          <h2>${item.name}</h2>
          <p>${item.description}</p>
          <img src="${item.imageUrl}" alt="${item.name}" />
        </div>`;
      }

      this.innerHTML = /*html*/ `
        <h1>Items</h1>

        <h2>Add Item</h2>
        <form id="addItemForm">
          <label for="name">Name</label>
          <input type="text" id="name" required>

          <label for="description">Description</label>
          <textarea id="description" required></textarea>

          <label for="imageUrl">Image URL</label>
          <input type="url" id="imageUrl" required>

          <button type="submit">Add</button>
        </form>
        ${itemsHTML}
      `;

      // Add event listener to the form submit event
      const addItemForm = this.querySelector("#addItemForm");
      addItemForm.addEventListener("submit", handleAddItem);
    };

    const extractCategoryFromPath = () => {
      const path = location.pathname;
      const parts = path.split("/");
      const category = parts[parts.length - 1];
      return category;
    };

    const handleAddItem = async (event) => {
      event.preventDefault();

      // Get the form inputs
      const nameInput = this.querySelector("#name");
      const descriptionInput = this.querySelector("#description");
      const imageUrlInput = this.querySelector("#imageUrl");

      // Create an object with the item data
      const newItem = {
        name: nameInput.value,
        description: descriptionInput.value,
        imageUrl: imageUrlInput.value,
      };

      // Call the function to add the item to Firebase
      await addItemToFirebase(newItem);

      // Clear the form inputs
      nameInput.value = "";
      descriptionInput.value = "";
      imageUrlInput.value = "";

      // Reload the items to reflect the added item
      getItems();
    };

    const addItemToFirebase = async (item) => {
      const category = extractCategoryFromPath();
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      };

      try {
        const response = await fetch(
          `https://team-project-d1243-default-rtdb.europe-west1.firebasedatabase.app/categories/${category}/items.json`,
          options
        );
        const json = await response.json();
        console.log("addItemToFirebase");
        console.log(json);
      } catch (err) {
        console.log("Error adding item", err);
      }
    };

    getItems();
  }
}

customElements.define("items-list", Items);

