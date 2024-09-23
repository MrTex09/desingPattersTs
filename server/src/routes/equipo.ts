import { Router } from 'express';
import Inventario from '../models/Inventario';
import EquipoFactory from '../factories/EquipoFactory';
import Soporte from '../observers/soporte';
import Equipo from '../models/Equipo';
import InventarioViejo from '../legacy/InventarioViejo';
import AdaptadorInventario from '../adapters/AdaptadorIventario';

const equipoRouter = Router();
const inventario = Inventario.obtenerInstancia();
const factory = new EquipoFactory();
const soporte = new Soporte();
const inventarioViejo = new InventarioViejo();
const adaptadorInventario = new AdaptadorInventario(inventarioViejo);

// Ejercicio 1: Singleton
equipoRouter.post('/agregar-equipo', (req, res) => {
  const { nombre, tipo, estado } = req.body;
  inventario.agregarEquipo(nombre, tipo, estado);
  res.json(inventario.listarEquipos());
});

// Ejercicio 2: Factory Method
equipoRouter.post('/crear-equipo', (req, res) => {
  const { tipo, nombre, ram, procesador } = req.body;
  const equipo = factory.crearEquipo(tipo, nombre, ram, procesador);
  if (equipo) {
    res.json({ detalles: equipo.detalles() });
  } else {
    res.status(400).json({ error: 'Tipo de equipo no válido' });
  }
});

// Ejercicio 3: Observer
equipoRouter.post('/cambiar-estado', (req, res) => {
  const { nombre, tipo, estadoInicial, nuevoEstado } = req.body;
  const equipo = new Equipo(nombre, tipo, estadoInicial);
  equipo.agregarObservador(soporte);
  equipo.cambiarEstado(nuevoEstado);
  res.json({ mensaje: `Estado de ${nombre} cambiado a ${nuevoEstado}` });
});

// Ejercicio 4: Adaptador
equipoRouter.post('/agregar-equipo-viejo', (req, res) => {
  const { nombre, tipo, estado } = req.body;
  adaptadorInventario.agregarEquipo(nombre, tipo, estado);
  res.json(adaptadorInventario.listarEquipos());
});

export default equipoRouter;
