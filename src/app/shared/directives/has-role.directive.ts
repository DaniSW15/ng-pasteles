import { Directive, Input, TemplateRef, ViewContainerRef, inject, effect } from '@angular/core';
import { AuthService } from '@app/features/auth/data-access/services/auth.service';

/**
 * Directiva estructural para mostrar/ocultar elementos según el rol del usuario
 * 
 * Uso:
 * <button *appHasRole="['Admin']">Solo Admin</button>
 * <button *appHasRole="['Admin', 'Empleado']">Admin y Empleado</button>
 */
@Directive({
    selector: '[appHasRole]',
    standalone: true
})
export class HasRoleDirective {
    private authService = inject(AuthService);
    private templateRef = inject(TemplateRef<any>);
    private viewContainer = inject(ViewContainerRef);
    private hasView = false;

    @Input() set appHasRole(roles: string[]) {
        const user = this.authService.currentUser();
        const hasRole = user && roles.includes(user.rol);

        if (hasRole && !this.hasView) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            this.hasView = true;
        } else if (!hasRole && this.hasView) {
            this.viewContainer.clear();
            this.hasView = false;
        }
    }

    constructor() {
        // Reaccionar a cambios en el usuario actual
        effect(() => {
            const user = this.authService.currentUser();
            // Forzar re-evaluación cuando cambie el usuario
            if (!user && this.hasView) {
                this.viewContainer.clear();
                this.hasView = false;
            }
        });
    }
}
