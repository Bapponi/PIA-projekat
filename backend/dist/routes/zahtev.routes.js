"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zahtev_controller_1 = require("../controllers/zahtev.controller");
const zahtevRouter = express_1.default.Router();
zahtevRouter.route('/dodajZahtev').post((req, res) => new zahtev_controller_1.ZahtevController().dodajZahtev(req, res));
zahtevRouter.route('/dohvatiSveZahteve').get((req, res) => new zahtev_controller_1.ZahtevController().dohvatiSveZahteve(req, res));
zahtevRouter.route('/izbrisiZahtev').post((req, res) => new zahtev_controller_1.ZahtevController().izbrisiZahtev(req, res));
exports.default = zahtevRouter;
//# sourceMappingURL=zahtev.routes.js.map