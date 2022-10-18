import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { Korisnik } from '../model/korisnik';
import { ZahtevService } from '../services/zahtev.service';

@Component({
  selector: 'app-zahtev',
  templateUrl: './zahtev.component.html',
  styleUrls: ['./zahtev.component.css']
})
export class ZahtevComponent implements OnInit {

  constructor(private zahtevServis: ZahtevService, private app: AppComponent,
    private ruter: Router) { }

  ngOnInit(): void {
    this.korisnik = this.app.korisnik;

    if(this.app.korisnik == null || this.app.korisnik.tip != "citalac" || this.app.korisnik.blokiran == true){
      this.ruter.navigate(['']);
    }
  }

  korisnik: Korisnik;
  poruka: string;
  naziv: string;
  godina_izdavanja: string;
  izdavac: string;
  jezik: string;
  zanr: string[];
  zanrTekst: string = "";
  brojAutora: number;
  autorIme: string = '';
  autorPrezime: string = '';
  autorIme2: string = ''
  autorPrezime2: string = '';
  autorIme3: string = ''
  autorPrezime3: string = '';
  autoriTekst: string = '';

  unesiBroj(){
    this.brojAutora = this.brojAutora;
  }
  
  imeFajlKnjiga: string = "defaultKnjiga.png"
  slikaFajlKnjiga = null;
  
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

    console.log(this.zanr.length);
    console.log(this.autoriTekst);

    if(this.zanr.length > 3){
      this.poruka = "Dodato je previse žanrova";
      return;
    }

    for(let i = 0; i < this.zanr.length; i++){
      if(i == 0){
        this.zanrTekst+= this.zanr[i];
      }else
        this.zanrTekst+= " " + this.zanr[i];
    }
    

    console.log(this.naziv + this.godina_izdavanja + this.jezik + this.izdavac + this.zanrTekst);
    this.zahtevServis.dodajZahtev(this.korisnik.korisnicko_ime, this.naziv, this.autoriTekst, this.godina_izdavanja
      ,this.jezik, this.izdavac, this.zanrTekst, this.imeFajlKnjiga, this.slikaFajlKnjiga).subscribe(resp=>{
      if(resp['poruka'] == "ok"){
        this.poruka = 'Zahtev je prosleđen'
      }else{
        console.log(resp['poruka']);
        this.poruka = 'Greška'
      }
    });
  }
}
