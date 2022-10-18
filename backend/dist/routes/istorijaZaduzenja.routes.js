"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const istorijaZaduzenja_controller_1 = require("../controllers/istorijaZaduzenja.controller");
const istorijaZaduzenjaRouter = express_1.default.Router();
istorijaZaduzenjaRouter.route('/dodatiZaduzenje').post((req, res) => new istorijaZaduzenja_controller_1.IstorijaZaduzenjaController().dodatiZaduzenje(req, res));
istorijaZaduzenjaRouter.route('/dohvatiIstorijuZaduzenja').post((req, res) => new istorijaZaduzenja_controller_1.IstorijaZaduzenjaController().dohvatiIstorijuZaduzenja(req, res));
istorijaZaduzenjaRouter.route('/brojZaduzenja').post((req, res) => new istorijaZaduzenja_controller_1.IstorijaZaduzenjaController().brojZaduzenja(req, res));
istorijaZaduzenjaRouter.route('/izbrisiIstorijuZaduzenja').post((req, res) => new istorijaZaduzenja_controller_1.IstorijaZaduzenjaController().izbrisiIstorijuZaduzenja(req, res));
istorijaZaduzenjaRouter.route('/istorijaZaKorisnika').post((req, res) => new istorijaZaduzenja_controller_1.IstorijaZaduzenjaController().istorijaZaKorisnika(req, res));
exports.default = istorijaZaduzenjaRouter;
//# sourceMappingURL=istorijaZaduzenja.routes.js.map