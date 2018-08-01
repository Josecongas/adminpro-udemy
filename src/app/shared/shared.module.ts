import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';

// COMPONENTES
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { HeaderComponent } from './header/header.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
  imports: [
    RouterModule,
    CommonModule
  ],
  declarations: [
    BreadcrumbsComponent,
    HeaderComponent,
    NopagefoundComponent,
    SidebarComponent
  ],
  exports: [
    BreadcrumbsComponent,
    HeaderComponent,
    NopagefoundComponent,
    SidebarComponent
  ]
})
export class SharedModule {}
