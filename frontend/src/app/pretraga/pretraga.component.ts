import { splitClasses } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { Knjiga } from '../model/knjiga';
import { Korisnik } from '../model/korisnik';
import { IstorijaZaduzenjaService } from '../services/istorija-zaduzenja.service';
import { KnjigaService } from '../services/knjiga.service';

@Component({
  selector: 'app-pretraga',
  templateUrl: './pretraga.component.html',
  styleUrls: ['./pretraga.component.css']
})
export class PretragaComponent implements OnInit {

  constructor(private knjigaServis: KnjigaService, private ruter: Router,
    private app: AppComponent) { }

  ngOnInit(): void {
    this.korisnik = this.app.korisnik;
    this.knjigaServis.dohvatiSveKnjige().subscribe((podatak: Knjiga[])=>{
      this.knjigeSve = podatak;
      console.log(this.knjigeSve);

      for(let i = 0; i < this.knjigeSve.length; i++){
        this.knjigeSve[i].slikaUrl = this.app.urlKnjiga + this.knjigeSve[i].slika_knjige;
      }
    });
  }

  korisnik: Korisnik;
  knjigeSve: Knjiga[];
  tekstPretrage: string;
  zanr: string[];

  obnoviTabelu(){
    this.knjigaServis.dohvatiSveKnjige().subscribe((podatak: Knjiga[])=>{
      this.knjigeSve = podatak;
      console.log(this.knjigeSve);

      for(let i = 0; i < this.knjigeSve.length; i++){
        this.knjigeSve[i].slikaUrl = this.app.urlKnjiga + this.knjigeSve[i].slika_knjige;
      }
    });
  }

  pretraziNaziv(){
    this.knjigeSve = this.knjigeSve.filter(knjiga=>knjiga.naziv.includes(this.tekstPretrage));
  }

  pretraziAutore(){
    //popraviti za sve autore
    this.knjigeSve = this.knjigeSve.filter(knjiga=>knjiga.autoriTekst.includes(this.tekstPretrage));  
  }

  pretraziIzdavace(){
    this.knjigeSve = this.knjigeSve.filter(knjiga=>knjiga.izdavac.includes(this.tekstPretrage));
  }

  //popraviti pretragu zanra
  pretraziZanr(){
    console.log(this.zanr);
    for(let i = 0; i < this.zanr.length; i++){
      this.knjigeSve = this.knjigeSve.filter(knjiga=>knjiga.zanr.includes(this.zanr[i]));
    }
    this.zanr = null;
  }

  godinaOd: number = 0;
  godinaDo: number = 2022;
  porukaGod: string;

  pretraziDatum(){
    if(this.godinaOd < -10000 || this.godinaDo > 2022){
      this.porukaGod = "Uneti razumnu godinu izdavanja knjige"
    }else{
      let knjigeSve2 = this.knjigeSve;
      for(let i = 0; i < knjigeSve2.length; i++){
        let datum = knjigeSve2[i].godina_izdavanja.split("-");
        let godina = parseInt(datum[0]);
        console.log(godina);
        if(godina < this.godinaOd || godina > this.godinaDo){
          knjigeSve2.splice(i, 1);
          i--;
        }
      }
      this.knjigeSve = knjigeSve2;
    }
  }

  izaberiKnjigu(idKnj){
    console.log(idKnj);
    this.knjigaServis.dohvatiKnjigu(idKnj).subscribe((podatak: Knjiga)=>{
      localStorage.setItem('detaljiKnjige', JSON.stringify(podatak));
      console.log(podatak);
      this.ruter.navigate(['pretraga/detalji']);
    });
  }

}
