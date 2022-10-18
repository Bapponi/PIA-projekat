import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AppComponent } from '../app.component';
import { Korisnik } from '../model/korisnik';
import { KorisnikService } from '../services/korisnik.service';
import { RegistracijaZahteviService } from '../services/registracija-zahtevi.service';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {

  constructor(private korisnikServis: KorisnikService, private http: HttpClient,
    private registracijaZahteviServis: RegistracijaZahteviService, private app: AppComponent,
    private ruter: Router) { }

  ngOnInit(): void {
    if(this.app.korisnik != null){
      this.ruter.navigate(['']);
    }
  }

  korisnicko_ime: string;
  lozinka: string;
  potvrdi_lozinku: string;
  ime: string;
  prezime: string;
  adresa: string;
  kontakt: number;
  mejl: string;
  slika: object;

  slikaFajl : string | ArrayBuffer;
  imeFajl : string= "profil.png";
  uploadFajl = null;

  poruka: string;

  // image: Blob;

  ubaciSliku(event) {
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
      this.imeFajl = "";
    }
  }

  korisnik: Korisnik;

  registrujSe() {

    this.korisnikServis.dohvatiKorisnika(this.mejl).subscribe((podatak: Korisnik)=>{
      this.korisnik = podatak;
      console.log(this.korisnik);

      if(this.korisnik == null){
        this.uploadFajl = new FormData();
        this.uploadFajl.set("name", this.imeFajl);
        this.uploadFajl.set("fajl", this.slikaFajl);
        // this.http.post("http://localhost:4000/src", this.uploadFajl).subscribe(resp=>{
        //   console.log(resp);
        // });
        // let path = `/api/patientFiles`;
        // this.http.post("http://localhost:4000/korisnici", this.uploadFajl).subscribe(resp=>{
        //   console.log(resp);
        // });

        this.poruka = '';
        if (this.lozinka != this.potvrdi_lozinku) {
          this.poruka += 'Nisu jednake lozinke. \t';
        }

        if (this.lozinka.length < 8 || this.lozinka.length > 12) {
          this.poruka += 'Lozinka nije u rasponu od 8 do 12. \t';
        }

        if (/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,12}$/.test(this.lozinka)) {
          this.poruka += '';
        } else {
          this.poruka += 'Niste uneli potrebne karaktere. \t';
        }

        if (/^[a-z]/.test(this.lozinka)) {
          this.poruka += '';
        } else {
          this.poruka += 'Prvi karakter nije malo slovo. \t';
        }

        if (isNaN(this.kontakt)) {
          this.poruka += 'Niste uneli broj. \t';
        }

        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.mejl)) {
          this.poruka += '';
        } else {
          this.poruka += 'Lose formatiran mejl. \t';
        }

        if (this.poruka == '') {
          console.log(this.korisnicko_ime + this.lozinka + this.ime + this.prezime 
            + this.adresa + this.kontakt + this.mejl + this.slika);
          this.registracijaZahteviServis.registrujSe(this.korisnicko_ime, this.lozinka, this.ime, this.prezime,
            this.adresa, this.kontakt, this.mejl, this.imeFajl, this.slikaFajl).subscribe(resp => {
              if (resp['poruka'] == "ok") {
                this.poruka = 'Zahtev za registraciju je poslat'
              } else {
                console.log(resp['poruka']);
                this.poruka = 'Greška'
              }
            });
        }
          }else{
            this.poruka = 'GREŠKA: Već postoji korisnik sa datim mejlom!'
          }
    })

  }
}
