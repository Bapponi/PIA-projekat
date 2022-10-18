import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { Korisnik } from '../model/korisnik';
import { KorisnikService } from '../services/korisnik.service';

@Component({
  selector: 'app-detalji-korisnika',
  templateUrl: './detalji-korisnika.component.html',
  styleUrls: ['./detalji-korisnika.component.css']
})
export class DetaljiKorisnikaComponent implements OnInit {

  constructor(private korisnikServis: KorisnikService, private app: AppComponent,
    private ruter: Router) { }

  ngOnInit(): void {

    if(this.app.korisnik == null || this.app.korisnik.tip != "admin"){
      this.ruter.navigate(['']);
    }

    this.korisnik = JSON.parse(localStorage.getItem('detaljiKorisnika'));
    this.slikaKorisnik = this.app.urlKorisnik + this.korisnik.slika;
    console.log(this.korisnik);
    this.stariMejl = this.korisnik.mejl
    //this.korisnik = this.app.korisnik;
  }

  slikaKorisnik: string;
  stariMejl: string;
  korisnik: Korisnik;
  korisnicko_ime: string;
  lozinka: string;
  ime: string;
  prezime: string;
  adresa: string;
  kontakt: number;
  mejl: string;
  tip: string;
  poruka: string;

  imeFajl: string = "profil.png";
  slikaFajl = null;

  ubaciSliku(event){
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
      this.poruka = "Dobar format fajla!"
    }else{
      this.poruka = "GREŠKA: Pogresan format fajla!"
      this.slikaFajl = null;
      this.imeFajl = "profil.png";
    }
  }

  azurirajKorisnickoIme(){
    this.korisnik.korisnicko_ime = this.korisnicko_ime;
    this.poruka = "Uspesno promenjeno korisničko ime";
  }

  azurirajLozinku(){
    this.poruka = '';
    if(this.lozinka.length<8 || this.lozinka.length>12){
      this.poruka += 'Lozinka nije u rasponu od 8 do 12. \t';
    }

    if(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,12}$/.test(this.lozinka)){
      this.poruka += '';
    }else{
      this.poruka += 'Niste uneli potrebne karaktere. \t';
    }

    if(/^[a-z]/.test(this.lozinka)){
      this.poruka += '';
    }else{
      this.poruka += 'Prvi karakter nije malo slovo. \t';
    }
    if(this.poruka == ''){
      this.korisnik.lozinka = this.lozinka;
      this.poruka = "Uspesno promenjena lozinka";
    }
  }

  azurirajIme(){
    this.korisnik.ime = this.ime;
    this.poruka = "Uspesno promenjeno ime";
  }

  azurirajPrezime(){
    this.korisnik.prezime = this.prezime;
    this.poruka = "Uspesno promenjeno prezime";
  }

  azurirajAdresu(){
    this.korisnik.adresa = this.adresa;
    this.poruka = "Uspesno promenjena adresa";
  }

  azurirajKontakt(){
    console.log(this.kontakt);
    if(isNaN(this.kontakt)){
      this.poruka = 'Niste uneli broj. \t';
    }
    this.korisnik.kontakt = this.kontakt.toString();
    this.poruka = "Uspesno promenjen kontakt";
  }

  azurirajMejl(){
    this.poruka = '';
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.mejl)){
      this.korisnik.mejl = this.mejl;
      this.poruka = "Uspesno promenjen mejl";
    }else{
      this.poruka += 'Lose formatiran mejl. \t';
    }
  }

  azurirajTip(){
    this.korisnik.tip = this.tip;
    this.poruka = "Uspesno promenjen tip";
  }
  
  azurirajKorisnika(){
    console.log(this.korisnik.korisnicko_ime + this.korisnik.lozinka + this.korisnik.ime + this.korisnik.prezime + 
      this.korisnik.adresa + this.korisnik.kontakt + this.korisnik.mejl + this.korisnik.tip);
    this.korisnikServis.azurirajKorisnika(this.stariMejl, this.korisnik.korisnicko_ime, 
      this.korisnik.lozinka, this.korisnik.ime, this.korisnik.prezime, this.korisnik.adresa, 
      this.korisnik.kontakt, this.korisnik.mejl, this.korisnik.tip, this.imeFajl, this.slikaFajl).subscribe(resp=>{
      if(resp['poruka'] == "ok"){
        this.poruka = 'Korisnik je azuriran!'
      }else{
        console.log(resp['poruka']);
        this.poruka = 'Greška'
      }
    });
  }
}
