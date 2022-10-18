import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Korisnik } from '../model/korisnik';

@Component({
  selector: 'app-meni',
  templateUrl: './meni.component.html',
  styleUrls: ['./meni.component.css']
})
export class MeniComponent implements OnInit {

  constructor(public app: AppComponent) { }

  ngOnInit(): void {
    this.korisnik = this.app.korisnik;
    this.putanja = this.app.putanja;
    console.log(this.korisnik.slika);
  }

  putanja: string;
  korisnik: Korisnik;

  odjaviSe(){
    this.app.odjaviSe();
    // sessionStorage.clear();
    // // //localStorage.clear();
    // this.korisnik = null;
    // console.log(this.korisnik);
    // //this.ruter.navigate(['registracija']);
  }

  meni() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }
}
