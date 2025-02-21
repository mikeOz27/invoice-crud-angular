import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FacturaService } from '../../services/factura.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { HeaderComponent } from '../../../../components/header/header.component';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    HeaderComponent
  ],
  selector: 'app-factura-editar',
  templateUrl: './factura-editar.component.html',
  styleUrls: ['./factura-editar.component.css']
})
export class FacturaEditarComponent implements OnInit {
  invoice: any = {}; // Aquí se almacenarán los datos de la factura

  constructor(
    private route: ActivatedRoute,
    private invoiceService: FacturaService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id'); // Obtener el ID de la URL
    if (id) {
      const invoiceId = Number(id);
      this.invoiceService.getFacturaById(invoiceId).subscribe(data => {
        this.invoice = data;
      });
    }
  }

  agregarDetalle() {
    this.invoice.details = [...this.invoice.details, { product: '', quantity: 1, unitPrice: 0 }];
  }

  confirmarEliminacion(id: number, index:number) {
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
        this.eliminarDetalle(id, index);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }

  eliminarDetalle(id: number, index: number) {
    this.invoiceService.deleteDetail(id).subscribe(() => {
      this.invoice.details = this.invoice.details.filter((_: any, i: number) => i !== index); // 🔥 Crea una copia nueva del array
      this.calcularTotal(); // 🔥 Recalcula el total
      this.cd.detectChanges(); // 🔥 Forzar detección de cambios si es necesario
    }, error => {
      console.error('Error al eliminar el detalle:', error);
    });
  }

  calcularTotal() {
    this.invoice.total = this.invoice.details.reduce((sum: number, item: any) => sum + (item.quantity * item.unitPrice), 0);
    this.cd.detectChanges(); // 🔥 Forzar actualización en la vista
  }

  calcularSubtotal(detalle: any) {
    return (detalle.quantity && detalle.unitPrice) ? detalle.quantity * detalle.unitPrice : 0;
    this.cd.detectChanges(); // 🔥 Forzar actualización en la vista
  }

  guardarCambios() {
    this.invoiceService.updateFactura(this.invoice.id, this.invoice).subscribe(() => {
       Swal.fire({
          title: "Update invoice!",
          icon: "success",
          draggable: true
        });
      this.router.navigate(['/invoices']);
    });
  }
}
