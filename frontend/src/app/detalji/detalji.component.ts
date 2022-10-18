import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { Autor } from '../model/autor';
import { Knjiga } from '../model/knjiga';
import { Korisnik } from '../model/korisnik';
import { TrenutnaZaduzenja } from '../model/trenutnaZaduzenja';
import { Utisak } from '../model/utisak';
import { IstorijaZaduzenjaService } from '../services/istorija-zaduzenja.service';
import { KnjigaService } from '../services/knjiga.service';
import { KorisnikService } from '../services/korisnik.service';
import { TrenutnaZaduzenjaService } from '../services/trenutna-zaduzenja.service';
import { UtisakService } from '../services/utisak.service';

@Component({
  selector: 'app-detalji',
  templateUrl: './detalji.component.html',
  styleUrls: ['./detalji.component.css']
})
export class DetaljiComponent implements OnInit {

  constructor(private app: AppComponent, private knjigServis: KnjigaService,
    private korisnikServis: KorisnikService, private trenutnaZaduzenjaServis: TrenutnaZaduzenjaService,
    private ustisakServis: UtisakService, private istorijaZaduzenjaServis: IstorijaZaduzenjaService,
    private ruter: Router) { }

  ngOnInit(): void {

    if(this.app.korisnik == null || this.app.korisnik.blokiran == true){
      this.ruter.navigate(['']);
    }

    this.knjiga = JSON.parse(localStorage.getItem('detaljiKnjige'));
    this.knjiga.slikaUrl = this.app.urlKnjiga + this.knjiga.slika_knjige;
    console.log(this.knjiga);
    this.korisnik = this.app.korisnik;
    this.obavezeKorisnika();

    this.ustisakServis.dohvatiSveUtiske(this.knjiga.idKnj).subscribe((podatak: Utisak[])=>{
      this.utisciSvi = podatak;
      console.log(this.utisciSvi);

      if(this.utisciSvi.length == 0){
        this.utisciSvi == null;
      }

      for(let i = 0; i < this.utisciSvi.length; i++){
        this.utisciSvi[i].datumBroj = new Date(this.utisciSvi[i].datum_postavljanja)

        this.prosecnaOcena += this.utisciSvi[i].ocena;
        this.korisnikServis.dohvatiKorisnika(this.utisciSvi[i].mejl).subscribe((podatak: Korisnik)=>{
          this.utisciSvi[i].korisnicko_ime = podatak.korisnicko_ime;
        })
      }
      this.prosecnaOcena = Math.floor(this.prosecnaOcena / this.utisciSvi.length);
      this.utisciSvi.sort((a, b) => a.datumBroj > b.datumBroj ? -1 : a.datumBroj > b.datumBroj ? 1 : 0);
    });

    this.ustisakServis.dohvatiUtisak(this.knjiga.idKnj, this.korisnik.mejl).subscribe((podatak: Utisak)=>{
      this.utisak = podatak;
    })
    // this.knjigaAutori = this.knjiga.autoriTekst.split(" ");
    // console.log(this.knjigaAutori)
  }

  // knjigaAutori: string[] = null;
  // knjigaAutoriNG1: string;
  utisak: Utisak = null;
  utisciSvi: Utisak[];
  prosecnaOcena: number = 0;

  knjiga: Knjiga;
  poruka: string = "";
  korisnik: Korisnik;
  ispostovano: boolean;

  obavezeKorisnika(){
    //ispitati da li korisnik vec ima zaduzenu ovu knjigu

    this.trenutnaZaduzenjaServis.postojiZaduzenje(this.knjiga.idKnj, this.korisnik.mejl).subscribe((broj: number)=>{
      console.log(broj);
      if(broj>0){
        this.ispostovano = false;
        this.poruka += "Ova knjiga je već zadužena! "
      }else if(this.korisnik.broj_zaduzenja==3){
        this.ispostovano = false;
        this.poruka += "Imate već 3 aktivna zaduženja! "
      }else{
        this.ispostovano = true;
      }
      console.log(this.ispostovano);
    })

    this.trenutnaZaduzenjaServis.dohvatiTrenutnaZaduzenja(this.korisnik.mejl).subscribe((podatak: TrenutnaZaduzenja[])=>{
      this.svaZaduzenja = podatak;
      console.log(this.svaZaduzenja);
      for(let i = 0; i < this.svaZaduzenja.length; i++){
        this.svaZaduzenja[i].datumBroj = new Date(this.svaZaduzenja[i].datum_zaduzivanja)
        if(this.svaZaduzenja[i].produzeno == false){
          this.svaZaduzenja[i].datumBroj.setDate(this.svaZaduzenja[i].datumBroj.getDate() + this.app.perioda);
        }else{
          this.svaZaduzenja[i].datumBroj.setDate(this.svaZaduzenja[i].datumBroj.getDate() + 2*this.app.perioda);
        }

        let datumKraja = this.svaZaduzenja[i].datumBroj;
        let datumSad = new Date();

        if(datumKraja < datumSad){
          this.ispostovano = false
          this.poruka += "Prekoracili ste rok!"
        }
      }
    })
  }

  br_stanje: number;
  svaZaduzenja: TrenutnaZaduzenja[];

  zaduziKnjigu(){
    this.br_stanje = this.knjiga.br_stanje - 1;
    let broj_zaduzenja = this.korisnik.broj_zaduzenja + 1;
    let mejl = this.korisnik.mejl;
    let broj_uzimanja = this.knjiga.broj_uzimanja + 1;
    
    this.korisnikServis.promeniBrojZaduzenja(broj_zaduzenja, mejl).subscribe();
    this.korisnik.broj_zaduzenja += 1;

    this.knjigServis.promeniBrojUzimanja(this.knjiga.idKnj, broj_uzimanja).subscribe();

    this.knjigServis.zaduziKnjigu(this.knjiga.idKnj, this.br_stanje).subscribe(resp=>{
      if(resp['poruka'] == "ok"){
        this.poruka = 'Knjiga je uspešno zadužena'
      }
      this.ispostovano = false;
    });

    let datum= new Date();
    let godina = datum.getFullYear();
    let mesec = datum.getMonth() + 1;
    let dan = datum.getDate();
    let datum_zaduzivanja = godina + "-" + mesec + "-" + dan;
    console.log(datum_zaduzivanja);

    this.trenutnaZaduzenjaServis.dodatiZaduzenje(mejl, this.knjiga.idKnj, datum_zaduzivanja).subscribe(resp=>{
      if(resp['poruka'] == "ok"){
        this.poruka = 'Knjiga je uspešno zadužena'
      }
      this.ispostovano = false;
    });
  }

  naziv: string;
  autori: Autor[] = [];
  autoriTekst: string;
  godina_izdavanja: string;
  izdavac: string;
  jezik: string;
  zanr: string;
  zanrTekst: string = "";
  br_stanje2: number;
  poruka2: string;

  imeFajl: string = "defaultKnjiga.png";
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
      this.imeFajl = "defaultKnjiga.png";
    }
  }

  azurirajNaziv(){
    this.knjiga.naziv = this.naziv;
    this.poruka2 = "Uspesan unos naziva";
  }

  azurirajGodinuIzdavanja(){
    this.knjiga.godina_izdavanja = this.godina_izdavanja;
    this.poruka2 = "Uspesan unos godine izdavanja";
  }

  //dodati za 3 autora
  azurirajAutora(){
    let brojReci = 0;
    brojReci = this.autoriTekst.match(/\S+/g).length;
    console.log(brojReci)
    if(brojReci == 2 || brojReci == 4 || brojReci == 6){
      let reci = this.autoriTekst.split(" ");
      if(reci[1].charAt(reci.length - 1) == ',' && reci[3].charAt(reci.length - 1) == ',' && brojReci == 6){
        this.poruka2 = "Uspesan unos autora";
        this.knjiga.autoriTekst = this.autoriTekst;
      } else
      if(reci[1].charAt(reci.length - 1) == ',' && brojReci == 4){
        this.poruka2 = "Uspesan unos autora";
        this.knjiga.autoriTekst = this.autoriTekst;
      } else
      if(brojReci == 2){
        this.poruka2 = "Uspesan unos autora";
        this.knjiga.autoriTekst = this.autoriTekst;
      }else
      this.poruka2 = "Greska u unosu autora";
    }else {
      this.poruka2 = "Greska u unosu autora";
    }
    console.log(this.autoriTekst);

  }

  azurirajBrStanje(){
    this.knjiga.br_stanje = this.br_stanje2;
    this.poruka2 = "Uspesan unos brojnog stanja";
  }

  azurirajIzdavaca(){
    this.knjiga.izdavac = this.izdavac;
    this.poruka2 = "Uspesan unos izdavaca";
  }

  azurirajJezik(){
    this.knjiga.jezik = this.jezik;
    this.poruka2 = "Uspesan unos jezika";
  }

  azurirajZanr(){
    console.log(this.zanr);
    for(let i = 0; i < this.zanr.length; i++){
      if(i == 0){
        this.zanrTekst += this.zanr[i];
      }else{
        this.zanrTekst += " " + this.zanr[i];
      }
    }
    console.log(this.zanrTekst);
    this.knjiga.zanr = this.zanrTekst;
    this.poruka2 = "Uspesan unos zanra";
  }
  
  azurirajKnjigu(){
    console.log(this.knjiga.naziv + this.knjiga.godina_izdavanja + this.knjiga.autoriTekst + this.knjiga.jezik + 
      this.knjiga.izdavac + this.knjiga.zanr + this.knjiga.br_stanje + this.imeFajl);
    
    this.knjigServis.azurirajKnjigu(this.knjiga.idKnj, this.knjiga.naziv, this.knjiga.godina_izdavanja, 
      this.knjiga.autoriTekst, this.knjiga.jezik, this.knjiga.izdavac, this.knjiga.zanr, 
      this.knjiga.br_stanje, this.imeFajl, this.slikaFajl).subscribe(resp=>{
      if(resp['poruka'] == "ok"){
        this.poruka2 = 'Knjiga je azurirana'
      }else{
        console.log(resp['poruka']);
        this.poruka2 = 'Greška'
      }
    });
  }

  komentar: string;
  ocena: number;
  datum_postavljanja: string;
  porukaUtisak: string

  datumUString(datum: Date){
    datum= new Date();
    let godina = datum.getFullYear();
    let mesec = datum.getMonth() + 1;
    let dan = datum.getDate();
    let sat = datum.getHours();
    let minut = datum.getMinutes();
    let datum_vracanja = godina + "-" + mesec + "-" + dan + " " + sat + ":" + minut;
    console.log(datum_vracanja);
    return datum_vracanja;
  }

  ostaviUtisak(){
    //ostavi utisak samo ako ovaj korisnik ima ovu knjigu u istoriji zaduzivanja

    this.istorijaZaduzenjaServis.istorijaZaKorisnika(this.korisnik.mejl, this.knjiga.idKnj).subscribe((podatak: Number) =>{
      let broj = podatak;
      console.log(broj);
      if (broj>0){
        if(this.komentar.length < 1000 && this.ocena >= 1 && this.ocena<=10){
          let datumSad = new Date();
          this.datum_postavljanja = this.datumUString(datumSad);
    
          this.ustisakServis.ostaviUtisak(this.knjiga.idKnj, this.korisnik.mejl, this.datum_postavljanja,
            this.komentar, this.ocena).subscribe(resp=>{
            if(resp['poruka'] == "ok"){
              this.porukaUtisak = 'Utisak je dodat'
            }else if(resp['poruka'] == "broj"){
              this.porukaUtisak = 'Greska! Već je unet utisak za datu knjigu!'
            }else {
              console.log(resp['poruka']);
              this.porukaUtisak = 'Greška'
            }
          });
        }else{
          this.porukaUtisak = "Greska! Predugačak komentar ili ocena koja nije od 1 do 10"
        }
      }else
        this.porukaUtisak = "Ova knjiga nije prethodno zaduzena"
    });    
    
  }

  porukaUtisak1: string;
  komentar1: string;
  ocena1: number;

  azurirajKomentar(){
    if(this.komentar1.length < 1000){
      this.utisak.komentar = this.komentar1;
      this.porukaUtisak1 = "Uspesan unos komentara";
    }else{
      this.porukaUtisak1 = "GRESKA: Predugacak komentar!";
    }
  }

  azurirajOcenu(){
    if(this.ocena1 >=1 && this.ocena1 <= 10){
      this.utisak.ocena = this.ocena1;
      this.porukaUtisak1 = "Uspesan unos ocene";
    }else{
      this.porukaUtisak1 = "GRESKA: Ocena nije od 1 do 10";
    }
  }

  azurirajUtisak(){
    let datumSad = new Date();
    this.datum_postavljanja = this.datumUString(datumSad);
    
    this.ustisakServis.azurirajUtisak(this.knjiga.idKnj, this.korisnik.mejl, this.datum_postavljanja,
      this.utisak.komentar, this.utisak.ocena).subscribe(resp=>{
      if(resp['poruka'] == "ok"){
        this.porukaUtisak1 = 'Utisak je azuriran';
      }else{
        console.log(resp['poruka']);
        this.porukaUtisak1= 'Greška';
      }
    });
  }

}
