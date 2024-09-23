interface Item {
    nombre: string;
    tipo: string;
    estado: string;
  }
  
  class InventarioViejo {
    private items: Item[] = [];
  
    public agregarItem(item: Item) {
      this.items.push(item);
    }
  
    public listarItems(): Item[] {
      return this.items;
    }
  }
  
  export default InventarioViejo;
  