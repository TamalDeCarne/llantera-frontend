import { ReparacionDetalle } from './reparaciondetalles';
import { TipoParte } from './tipoparte';
import { Stock } from './inventario';

export class Parte {
    id: number;
    nombre_parte: string;
    tipo_parte_id: TipoParte;
    descripcion_parte: string;
    precio: number;
    reparacion_detalle: ReparacionDetalle;
    inventario: Stock;
}
