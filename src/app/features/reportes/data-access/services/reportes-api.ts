import { Injectable, inject } from '@angular/core';
import { ApiService } from '@app/core/services/api/api-service';
import { Observable, map, catchError, of } from 'rxjs';
import { ClienteTop, PastelVendido, ResumenGeneral, VentaDelDia } from '../models/reportes.interface';

// DTOs de la API
interface ResumenGeneralDto {
    totalClientes: number;
    totalPasteles: number;
    totalPedidos: number;
    ventasTotales: number;
    pedidosPendientes: number;
}

interface PastelVendidoDto {
    nombrePastel: string;
    cantidadVendida: number;
    totalGenerado: number;
}

@Injectable({ providedIn: 'root' })
export class ReportesApiService {
    private api = inject(ApiService);

    getResumenGeneral(): Observable<ResumenGeneral> {
        return this.api.get<ResumenGeneralDto>('Reportes/resumen-general').pipe(
            map(dto => ({
                totalPedidos: dto.totalPedidos,
                totalVentas: dto.ventasTotales,
                pedidosPendientes: dto.pedidosPendientes,
                clientesActivos: dto.totalClientes
            })),
            catchError(() => of({
                totalPedidos: 0,
                totalVentas: 0,
                pedidosPendientes: 0,
                clientesActivos: 0
            }))
        );
    }

    getVentasDelDia(): Observable<VentaDelDia[]> {
        return this.api.get<any>('Reportes/ventas-del-dia').pipe(
            map(response => {
                if (Array.isArray(response)) return response;
                console.warn('VentasDelDia no es un array:', response);
                return [];
            }),
            catchError(() => of([]))
        );
    }

    getPastelesMasVendidos(): Observable<PastelVendido[]> {
        return this.api.get<any>('Reportes/pasteles-mas-vendidos').pipe(
            map(response => {
                if (!Array.isArray(response)) {
                    console.warn('PastelesMasVendidos no es un array:', response);
                    return [];
                }
                return response.map((dto: PastelVendidoDto) => ({
                    nombre: dto.nombrePastel,
                    cantidad: dto.cantidadVendida
                }));
            }),
            catchError(() => of([]))
        );
    }

    getClientesTop(): Observable<ClienteTop[]> {
        return this.api.get<any>('Reportes/clientes-top').pipe(
            map(response => {
                if (Array.isArray(response)) return response;
                console.warn('ClientesTop no es un array:', response);
                return [];
            }),
            catchError(() => of([]))
        );
    }
}
