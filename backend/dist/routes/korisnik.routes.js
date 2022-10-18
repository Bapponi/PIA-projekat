"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const korisnik_controller_1 = require("../controllers/korisnik.controller");
const korisnikRouter = express_1.default.Router();
korisnikRouter.route('/prijavaNaSistem').post((req, res) => new korisnik_controller_1.KorisnikController().prijavaNaSistem(req, res));
korisnikRouter.route('/registrujSe').post((req, res) => new korisnik_controller_1.KorisnikController().registrujSe(req, res));
korisnikRouter.route('/zameniImeSlike').post((req, res) => new korisnik_controller_1.KorisnikController().zameniImeSlike(req, res));
korisnikRouter.route('/dohvatiKorisnika').post((req, res) => new korisnik_controller_1.KorisnikController().dohvatiKorisnika(req, res));
korisnikRouter.route('/promeniLozinku').post((req, res) => new korisnik_controller_1.KorisnikController().promeniLozinku(req, res));
korisnikRouter.route('/promeniBrojZaduzenja').post((req, res) => new korisnik_controller_1.KorisnikController().promeniBrojZaduzenja(req, res));
korisnikRouter.route('/dohvatiSveKorisnike').get((req, res) => new korisnik_controller_1.KorisnikController().dohvatiSveKorisnike(req, res));
korisnikRouter.route('/izbrisiKorisnika').post((req, res) => new korisnik_controller_1.KorisnikController().izbrisiKorisnika(req, res));
korisnikRouter.route('/azurirajKorisnika').post((req, res) => new korisnik_controller_1.KorisnikController().azurirajKorisnika(req, res));
korisnikRouter.route('/promeniStatus').post((req, res) => new korisnik_controller_1.KorisnikController().promeniStatus(req, res));
exports.default = korisnikRouter;
//# sourceMappingURL=korisnik.routes.js.map