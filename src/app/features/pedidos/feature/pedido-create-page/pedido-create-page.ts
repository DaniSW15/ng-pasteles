import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { PedidosStore } from '../../data-access/store/pedidos.store';
import { PastelesStore } from '@app/features/pasteles/data-access/store/pasteles.store';
import { CreatePedidoRequest, CreatePedidoDetalle } from '../../data-access/models/pedido.model';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { AuthService } from '@app/features/auth/data-access/services/auth.service';

@Component({
  selector: 'app-pedido-create-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CurrencyPipe,
    ButtonModule,
    CardModule
  ],
  templateUrl: './pedido-create-page.html',
  styleUrl: './pedido-create-page.scss',
})
export class PedidoCreatePage implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private pedidosStore = inject(PedidosStore);
  pastelesStore = inject(PastelesStore);
  private authService = inject(AuthService);

  pedidoForm!: FormGroup;
  loading = signal(false);

  ngOnInit(): void {
    // Cargar pasteles disponibles
    this.pastelesStore.loadPasteles({ page: 1, size: 100 });
    
    this.pedidoForm = this.fb.group({
      detalles: this.fb.array([])
    });

    // Agregar un detalle inicial
    this.agregarDetalle();
  }

  get detalles(): FormArray {
    return this.pedidoForm.get('detalles') as FormArray;
  }

  crearDetalleGroup() {
    return this.fb.group({
      pastelId: ['', Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]]
    });
  }

  agregarDetalle() {
    this.detalles.push(this.crearDetalleGroup());
  }

  eliminarDetalle(index: number) {
    if (this.detalles.length > 1) {
      this.detalles.removeAt(index);
    }
  }

  getPastelNombre(pastelId: string): string {
    const pastel = this.pastelesStore.pasteles().find(p => p.id === pastelId);
    return pastel ? pastel.nombre : '';
  }

  getPastelPrecio(pastelId: string): number {
    const pastel = this.pastelesStore.pasteles().find(p => p.id === pastelId);
    return pastel ? pastel.precio : 0;
  }

  calcularSubtotal(index: number): number {
    const detalle = this.detalles.at(index).value;
    if (!detalle.pastelId || !detalle.cantidad) return 0;
    
    const precio = this.getPastelPrecio(detalle.pastelId);
    return precio * detalle.cantidad;
  }

  calcularTotal(): number {
    let total = 0;
    for (let i = 0; i < this.detalles.length; i++) {
      total += this.calcularSubtotal(i);
    }
    return total;
  }

  onSubmit() {
    if (this.pedidoForm.invalid) {
      this.detalles.controls.forEach(control => {
        control.markAllAsTouched();
      });
      return;
    }

    const clienteId = this.authService.currentUser()?.id;
    if (!clienteId) {
      alert('Error: Usuario no autenticado');
      return;
    }

    this.loading.set(true);

    const detalles: CreatePedidoDetalle[] = this.detalles.value.map((d: any) => ({
      pastelId: d.pastelId,
      cantidad: d.cantidad
    }));

    const pedidoData: CreatePedidoRequest = {
      clienteId,
      detalles
    };

    this.pedidosStore.createPedido(pedidoData);
    
    setTimeout(() => {
      this.loading.set(false);
      if (this.pedidosStore.error()) {
        alert(`Error al crear pedido: ${this.pedidosStore.error()}`);
      } else {
        this.router.navigate(['/pedidos']);
      }
    }, 1000);
  }

  cancelar() {
    this.router.navigate(['/pedidos']);
  }
}
