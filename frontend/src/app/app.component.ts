import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Global } from 'src/global/global';
import { Korisnik } from './model/korisnik';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'frontend';

  constructor(private ruter: Router) { 
    
  }

  ngOnInit(): void {
    this.ulogovanKorisnik();
  }

  urlKorisnik: string = "http://localhost:4000/static/slika_korisnici/";
  urlKnjiga: string = "http://localhost:4000/static/slika_knjige/";
  korisnik: Korisnik;
  perioda: number = 14;
  stariDatum: number = JSON.parse(localStorage.getItem('stariDatum'));
  stariId: number = JSON.parse(localStorage.getItem('stariId'));
  pocetnoStanje: number = 0;
  putanja: string;

  ulogovanKorisnik(){
    this.korisnik = null;
    // this.korisnik = JSON.parse(localStorage.getItem('ulogovan'));
    // console.log(this.korisnik);
  }

  // ulogovanKorisnik(){
  //   if(this.pocetnoStanje == 0){
  //     this.korisnik = null;
  //   }
  //   else{
  //     this.korisnik = JSON.parse(localStorage.getItem('ulogovan'));
  //     console.log(this.korisnik);
  //   }
  //   this.pocetnoStanje++;
  // }

  //ovo ne radi kako treba jer ne radi redirect
  odjaviSe(){
    sessionStorage.clear();
    //localStorage.clear();
    this.korisnik = null;
    console.log(this.korisnik);
    //this.ruter.navigate(['registracija']);
  }

  prosireno: boolean;

  prosiri(){
    let meni = document.querySelector(".meni");
    let meni2 = document.querySelector(".meni2");
    if(this.prosireno == false){
      meni.setAttribute("style", "display: block;");
      meni2.setAttribute("style", "display: none;");
      this.prosireno = true;
    }else{
      meni.setAttribute("style", "display: none;");
      meni2.setAttribute("style", "display: block;");
      this.prosireno = false;
    }
  }
}
