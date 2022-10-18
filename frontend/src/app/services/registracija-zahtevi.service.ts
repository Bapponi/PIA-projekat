import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistracijaZahteviService {

  constructor(private http: HttpClient) { }

  uri='http://localhost:4000'

  registrujSe(korisnicko_ime, lozinka, ime, prezime, adresa, kontakt, mejl, imeFajl, slikaFajl){
    const podaci = {
      korisnicko_ime: korisnicko_ime,
      lozinka: lozinka,
      ime: ime,
      prezime: prezime,
      adresa: adresa,
      kontakt: kontakt,
      mejl: mejl,
      imeFajl: imeFajl,
      uploadFajl: slikaFajl
    }

    return this.http.post(`${this.uri}/registracijaZahtevi/registrujSe`, podaci);
  }

  dohvatiSveZahteve(){
    return this.http.get(`${this.uri}/registracijaZahtevi/dohvatiSveZahteve`);
  }

  izbrisiZahtev(mejl){
    const podaci={
      mejl: mejl
    }

    return this.http.post(`${this.uri}/registracijaZahtevi/izbrisiZahtev`, podaci);
  }
}
