import { GarantiasComponent } from "../components/garantias/garantias.component";
import { Reparacion } from './reparacion';

export class Garantia {
    id: number;
    codigo: string;
    fecha_inicio: Date;
    fecha_vencimiento: Date;
    reparaciones: Reparacion;
}