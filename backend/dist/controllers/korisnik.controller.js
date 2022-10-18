"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KorisnikController = void 0;
const fs_1 = __importDefault(require("fs"));
const korisnik_1 = __importDefault(require("../models/korisnik"));
class KorisnikController {
    constructor() {
        this.prijavaNaSistem = (req, res) => {
            let korisnicko_ime = req.body.korisnicko_ime;
            let lozinka = req.body.lozinka;
            console.log(korisnicko_ime);
            console.log(lozinka);
            korisnik_1.default.findOne({ 'korisnicko_ime': korisnicko_ime, 'lozinka': lozinka }, (err, korisnik) => {
                if (err)
                    console.log(err);
                else
                    res.json(korisnik);
            });
        };
        this.registrujSe = (req, res) => {
            let imeFajl = req.body.slika;
            let uploadFajl = req.body.uploadFajl;
            console.log('slika', imeFajl);
            console.log('uploadFajl', uploadFajl);
            if (uploadFajl != null) {
                fs_1.default.writeFile('./src/assets/slika_korisnici/' + imeFajl, uploadFajl, 'binary', function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("The file was saved!");
                });
            }
            let korisnik = new korisnik_1.default({
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
                broj_zaduzenja: 0
            });
            console.log(korisnik);
            korisnik.save((err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "poruka": "greska" });
                }
                else
                    res.json({ "poruka": "ok" });
            });
        };
        this.zameniImeSlike = (req, res) => {
            let mejl = req.body.mejl;
            let slika = req.body.slika;
            korisnik_1.default.updateOne({ 'mejl': mejl }, { $set: { 'slika': slika } }, (err, korisnik) => {
                if (err)
                    console.log(err);
                else
                    res.json(korisnik);
            });
        };
        this.dohvatiKorisnika = (req, res) => {
            let mejl = req.body.mejl;
            korisnik_1.default.findOne({ 'mejl': mejl }, (err, korisnik) => {
                if (err)
                    console.log(err);
                else
                    res.json(korisnik);
            });
        };
        this.promeniLozinku = (req, res) => {
            let lozinka = req.body.lozinka;
            let mejl = req.body.mejl;
            console.log(mejl);
            console.log(lozinka);
            korisnik_1.default.updateOne({ 'mejl': mejl }, { $set: { 'lozinka': lozinka } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'poruka': 'promenjena' });
            });
        };
        this.promeniBrojZaduzenja = (req, res) => {
            let broj_zaduzenja = req.body.broj_zaduzenja;
            let mejl = req.body.mejl;
            console.log(mejl);
            console.log(broj_zaduzenja);
            korisnik_1.default.updateOne({ 'mejl': mejl }, { $set: { 'broj_zaduzenja': broj_zaduzenja } }, (err, resp) => {
                if (err)
                    console.log(err);
                else
                    res.json({ 'poruka': 'promenjena' });
            });
        };
        this.dohvatiSveKorisnike = (req, res) => {
            korisnik_1.default.find({}, (err, korisniciSvi) => {
                if (err)
                    console.log(err);
                else {
                    res.json(korisniciSvi);
                }
            });
        };
        this.izbrisiKorisnika = (req, res) => {
            let mejl = req.body.mejl;
            console.log(mejl);
            korisnik_1.default.deleteOne({ "mejl": mejl }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'poruka': 'ok' });
                }
            });
        };
        this.azurirajKorisnika = (req, res) => {
            let imeFajl = req.body.slika;
            let uploadFajl = req.body.uploadFajl;
            console.log('slika', imeFajl);
            console.log('uploadFajl', uploadFajl);
            if (uploadFajl != null) {
                fs_1.default.writeFile('./src/assets/slika_korisnici/' + imeFajl, uploadFajl, 'binary', function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("The file was saved!");
                });
            }
            let stariMejl = req.body.stariMejl;
            let korisnicko_ime = req.body.korisnicko_ime;
            let lozinka = req.body.lozinka;
            let ime = req.body.ime;
            let prezime = req.body.prezime;
            let adresa = req.body.adresa;
            let kontakt = req.body.kontakt;
            let mejl = req.body.mejl;
            let tip = req.body.tip;
            console.log(stariMejl);
            console.log(mejl);
            if (uploadFajl == null) {
                korisnik_1.default.updateOne({ 'mejl': stariMejl }, { $set: { 'korisnicko_ime': korisnicko_ime,
                        'lozinka': lozinka, 'ime': ime, 'prezime': prezime,
                        'adresa': adresa, 'kontakt': kontakt, 'mejl': mejl, 'tip': tip, } }, (err, resp) => {
                    if (err)
                        console.log(err);
                    else
                        res.json({ 'poruka': 'ok' });
                });
            }
            else {
                korisnik_1.default.updateOne({ 'mejl': stariMejl }, { $set: { 'korisnicko_ime': korisnicko_ime,
                        'lozinka': lozinka, 'slika': imeFajl, 'ime': ime, 'prezime': prezime,
                        'adresa': adresa, 'kontakt': kontakt, 'mejl': mejl, 'tip': tip, } }, (err, resp) => {
                    if (err)
                        console.log(err);
                    else
                        res.json({ 'poruka': 'ok' });
                });
            }
        };
        this.promeniStatus = (req, res) => {
            let mejl = req.body.mejl;
            let blokiran = req.body.blokiran;
            console.log(mejl);
            korisnik_1.default.updateOne({ "mejl": mejl }, { $set: { "blokiran": blokiran } }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'poruka': 'ok' });
                }
            });
        };
    }
}
exports.KorisnikController = KorisnikController;
//# sourceMappingURL=korisnik.controller.js.map