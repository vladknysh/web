import "../components/Item/Item.js";
import "../components/CategoriesList.js";

export default () => /*html*/ `
    <div class="content-container">
        <div class="page-block categories-wrapper">
            <categories-list></categories-list>
        </div>
        <div class="page-block main-content">
            <item-component></item-component>
        </div>
    </div>
`;
