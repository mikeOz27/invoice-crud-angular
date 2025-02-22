import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Factura } from '../models/factura.model';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  private apiUrl = 'https://localhost:7205/api/Invoice'; // Ajusta la URL de la API

  constructor(private http: HttpClient) { }

  getFacturas(): Observable<Factura[]> {
    return this.http.get<Factura[]>(this.apiUrl);
  }

  getFacturaById(id: number): Observable<Factura> {
    return this.http.get<Factura>(`${this.apiUrl}/${id}`);
  }

  createFactura(factura: Factura): Observable<Factura> {
    factura.status = factura.status ?? 'active';
    return this.http.post<Factura>(this.apiUrl, factura);
  }

  updateFactura(id: number, factura: Factura): Observable<Factura> {
    return this.http.put<Factura>(`${this.apiUrl}/${id}`, factura);
  }

  deleteFactura(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  deleteDetail(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/detailDelete/${id}`);
  }

  // updateStatus(invoiceId: number, status: string): Observable<any> {
  //   const url = `${this.apiUrl}/statusUpdate/${invoiceId}`;
  //   const body = { status }; // Asegúrate de que esto esté bien estructurado
  //   console.log("Enviando datos a la API:", body); // ✅ Verificar lo que se envía

  //   return this.http.patch(url, body, { headers: { 'Content-Type': 'application/json' } });
  // }



  // actualizarFactura(factura: any): Observable<any> {
  //   return this.http.put(`${this.apiUrl}/${factura.id}`, factura);
  // }
}
