"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Knjiga = new Schema({
    idKnj: {
        type: Number
    },
    naziv: {
        type: String
    },
    slika_knjige: {
        type: String
    },
    autori: {
        type: (Array)
    },
    autoriTekst: {
        type: String
    },
    broj_uzimanja: {
        type: Number
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
    },
    br_stanje: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('Knjiga', Knjiga, 'knjige');
//# sourceMappingURL=knjiga.js.map