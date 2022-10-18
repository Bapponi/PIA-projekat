import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { ProfilComponent } from './profil/profil.component';
import { PretragaComponent } from './pretraga/pretraga.component';
import { ZahtevComponent } from './zahtev/zahtev.component';
import { PregledZComponent } from './pregled-z/pregled-z.component';
import { IstorijaZComponent } from './istorija-z/istorija-z.component';
import { DetaljiComponent } from './detalji/detalji.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PrijavaComponent } from './prijava/prijava.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { PromeniLozinkuComponent } from './promeni-lozinku/promeni-lozinku.component';
import { SlajderComponent } from './slajder/slajder.component';
import { AdminPregledComponent } from './admin-pregled/admin-pregled.component';
import { DetaljiKorisnikaComponent } from './detalji-korisnika/detalji-korisnika.component';
import { MeniComponent } from './meni/meni.component';
import { PredloziComponent } from './predlozi/predlozi.component';
import { Prijava1Component } from './prijava1/prijava1.component';
import { PrijavaAdminComponent } from './prijava-admin/prijava-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    PocetnaComponent,
    ProfilComponent,
    PretragaComponent,
    ZahtevComponent,
    PregledZComponent,
    IstorijaZComponent,
    DetaljiComponent,
    PrijavaComponent,
    RegistracijaComponent,
    PromeniLozinkuComponent,
    SlajderComponent,
    AdminPregledComponent,
    DetaljiKorisnikaComponent,
    MeniComponent,
    PredloziComponent,
    Prijava1Component,
    PrijavaAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
