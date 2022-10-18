import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { IstorijaZaduzenja } from '../model/istorijaZaduzenja';
import { Knjiga } from '../model/knjiga';
import { Korisnik } from '../model/korisnik';
import { IstorijaZaduzenjaService } from '../services/istorija-zaduzenja.service';
import { KnjigaService } from '../services/knjiga.service';

@Component({
  selector: 'app-istorija-z',
  templateUrl: './istorija-z.component.html',
  styleUrls: ['./istorija-z.component.css']
})
export class IstorijaZComponent implements OnInit {

  constructor(private app: AppComponent, private istorijaZaduzenjaServis: IstorijaZaduzenjaService,
    private knjigaServis: KnjigaService, private ruter: Router) { }

  ngOnInit(): void {

    if(this.app.korisnik == null){
      this.ruter.navigate(['']);
    }

    this.korisnik = this.app.korisnik;
    console.log(this.korisnik.broj_zaduzenja + this.korisnik.mejl);
    this.istorijaZaduzenjaServis.dohvatiIstorijuZaduzenja(this.korisnik.mejl).subscribe((podatak: IstorijaZaduzenja[])=>{
      this.zahteviSvi = podatak;
      console.log(this.zahteviSvi);
      if(this.zahteviSvi.length == 0){
        this.zahteviSvi = null;
        
      }else{

        for(let i = 0; i < this.zahteviSvi.length; i++){

          this.zahteviSvi[i].datumBrojZ = new Date(this.zahteviSvi[i].datum_zaduzivanja);
          this.zahteviSvi[i].datumBrojZ.setDate(this.zahteviSvi[i].datumBrojZ.getDate());
  
          this.zahteviSvi[i].datumBrojV = new Date(this.zahteviSvi[i].datum_vracanja);
          this.zahteviSvi[i].datumBrojV.setDate(this.zahteviSvi[i].datumBrojV.getDate());
          this.sortirajDatumV();
  
  
          this.knjigaServis.dohvatiKnjigu(this.zahteviSvi[i].idKnj).subscribe((podatak1: Knjiga)=>{
            this.zahteviSvi[i].slika_knjige = podatak1.slika_knjige
            this.zahteviSvi[i].slikaUrl = this.app.urlKnjiga + this.zahteviSvi[i].slika_knjige;
            this.zahteviSvi[i].autori = podatak1.autori;
            this.zahteviSvi[i].naziv = podatak1. naziv;
            this.zahteviSvi[i].autoriTekst = podatak1.autoriTekst;
            console.log(podatak1);
            this.knjigeSve.push(podatak1);
            console.log(this.knjigeSve);
          });
        }
      }
    });
  }

  korisnik: Korisnik;
  zahteviSvi: IstorijaZaduzenja[];
  knjigeSve: Knjiga[] = [];
  poruka: string;

  izaberiKnjigu(idKnj){
    console.log(idKnj);
    this.knjigaServis.dohvatiKnjigu(idKnj).subscribe((podatak: Knjiga)=>{
      localStorage.setItem('detaljiKnjige', JSON.stringify(podatak));
      console.log(podatak);
      this.ruter.navigate(['istorijaZ/detalji']);
    });
  }

  sortirajNaziv(){
    // for(let i = 0; i < this.zahteviSvi.length - 1; i++){
    //   this.knjigeSve.sort((a, b) => this.knjigeSve[i].naziv < this.knjigeSve[i+1].naziv ?
    //    -1 : this.knjigeSve[i].naziv > this.knjigeSve[i + 1].naziv ? 1 : 0)
    // }
    this.zahteviSvi.sort((a, b) => a.naziv < b.naziv ? -1 : a.naziv > b.naziv ? 1 : 0);
    
  }

  sortirajAutore(){
    this.zahteviSvi.sort((a, b) => a.autoriTekst < b.autoriTekst ? -1 : a.autoriTekst > b.autoriTekst ? 1 : 0);
  }

  sortirajDatumZ(){
    this.zahteviSvi.sort((a, b) => a.datumBrojZ > b.datumBrojZ ? -1 : a.datumBrojZ > b.datumBrojZ ? 1 : 0);
  }

  sortirajDatumV(){
    this.zahteviSvi.sort((a, b) => a.datumBrojV > b.datumBrojV ? -1 : a.datumBrojV > b.datumBrojV ? 1 : 0);
  }  

}
