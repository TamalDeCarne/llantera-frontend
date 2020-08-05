import { ParseTemplateOptions } from '@angular/compiler';
import { Reparacion } from './reparacion';
import { Parte } from './parte';

export class ReparacionDetalle {
    id: number;
    parte_id : Parte;
    reparacion_id: number;
    cantidad: number;
}
