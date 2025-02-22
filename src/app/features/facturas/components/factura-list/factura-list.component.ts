import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FacturaService } from '../../services/factura.service';
import { HeaderComponent } from '../../../../components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
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

  constructor(private facturaService: FacturaService) { }

  ngOnInit() {
    this.cargarFacturas();
  }

  cargarFacturas() {
    this.facturaService.getFacturas().subscribe(data => {
      this.invoices = data;
      this.filteredInvoices = this.invoices;
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
