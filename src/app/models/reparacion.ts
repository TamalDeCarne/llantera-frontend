import { User } from './user';
import { Garantia } from './garantia';
import { ReparacionDetalle } from './reparaciondetalles';
import { Client } from './client';

export class Reparacion {
    id: number;
    usuario_id: User;
    cliente_id: Client;
    garantia_id: Garantia;
    total: number;
    fecha_realizacion: Date;
    reparaciones_detalles: ReparacionDetalle;
}