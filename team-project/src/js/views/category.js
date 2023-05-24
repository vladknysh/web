import "../components/Item/ItemsList.js";
import { extractCategoryFromPath } from "../helpers/PathHelpers.js";

export default () => {
  let categoryName = extractCategoryFromPath();

  return /*html*/ `
    <div class="content-container">
      <div class="col-2 col-m-3 col-s-12 page-block categories-wrapper">
        <categories-list></categories-list>
      </div>
      <div class="col-5 col-m-7 col-s-12 page-block main-content">
        <h1>${categoryName}</h1>
        <items-list></items-list>
      </div>
    </div>
  `;
};
