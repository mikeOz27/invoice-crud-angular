import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormArray, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../../components/header/header.component';
import { FacturaService } from '../../services/factura.service';
import { Factura } from '../../models/factura.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-factura-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HeaderComponent],
  templateUrl: './factura-form.component.html',
})
export class FacturaFormComponent {
  facturaForm: FormGroup;

  constructor(
    private invoiceService: FacturaService,
    private router: Router
  ) {
    this.facturaForm = new FormGroup({
      customer: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      details: new FormArray([]) // Inicializar el FormArray vacío
    });
  }

  // Getter para acceder al FormArray correctamente tipado
  get details(): FormArray {
    return this.facturaForm.get('details') as FormArray;
  }

  // Método para obtener un detalle específico como FormGroup
  getDetailGroup(index: number): FormGroup {
    return this.details.at(index) as FormGroup;
  }

  // Método para agregar un nuevo detalle
  agregarDetalle() {
    const detalle = new FormGroup({
      product: new FormControl('', Validators.required),
      quantity: new FormControl(0, [Validators.required, Validators.min(1)]),
      unitPrice: new FormControl(0, [Validators.required, Validators.min(0)])
    });

    this.details.push(detalle);
  }

  // Método para eliminar un detalle por índice
  eliminarDetalle(index: number) {
    this.details.removeAt(index);
  }

  // Método para guardar la factura
  guardarFactura() {
    if (this.facturaForm.invalid) {
      Swal.fire({
        title: 'Error!',
        text: 'Por favor completa todos los campos obligatorios.',
        icon: 'error',
        confirmButtonText: 'Entendido'
      });
      return;
    }

    const factura: Factura = {
      customer: this.facturaForm.value.customer ?? '',
      status: 'active',
      date: this.facturaForm.value.date ?? '',
      details: this.facturaForm.value.details ?? []
    };

    this.invoiceService.createFactura(factura).subscribe({
      next: (res) => {
        Swal.fire({
          title: 'Factura guardada!',
          text: 'Se ha registrado correctamente.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.router.navigate(['/invoices']);
      },
      error: (error) => {
        Swal.fire({
          title: 'Error!',
          text: error.error?.message || 'Ocurrió un error inesperado.',
          icon: 'error',
          confirmButtonText: 'Cerrar'
        });
      }
    });
  }
}
