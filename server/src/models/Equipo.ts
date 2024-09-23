import Soporte from '../observers/Soporte';

class Equipo {
  private observadores: Soporte[] = [];

  constructor(public nombre: string, public tipo: string, public estado: string) {}

  agregarObservador(observador: Soporte) {
    this.observadores.push(observador);
  }

  cambiarEstado(nuevoEstado: string) {
    this.estado = nuevoEstado;
    this.notificarObservadores();
  }

  private notificarObservadores() {
    for (const observador of this.observadores) {
      observador.notificar(`${this.nombre} ha cambiado su estado a ${this.estado}`);
    }
  }
}

export default Equipo;
