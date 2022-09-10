export class OrderItem {
  private id: string;

  private name: string;

  private price: number;

  private quantity: number;

  constructor(id: string, name: string, price: number, quantity: number) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.validate();
  }

  validate() {
    if (!this.id) {
      throw new Error('Order item id is required');
    }
    if (!this.name) {
      throw new Error('Order item name is required');
    }
    if (!this.price) {
      throw new Error('Order item price is required');
    }
    if (!this.quantity) {
      throw new Error('Order item quantity is required');
    }
  }
}
