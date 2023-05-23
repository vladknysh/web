export default async () => {
  const getItemData = async () => {
    const path = location.pathname;
    const parts = path.split("/");
    const category = parts[2];
    const objectId = parts[4];

    const itemUrl = `https://team-project-d1243-default-rtdb.europe-west1.firebasedatabase.app/categories/${category}/items/${objectId}`;
    try {
      const response = await fetch(itemUrl);
      const item = await response.json();
      console.log("getItemData");
      console.log(item);
      return item;
    } catch (err) {
      console.log("Error getting item", err);
    }
  };

  const item = await getItemData();

  return /*html*/ `
    <h1>Item</h1>
    <div>
      <h2>${item.name}</h2>
      <p>${item.description}</p>
      <img src="${item.imageUrl}" alt="${item.name}" />
    </div>
  `;
};
