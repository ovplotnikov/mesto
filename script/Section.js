export default class Section {
    constructor({ items, renderer }, containerSelector) {
      this._items = items;
      this._renderer = renderer;
      this._container = document.querySelector(containerSelector);
    }
  
    addItem(element) {
      this._container.prepend(element);
    }
  
    renderItems() {
      this._items.forEach(item => {
        const cardElement = this._renderer(item);
        this.addItem(cardElement);
      });
    }
  }
  