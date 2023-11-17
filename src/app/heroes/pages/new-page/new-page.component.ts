import { Component } from '@angular/core';

import { MATERIAL_MODULES } from '@app-angular-material';

@Component({
  standalone: true,
  imports: [...MATERIAL_MODULES],
  templateUrl: './new-page.component.html',
  styleUrl: './new-page.component.scss'
})
export class NewPageComponent {
  public publisher = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' }
  ];
}
