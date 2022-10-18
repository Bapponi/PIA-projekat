import express from 'express'
import fs from 'fs';
import Knjiga from '../models/knjiga';

export class KnjigaController{
    
    brojKnjiga = (req: express.Request, res: express.Response)=>{
        Knjiga.count({}, (err, brojKnj)=>{
            if(err) console.log(err);
            else {
                console.log("Broj knjiga: " + brojKnj);
                res.json(brojKnj);
            }
        })
    }

    dohvatiKnjigu = (req: express.Request, res: express.Response)=>{
        let idKnj = req.body.idKnj;

        Knjiga.findOne({'idKnj': idKnj}, (err, knjiga)=>{
            if(err) console.log(err);
            else {
                res.json(knjiga);
            }
        })
    }

    dohvatiSveKnjige = (req: express.Request, res: express.Response)=>{

        Knjiga.find({}, (err, knjigeSve)=>{
            if(err) console.log(err);
            else {
                res.json(knjigeSve);
            }
        })
    }

    dohvatiTopKnjige = (req: express.Request, res: express.Response)=>{

        Knjiga.find({}, (err, knjigeSve)=>{
            if(err) console.log(err);
            else {
                res.json(knjigeSve);
            }
        }).sort({broj_uzimanja: -1}).limit(3)
    }

    zaduziKnjigu = (req: express.Request, res: express.Response)=>{
        let idKnj = req.body.idKnj;
        let br_stanje = req.body.br_stanje;

        console.log(idKnj);
        console.log(br_stanje);

        Knjiga.updateOne({'idKnj': idKnj}, {$set: {'br_stanje': br_stanje}}, (err, resp)=>{
            if(err) console.log(err); 
            else res.json({'poruka': 'ok'});
        })
    }

    promeniBrojUzimanja = (req: express.Request, res: express.Response)=>{
        let idKnj = req.body.idKnj;
        let broj_uzimanja = req.body.broj_uzimanja;

        console.log(idKnj);
        console.log(broj_uzimanja);

        Knjiga.updateOne({'idKnj': idKnj}, {$set: {'broj_uzimanja': broj_uzimanja}}, (err, resp)=>{
            if(err) console.log(err); 
            else res.json({'poruka': 'ok'});
        })
    }

    ubaciKnjigu = (req: express.Request, res: express.Response)=>{

        Knjiga.find({}, (err, knjigeSve)=>{
            
            let max = 0;
            for(let i = 0; i < knjigeSve.length; i++){
                if(max< knjigeSve[i].idKnj){
                    max = knjigeSve[i].idKnj;
                }
            }

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

            console.log("Max id: " + max);
            let knjiga = new Knjiga({
                idKnj: max + 1,
                naziv: req.body.naziv,
                autoriTekst:  req.body.autoriTekst,
                godina_izdavanja: req.body.godina_izdavanja,
                izdavac: req.body.izdavac,
                jezik: req.body.jezik,
                zanr: req.body.zanr,
                br_stanje: req.body.br_stanje,
                broj_uzimanja: 0,
                slika_knjige: imeFajl
            }); 
    
            console.log(knjiga);
    
            knjiga.save((err, resp)=>{
                if(err){ 
                    console.log(err);
                    res.status(400).json({"poruka": "greska"});
                }
                else res.json({"poruka": "ok"});
            })
            
        });

        
    }

    azurirajKnjigu = (req: express.Request, res: express.Response)=>{
        
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

        let idKnj = req.body.idKnj;
        let naziv = req.body.naziv;
        let autoriTekst =  req.body.autoriTekst;
        let godina_izdavanja = req.body.godina_izdavanja;
        let izdavac = req.body.izdavac;
        let jezik = req.body.jezik;
        let zanr = req.body.zanr;
        let br_stanje = req.body.br_stanje;

        console.log(idKnj);

        if(uploadFajl == null){
            Knjiga.updateOne({'idKnj': idKnj}, {$set: {'naziv': naziv, 'godina_izdavanja': godina_izdavanja,
            'autoriTekst': autoriTekst, 'izdavac': izdavac, 'jezik': jezik, 
            'zanr': zanr, 'br_stanje': br_stanje}}, (err, resp)=>{
            if(err) console.log(err); 
            else res.json({'poruka': 'ok'});
        })
        }else{
            Knjiga.updateOne({'idKnj': idKnj}, {$set: {'naziv': naziv, 'godina_izdavanja': godina_izdavanja,
            'autoriTekst': autoriTekst, 'izdavac': izdavac, 'jezik': jezik, 
            'zanr': zanr, 'br_stanje': br_stanje, 'slika_knjige': imeFajl}}, (err, resp)=>{
            if(err) console.log(err); 
            else res.json({'poruka': 'ok'});
        })
        }
    }

    izbrisiKnjigu = (req: express.Request, res: express.Response)=>{
        let idKnj = req.body.idKnj;

        Knjiga.deleteOne({ "idKnj": idKnj }, (err, resp)=>{
            if(err) console.log(err);
            else {
                res.json({'poruka': 'ok'});
            }
        })
    }
}