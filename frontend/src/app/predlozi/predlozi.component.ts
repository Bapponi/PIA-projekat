import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { Zahtev } from '../model/zahtev';
import { KnjigaService } from '../services/knjiga.service';
import { ZahtevService } from '../services/zahtev.service';

@Component({
  selector: 'app-predlozi',
  templateUrl: './predlozi.component.html',
  styleUrls: ['./predlozi.component.css']
})
export class PredloziComponent implements OnInit {

  constructor(private zahtevServis: ZahtevService, private knjigaServis: KnjigaService, 
    private app: AppComponent, private ruter: Router) { }

  ngOnInit(): void {
    if(this.app.korisnik == null || this.app.korisnik.tip != "moderator" || this.app.korisnik.blokiran == true){
      this.ruter.navigate(['']);
    }
    this.zahtevServis.dohvatiSveZahteve().subscribe((podatak: Zahtev[])=>{
      this.zahteviSvi = podatak;
      if(this.zahteviSvi.length == 0){
        this.zahteviSvi = null;
      }
      console.log(this.zahteviSvi);
    });
  }

  zahteviSvi: Zahtev[] = null;
  porukaZahtev: string;

  //promeni ovo prihvatanje
  prihvati(zahtev){
    this.knjigaServis.ubaciKnjigu(zahtev.naziv, zahtev.autoriTekst, zahtev.godina_izdavanja
      ,zahtev.jezik, zahtev.izdavac, zahtev.zanr, 0, zahtev.slika_knjige, null).subscribe(resp=>{
      if(resp['poruka'] == "ok"){

        this.zahtevServis.izbrisiZahtev(zahtev.korisnicko_ime, zahtev.naziv).subscribe(resp=>{
          if(resp['poruka'] == "ok"){
            this.porukaZahtev = 'Zahtev je uspešno prihvaćen'
          }
          else this.porukaZahtev = 'Greska'
        });

      }else{
        console.log(resp['poruka']);
        this.porukaZahtev = 'Greška'
      }
    });
  }

  odbij(zahtev){
    this.zahtevServis.izbrisiZahtev(zahtev.korisnicko_ime, zahtev.naziv).subscribe(resp=>{
      if(resp['poruka'] == "ok"){
        this.porukaZahtev = 'Zahtev je uspešno odbijen'
      }
      else this.porukaZahtev = 'Greska'
    });
  }

}
