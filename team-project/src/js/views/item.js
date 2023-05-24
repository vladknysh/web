import "../components/Item/Item.js";
import "../components/CategoriesList.js";

export default () => /*html*/ `
    <div class="content-container">
        <div class="col-2 col-m-3 col-s-12 page-block categories-wrapper">
            <categories-list></categories-list>
        </div>
        <div class="col-5 col-m-7 col-s-12 page-block main-content">
            <item-component></item-component>
        </div>
    </div>
`;
