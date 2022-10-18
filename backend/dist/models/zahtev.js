"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Zahtev = new Schema({
    korisnicko_ime: {
        type: String
    },
    naziv: {
        type: String
    },
    slika_knjige: {
        type: String
    },
    autoriTekst: {
        type: String
    },
    godina_izdavanja: {
        type: String
    },
    izdavac: {
        type: String
    },
    jezik: {
        type: String
    },
    zanr: {
        type: String
    }
});
exports.default = mongoose_1.default.model('Zahtev', Zahtev, 'zahtevi');
//# sourceMappingURL=zahtev.js.map