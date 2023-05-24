import "../components/Item/ItemsList.js";

export default () => {
  const getCategoryFromPath = () => {
    const path = location.pathname;
    const parts = path.split("/");
    return parts[2]; // Get the category from the path segment
  };

  const category = getCategoryFromPath();

  return /*html*/ `
    <div class="content-container">
      <div class="col-2 col-m-3 col-s-12 page-block categories-wrapper">
        <categories-list></categories-list>
      </div>
      <div class="col-5 col-m-7 col-s-12 page-block main-content">
        <h1>${category}</h1>
        <items-list></items-list>
        <!-- Add the code to display the category content here -->
      </div>
    </div>
  `;
};
