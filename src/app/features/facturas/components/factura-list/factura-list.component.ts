import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FacturaService } from '../../services/factura.service';
import { HeaderComponent } from '../../../../components/header/header.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-factura-list',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, MatIconModule],
  templateUrl: './factura-list.component.html'
})
export class FacturaListComponent implements OnInit {
  invoices: any[] = [];

  constructor(private facturaService: FacturaService) { }

  ngOnInit() {
    this.cargarFacturas();
  }

  cargarFacturas() {
    this.facturaService.getFacturas().subscribe(data => {
      this.invoices = data;
    });
  }

  deleteFactura(id: number) {
    this.facturaService.deleteFactura(id).subscribe(() => {
      this.cargarFacturas();
    });
  }
}
