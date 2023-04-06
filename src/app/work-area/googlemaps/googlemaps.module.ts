import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GooglemapsComponent } from './googlemaps.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAyKLOJj9p_nzvYhSV4aR3JyIKnkjKdx0Y'
    })
  ],
  declarations: [GooglemapsComponent],
  exports: [GooglemapsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class GooglemapsModule { }
