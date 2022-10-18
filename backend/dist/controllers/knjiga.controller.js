"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnjigaController = void 0;
const fs_1 = __importDefault(require("fs"));
const knjiga_1 = __importDefault(require("../models/knjiga"));
class KnjigaController {
    constructor() {
        this.brojKnjiga = (req, res) => {
            knjiga_1.default.count({}, (err, brojKnj) => {
                if (err)
                    console.log(err);
                else {
                    console.log("Broj knjiga: " + brojKnj);
                    res.json(brojKnj);
                }
            });
        };
        this.dohvatiKnjigu = (req, res) => {
            let idKnj = req.body.idKnj;
            knjiga_1.default.findOne({ 'idKnj': idKnj }, (err, knjiga) => {
                if (err)
                    console.log(err);
                else {
                    res.json(knjiga);
                }
            });
        };
        this.dohvatiSveKnjige = (req, res) => {
            knjiga_1.default.find({}, (err, knjigeSve) => {
                if (err)
                    console.log(err);
                else {
                    res.json(knjigeSve);
                }
            });
        };
        this.dohvatiTopKnjige = (req, res) => {
            knjiga_1.default.find({}, (err, knjigeSve) => {
                if (err)
                    console.log(err);
                else {
                    res.json(knjigeSve);
                }
            }).sort({ broj_uzimanja: -1 }).limit(3);
        };
        this.zaduziKnjigu = (req, res) => {
            let idKnj = req.body.idKnj;
            let br_stanje = req.body.br_stanje;
            console.log(idKnj);
            console.log(br_stanje);
            knjiga_1.default.updateOne({ 'idKnj': idKnj }, { $set: { 'br_stanje': br_stanje } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'poruka': 'ok' });
            });
        };
        this.promeniBrojUzimanja = (req, res) => {
            let idKnj = req.body.idKnj;
            let broj_uzimanja = req.body.broj_uzimanja;
            console.log(idKnj);
            console.log(broj_uzimanja);
            knjiga_1.default.updateOne({ 'idKnj': idKnj }, { $set: { 'broj_uzimanja': broj_uzimanja } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'poruka': 'ok' });
            });
        };
        this.ubaciKnjigu = (req, res) => {
            knjiga_1.default.find({}, (err, knjigeSve) => {
                let max = 0;
                for (let i = 0; i < knjigeSve.length; i++) {
                    if (max < knjigeSve[i].idKnj) {
                        max = knjigeSve[i].idKnj;
                    }
                }
                let imeFajl = req.body.imeFajl;
                let uploadFajl = req.body.uploadFajl;
                console.log('slika', imeFajl);
                console.log('uploadFajl', uploadFajl);
                if (uploadFajl != null) {
                    fs_1.default.writeFile('./src/assets/slika_knjige/' + imeFajl, uploadFajl, 'binary', function (err) {
                        if (err) {
                            return console.log(err);
                        }
                        console.log("The file was saved!");
                    });
                }
                console.log("Max id: " + max);
                let knjiga = new knjiga_1.default({
                    idKnj: max + 1,
                    naziv: req.body.naziv,
                    autoriTekst: req.body.autoriTekst,
                    godina_izdavanja: req.body.godina_izdavanja,
                    izdavac: req.body.izdavac,
                    jezik: req.body.jezik,
                    zanr: req.body.zanr,
                    br_stanje: req.body.br_stanje,
                    broj_uzimanja: 0,
                    slika_knjige: imeFajl
                });
                console.log(knjiga);
                knjiga.save((err, resp) => {
                    if (err) {
                        console.log(err);
                        res.status(400).json({ "poruka": "greska" });
                    }
                    else
                        res.json({ "poruka": "ok" });
                });
            });
        };
        this.azurirajKnjigu = (req, res) => {
            let imeFajl = req.body.imeFajl;
            let uploadFajl = req.body.uploadFajl;
            console.log('slika', imeFajl);
            console.log('uploadFajl', uploadFajl);
            if (uploadFajl != null) {
                fs_1.default.writeFile('./src/assets/slika_knjige/' + imeFajl, uploadFajl, 'binary', function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("The file was saved!");
                });
            }
            let idKnj = req.body.idKnj;
            let naziv = req.body.naziv;
            let autoriTekst = req.body.autoriTekst;
            let godina_izdavanja = req.body.godina_izdavanja;
            let izdavac = req.body.izdavac;
            let jezik = req.body.jezik;
            let zanr = req.body.zanr;
            let br_stanje = req.body.br_stanje;
            console.log(idKnj);
            if (uploadFajl == null) {
                knjiga_1.default.updateOne({ 'idKnj': idKnj }, { $set: { 'naziv': naziv, 'godina_izdavanja': godina_izdavanja,
                        'autoriTekst': autoriTekst, 'izdavac': izdavac, 'jezik': jezik,
                        'zanr': zanr, 'br_stanje': br_stanje } }, (err, resp) => {
                    if (err)
                        console.log(err);
                    else
                        res.json({ 'poruka': 'ok' });
                });
            }
            else {
                knjiga_1.default.updateOne({ 'idKnj': idKnj }, { $set: { 'naziv': naziv, 'godina_izdavanja': godina_izdavanja,
                        'autoriTekst': autoriTekst, 'izdavac': izdavac, 'jezik': jezik,
                        'zanr': zanr, 'br_stanje': br_stanje, 'slika_knjige': imeFajl } }, (err, resp) => {
                    if (err)
                        console.log(err);
                    else
                        res.json({ 'poruka': 'ok' });
                });
            }
        };
        this.izbrisiKnjigu = (req, res) => {
            let idKnj = req.body.idKnj;
            knjiga_1.default.deleteOne({ "idKnj": idKnj }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'poruka': 'ok' });
                }
            });
        };
    }
}
exports.KnjigaController = KnjigaController;
//# sourceMappingURL=knjiga.controller.js.map