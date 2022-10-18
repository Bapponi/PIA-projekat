import express from 'express';
import { ZahtevController } from '../controllers/zahtev.controller';

const zahtevRouter = express.Router();

zahtevRouter.route('/dodajZahtev').post(
    (req, res)=> new ZahtevController().dodajZahtev(req, res)
)

zahtevRouter.route('/dohvatiSveZahteve').get(
    (req, res)=> new ZahtevController().dohvatiSveZahteve(req, res)
)

zahtevRouter.route('/izbrisiZahtev').post(
    (req, res)=> new ZahtevController().izbrisiZahtev(req, res)
)

export default zahtevRouter;