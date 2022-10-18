import express from 'express'
import Utisak from '../models/utisak';

export class UtisakController{

    ostaviUtisak = (req: express.Request, res: express.Response)=>{
        
        let broj = 0;
        let idKnj1  = req.body.idKnj;
        let mejl1 = req.body.mejl;

        Utisak.count({'idKnj': idKnj1, 'mejl': mejl1}, (err, brojUti)=>{
            if(err) console.log(err);
            else {
                console.log("Broj utisaka: " + brojUti);
                broj = brojUti;

                if(broj==0){
                    let utisak = new Utisak({
                        idKnj: req.body.idKnj,
                        mejl: req.body.mejl,
                        datum_postavljanja: req.body.datum_postavljanja,
                        komentar: req.body.komentar,
                        ocena: req.body.ocena,
                        azuriran: false
                    });
            
                    console.log(utisak);
            
                    utisak.save((err, resp)=>{
                        if(err){ 
                            console.log(err);
                            res.status(400).json({"poruka": "greska"});
                        }
                        else res.json({"poruka": "ok"});
                    });
        
                }else res.json({"poruka": "broj"});
            }
        })
    }

    dohvatiSveUtiske = (req: express.Request, res: express.Response)=>{

        let idKnj = req.body.idKnj;

        Utisak.find({'idKnj': idKnj}, (err, utisciSvi)=>{
            if(err) console.log(err);
            else {
                res.json(utisciSvi);
            }
        })
    }

    dohvatiUtisak = (req: express.Request, res: express.Response)=>{

        let idKnj = req.body.idKnj;
        let mejl = req.body.mejl;

        Utisak.findOne({'idKnj': idKnj, "mejl": mejl}, (err, utisak)=>{
            if(err) console.log(err);
            else {
                res.json(utisak);
            }
        })
    }

    azurirajUtisak = (req: express.Request, res: express.Response)=>{
        
        let idKnj  = req.body.idKnj;
        let mejl = req.body.mejl;
        let komentar = req.body.komentar;
        let ocena = req.body.ocena;
        let datum_postavljanja = req.body.datum_postavljanja;

        Utisak.updateOne({'idKnj': idKnj, 'mejl': mejl}, {$set: {"komentar": komentar,
            "ocena": ocena, "datum_postavljanja": datum_postavljanja, "azuriran": true}}, (err, resp)=>{
                if(err) console.log(err); 
                else res.json({'poruka': 'ok'});
        });
            
    }
}