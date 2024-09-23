import InventarioViejo from '../legacy/InventarioViejo';

class AdaptadorInventario {
  private inventarioViejo: InventarioViejo;

  constructor(inventarioViejo: InventarioViejo) {
    this.inventarioViejo = inventarioViejo;
  }

  agregarEquipo(nombre: string, tipo: string, estado: string) {
    this.inventarioViejo.agregarItem({ nombre, tipo, estado });
  }

  listarEquipos() {
    return this.inventarioViejo.listarItems();
  }
}

export default AdaptadorInventario;
