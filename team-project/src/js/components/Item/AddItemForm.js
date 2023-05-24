class ItemForm extends HTMLElement {
    constructor() {
        super();

        this.innerHTML = /*html*/`
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
    `;
    }
}

customElements.define("item-form", ItemForm);
