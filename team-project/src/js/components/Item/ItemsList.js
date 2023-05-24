import { extractCategoryFromPath } from "../../helpers/PathHelpers.js";
import { handleAddItem } from "../../helpers/FormHelper.js";

class Items extends HTMLElement {
  constructor() {
    super();

    const getItemsData = async (category) => {
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

    const getItems = async () => {
      const category = extractCategoryFromPath();
      const items = await getItemsData(category);
      console.log("class Items");
      console.log(items);

      let itemsHTML = "";

      // Loop through the items and generate HTML markup
      for (const itemId in items) {
        const item = items[itemId];
        // Add a link around each item
        itemsHTML += `
          <div class="item-card div-link">
            <h2>${item.name}</h2>
            <p>${item.description}</p>
            <a href="/categories/${category}/items/${itemId}" class="item-link" data-link>Go To...</a>
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
        ${itemsHTML}`;

      const addItemForm = this.querySelector("#addItemForm");
      addItemForm.addEventListener("submit", handleAddItem);

      // Add event listeners to the item links
      const itemLinks = this.querySelectorAll(".item-link");
      itemLinks.forEach((link) => {
        link.addEventListener("click", handleItemClick);
      });
    };

    const handleItemClick = (event) => {
      event.preventDefault();
      const itemId = event.currentTarget.getAttribute("href").split("/")[2];
      history.pushState("", "", event.target.href);
      console.log("handleItemClick");
      console.log(event.target.href)
      console.log(event.target)
    };

    this.getItems = getItems;
    getItems();
  }
}

customElements.define("items-list", Items);
