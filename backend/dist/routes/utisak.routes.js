"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const utisak_controller_1 = require("../controllers/utisak.controller");
const utisakRouter = express_1.default.Router();
utisakRouter.route('/ostaviUtisak').post((req, res) => new utisak_controller_1.UtisakController().ostaviUtisak(req, res));
utisakRouter.route('/dohvatiSveUtiske').post((req, res) => new utisak_controller_1.UtisakController().dohvatiSveUtiske(req, res));
utisakRouter.route('/dohvatiUtisak').post((req, res) => new utisak_controller_1.UtisakController().dohvatiUtisak(req, res));
utisakRouter.route('/azurirajUtisak').post((req, res) => new utisak_controller_1.UtisakController().azurirajUtisak(req, res));
exports.default = utisakRouter;
//# sourceMappingURL=utisak.routes.js.map