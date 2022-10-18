import express from 'express';
import { UtisakController } from '../controllers/utisak.controller';

const utisakRouter = express.Router();

utisakRouter.route('/ostaviUtisak').post(
    (req, res)=> new UtisakController().ostaviUtisak(req, res)
)

utisakRouter.route('/dohvatiSveUtiske').post(
    (req, res)=> new UtisakController().dohvatiSveUtiske(req, res)
)

utisakRouter.route('/dohvatiUtisak').post(
    (req, res)=> new UtisakController().dohvatiUtisak(req, res)
)

utisakRouter.route('/azurirajUtisak').post(
    (req, res)=> new UtisakController().azurirajUtisak(req, res)
)

export default utisakRouter;