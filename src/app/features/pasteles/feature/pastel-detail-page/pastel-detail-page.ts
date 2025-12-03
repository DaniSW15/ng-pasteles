import { Component, OnInit, inject, input } from '@angular/core';
import { PastelesStore } from '../../data-access/store/pasteles.store';

@Component({
  selector: 'app-pastel-detail-page',
  imports: [],
  templateUrl: './pastel-detail-page.html',
  styleUrl: './pastel-detail-page.scss',
})
export class PastelDetailPage implements OnInit {
  id = input.required<string>();
  store = inject(PastelesStore);

  ngOnInit(): void {
    this.store.selectPastel(this.id())
  }
}
