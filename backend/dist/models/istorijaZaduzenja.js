"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let IstorijaZaduzenja = new Schema({
    mejl: {
        type: String
    },
    idKnj: {
        type: Number
    },
    datum_zaduzivanja: {
        type: String
    },
    datum_vracanja: {
        type: String
    }
});
exports.default = mongoose_1.default.model('IstorijaZaduzenja', IstorijaZaduzenja, 'istorijaZaduzenja');
//# sourceMappingURL=istorijaZaduzenja.js.map