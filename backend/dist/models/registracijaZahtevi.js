"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let RegistracijaZahtevi = new Schema({
    korisnicko_ime: {
        type: String
    },
    lozinka: {
        type: String
    },
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    adresa: {
        type: String
    },
    kontakt: {
        type: String
    },
    mejl: {
        type: String
    },
    slika: {
        type: String
    },
    tip: {
        type: String
    },
    blokiran: {
        type: Boolean
    },
    broj_zaduzenja: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('RegistracijaZahtevi', RegistracijaZahtevi, 'registracijaZahtevi');
//# sourceMappingURL=registracijaZahtevi.js.map