"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrenutnaZaduzenjaController = void 0;
const trenutnaZaduzenja_1 = __importDefault(require("../models/trenutnaZaduzenja"));
class TrenutnaZaduzenjaController {
    constructor() {
        this.dohvatiTrenutnaZaduzenja = (req, res) => {
            let mejl = req.body.mejl;
            trenutnaZaduzenja_1.default.find({ 'mejl': mejl }, (err, trenutnaZaduzenja) => {
                if (err)
                    console.log(err);
                else {
                    res.json(trenutnaZaduzenja);
                }
            });
        };
        this.dodatiZaduzenje = (req, res) => {
            let mejl = req.body.mejl;
            let idKnj = req.body.idKnj;
            let datum_zaduzivanja = req.body.datum_zaduzivanja;
            let produzeno = false;
            trenutnaZaduzenja_1.default.insertMany({ "idKnj": idKnj, "datum_zaduzivanja": datum_zaduzivanja,
                "mejl": mejl, "produzeno": produzeno });
            res.json({ 'poruka': 'ok' });
        };
        this.zavrsiZaduzenje = (req, res) => {
            let idKnj = req.body.idKnj;
            trenutnaZaduzenja_1.default.deleteOne({ "idKnj": idKnj }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'poruka': 'ok' });
                }
            });
        };
        this.brojZaduzenja = (req, res) => {
            let idKnj = req.body.idKnj;
            console.log(idKnj);
            trenutnaZaduzenja_1.default.count({ "idKnj": idKnj }, (err, broj) => {
                if (err)
                    console.log(err);
                else {
                    res.json(broj);
                }
            });
        };
        this.produziZaduzenje = (req, res) => {
            let idKnj = req.body.idKnj;
            let mejl = req.body.mejl;
            let produzeno = true;
            trenutnaZaduzenja_1.default.updateOne({ "idKnj": idKnj, "mejl": mejl }, { $set: { "produzeno": produzeno } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'poruka': 'ok' });
                }
            });
        };
        this.postojiZaduzenje = (req, res) => {
            let idKnj = req.body.idKnj;
            let mejl = req.body.mejl;
            trenutnaZaduzenja_1.default.count({ "idKnj": idKnj, "mejl": mejl }, (err, broj) => {
                if (err)
                    console.log(err);
                else {
                    res.json(broj);
                }
            });
        };
    }
}
exports.TrenutnaZaduzenjaController = TrenutnaZaduzenjaController;
//# sourceMappingURL=trenutnaZaduzenja.controller.js.map