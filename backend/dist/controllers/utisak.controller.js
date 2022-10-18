"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtisakController = void 0;
const utisak_1 = __importDefault(require("../models/utisak"));
class UtisakController {
    constructor() {
        this.ostaviUtisak = (req, res) => {
            let broj = 0;
            let idKnj1 = req.body.idKnj;
            let mejl1 = req.body.mejl;
            utisak_1.default.count({ 'idKnj': idKnj1, 'mejl': mejl1 }, (err, brojUti) => {
                if (err)
                    console.log(err);
                else {
                    console.log("Broj utisaka: " + brojUti);
                    broj = brojUti;
                    if (broj == 0) {
                        let utisak = new utisak_1.default({
                            idKnj: req.body.idKnj,
                            mejl: req.body.mejl,
                            datum_postavljanja: req.body.datum_postavljanja,
                            komentar: req.body.komentar,
                            ocena: req.body.ocena,
                            azuriran: false
                        });
                        console.log(utisak);
                        utisak.save((err, resp) => {
                            if (err) {
                                console.log(err);
                                res.status(400).json({ "poruka": "greska" });
                            }
                            else
                                res.json({ "poruka": "ok" });
                        });
                    }
                    else
                        res.json({ "poruka": "broj" });
                }
            });
        };
        this.dohvatiSveUtiske = (req, res) => {
            let idKnj = req.body.idKnj;
            utisak_1.default.find({ 'idKnj': idKnj }, (err, utisciSvi) => {
                if (err)
                    console.log(err);
                else {
                    res.json(utisciSvi);
                }
            });
        };
        this.dohvatiUtisak = (req, res) => {
            let idKnj = req.body.idKnj;
            let mejl = req.body.mejl;
            utisak_1.default.findOne({ 'idKnj': idKnj, "mejl": mejl }, (err, utisak) => {
                if (err)
                    console.log(err);
                else {
                    res.json(utisak);
                }
            });
        };
        this.azurirajUtisak = (req, res) => {
            let idKnj = req.body.idKnj;
            let mejl = req.body.mejl;
            let komentar = req.body.komentar;
            let ocena = req.body.ocena;
            let datum_postavljanja = req.body.datum_postavljanja;
            utisak_1.default.updateOne({ 'idKnj': idKnj, 'mejl': mejl }, { $set: { "komentar": komentar,
                    "ocena": ocena, "datum_postavljanja": datum_postavljanja, "azuriran": true } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'poruka': 'ok' });
            });
        };
    }
}
exports.UtisakController = UtisakController;
//# sourceMappingURL=utisak.controller.js.map