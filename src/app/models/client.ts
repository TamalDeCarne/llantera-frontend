import { Vehiculo } from './vehiculo';

export class Client {
  id: number;
  nombre: string;
  apellidos: string;
  email: string;
  fecha_registro: Date;
  telefono: string;
  vehiculo: Vehiculo;
}
