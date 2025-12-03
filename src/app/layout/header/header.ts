import { Component, output } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-header',
  imports: [ToolbarModule, ButtonModule, AvatarModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  toggleSidebarEvent = output<void>();

  toggleSidebar() {
    this.toggleSidebarEvent.emit();
  }
}
