"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let TrenutnaZaduzenja = new Schema({
    mejl: {
        type: String
    },
    idKnj: {
        type: Number
    },
    datum_zaduzivanja: {
        type: String
    },
    produzeno: {
        type: Boolean
    }
});
exports.default = mongoose_1.default.model('TrenutnaZaduzenja', TrenutnaZaduzenja, 'trenutnaZaduzenja');
//# sourceMappingURL=trenutnaZaduzenja.js.map