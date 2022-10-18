"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//import multer from 'multer';
const registracijaZahtevi_controller_1 = require("../controllers/registracijaZahtevi.controller");
const registracijaZahteviRouter = express_1.default.Router();
// const storage = multer.diskStorage({
//     destination: (req, file, cb)=>{
//         cb(null, '../slikeKorisnik');
//     },
//     filename: (req, file, cb) => {
//         console.log(file);
//         cb(null, 'imeSlike');
//     }
// });
// const upload = multer({storage: storage});
registracijaZahteviRouter.route('/registrujSe').post((req, res) => new registracijaZahtevi_controller_1.RegistracijaZahteviController().registrujSe(req, res));
registracijaZahteviRouter.route('/dohvatiSveZahteve').get((req, res) => new registracijaZahtevi_controller_1.RegistracijaZahteviController().dohvatiSveZahteve(req, res));
registracijaZahteviRouter.route('/izbrisiZahtev').post((req, res) => new registracijaZahtevi_controller_1.RegistracijaZahteviController().izbrisiZahtev(req, res));
exports.default = registracijaZahteviRouter;
//# sourceMappingURL=registracijaZahtevi.routes.js.map