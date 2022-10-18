"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IstorijaZaduzenjaController = void 0;
const istorijaZaduzenja_1 = __importDefault(require("../models/istorijaZaduzenja"));
class IstorijaZaduzenjaController {
    constructor() {
        this.dodatiZaduzenje = (req, res) => {
            let mejl = req.body.mejl;
            let idKnj = req.body.idKnj;
            let datum_zaduzivanja = req.body.datum_zaduzivanja;
            let datum_vracanja = req.body.datum_vracanja;
            istorijaZaduzenja_1.default.insertMany({ "idKnj": idKnj, "datum_zaduzivanja": datum_zaduzivanja,
                "mejl": mejl, "datum_vracanja": datum_vracanja });
            res.json({ 'poruka': 'ok' });
        };
        this.dohvatiIstorijuZaduzenja = (req, res) => {
            let mejl = req.body.mejl;
            istorijaZaduzenja_1.default.find({ 'mejl': mejl }, (err, trenutnaZaduzenja) => {
                if (err)
                    console.log(err);
                else {
                    res.json(trenutnaZaduzenja);
                }
            });
        };
        this.brojZaduzenja = (req, res) => {
            let idKnj = req.body.idKnj;
            console.log(idKnj);
            istorijaZaduzenja_1.default.count({ "idKnj": idKnj }, (err, broj) => {
                if (err)
                    console.log(err);
                else {
                    res.json(broj);
                }
            });
        };
        this.izbrisiIstorijuZaduzenja = (req, res) => {
            let idKnj = req.body.idKnj;
            //console.log(idKnj);
            istorijaZaduzenja_1.default.deleteMany({ "idKnj": idKnj }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'poruka': 'ok' });
                }
            });
        };
        this.istorijaZaKorisnika = (req, res) => {
            let idKnj = req.body.idKnj;
            let mejl = req.body.mejl;
            console.log(idKnj);
            istorijaZaduzenja_1.default.count({ "idKnj": idKnj, "mejl": mejl }, (err, broj) => {
                if (err)
                    console.log(err);
                else {
                    res.json(broj);
                }
            });
        };
    }
}
exports.IstorijaZaduzenjaController = IstorijaZaduzenjaController;
//# sourceMappingURL=istorijaZaduzenja.controller.js.map