import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Global } from 'src/global/global';
import { AppComponent } from '../app.component';
import { MeniComponent } from '../meni/meni.component';
import { Korisnik } from '../model/korisnik';
import { KorisnikService } from '../services/korisnik.service';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css']
})
export class PrijavaComponent implements OnInit {

  constructor(private korisnikServis: KorisnikService, private meni: MeniComponent, 
    private ruter: Router, private app: AppComponent) { }

  ngOnInit(): void {
    console.log("pisa");
  }

  korisnicko_ime: string;
  lozinka: string;
  greska: string;

  prijava(){

    this.korisnikServis.prijavaNaSistem(this.korisnicko_ime, this.lozinka).
    subscribe((korisnik: Korisnik)=>{
      console.log(this.korisnicko_ime + this.lozinka);
      if(korisnik){
        localStorage.setItem('ulogovan', JSON.stringify(korisnik));
        
        if(korisnik.tip == "citalac"){
          console.log("citalac");
          this.app.korisnik = korisnik;
          this.ruter.navigate(['']);
          this.app.ngOnInit;
          // this.meni.ngOnInit();
          //window.location.reload();
        }
        else if(korisnik.tip == "moderator"){
          console.log("moderator");
          this.app.korisnik = korisnik;
          this.ruter.navigate(['']);
          // this.meni.ngOnInit();
        }else{
          console.log("admin");
          this.app.korisnik = korisnik;
          this.ruter.navigate(['']);
          // this.meni.ngOnInit();
        }
      }
      else{
        this.greska = 'Greska'
      }
      
    })
  }
}
