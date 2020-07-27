import { User } from './user';
import { Garantia } from './garantia';
import { ReparacionDetalle } from './reparaciondetalles';

export class Reparacion {
    id: number;
    usuario_id: User;
    cliente_id: any;
    garantia_id: Garantia;
    total: number;
    fecha_realizacion: Date;
    reparaciones_detalles: ReparacionDetalle;
}