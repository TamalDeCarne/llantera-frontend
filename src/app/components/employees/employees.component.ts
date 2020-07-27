import { Component, OnInit } from '@angular/core';
import { ApiLlanteraService } from 'src/app/services/api-llantera.service';
import { MatDialog, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { Employee } from 'src/app/models/employee';
import { EmployeeModalComponent } from '../employee-modal/employee-modal.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { EmployeeUpdateComponent } from '../employee-update/employee-update.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})


export class EmployeesComponent implements OnInit {


  employeeList: any = [];
  displayedColumns: string[] = ['nombre', 'apellidos', 'email', 'fecha_contratacion', 'telefono', 'direccion', 'acciones',];
  dataSource;


  constructor(private employeesService: ApiLlanteraService, public dialog: MatDialog) { }

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    return this.employeesService.getEmployees().subscribe(
      (data: {}) => {
        this.employeeList = data;
        this.dataSource = new MatTableDataSource<Employee>(this.employeeList);
      }
    );
  }

  openModal() {
    const dialogRef1 = this.dialog.open(EmployeeModalComponent);

    dialogRef1.afterClosed().subscribe(dialogRef => {
      if (dialogRef) {
        this.loadEmployees();
      }
    });

  }

  deleteEmployee(employee) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Estas a punto de borrar un usuario',
        message: '¿Estas seguro?'
      }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.employeesService.deleteEmployee(employee.id).subscribe((data: {}) => {
          this.loadEmployees();
        });

      }
    });
  }

  updateModal(employee) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Estas a punto de actualizar un usuario',
        message: '¿Estas seguro?'
      }
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        const dialogconfig = new MatDialogConfig();
        dialogconfig.data = {
          employeeId: employee.id,
        };
        const updatedialog = this.dialog.open(EmployeeUpdateComponent, dialogconfig);
        updatedialog.afterClosed().subscribe(dialogRef => {
          if (dialogRef) {
            this.loadEmployees();
          }
        });
      }
    });
  }

}
