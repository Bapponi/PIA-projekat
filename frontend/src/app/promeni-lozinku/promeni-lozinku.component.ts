import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { KorisnikService } from '../services/korisnik.service';

@Component({
  selector: 'app-promeni-lozinku',
  templateUrl: './promeni-lozinku.component.html',
  styleUrls: ['./promeni-lozinku.component.css']
})
export class PromeniLozinkuComponent implements OnInit {

  constructor(private korisnikServis: KorisnikService, 
    private ruter: Router, private app: AppComponent) { }

  ngOnInit(): void {
  }
  
  stara: string;
  nova1: string;
  nova2: string;

  poruka: string;

  promeniLozinku(){
    this.poruka = '';

    if(this.app.korisnik.lozinka!=this.stara){
      this.poruka += 'Nije uneta dobra stara lozinka. \t';
    }

    if(this.nova1 != this.nova2){
      this.poruka += 'Nisu jednake lozinke. \t';
    }

    if(this.nova1.length<8 || this.nova1.length>12){
      this.poruka += 'Lozinka nije u rasponu od 8 do 12. \t';
    }

    if(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,12}$/.test(this.nova1)){
      this.poruka += '';
    }else{
      this.poruka += 'Niste uneli potrebne karaktere. \t';
    }

    if(/^[a-z]/.test(this.nova1)){
      this.poruka += '';
    }else{
      this.poruka += 'Prvi karakter nije malo slovo. \t';
    }

    if(this.poruka == ""){
      this.korisnikServis.promeniLozinku(this.nova1, this.app.korisnik.mejl).subscribe(resp=>{
        console.log("Uspesna promena");
        sessionStorage.clear();
        this.app.korisnik = null;
        console.log(this.app.korisnik);
        this.ruter.navigate(['']);
      })
    }
  }
}
