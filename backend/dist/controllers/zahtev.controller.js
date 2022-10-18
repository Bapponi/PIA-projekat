"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZahtevController = void 0;
const fs_1 = __importDefault(require("fs"));
const zahtev_1 = __importDefault(require("../models/zahtev"));
class ZahtevController {
    constructor() {
        this.dodajZahtev = (req, res) => {
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
            let zahtev = new zahtev_1.default({
                korisnicko_ime: req.body.korisnicko_ime,
                naziv: req.body.naziv,
                autoriTekst: req.body.autoriTekst,
                godina_izdavanja: req.body.godina_izdavanja,
                izdavac: req.body.izdavac,
                jezik: req.body.jezik,
                zanr: req.body.zanr,
                slika_knjige: imeFajl
            });
            console.log(zahtev);
            zahtev.save((err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "poruka": "greska" });
                }
                else
                    res.json({ "poruka": "ok" });
            });
        };
        this.dohvatiSveZahteve = (req, res) => {
            zahtev_1.default.find({}, (err, zahtevi) => {
                if (err)
                    console.log(err);
                else {
                    res.json(zahtevi);
                }
            });
        };
        this.izbrisiZahtev = (req, res) => {
            let korisnicko_ime = req.body.korisnicko_ime;
            let naziv = req.body.naziv;
            zahtev_1.default.deleteOne({ "korisnicko_ime": korisnicko_ime, "naziv": naziv }, (err, resp) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ "poruka": "greska" });
                }
                else
                    res.json({ "poruka": "ok" });
            });
        };
    }
}
exports.ZahtevController = ZahtevController;
//# sourceMappingURL=zahtev.controller.js.map