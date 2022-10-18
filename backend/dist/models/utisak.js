"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Utisak = new Schema({
    mejl: {
        type: String
    },
    idKnj: {
        type: Number
    },
    datum_postavljanja: {
        type: String
    },
    komentar: {
        type: String
    },
    ocena: {
        type: Number
    },
    azuriran: {
        type: Boolean
    }
});
exports.default = mongoose_1.default.model('Utisak', Utisak, 'utisci');
//# sourceMappingURL=utisak.js.map