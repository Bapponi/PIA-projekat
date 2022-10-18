import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {

  constructor(private http: HttpClient) { }

  uri='http://localhost:4000'

  prijavaNaSistem(korisnicko_ime, lozinka){
    const podaci={
      korisnicko_ime: korisnicko_ime,
      lozinka: lozinka
    }

    console.log("Usao u servis." + korisnicko_ime + lozinka);
    return this.http.post(`${this.uri}/korisnici/prijavaNaSistem`, podaci);
  }

  registrujSe(korisnicko_ime, lozinka, ime, prezime, adresa, kontakt, mejl, slika, slikaFajl){
    const podaci = {
      korisnicko_ime: korisnicko_ime,
      lozinka: lozinka,
      ime: ime,
      prezime: prezime,
      adresa: adresa,
      kontakt: kontakt,
      mejl: mejl,
      slika: slika,
      uploadFajl: slikaFajl
    }

    return this.http.post(`${this.uri}/korisnici/registrujSe`, podaci);
  }

  zameniImeSlike(slika, mejl){
    const podaci = {
      slika: slika,
      mejl: mejl
    }

    return this.http.post(`${this.uri}/korisnici/zameniImeSlike`, podaci);
  }

  dohvatiKorisnika(mejl){
    const podaci={
      mejl: mejl
    }

    return this.http.post(`${this.uri}/korisnici/dohvatiKorisnika`, podaci);
  }

  promeniLozinku(lozinka, mejl){
    const podaci={
      lozinka: lozinka,
      mejl: mejl
    }

    return this.http.post(`${this.uri}/korisnici/promeniLozinku`, podaci);
  }

  promeniBrojZaduzenja(broj_zaduzenja, mejl){
    const podaci={
      broj_zaduzenja: broj_zaduzenja,
      mejl: mejl
    }

    return this.http.post(`${this.uri}/korisnici/promeniBrojZaduzenja`, podaci);
  }

  dohvatiSveKorisnike(){
    return this.http.get(`${this.uri}/korisnici/dohvatiSveKorisnike`);
  }

  izbrisiKorisnika(mejl){
    const podaci={
      mejl: mejl
    }

    return this.http.post(`${this.uri}/korisnici/izbrisiKorisnika`, podaci);
  }

  azurirajKorisnika(stariMejl, korisnicko_ime, lozinka, ime, prezime, adresa, kontakt, mejl, tip, imeFajl, slikaFajl){
    const podaci={
      stariMejl: stariMejl,
      korisnicko_ime :korisnicko_ime,
      lozinka: lozinka,
      ime: ime,
      prezime: prezime,
      adresa: adresa,
      kontakt: kontakt,
      mejl: mejl,
      tip: tip,
      slika: imeFajl,
      uploadFajl: slikaFajl
    }

    return this.http.post(`${this.uri}/korisnici/azurirajKorisnika`, podaci);
  }

  promeniStatus(mejl, blokiran){
    const podaci={
      mejl: mejl,
      blokiran: blokiran
    }

    return this.http.post(`${this.uri}/korisnici/promeniStatus`, podaci);
  }
}
