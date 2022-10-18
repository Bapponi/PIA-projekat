import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ZahtevService {

  constructor(private http: HttpClient) { }

  uri='http://localhost:4000'

  dodajZahtev(korisnicko_ime, naziv, autoriTekst, godina_izdavanja ,jezik, izdavac, zanr, imeFajl, slikaFajl){
    const podaci={
      korisnicko_ime: korisnicko_ime,
      naziv: naziv,
      autoriTekst: autoriTekst,
      godina_izdavanja: godina_izdavanja,
      jezik: jezik,
      izdavac: izdavac,
      zanr: zanr,
      imeFajl: imeFajl,
      uploadFajl: slikaFajl
    }

    return this.http.post(`${this.uri}/zahtevi/dodajZahtev`, podaci);
  }

  dohvatiSveZahteve(){
    return this.http.get(`${this.uri}/zahtevi/dohvatiSveZahteve`);
  }

  izbrisiZahtev(korisnicko_ime, naziv){
    const podaci={
      korisnicko_ime: korisnicko_ime,
      naziv: naziv
    }

    return this.http.post(`${this.uri}/zahtevi/izbrisiZahtev`, podaci);
  }
}
