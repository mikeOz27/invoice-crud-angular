import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FacturaService } from '../../services/factura.service';
import { HeaderComponent } from '../../../../components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-factura-list',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, MatIconModule, NgxPaginationModule, FormsModule],
  templateUrl: './factura-list.component.html'
})
export class FacturaListComponent implements OnInit {
  invoices: any[] = [];
  page: number = 1; // Página actual
  itemsPerPage: number = 5; // Número de elementos por página
  searchTerm: string = '';
  totalItems: number = 0;

  constructor(private facturaService: FacturaService) { }

  ngOnInit() {
    this.cargarFacturas();
  }

  cargarFacturas() {
    this.facturaService.getFacturas().subscribe(data => {
      this.invoices = data;
      this.filteredInvoices = this.invoices;
      this.totalItems = this.invoices.length;
    });
  }

  confirmarEliminacion(id: number) {
      console.log(id);
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          if(id === undefined) {
            this.invoices = this.invoices.filter((_: any, i: number) => i !== id);
            return;
          }
          this.deleteFactura(id);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });
    }

  deleteFactura(id: number) {
    this.facturaService.deleteFactura(id).subscribe(() => {
      this.cargarFacturas();
    });
  }

  filteredInvoices: any[] = [];

  filterInvoices(searchTerm: string) {
    if (!searchTerm) {
      this.filteredInvoices = this.invoices; // Mostrar todas si no hay búsqueda
    } else {
      this.filteredInvoices = this.invoices.filter(invoice =>
        invoice.customer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }

}
