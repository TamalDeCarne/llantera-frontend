import { GarantiasComponent } from "../components/garantias/garantias.component";
import { Reparacion } from './reparacion';

export class Garantia {
    id: number;
    fecha_inicio: Date;
    fecha_vencimiento: Date;
    reparaciones: Reparacion;
}