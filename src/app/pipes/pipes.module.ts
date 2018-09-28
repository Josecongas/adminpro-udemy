import { ImagenPipe } from './imagen.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [ImagenPipe],
  exports: [
    ImagenPipe
  ]
})
export class PipesModule {}
