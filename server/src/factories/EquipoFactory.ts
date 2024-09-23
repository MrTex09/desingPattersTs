interface Equipo {
    nombre: string;
    ram: string;
    procesador: string;
    detalles(): string;
  }
  
  class Notebook implements Equipo {
    constructor(public nombre: string, public ram: string, public procesador: string) {}
    detalles(): string {
      return `Tipo: Notebook, Nombre: ${this.nombre}, RAM: ${this.ram}, Procesador: ${this.procesador}`;
    }
  }
  
  class Desktop implements Equipo {
    constructor(public nombre: string, public ram: string, public procesador: string) {}
    detalles(): string {
      return `Tipo: Desktop, Nombre: ${this.nombre}, RAM: ${this.ram}, Procesador: ${this.procesador}`;
    }
  }
  
  class Servidor implements Equipo {
    constructor(public nombre: string, public ram: string, public procesador: string) {}
    detalles(): string {
      return `Tipo: Servidor, Nombre: ${this.nombre}, RAM: ${this.ram}, Procesador: ${this.procesador}`;
    }
  }
  
  class EquipoFactory {
    crearEquipo(tipo: string, nombre: string, ram: string, procesador: string): Equipo | null {
      switch (tipo) {
        case 'Notebook':
          return new Notebook(nombre, ram, procesador);
        case 'Desktop':
          return new Desktop(nombre, ram, procesador);
        case 'Servidor':
          return new Servidor(nombre, ram, procesador);
        default:
          return null;
      }
    }
  }
  
  export default EquipoFactory;
  