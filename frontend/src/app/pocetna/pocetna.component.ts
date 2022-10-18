import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Global } from 'src/global/global';
import { AppComponent } from '../app.component';
import { Knjiga } from '../model/knjiga';
import { Korisnik } from '../model/korisnik';
import { TrenutnaZaduzenja } from '../model/trenutnaZaduzenja';
import { Utisak } from '../model/utisak';
import { KnjigaService } from '../services/knjiga.service';
import { KorisnikService } from '../services/korisnik.service';
import { TrenutnaZaduzenjaService } from '../services/trenutna-zaduzenja.service';
import { UtisakService } from '../services/utisak.service';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit {

  constructor(private korisnikServis: KorisnikService, private knjigaServis: KnjigaService,
    private ruter: Router, private app: AppComponent, private utisakServis: UtisakService,
    private trenutnaZaduzenjaServis: TrenutnaZaduzenjaService) { 
    
  }

  ngOnInit(): void {

    //pocetna inicijalizacija top knjige pre promene
    this.knjigaServis.dohvatiKnjigu(7).subscribe((podatak: Knjiga)=>{
        
      this.knjiga = podatak;
      this.topKnjigaSlika = this.app.urlKnjiga + this.knjiga.slika_knjige;

      console.log("url topKnjigaSlika-e: " + this.topKnjigaSlika);
      console.log(this.knjiga);
      console.log(this.knjiga.autori);

      this.utisakServis.dohvatiSveUtiske(this.knjiga.idKnj).subscribe((podatak: Utisak[])=>{
        this.utisciSvi = podatak;
        console.log(this.utisciSvi);
        let brojUt = 0;
        for(let i = 0; i < this.utisciSvi.length; i++){
          if(this.knjiga.idKnj == this.utisciSvi[i].idKnj){
            this.prosecnaOcena += this.utisciSvi[i].ocena;
            brojUt++;
          }
        }
        this.prosecnaOcena = this.prosecnaOcena / brojUt;
        if(isNaN(this.prosecnaOcena)){
          this.prosecnaOcena = 0;
        }
        console.log(this.prosecnaOcena);
      });
    });
    //////////////////////////////////////////////////////////////////
    this.korisnik = JSON.parse(localStorage.getItem('ulogovan'));
    //console.log(this.korisnik);
    let slideIndex: number = 1;
    ///////////////////slajder/////////////////////////

    this.knjigaServis.dohvatiTopKnjige().subscribe((podatak: Knjiga[])=>{
      this.knjigeTop = podatak;
      console.log(this.knjigeTop);

      for(let i = 0; i < 3; i++){
        this.knjigeTop[i].slikaUrl = this.app.urlKnjiga + this.knjigeTop[i].slika_knjige;
      }
    });

    ///////promena algoritma za svaki novi dan/////////
    this.noviDatum  = new Date();
    console.log("Dan prilikom ucitavanja: " + this.noviDatum.getDay());
    console.log("Dan pre samog ucitavanja: " + this.app.stariDatum);

    this.knjigaServis.brojKnjiga().subscribe((podatak: number)=>{
      this.brojKnj = podatak;
      console.log("Broj knjiga: " + this.brojKnj);

      if(this.noviDatum.getDay() == this.app.stariDatum){
        console.log("Nema promene top knjige");
        
      }else{
        console.log("Promena top knjige");
        this.nasumicanId = Math.floor(Math.random()*this.brojKnj) + 1;
        this.app.stariId = this.nasumicanId;
        localStorage.setItem('stariId', JSON.stringify(this.app.stariId));
        //na kraju ide:
        this.app.stariDatum = this.noviDatum.getDay();
        localStorage.setItem('stariDatum', JSON.stringify(this.app.stariDatum));
      }
      console.log("Trenutni dan: " + this.app.stariDatum);
      console.log("Nasumican Id: " + this.app.stariId);
      //izvlacenje knjige sa datim random brojem
      this.knjigaServis.dohvatiKnjigu(this.app.stariId).subscribe((podatak: Knjiga)=>{
        
        this.knjiga = podatak;
        this.topKnjigaSlika = this.app.urlKnjiga + this.knjiga.slika_knjige;

        console.log("url topKnjigaSlika-e: " + this.topKnjigaSlika);
        console.log(this.knjiga);
        console.log(this.knjiga.autori);

        this.utisakServis.dohvatiSveUtiske(this.knjiga.idKnj).subscribe((podatak: Utisak[])=>{
          this.utisciSvi = podatak;
          console.log(this.utisciSvi);
          let brojUt = 0;
          for(let i = 0; i < this.utisciSvi.length; i++){
            if(this.knjiga.idKnj == this.utisciSvi[i].idKnj){
              this.prosecnaOcena += this.utisciSvi[i].ocena;
              brojUt++;
            }
          }
          this.prosecnaOcena = this.prosecnaOcena / brojUt;
          if(isNaN(this.prosecnaOcena)){
            this.prosecnaOcena = 0;
          }
          console.log(this.prosecnaOcena);
        });
      });
    })

    ///////dohvatanje svih zaduzenja/////////
    this.trenutnaZaduzenjaServis.dohvatiTrenutnaZaduzenja(this.korisnik.mejl).subscribe((podatak: TrenutnaZaduzenja[])=>{
      this.zahteviSvi = podatak;
      console.log(this.zahteviSvi);
      for(let i = 0; i < this.zahteviSvi.length; i++){

        this.zahteviSvi[i].datumBroj = new Date(this.zahteviSvi[i].datum_zaduzivanja);
        if(this.zahteviSvi[i].produzeno == false){
          this.zahteviSvi[i].datumBroj.setDate(this.zahteviSvi[i].datumBroj.getDate() + this.app.perioda - 2);
        }else{
          this.zahteviSvi[i].datumBroj.setDate(this.zahteviSvi[i].datumBroj.getDate() + 2*this.app.perioda - 2);

        }

        this.izracunatiTrajanje(this.zahteviSvi[i].datumBroj);

        console.log(this.zahteviSvi[i].datumBroj);
      }
    });
  }

  topKnjigaSlika: string;
  zahteviSvi: TrenutnaZaduzenja[];
  knjigeTop: Knjiga[];
  utisciSvi: Utisak[];
  prosecnaOcena: number = 0;
  noviDatum : Date;
  brojKnj: number;
  nasumicanId: number;
  knjiga: Knjiga;
  korisnik: Korisnik;
  slideIndex: number = 1;


  postojiKorisnik(){
    if(this.app.korisnik)
      return true;
    return false;
  }

  dohvatiDatum(){
    console.log(this.noviDatum)
  }

  plus(n){
    console.log(this.slideIndex);
    this.slideIndex +=n;
    if (this.slideIndex > 3) {this.slideIndex = 1}
    if (this.slideIndex < 1) {this.slideIndex = 3}
  }

  postavi(n){
    this.slideIndex = n
  }

  istice: boolean = false;
  istekao: boolean = false;

  izracunatiTrajanje(datum: Date){
    let datumSad = new Date();
    if(datumSad>=datum){
      this.istice = true;
    }
    datum.setDate(datum.getDate() + 2);
    if(datumSad>=datum){
      this.istice = false;
      this.istekao = true;
    }
  }
}
