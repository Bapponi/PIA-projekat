"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const trenutnaZaduzenja_controller_1 = require("../controllers/trenutnaZaduzenja.controller");
const trenutnaZaduzenjaRouter = express_1.default.Router();
trenutnaZaduzenjaRouter.route('/dohvatiTrenutnaZaduzenja').post((req, res) => new trenutnaZaduzenja_controller_1.TrenutnaZaduzenjaController().dohvatiTrenutnaZaduzenja(req, res));
trenutnaZaduzenjaRouter.route('/dodatiZaduzenje').post((req, res) => new trenutnaZaduzenja_controller_1.TrenutnaZaduzenjaController().dodatiZaduzenje(req, res));
trenutnaZaduzenjaRouter.route('/zavrsiZaduzenje').post((req, res) => new trenutnaZaduzenja_controller_1.TrenutnaZaduzenjaController().zavrsiZaduzenje(req, res));
trenutnaZaduzenjaRouter.route('/brojZaduzenja').post((req, res) => new trenutnaZaduzenja_controller_1.TrenutnaZaduzenjaController().brojZaduzenja(req, res));
trenutnaZaduzenjaRouter.route('/produziZaduzenje').post((req, res) => new trenutnaZaduzenja_controller_1.TrenutnaZaduzenjaController().produziZaduzenje(req, res));
trenutnaZaduzenjaRouter.route('/postojiZaduzenje').post((req, res) => new trenutnaZaduzenja_controller_1.TrenutnaZaduzenjaController().postojiZaduzenje(req, res));
exports.default = trenutnaZaduzenjaRouter;
//# sourceMappingURL=trenutnaZaduzenja.routes.js.map