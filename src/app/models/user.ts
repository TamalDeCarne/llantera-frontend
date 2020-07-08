import { Employee } from './employee';
import { UserType } from './usertype';

export class User{
    id: number;
    nombre_usuario: string;
    empleado: Employee;
    tipo_usuario: UserType;
}