import express from 'express'
import istorijaZaduzenja from '../models/istorijaZaduzenja';

export class IstorijaZaduzenjaController{

    dodatiZaduzenje = (req: express.Request, res: express.Response)=>{
        let mejl = req.body.mejl;
        let idKnj = req.body.idKnj;
        let datum_zaduzivanja = req.body.datum_zaduzivanja;
        let datum_vracanja = req.body.datum_vracanja;

        istorijaZaduzenja.insertMany({ "idKnj": idKnj, "datum_zaduzivanja": datum_zaduzivanja, 
            "mejl": mejl, "datum_vracanja": datum_vracanja});
        res.json({'poruka': 'ok'})
    }

    dohvatiIstorijuZaduzenja = (req: express.Request, res: express.Response)=>{
        let mejl = req.body.mejl;

        istorijaZaduzenja.find({'mejl': mejl}, (err, trenutnaZaduzenja)=>{
            if(err) console.log(err);
            else {
                res.json(trenutnaZaduzenja);
            }
        })
    }

    brojZaduzenja = (req: express.Request, res: express.Response)=>{
        let idKnj = req.body.idKnj;
        console.log(idKnj);

        istorijaZaduzenja.count({ "idKnj": idKnj }, (err, broj)=>{
            if(err) console.log(err);
            else {
                res.json(broj);
            }
        })
    }

    izbrisiIstorijuZaduzenja = (req: express.Request, res: express.Response)=>{
        let idKnj = req.body.idKnj;
        //console.log(idKnj);

        istorijaZaduzenja.deleteMany({ "idKnj": idKnj }, (err, resp)=>{
            if(err) console.log(err);
            else {
                res.json({'poruka': 'ok'})
            }
        })
    }

    istorijaZaKorisnika = (req: express.Request, res: express.Response)=>{
        let idKnj = req.body.idKnj;
        let mejl = req.body.mejl;
        console.log(idKnj);

        istorijaZaduzenja.count({ "idKnj": idKnj, "mejl": mejl }, (err, broj)=>{
            if(err) console.log(err);
            else {
                res.json(broj);
            }
        })
    }
}