// New component
class Counter extends HTMLElement {
    constructor() {
        super();
        
        this.innerHTML = /*html*/`
            :LKJ:LKJ:LKJ:LKJ
        `;
    }
}

var count = 0;

customElements.define("click-counter", Counter);