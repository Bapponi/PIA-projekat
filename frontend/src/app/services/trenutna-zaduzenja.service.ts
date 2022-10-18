import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrenutnaZaduzenjaService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  dohvatiTrenutnaZaduzenja(mejl){
    const podaci={
      mejl: mejl
    }

    return this.http.post(`${this.uri}/trenutnaZaduzenja/dohvatitrenutnaZaduzenja`, podaci);
  }

  dodatiZaduzenje(mejl, IdKnj, datum_zaduzivanja){
    const podaci={
      mejl: mejl,
      idKnj: IdKnj,
      datum_zaduzivanja: datum_zaduzivanja
    }

    return this.http.post(`${this.uri}/trenutnaZaduzenja/dodatiZaduzenje`, podaci);
  }

  zavrsiZaduzenje(IdKnj){
    const podaci={
      idKnj: IdKnj,
    }

    return this.http.post(`${this.uri}/trenutnaZaduzenja/zavrsiZaduzenje`, podaci);
  }

  brojZaduzenja(idKnj){
    const podaci={
      idKnj: idKnj
    }

    return this.http.post(`${this.uri}/trenutnaZaduzenja/brojZaduzenja`, podaci);
  }

  produziZaduzenje(idKnj, mejl){
    const podaci={
      idKnj: idKnj,
      mejl: mejl
    }

    return this.http.post(`${this.uri}/trenutnaZaduzenja/produziZaduzenje`, podaci);
  }

  postojiZaduzenje(idKnj, mejl){
    const podaci={
      idKnj: idKnj,
      mejl: mejl
    }

    return this.http.post(`${this.uri}/trenutnaZaduzenja/postojiZaduzenje`, podaci);
  }
}
