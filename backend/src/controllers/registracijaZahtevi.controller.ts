import express from 'express';
import fs from 'fs';
import registracijaZahtevi from '../models/registracijaZahtevi';
import RegistracijaZahtevi from '../models/registracijaZahtevi';

export class RegistracijaZahteviController{

    registrujSe = (req: express.Request, res: express.Response)=>{

        let imeFajl = req.body.imeFajl;
        let uploadFajl = req.body.uploadFajl;

        console.log('slika', imeFajl);
        console.log('uploadFajl', uploadFajl);
        
        fs.writeFile('./src/assets/slika_korisnici/' + imeFajl, uploadFajl, 'binary', function (err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        }); 
        // let file = req['files'].thumbnail;

        // console.log("File uploaded: ", file.name);
        // console.log(file);

        // const imagePath = 'http://localhost:4000/slikeKorisnik/' + req.body.file.slika.name;

        let registracijaZahtevi = new RegistracijaZahtevi({
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
            broj_zaduzenja: 0,
            //slika: req.body.slika.name
        }); 

        console.log(registracijaZahtevi);

        registracijaZahtevi.save((err, resp)=>{
            if(err){ 
                console.log(err);
                res.status(400).json({"poruka": "greska"});
            }
            else res.json({"poruka": "ok"});
        })
    }

    dohvatiSveZahteve = (req: express.Request, res: express.Response)=>{

        registracijaZahtevi.find({}, (err, zahteviSvi)=>{
            if(err) console.log(err);
            else {
                res.json(zahteviSvi);
            }
        })
    }

    izbrisiZahtev = (req: express.Request, res: express.Response)=>{
        let mejl = req.body.mejl;
        console.log(mejl);

        //paziti ovde ako ima dva mejla ista, ubacit idKor ako treba
        RegistracijaZahtevi.deleteOne({ "mejl": mejl }, (err, resp)=>{
            if(err) console.log(err);
            else {
                res.json({'poruka': 'ok'});
            }
        })
    }
}