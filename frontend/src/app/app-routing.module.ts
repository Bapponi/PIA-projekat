import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPregledComponent } from './admin-pregled/admin-pregled.component';
import { DetaljiKorisnikaComponent } from './detalji-korisnika/detalji-korisnika.component';
import { DetaljiComponent } from './detalji/detalji.component';
import { IstorijaZComponent } from './istorija-z/istorija-z.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { PredloziComponent } from './predlozi/predlozi.component';
import { PregledZComponent } from './pregled-z/pregled-z.component';
import { PretragaComponent } from './pretraga/pretraga.component';
import { PrijavaAdminComponent } from './prijava-admin/prijava-admin.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { Prijava1Component } from './prijava1/prijava1.component';
import { ProfilComponent } from './profil/profil.component';
import { PromeniLozinkuComponent } from './promeni-lozinku/promeni-lozinku.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { ZahtevComponent } from './zahtev/zahtev.component';

const routes: Routes = [
  {path: '', component: PocetnaComponent},
  {path: 'prijava', component: PrijavaComponent},
  {path: 'prijava1', component: Prijava1Component},
  {path: 'prijavaAdmin', component: PrijavaAdminComponent},
  {path: 'registracija', component: RegistracijaComponent},
  {path: 'profil', component: ProfilComponent},
  {path: 'pretraga', component: PretragaComponent},
  {path: 'zahtev', component: ZahtevComponent},
  {path: 'pregledZ', component: PregledZComponent},
  {path: 'istorijaZ', component: IstorijaZComponent},
  {path: 'predlozi', component: PredloziComponent},
  {path: 'pretraga/detalji', component: DetaljiComponent},
  {path: 'pregledZ/detalji', component: DetaljiComponent},
  {path: 'istorijaZ/detalji', component: DetaljiComponent},
  {path: 'profil/adminPregled/detalji', component: DetaljiComponent},
  {path: 'profil/promeniLozinku', component: PromeniLozinkuComponent},
  {path: 'profil/adminPregled', component: AdminPregledComponent},
  {path: 'profil/adminPregled/detaljiKorisnika', component: DetaljiKorisnikaComponent},
  {path: '**', component: PocetnaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
