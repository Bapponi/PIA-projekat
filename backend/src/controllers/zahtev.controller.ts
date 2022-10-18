import express from 'express'
import fs from 'fs'
import Zahtev from '../models/zahtev';

export class ZahtevController{

    dodajZahtev = (req: express.Request, res: express.Response)=>{

        let imeFajl = req.body.imeFajl;
        let uploadFajl = req.body.uploadFajl;
    
        console.log('slika', imeFajl);
        console.log('uploadFajl', uploadFajl);

        if(uploadFajl != null){
            fs.writeFile('./src/assets/slika_knjige/' + imeFajl, uploadFajl, 'binary', function (err) {
              if(err) {
                  return console.log(err);
                }
                console.log("The file was saved!");
            }); 
        }

        let zahtev = new Zahtev({
            korisnicko_ime: req.body.korisnicko_ime,
            naziv: req.body.naziv,
            autoriTekst:  req.body.autoriTekst,
            godina_izdavanja: req.body.godina_izdavanja,
            izdavac: req.body.izdavac,
            jezik: req.body.jezik,
            zanr: req.body.zanr,
            slika_knjige: imeFajl
        }); 
    
        console.log(zahtev);
    
        zahtev.save((err, resp)=>{
            if(err){ 
                console.log(err);
                res.status(400).json({"poruka": "greska"});
            }
            else res.json({"poruka": "ok"});
        })
        
    }

    dohvatiSveZahteve = (req: express.Request, res: express.Response)=>{

        Zahtev.find({}, (err, zahtevi)=>{
            if(err) console.log(err);
            else {
                res.json(zahtevi);
            }
        })
        
    }

    izbrisiZahtev = (req: express.Request, res: express.Response)=>{

        let korisnicko_ime = req.body.korisnicko_ime;
        let naziv = req.body.naziv;

        Zahtev.deleteOne({"korisnicko_ime": korisnicko_ime, "naziv": naziv},(err, resp)=>{
            if(err){ 
                console.log(err);
                res.status(400).json({"poruka": "greska"});
            }
            else res.json({"poruka": "ok"});
        })
        
    }
}