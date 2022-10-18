"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const knjiga_controller_1 = require("../controllers/knjiga.controller");
const knjigaRouter = express_1.default.Router();
knjigaRouter.route('/brojKnjiga').get((req, res) => new knjiga_controller_1.KnjigaController().brojKnjiga(req, res));
knjigaRouter.route('/dohvatiKnjigu').post((req, res) => new knjiga_controller_1.KnjigaController().dohvatiKnjigu(req, res));
knjigaRouter.route('/dohvatiSveKnjige').get((req, res) => new knjiga_controller_1.KnjigaController().dohvatiSveKnjige(req, res));
knjigaRouter.route('/dohvatiTopKnjige').get((req, res) => new knjiga_controller_1.KnjigaController().dohvatiTopKnjige(req, res));
knjigaRouter.route('/zaduziKnjigu').post((req, res) => new knjiga_controller_1.KnjigaController().zaduziKnjigu(req, res));
knjigaRouter.route('/promeniBrojUzimanja').post((req, res) => new knjiga_controller_1.KnjigaController().promeniBrojUzimanja(req, res));
knjigaRouter.route('/ubaciKnjigu').post((req, res) => new knjiga_controller_1.KnjigaController().ubaciKnjigu(req, res));
knjigaRouter.route('/azurirajKnjigu').post((req, res) => new knjiga_controller_1.KnjigaController().azurirajKnjigu(req, res));
knjigaRouter.route('/izbrisiKnjigu').post((req, res) => new knjiga_controller_1.KnjigaController().izbrisiKnjigu(req, res));
exports.default = knjigaRouter;
//# sourceMappingURL=knjiga.routes.js.map