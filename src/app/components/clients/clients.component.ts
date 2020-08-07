import { Component, OnInit } from '@angular/core';
import { ApiLlanteraService } from 'src/app/services/api-llantera.service';
import { MatDialog, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { Client } from 'src/app/models/client';
import { ClientModalComponent } from '../client-modal/client-modal.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ClientUpdateComponent } from '../client-update/client-update.component';
import { VehiculoClienteComponent } from '../vehiculo-cliente/vehiculo-cliente.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clientList: any = [];
  displayedColumns: string[] = ['nombre', 'apellidos', 'email', 'fecha_registro', 'telefono', 'vehiculo' ,'acciones'];
  dataSource;


  constructor(private clientsService: ApiLlanteraService, public dialog: MatDialog) { }

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    return this.clientsService.getRows<Client>('clientes').subscribe(
      (data: {}) => {
        this.clientList = data;
        this.clientList = this.clientList.filter((client) => client.vehiculo !== null);
        this.dataSource = new MatTableDataSource<Client>(this.clientList);
      }
    );
  }

  openModal() {
    const dialogRef1 = this.dialog.open(ClientModalComponent);

    dialogRef1.afterClosed().subscribe(dialogRef => {
      if (dialogRef) {
        this.loadClients();
      }
    });

  }

  deleteClient(client) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Estas a punto de borrar un usuario',
        message: '¿Estas seguro?'
      }
    });
    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.clientsService.deleteRow<Client>(client.id, 'cliente').subscribe((data: {}) => {
          this.loadClients();
        });

      }
    });
  }

  updateClient(client) {
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
          clientId: client.id,
        };
        const updatedialog = this.dialog.open(ClientUpdateComponent, dialogconfig);
        updatedialog.afterClosed().subscribe(dialogRef => {
          if (dialogRef) {
            this.loadClients();
          }
        });
      }
    });
  }

  verDetalles(vehiculo) {

    const dialogconfig = new MatDialogConfig();
          dialogconfig.data = {
            vehiculo: vehiculo,
          }
    const dialogRef1 = this.dialog.open(VehiculoClienteComponent, dialogconfig);
    
    

  }
}
