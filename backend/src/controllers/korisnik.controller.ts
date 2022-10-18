import express from 'express'
import fs from 'fs';
import Korisnik from '../models/korisnik';

export class KorisnikController{

    prijavaNaSistem = (req: express.Request, res: express.Response)=>{
        let korisnicko_ime = req.body.korisnicko_ime;
        let lozinka = req.body.lozinka;

        console.log(korisnicko_ime);
        console.log(lozinka);

        Korisnik.findOne({'korisnicko_ime': korisnicko_ime, 'lozinka': lozinka}, (err, korisnik)=>{
            if(err) console.log(err);
            else res.json(korisnik)
        })
    }

    registrujSe = (req: express.Request, res: express.Response)=>{
        
        let imeFajl = req.body.slika;
        let uploadFajl = req.body.uploadFajl;
        
        console.log('slika', imeFajl);
        console.log('uploadFajl', uploadFajl);

        if(uploadFajl != null){
            fs.writeFile('./src/assets/slika_korisnici/' + imeFajl, uploadFajl, 'binary', function (err) {
                if(err) {
                    return console.log(err);
                }
                console.log("The file was saved!");
            }); 
        }

        let korisnik = new Korisnik({
            korisnicko_ime: req.body.korisnicko_ime,
            lozinka: req.body.lozinka,
            ime: req.body.ime,
            prezime: req.body.prezime,
            adresa: req.body.adresa,
            kontakt: req.body.kontakt,
            mejl: req.body.mejl,
            slika: imeFajl,
            tip: 'citalac',
            blokiran: false,
            broj_zaduzenja: 0
        }); 

        console.log(korisnik);

        korisnik.save((err, resp)=>{
            if(err){ 
                console.log(err);
                res.status(400).json({"poruka": "greska"});
            }
            else res.json({"poruka": "ok"});
        })
    }

    zameniImeSlike = (req: express.Request, res: express.Response)=>{
        
        let mejl = req.body.mejl;
        let slika = req.body.slika;

        Korisnik.updateOne({'mejl': mejl}, {$set: {'slika': slika}}, (err, korisnik)=>{
            if(err) console.log(err);
            else res.json(korisnik)
        })
    }

    dohvatiKorisnika = (req: express.Request, res: express.Response)=>{
        let mejl = req.body.mejl;
        Korisnik.findOne({'mejl': mejl}, (err, korisnik)=>{
            if(err) console.log(err);
            else res.json(korisnik)
        })
    }

    promeniLozinku = (req: express.Request, res: express.Response)=>{
        let lozinka = req.body.lozinka;
        let mejl = req.body.mejl;

        console.log(mejl);
        console.log(lozinka);

        Korisnik.updateOne({'mejl': mejl}, {$set: {'lozinka': lozinka}}, (err, resp)=>{
            if(err) console.log(err); 
            else res.json({'poruka': 'promenjena'});
        })
    }

    promeniBrojZaduzenja = (req: express.Request, res: express.Response)=>{
        let broj_zaduzenja = req.body.broj_zaduzenja;
        let mejl = req.body.mejl;

        console.log(mejl);
        console.log(broj_zaduzenja);

        Korisnik.updateOne({'mejl': mejl}, {$set: {'broj_zaduzenja': broj_zaduzenja}}, (err, resp)=>{
            if(err) console.log(err); 
            else res.json({'poruka': 'promenjena'});
        })
    }

    dohvatiSveKorisnike = (req: express.Request, res: express.Response)=>{

        Korisnik.find({}, (err, korisniciSvi)=>{
            if(err) console.log(err);
            else {
                res.json(korisniciSvi);
            }
        })
    }

    izbrisiKorisnika = (req: express.Request, res: express.Response)=>{
        let mejl = req.body.mejl;
        console.log(mejl);

        Korisnik.deleteOne({ "mejl": mejl }, (err, resp)=>{
            if(err) console.log(err);
            else {
                res.json({'poruka': 'ok'});
            }
        })
    }

    azurirajKorisnika = (req: express.Request, res: express.Response)=>{

        let imeFajl = req.body.slika;
        let uploadFajl = req.body.uploadFajl;
        
        console.log('slika', imeFajl);
        console.log('uploadFajl', uploadFajl);

        if(uploadFajl != null){
            fs.writeFile('./src/assets/slika_korisnici/' + imeFajl, uploadFajl, 'binary', function (err) {
                if(err) {
                    return console.log(err);
                }
                console.log("The file was saved!");
            }); 
        }

        let stariMejl = req.body.stariMejl;
        let korisnicko_ime = req.body.korisnicko_ime;
        let lozinka = req.body.lozinka;
        let ime = req.body.ime;
        let prezime = req.body.prezime;
        let adresa = req.body.adresa;
        let kontakt = req.body.kontakt;
        let mejl = req.body.mejl;
        let tip =  req.body.tip;

        console.log(stariMejl);
        console.log(mejl);

        if(uploadFajl == null){
            Korisnik.updateOne({'mejl': stariMejl}, {$set: {'korisnicko_ime': korisnicko_ime, 
            'lozinka': lozinka, 'ime': ime, 'prezime': prezime, 
            'adresa': adresa, 'kontakt': kontakt, 'mejl': mejl, 'tip': tip,}}, (err, resp)=>{
            if(err) console.log(err); 
            else res.json({'poruka': 'ok'});
        })
        }else{
            Korisnik.updateOne({'mejl': stariMejl}, {$set: {'korisnicko_ime': korisnicko_ime, 
            'lozinka': lozinka, 'slika': imeFajl, 'ime': ime, 'prezime': prezime, 
            'adresa': adresa, 'kontakt': kontakt, 'mejl': mejl, 'tip': tip,}}, (err, resp)=>{
            if(err) console.log(err); 
            else res.json({'poruka': 'ok'});
        })
        }
        
    }

    promeniStatus = (req: express.Request, res: express.Response)=>{
        let mejl = req.body.mejl;
        let blokiran = req.body.blokiran;
        console.log(mejl);

        Korisnik.updateOne({ "mejl": mejl }, {$set: {"blokiran": blokiran}}, (err, resp)=>{
            if(err) console.log(err);
            else {
                res.json({'poruka': 'ok'});
            }
        })
    }
}