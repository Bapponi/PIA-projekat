import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { Autor } from '../model/autor';
import { IstorijaZaduzenja } from '../model/istorijaZaduzenja';
import { Knjiga } from '../model/knjiga';
import { Korisnik } from '../model/korisnik';
import { IstorijaZaduzenjaService } from '../services/istorija-zaduzenja.service';
import { KnjigaService } from '../services/knjiga.service';
import { KorisnikService } from '../services/korisnik.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  constructor(public app: AppComponent, private knjigaServis: KnjigaService,
    private korisnikServis: KorisnikService, private istorijaZaduzenjaServis: IstorijaZaduzenjaService,
    private ruter: Router) { }

  ngOnInit(): void {

    if(this.app.korisnik == null){
      this.ruter.navigate(['']);
    }

    this.brojAutora = 0;
    this.korisnik = this.app.korisnik;
    this.slikaKorisnik = this.app.urlKorisnik + this.korisnik.slika;

    this.stariMejl = this.korisnik.mejl;
    console.log(this.app.korisnik);
    let datumPre = new Date();
    datumPre.setDate(datumPre.getDate() - 365);

    this.istorijaZaduzenjaServis.dohvatiIstorijuZaduzenja(this.korisnik.mejl).subscribe((podatak: IstorijaZaduzenja[])=>{
      this.zaduzenjaSva = podatak;
      for(let i = 0; i < this.zaduzenjaSva.length; i++){
        this.zaduzenjaSva[i].datumBrojV = new Date(this.zaduzenjaSva[i].datum_vracanja);
        if(this.zaduzenjaSva[i].datumBrojV > datumPre){
          this.brojDatum ++;
        }
        this.knjigaServis.dohvatiKnjigu(this.zaduzenjaSva[i].idKnj).subscribe((podatak1: Knjiga)=>{
          if(podatak1.zanr == "roman"){this.brojR++;}
          if(podatak1.zanr == "strip"){this.brojS++;}
          if(podatak1.zanr == "autobiografija"){this.brojA++;}
          if(podatak1.zanr == "pripovetka"){this.brojP++;}
          if(podatak1.zanr == "biografija"){this.brojB++;}
          if(podatak1.zanr == "misterija"){this.brojM++;}
          if(podatak1.zanr == "komedija"){this.brojK++;}
        });
      }
    })

  }

  slikaKorisnik: string;
  zanr1: string = "roman";
  brojDatum: number = 0;
  brojR: number = 0;
  brojS: number = 0;
  brojA: number = 0;
  brojP: number = 0;
  brojB: number = 0;
  brojM: number = 0;
  brojK: number = 0;
  zaduzenjaSva: IstorijaZaduzenja[];
  korisnik: Korisnik
  poruka: string;
  naziv: string;
  autori: Autor[] = [];
  godina_izdavanja: string;
  izdavac: string;
  jezik: string;
  zanr: string;
  zanrTekst: string = '';
  br_stanje: number;
  brojAutora: number;
  autorIme: string = '';
  autorPrezime: string = '';
  autorIme2: string = ''
  autorPrezime2: string = '';
  autorIme3: string = ''
  autorPrezime3: string = '';
  autoriTekst: string = '';
  knjigaProba: Knjiga;

  unesiBroj(){
    this.brojAutora = this.brojAutora;
  }
  
  slikaFajlKnjiga = null;
  imeFajlKnjiga: string = "defaultKnjiga.png";

  ubaciSliku(event){
    console.log('event', event);

    let rand = Math.floor(Math.random()*10000 + 1);
    this.imeFajlKnjiga = rand + event.target.files[0].name;

    const reader = new FileReader();
    reader.readAsBinaryString(event.target.files[0]);
    reader.onload = (evt) => {
      this.slikaFajlKnjiga = evt.target.result;
      console.log('cc', this.slikaFajlKnjiga);
    };

    let regex = /^.*\.(png|jpg|JPG)$/;
    if(regex.test(this.imeFajlKnjiga)){
      this.poruka = "Dobar format fajla!"
    }else{
      this.poruka = "GREŠKA: Pogresan format fajla!"
      this.slikaFajlKnjiga = null;
      this.imeFajlKnjiga = "defaultKnjiga.png";
    }
  }


  ubaciKnjigu(){

    this.autoriTekst = this.autorPrezime + ' ' + this.autorIme;
    if(this.autorIme2 != '' && this.autorPrezime2!= ''){
      this.autoriTekst += ', ' + this.autorPrezime2 + ' ' + this.autorIme2;
    }
    if(this.autorIme3 != '' && this.autorPrezime3!= ''){
      this.autoriTekst += ', ' + this.autorPrezime3 + ' ' + this.autorIme3;
    }
    console.log(this.autoriTekst);

    for(let i = 0; i < this.zanr.length; i++){
      if(i == 0){
        this.zanrTekst += this.zanr[i];
      }else{
        this.zanrTekst += " " + this.zanr[i];
      }
      console.log(this.zanrTekst);
    }

    console.log("Naziv: " + this.naziv)
    console.log("Autori: " + this.autori)
    console.log("Godina: " + this.godina_izdavanja) 
    console.log("Jezik: " + this.jezik)
    console.log("Izdavac: " + this.izdavac)
    console.log("Zanr: " + this.zanrTekst)
    console.log("BR stanje: " + this.br_stanje);
    this.knjigaServis.ubaciKnjigu(this.naziv, this.autoriTekst, this.godina_izdavanja
      ,this.jezik, this.izdavac, this.zanrTekst, this.br_stanje, this.imeFajlKnjiga, this.slikaFajlKnjiga).subscribe(resp=>{
      if(resp['poruka'] == "ok"){
        this.poruka = 'Knjiga je dodata'
      }else{
        console.log(resp['poruka']);
        this.poruka = 'Greška'
      }
    });
  }

  dani: number;

  promeniDane(){
    this.app.perioda = this.dani;
  }

  korisnicko_ime: string;
  lozinka: string;
  potvrdi_lozinku: string;
  ime: string;
  prezime: string;
  adresa: string;
  kontakt: number;
  mejl: string;
  slika: string;

  slikaFajl = null;
  imeFajl: string = "profil.png";

  poruka1: string;


  ubaciSliku1(event){
    console.log('event', event);

    let rand = Math.floor(Math.random()*10000 + 1);
    this.imeFajl = rand + event.target.files[0].name;

    const reader = new FileReader();
    reader.readAsBinaryString(event.target.files[0]);
    reader.onload = (evt) => {
      this.slikaFajl = evt.target.result;
      console.log('cc', this.slikaFajl);
    };

    let regex = /^.*\.(png|jpg|JPG)$/;
    if(regex.test(this.imeFajl)){
      this.poruka1 = "Dobar format fajla!"
    }else{
      this.poruka1 = "GREŠKA: Pogresan format fajla!"
      this.slikaFajl = null;
      this.imeFajl = "profil.png";
    }
  }

  korisnik1: Korisnik;

  registrujSe() {

    this.korisnikServis.dohvatiKorisnika(this.mejl).subscribe((podatak: Korisnik)=>{
      this.korisnik1 = podatak;
      console.log(this.korisnik1);

      if(this.korisnik1 == null){

        this.poruka1 = '';
        if (this.lozinka != this.potvrdi_lozinku) {
          this.poruka1 += 'Nisu jednake lozinke. \t';
        }

        if (this.lozinka.length < 8 || this.lozinka.length > 12) {
          this.poruka1 += 'Lozinka nije u rasponu od 8 do 12. \t';
        }

        if (/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,12}$/.test(this.lozinka)) {
          this.poruka1 += '';
        } else {
          this.poruka1 += 'Niste uneli potrebne karaktere. \t';
        }

        if (/^[a-z]/.test(this.lozinka)) {
          this.poruka1 += '';
        } else {
          this.poruka1 += 'Prvi karakter nije malo slovo. \t';
        }

        if (isNaN(this.kontakt)) {
          this.poruka1 += 'Niste uneli broj. \t';
        }

        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.mejl)) {
          this.poruka1 += '';
        } else {
          this.poruka1 += 'Lose formatiran mejl. \t';
        }

        if (this.poruka1 == '') {
          console.log(this.korisnicko_ime + this.lozinka + this.ime + this.prezime 
            + this.adresa + this.kontakt + this.mejl + this.imeFajl);
          this.korisnikServis.registrujSe(this.korisnicko_ime, this.lozinka, this.ime, this.prezime,
            this.adresa, this.kontakt, this.mejl, this.imeFajl, this.slikaFajl).subscribe(resp => {
              if (resp['poruka'] == "ok") {
                this.poruka1 = 'Korisnik je dodat'
              } else {
                console.log(resp['poruka']);
                this.poruka1 = 'Greška'
              }
            });
        }
          }else{
            this.poruka1 = 'GREŠKA: Već postoji korisnik sa datim mejlom!'
          }
    })

  }

  korisnicko_ime1: string;
  lozinka1: string;
  ime1: string;
  prezime1: string;
  adresa1: string;
  kontakt1: number;
  mejl1: string;
  slika1: string;
  porukaProf: string;

  azurirajKorisnickoIme(){
    this.korisnik.korisnicko_ime = this.korisnicko_ime1;
    this.porukaProf = "Uspesno promenjeno korisničko ime";
  }

  azurirajLozinku(){
    this.porukaProf = '';
    if(this.lozinka1.length<8 || this.lozinka1.length>12){
      this.porukaProf += 'Lozinka nije u rasponu od 8 do 12. \t';
    }

    if(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,12}$/.test(this.lozinka)){
      this.porukaProf += '';
    }else{
      this.porukaProf += 'Niste uneli potrebne karaktere. \t';
    }

    if(/^[a-z]/.test(this.lozinka1)){
      this.porukaProf += '';
    }else{
      this.porukaProf += 'Prvi karakter nije malo slovo. \t';
    }
    if(this.porukaProf == ''){
      this.korisnik.lozinka = this.lozinka1;
      this.porukaProf = "Uspesno promenjena lozinka";
    }
  }

  stariMejl: string;

  azurirajIme(){
    this.korisnik.ime = this.ime1;
    this.porukaProf = "Uspesno promenjeno ime";
  }

  azurirajPrezime(){
    this.korisnik.prezime = this.prezime1;
    this.porukaProf = "Uspesno promenjeno prezime";
  }

  azurirajAdresu(){
    this.korisnik.adresa = this.adresa1;
    this.porukaProf= "Uspesno promenjena adresa";
  }

  azurirajKontakt(){
    console.log(this.kontakt1);
    if(isNaN(this.kontakt1)){
      this.porukaProf = 'Niste uneli broj. \t';
    }
    this.korisnik.kontakt = this.kontakt1.toString();
    this.porukaProf = "Uspesno promenjen kontakt";
  }

  azurirajMejl(){
    this.porukaProf = '';
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.mejl)){
      this.korisnik.mejl = this.mejl1;
      this.porukaProf = "Uspesno promenjen mejl";
    }else{
      this.porukaProf += 'Lose formatiran mejl. \t';
    }
  }

  imeFajlProf: string = "profil.png";
  slikaFajlProf = null;

  ubaciSlikuProf(event){
    console.log('event', event);

    let rand = Math.floor(Math.random()*10000 + 1);
    this.imeFajlProf = rand + event.target.files[0].name;

    const reader = new FileReader();
    reader.readAsBinaryString(event.target.files[0]);
    reader.onload = (evt) => {
      this.slikaFajlProf = evt.target.result;
      console.log('cc', this.slikaFajlProf);
    };

    let regex = /^.*\.(png|jpg|JPG)$/;
    if(regex.test(this.imeFajlProf)){
      this.porukaProf = "Dobar format fajla!"
    }else{
      this.porukaProf = "GREŠKA: Pogresan format fajla!"
      this.slikaFajlProf = null;
      this.imeFajlProf = "profil.png";
    }
  }
  
  azurirajKorisnika(){
    console.log(this.korisnik.korisnicko_ime + this.korisnik.lozinka + this.korisnik.ime + this.korisnik.prezime + 
      this.korisnik.adresa + this.korisnik.kontakt + this.korisnik.mejl + this.korisnik.tip, this.imeFajlProf);
    this.korisnikServis.azurirajKorisnika(this.stariMejl, this.korisnik.korisnicko_ime, 
      this.korisnik.lozinka, this.korisnik.ime, this.korisnik.prezime, this.korisnik.adresa, 
      this.korisnik.kontakt, this.korisnik.mejl, this.korisnik.tip, this.imeFajlProf, this.slikaFajlProf).subscribe(resp=>{
      if(resp['poruka'] == "ok"){
        this.porukaProf = 'Korisnik je azuriran!'
        this.app.korisnik = this.korisnik;
      }else{
        console.log(resp['poruka']);
        this.porukaProf = 'Greška'
      }
    });
  }
}
