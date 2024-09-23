interface Equipo {
    nombre: string;
    tipo: string;
    estado: string;
  }
  
  class Inventario {
    private static instancia: Inventario;
    private equipos: Equipo[] = [];
  
    private constructor() {}
  
    public static obtenerInstancia(): Inventario {
      if (!Inventario.instancia) {
        Inventario.instancia = new Inventario();
      }
      return Inventario.instancia;
    }
  
    public agregarEquipo(nombre: string, tipo: string, estado: string) {
      this.equipos.push({ nombre, tipo, estado });
    }
  
    public listarEquipos(): Equipo[] {
      return this.equipos;
    }
  }
  
  export default Inventario;
  