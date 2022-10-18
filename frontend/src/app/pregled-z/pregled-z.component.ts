import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { Knjiga } from '../model/knjiga';
import { Korisnik } from '../model/korisnik';
import { TrenutnaZaduzenja } from '../model/trenutnaZaduzenja';
import { IstorijaZaduzenjaService } from '../services/istorija-zaduzenja.service';
import { KnjigaService } from '../services/knjiga.service';
import { KorisnikService } from '../services/korisnik.service';
import { TrenutnaZaduzenjaService } from '../services/trenutna-zaduzenja.service';

@Component({
  selector: 'app-pregled-z',
  templateUrl: './pregled-z.component.html',
  styleUrls: ['./pregled-z.component.css']
})
export class PregledZComponent implements OnInit {

  constructor(private app: AppComponent, private trenutniZaduzenjaServis: TrenutnaZaduzenjaService,
    private knjigeServis: KnjigaService, private ruter: Router,
    private korisnikServis: KorisnikService, private istorijaZaduzenjaServis: IstorijaZaduzenjaService) { }

  ngOnInit(): void {
    
    if(this.app.korisnik == null){
      this.ruter.navigate(['']);
    }

    this.korisnik = this.app.korisnik;
    this.perioda = this.app.perioda;
    console.log(this.korisnik.broj_zaduzenja + this.korisnik.mejl);
    this.trenutniZaduzenjaServis.dohvatiTrenutnaZaduzenja(this.korisnik.mejl).subscribe((podatak: TrenutnaZaduzenja[])=>{
      this.zahteviSvi = podatak;
      console.log(this.zahteviSvi);
      for(let i = 0; i < this.zahteviSvi.length; i++){

        this.zahteviSvi[i].datumBroj = new Date(this.zahteviSvi[i].datum_zaduzivanja);
        if(this.zahteviSvi[i].produzeno == false){
          this.zahteviSvi[i].datumBroj.setDate(this.zahteviSvi[i].datumBroj.getDate() + this.perioda);
        }else{
          this.zahteviSvi[i].datumBroj.setDate(this.zahteviSvi[i].datumBroj.getDate() + 2*this.perioda);          
        }

        this.zahteviSvi[i].dani= this.izracunatiTrajanje(this.zahteviSvi[i].datumBroj, i);

        console.log(this.zahteviSvi[i].datumBroj);

        this.knjigeServis.dohvatiKnjigu(this.zahteviSvi[i].idKnj).subscribe((podatak1: Knjiga)=>{
          console.log(podatak1);
          this.knjigeSve.push(podatak1);
          this.knjigeSve[i].slikaUrl = this.app.urlKnjiga + podatak1.slika_knjige;
          console.log(this.knjigeSve);
        });
      }
    });
  }

  korisnik: Korisnik;
  perioda: number;
  zahteviSvi: TrenutnaZaduzenja[];
  knjigeSve: Knjiga[] = [];
  poruka: string;

  izracunatiTrajanje(datum: Date, i: number){
    let dani;
    let datumSad = new Date();
    if(datumSad>datum){
      dani = datumSad.getTime() - datum.getTime();
      dani = -Math.ceil(dani / (1000 * 60 * 60 * 24));
      this.zahteviSvi[i].poruka = "Kašnjenje od: " + -dani + " dana";
      return dani;
    }else{
      dani = datum.getTime() - datumSad.getTime();
      dani = Math.ceil(dani / (1000 * 60 * 60 * 24));
      this.zahteviSvi[i].poruka = "Sve je uredu";
      return dani;
    }
  }

  izaberiKnjigu(idKnj){
    console.log(idKnj);
    this.knjigeServis.dohvatiKnjigu(idKnj).subscribe((podatak: Knjiga)=>{
      localStorage.setItem('detaljiKnjige', JSON.stringify(podatak));
      console.log(podatak);
      this.ruter.navigate(['pregledZ/detalji']);
    });
  }

  datumUString(datum: Date){
    datum= new Date();
    let godina = datum.getFullYear();
    let mesec = datum.getMonth() + 1;
    let dan = datum.getDate();
    let datum_vracanja = godina + "-" + mesec + "-" + dan;
    console.log(datum_vracanja);
    return datum_vracanja;
  }

  zavrsiZaduzivanje(idKnj, br_stanje){
    
    let trazenZahtev;
    for(let i = 0; i<this.knjigeSve.length; i++){
      if(idKnj == this.knjigeSve[i].idKnj){
        trazenZahtev = this.zahteviSvi[i];
        console.log(trazenZahtev);
      }
    }

    let datumSad = new Date();
    let datum_vracanja = this.datumUString(datumSad);

    this.istorijaZaduzenjaServis.dodatiZaduzenje(trazenZahtev.mejl, trazenZahtev.idKnj, 
      trazenZahtev.datum_zaduzivanja, datum_vracanja).subscribe();


    br_stanje += 1;
    this.knjigeServis.zaduziKnjigu(idKnj, br_stanje).subscribe(resp=>{
      if(resp['poruka'] == "ok"){
        this.poruka = 'Knjiga je uspešno vraćena'
      }
      else this.poruka = 'Greska'
    });

    let broj_zaduzenja = this.korisnik.broj_zaduzenja - 1;
    let mejl = this.korisnik.mejl;

    this.korisnikServis.promeniBrojZaduzenja(broj_zaduzenja, mejl).subscribe();

    this.trenutniZaduzenjaServis.zavrsiZaduzenje(idKnj).subscribe();
  }

  produziZaduzenje(idKnj){
    this.trenutniZaduzenjaServis.produziZaduzenje(idKnj, this.korisnik.mejl).subscribe(resp=>{
      if(resp['poruka'] == "ok"){
        this.poruka = 'Rok za knjigu je uspešno produžen'
      }
      else this.poruka = 'Greska'
    });
  }

}
