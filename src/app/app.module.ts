// TEMPORAL
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// RUTAS
import { APP_ROUTES } from './app.routes';

// MODULOS
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ServiceModule } from './services/service.module';
import { SharedModule } from './shared/shared.module';

// COMPONENTES
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { PagesComponent } from './pages/pages.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';

// MODULO DE SERVICIOS

@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent, PagesComponent, NopagefoundComponent],
  imports: [
    BrowserModule,
    APP_ROUTES,
    ServiceModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
