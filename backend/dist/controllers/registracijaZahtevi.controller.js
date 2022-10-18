"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistracijaZahteviController = void 0;
const fs_1 = __importDefault(require("fs"));
const registracijaZahtevi_1 = __importDefault(require("../models/registracijaZahtevi"));
const registracijaZahtevi_2 = __importDefault(require("../models/registracijaZahtevi"));
class RegistracijaZahteviController {
    constructor() {
        this.registrujSe = (req, res) => {
            let imeFajl = req.body.imeFajl;
            let uploadFajl = req.body.uploadFajl;
            console.log('slika', imeFajl);
            console.log('uploadFajl', uploadFajl);
            fs_1.default.writeFile('./src/assets/slika_korisnici/' + imeFajl, uploadFajl, 'binary', function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("The file was saved!");
            });
            // let file = req['files'].thumbnail;
            // console.log("File uploaded: ", file.name);
            // console.log(file);
            // const imagePath = 'http://localhost:4000/slikeKorisnik/' + req.body.file.slika.name;
            let registracijaZahtevi = new registracijaZahtevi_2.default({
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
                broj_zaduzenja: 0,
                //slika: req.body.slika.name
            });
            console.log(registracijaZahtevi);
            registracijaZahtevi.save((err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "poruka": "greska" });
                }
                else
                    res.json({ "poruka": "ok" });
            });
        };
        this.dohvatiSveZahteve = (req, res) => {
            registracijaZahtevi_1.default.find({}, (err, zahteviSvi) => {
                if (err)
                    console.log(err);
                else {
                    res.json(zahteviSvi);
                }
            });
        };
        this.izbrisiZahtev = (req, res) => {
            let mejl = req.body.mejl;
            console.log(mejl);
            //paziti ovde ako ima dva mejla ista, ubacit idKor ako treba
            registracijaZahtevi_2.default.deleteOne({ "mejl": mejl }, (err, resp) => {
                if (err)
                    console.log(err);
                else {
                    res.json({ 'poruka': 'ok' });
                }
            });
        };
    }
}
exports.RegistracijaZahteviController = RegistracijaZahteviController;
//# sourceMappingURL=registracijaZahtevi.controller.js.map