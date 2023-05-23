import "../components/ItemsList.js";

export default () => {
  const getCategoryFromPath = () => {
    const path = location.pathname;
    const parts = path.split("/");
    return parts[2]; // Get the category from the path segment
  };

  const category = getCategoryFromPath();

  return /*html*/ `
    <categories-list></categories-list>
    <h1>${category}</h1>
    <items-list></items-list>
    <!-- Add the code to display the category content here -->
  `;
};
