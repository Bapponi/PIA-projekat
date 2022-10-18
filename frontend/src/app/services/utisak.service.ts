import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtisakService {

  constructor(private http: HttpClient) { }

  uri='http://localhost:4000'

  ostaviUtisak(idKnj, mejl, datum_postavljanja, komentar, ocena){
    const podaci={
      idKnj: idKnj,
      mejl: mejl,
      datum_postavljanja: datum_postavljanja,
      komentar: komentar,
      ocena: ocena
    }

    return this.http.post(`${this.uri}/utisci/ostaviUtisak`, podaci);
  }

  dohvatiSveUtiske(idKnj){
    const podaci={
      idKnj: idKnj
    }

    return this.http.post(`${this.uri}/utisci/dohvatiSveUtiske`, podaci);
  }

  dohvatiUtisak(idKnj, mejl){
    const podaci={
      idKnj: idKnj,
      mejl: mejl
    }

    return this.http.post(`${this.uri}/utisci/dohvatiUtisak`, podaci);
  }

  azurirajUtisak(idKnj, mejl, datum_postavljanja, komentar, ocena){
    const podaci={
      idKnj: idKnj,
      mejl: mejl,
      datum_postavljanja: datum_postavljanja,
      komentar: komentar,
      ocena: ocena
    }

    return this.http.post(`${this.uri}/utisci/azurirajUtisak`, podaci);
  }
}
