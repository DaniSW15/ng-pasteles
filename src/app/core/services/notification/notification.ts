import { Injectable, signal } from '@angular/core';

export interface NotificationItem {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class Notification {
  notifications = signal<NotificationItem[]>([]);

  private show(type: NotificationItem['type'], message: string) {
    const id = crypto.randomUUID();
    const notification: NotificationItem = { id, type, message };

    this.notifications.update((notifications) => [...notifications, notification]);

    setTimeout(() => this.remove(id), 5000);
  }

  success(message: string) {
    this.show('success', message);
  }

  error(message: string) {
    this.show('error', message);
  }

  warning(message: string) {
    this.show('warning', message);
  }

  info(message: string) {
    this.show('info', message);
  }

  remove(id: string) {
    this.notifications.update((notifications) =>
      notifications.filter((n) => n.id !== id)
    );
  }
}
