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
        ${itemsHTML}
      `;
    }

    const extractCategoryFromPath = () => {
      const path = location.pathname;
      const parts = path.split("/");
      const category = parts[parts.length - 1];
      return category;
    };
    // const category = "gaming"; // Provide the desired category here

    getItems();
  }
}

customElements.define("items-list", Items);
