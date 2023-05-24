let getCategoriesData = async () => {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(
      `https://team-project-d1243-default-rtdb.europe-west1.firebasedatabase.app/categories.json`,
      options
    );
    const json = await response.json();
    console.log("getCategoriesData");
    console.log(json);
    return json;
  } catch (err) {
    console.log("Error getting documents", err);
  }
};

class Categories extends HTMLElement {
  constructor() {
    super();

    const getCategories = async () => {
      const categories = await getCategoriesData();
      console.log("class Categories");
      console.log(categories);

      let categoriesHTML = "";

      // Loop through the categories and generate HTML markup
      for (const categoryName in categories) {
        categoriesHTML += `<div>
          <a href="/categories/${categoryName}" class="category-link" data-category="${categoryName}" data-link>
            <span class="material-icons">face</span>${categoryName}
          </a>
        </div>`;
      }

      this.innerHTML = /*html*/ `
        <h1>Categories</h1>
        ${categoriesHTML}
      `;

      // Add event listener to category links
      const categoryLinks = this.querySelectorAll(".category-link");
      categoryLinks.forEach((link) => {
        link.addEventListener("click", handleCategoryClick);
      });
    };

    const handleCategoryClick = (event) => {
      event.preventDefault();
      history.pushState("", "", event.target.href);
      console.log("handleCategoryClick");
      console.log(event.target.href)
    };

    getCategories();
  }
}

customElements.define("categories-list", Categories);
