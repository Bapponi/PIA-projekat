import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { Korisnik } from '../model/korisnik';
import { KorisnikService } from '../services/korisnik.service';

@Component({
  selector: 'app-prijava-admin',
  templateUrl: './prijava-admin.component.html',
  styleUrls: ['./prijava-admin.component.css']
})
export class PrijavaAdminComponent implements OnInit {

  constructor(private app: AppComponent, private ruter: Router,
    private korisnikServis: KorisnikService) { }

  ngOnInit(): void {
    // if(this.app.korisnik != null){
    //   this.ruter.navigate(['']);
    // }
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
          this.greska = 'Ne možete se ulogovati kao čitalac!'
        }
        else if(korisnik.tip == "moderator"){
          this.greska = 'Ne možete se ulogovati kao moderator!'
        }else{
          console.log("admin");
          this.app.korisnik = korisnik;
          this.app.putanja = this.app.urlKorisnik + korisnik.slika;
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
