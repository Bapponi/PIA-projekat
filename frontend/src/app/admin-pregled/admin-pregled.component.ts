import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { Knjiga } from '../model/knjiga';
import { Korisnik } from '../model/korisnik';
import { IstorijaZaduzenjaService } from '../services/istorija-zaduzenja.service';
import { KnjigaService } from '../services/knjiga.service';
import { KorisnikService } from '../services/korisnik.service';
import { RegistracijaZahteviService } from '../services/registracija-zahtevi.service';
import { TrenutnaZaduzenjaService } from '../services/trenutna-zaduzenja.service';

@Component({
  selector: 'app-admin-pregled',
  templateUrl: './admin-pregled.component.html',
  styleUrls: ['./admin-pregled.component.css']
})
export class AdminPregledComponent implements OnInit {

  constructor(private knjigaServis: KnjigaService, private trenutnaZaduzenjaServis: TrenutnaZaduzenjaService,
    private korisnikServis: KorisnikService, private ruter: Router, private app: AppComponent,
    private istorijaZaduzenjaServis: IstorijaZaduzenjaService, private registracijaZahteviServis: RegistracijaZahteviService) { }

  ngOnInit(): void {

    if(this.app.korisnik == null || this.app.korisnik.tip != "admin"){
      this.ruter.navigate(['']);
    }

    this.registracijaZahteviServis.dohvatiSveZahteve().subscribe((podatak: Korisnik[])=>{
      this.zahteviSvi = podatak;
      console.log(this.zahteviSvi);
    });
    
    this.knjigaServis.dohvatiSveKnjige().subscribe((podatak: Knjiga[])=>{
      this.knjigeSve = podatak;
      console.log(this.knjigeSve);
    });

    this.korisnikServis.dohvatiSveKorisnike().subscribe((podatak: Korisnik[])=>{
      this.korisniciSvi = podatak;
      console.log(this.korisniciSvi);
    });
  }

  zahteviSvi: Korisnik[];
  knjigeSve: Knjiga[];
  korisniciSvi: Korisnik[];
  porukaZahtev: string;
  porukaKnjiga: string;
  porukaKorisnik: string;

  prihvatiRegistraciju(registracija){
    console.log(registracija.slika);
    this.korisnikServis.registrujSe(registracija.korisnicko_ime, registracija.lozinka, registracija.ime, 
      registracija.prezime, registracija.adresa, registracija.kontakt, registracija.mejl, registracija.slika, null).subscribe(resp=>{
        if(resp['poruka'] == "ok"){
          this.porukaZahtev = 'Korisnik je dodat.';
          this.registracijaZahteviServis.izbrisiZahtev(registracija.mejl).subscribe(resp=>{
            if(resp['poruka'] == "ok"){
              this.porukaZahtev += '';
            }
            else this.porukaZahtev = ' Greska';
          });
        }else{
          console.log(resp['poruka']);
          this.porukaZahtev = 'Greška';
        }
      });
  }

  odbijRegistraciju(mejl){
    console.log(mejl);
    this.registracijaZahteviServis.izbrisiZahtev(mejl).subscribe(resp=>{
      if(resp['poruka'] == "ok"){
        this.porukaZahtev = 'Korisnik nije prihvaćen'
      }
      else this.porukaZahtev = 'Greska'
    });
  }
  
  izaberiKnjigu(idKnj){
    console.log(idKnj);
    this.knjigaServis.dohvatiKnjigu(idKnj).subscribe((podatak: Knjiga)=>{
      localStorage.setItem('detaljiKnjige', JSON.stringify(podatak));
      console.log(podatak);
      this.ruter.navigate(['profil/adminPregled/detalji']);
    });
  }

  izaberiKorisnika(mejl){
    console.log(mejl);
    this.korisnikServis.dohvatiKorisnika(mejl).subscribe((podatak: Korisnik)=>{
      localStorage.setItem('detaljiKorisnika', JSON.stringify(podatak));
      console.log(podatak);
      this.ruter.navigate(['profil/adminPregled/detaljiKorisnika']);
      //napravi komponentu sa detaljima datog korisnika
    });
  }

  izbrisiKnjigu(idKnj){

    let broj;
    this.trenutnaZaduzenjaServis.brojZaduzenja(idKnj).subscribe((podatak: Number)=>{
      broj = podatak;
      console.log(broj);

      if(broj>0){
        this.porukaKnjiga = "GRESKA: Knjiga je trenutno zadužena";
      }else{
        this.knjigaServis.izbrisiKnjigu(idKnj).subscribe(resp=>{
          if(resp['poruka'] == "ok"){
            this.porukaKnjiga = 'Knjiga je uspešno izbrisana';
          }
          else {
            this.porukaKnjiga = 'Greska';
          }
          this.istorijaZaduzenjaServis.brojZaduzenja(idKnj).subscribe((podatak: Number)=>{
            broj = podatak;
            console.log(broj);

            if(broj>0){
              this.istorijaZaduzenjaServis.izbrisiIstorijuZaduzenja(idKnj).subscribe();
            }
          })
        });
      }
    });


    //takodje je treba izbrisati iz tabele sa istorijom zaduzivanja
  }

  izbrisiKorisnika(mejl, broj_zaduzenja){
    if(broj_zaduzenja>0){
      this.porukaKorisnik = "Nije moguce izbrisati korisnika"
    }else{
      this.korisnikServis.izbrisiKorisnika(mejl).subscribe(resp=>{
        if(resp['poruka'] == "ok"){
          this.porukaKorisnik = 'Korisnik je uspešno izbrisan'
        }
        else this.porukaKorisnik = 'Greska'
      });
    }
  }

  indexKorisnik: number;

  promeniStatus(i){
    console.log(i);
    let blokiran = !this.korisniciSvi[i].blokiran;
    console.log(blokiran);
    this.korisnikServis.promeniStatus(this.korisniciSvi[i].mejl, blokiran).subscribe(resp=>{
      if(resp['poruka'] == "ok"){
        this.korisniciSvi[i].blokiran = !this.korisniciSvi[i].blokiran;
        if(this.korisniciSvi[i].blokiran == true){
          this.porukaKorisnik = 'Korisnik je uspešno blokiran'
        }else
          this.porukaKorisnik = 'Korisnik je uspešno odblokiran'
      }
      else this.porukaKorisnik = 'Greska'
    });
  }

}
