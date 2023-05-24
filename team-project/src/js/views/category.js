import "../components/Item/ItemsList.js";
import { extractCategoryFromPath } from "../helpers/PathHelpers.js";

export default () => {
  let categoryName = extractCategoryFromPath();

  return /*html*/ `
    <div class="content-container">
      <div class="page-block categories-wrapper">
        <categories-list></categories-list>
      </div>
      <div class="page-block main-content">
        <h1>${categoryName}</h1>
        <items-list></items-list>
        <!-- Add the code to display the category content here -->
      </div>
    </div>
  `;
};
