import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KnjigaService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  brojKnjiga(){
    return this.http.get(`${this.uri}/knjige/brojKnjiga`);
  }

  dohvatiKnjigu(idKnj){
    const podaci={
      idKnj: idKnj
    }

    return this.http.post(`${this.uri}/knjige/dohvatiKnjigu`, podaci);
  }

  dohvatiSveKnjige(){
    return this.http.get(`${this.uri}/knjige/dohvatiSveKnjige`);
  }

  dohvatiTopKnjige(){
    return this.http.get(`${this.uri}/knjige/dohvatiTopKnjige`);
  }

  zaduziKnjigu(idKnj, br_stanje){
    const podaci={
      idKnj: idKnj,
      br_stanje: br_stanje
    }

    return this.http.post(`${this.uri}/knjige/zaduziKnjigu`, podaci);
  }

  promeniBrojUzimanja(idKnj, broj_uzimanja){
    const podaci={
      idKnj: idKnj,
      broj_uzimanja: broj_uzimanja
    }

    return this.http.post(`${this.uri}/knjige/promeniBrojUzimanja`, podaci);
  }

  ubaciKnjigu(naziv, autoriTekst, godina_izdavanja, jezik, izdavac, zanr, br_stanje, imeFajl, slikaFajl){
    const podaci={
      naziv: naziv,
      autoriTekst: autoriTekst,
      godina_izdavanja: godina_izdavanja,
      jezik: jezik,
      izdavac: izdavac,
      zanr: zanr,
      br_stanje: br_stanje,
      imeFajl: imeFajl,
      uploadFajl: slikaFajl
    }

    return this.http.post(`${this.uri}/knjige/ubaciKnjigu`, podaci);
  }

  azurirajKnjigu(idKnj, naziv, godina_izdavanja, autoriTekst, jezik, izdavac, zanr, br_stanje, imeFajl, slikaFajl){
    const podaci={
      idKnj: idKnj,
      naziv: naziv,
      godina_izdavanja: godina_izdavanja,
      autoriTekst: autoriTekst,
      jezik: jezik,
      izdavac: izdavac,
      zanr: zanr,
      br_stanje: br_stanje,
      imeFajl: imeFajl,
      uploadFajl: slikaFajl
    }

    return this.http.post(`${this.uri}/knjige/azurirajKnjigu`, podaci);
  }

  izbrisiKnjigu(idKnj){
    const podaci={
      idKnj: idKnj
    }

    return this.http.post(`${this.uri}/knjige/izbrisiKnjigu`, podaci);
  }
}
