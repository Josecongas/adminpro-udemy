import { SubirArchivoService } from './subir-archivo/subir-archivo.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SharedService,
  SidebarService,
  SettingsService,
  UsuarioService,
  LoginGuardGuard,
  AdminGuard,
  HospitalService,
  MedicoService
} from './service.index';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
import { VerificaTokenGuard } from './guards/verifica-token.guard';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    SharedService,
    SidebarService,
    SettingsService,
    UsuarioService,
    LoginGuardGuard,
    AdminGuard,
    VerificaTokenGuard,
    SubirArchivoService,
    ModalUploadService,
    HospitalService,
    MedicoService
  ],
  declarations: []
})
export class ServiceModule {}
