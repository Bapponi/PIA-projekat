import express from 'express'
import trenutnaZaduzenja from '../models/trenutnaZaduzenja';

export class TrenutnaZaduzenjaController{

    dohvatiTrenutnaZaduzenja = (req: express.Request, res: express.Response)=>{
        let mejl = req.body.mejl;

        trenutnaZaduzenja.find({'mejl': mejl}, (err, trenutnaZaduzenja)=>{
            if(err) console.log(err);
            else {
                res.json(trenutnaZaduzenja);
            }
        })
    }

    dodatiZaduzenje = (req: express.Request, res: express.Response)=>{
        let mejl = req.body.mejl;
        let idKnj = req.body.idKnj;
        let datum_zaduzivanja = req.body.datum_zaduzivanja;
        let produzeno = false;

        trenutnaZaduzenja.insertMany({ "idKnj": idKnj, "datum_zaduzivanja": datum_zaduzivanja, 
        "mejl": mejl, "produzeno": produzeno });
        res.json({'poruka': 'ok'})
    }

    zavrsiZaduzenje = (req: express.Request, res: express.Response)=>{
        let idKnj = req.body.idKnj;

        trenutnaZaduzenja.deleteOne({ "idKnj": idKnj }, (err, resp)=>{
            if(err) console.log(err);
            else {
                res.json({'poruka': 'ok'});
            }
        })
    }

    brojZaduzenja = (req: express.Request, res: express.Response)=>{
        let idKnj = req.body.idKnj;
        console.log(idKnj);

        trenutnaZaduzenja.count({ "idKnj": idKnj }, (err, broj)=>{
            if(err) console.log(err);
            else {
                res.json(broj);
            }
        })
    }

    produziZaduzenje = (req: express.Request, res: express.Response)=>{
        let idKnj = req.body.idKnj;
        let mejl = req.body.mejl;
        let produzeno = true;

        trenutnaZaduzenja.updateOne({ "idKnj": idKnj, "mejl": mejl }, {$set: {"produzeno": produzeno}}, (err, resp)=>{
            if(err) console.log(err);
            else {
                res.json({'poruka': 'ok'});
            }
        })
    }

    postojiZaduzenje = (req: express.Request, res: express.Response)=>{
        let idKnj = req.body.idKnj;
        let mejl = req.body.mejl;

        trenutnaZaduzenja.count({ "idKnj": idKnj, "mejl": mejl }, (err, broj)=>{
            if(err) console.log(err);
            else {
                res.json(broj);
            }
        })
    }
}