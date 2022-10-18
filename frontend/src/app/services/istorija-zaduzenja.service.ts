import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IstorijaZaduzenjaService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  dodatiZaduzenje(mejl, IdKnj, datum_zaduzivanja, datum_vracanja){
    const podaci={
      mejl: mejl,
      idKnj: IdKnj,
      datum_zaduzivanja: datum_zaduzivanja,
      datum_vracanja: datum_vracanja
    }

    return this.http.post(`${this.uri}/istorijaZaduzenja/dodatiZaduzenje`, podaci);
  }

  dohvatiIstorijuZaduzenja(mejl){
    const podaci={
      mejl: mejl
    }

    return this.http.post(`${this.uri}/istorijaZaduzenja/dohvatiIstorijuZaduzenja`, podaci);
  }

  brojZaduzenja(idKnj){
    const podaci={
      idKnj: idKnj
    }

    return this.http.post(`${this.uri}/istorijaZaduzenja/brojZaduzenja`, podaci);
  }

  izbrisiIstorijuZaduzenja(idKnj){
    const podaci={
      idKnj: idKnj
    }

    return this.http.post(`${this.uri}/istorijaZaduzenja/izbrisiIstorijuZaduzenja`, podaci);
  }

  istorijaZaKorisnika(mejl, idKnj){
    const podaci={
      mejl: mejl,
      idKnj: idKnj
    }

    return this.http.post(`${this.uri}/istorijaZaduzenja/istorijaZaKorisnika`, podaci);
  }
}
