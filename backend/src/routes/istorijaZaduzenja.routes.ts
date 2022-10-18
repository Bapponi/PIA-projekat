import express from 'express';
import { IstorijaZaduzenjaController } from '../controllers/istorijaZaduzenja.controller';

const istorijaZaduzenjaRouter = express.Router();

istorijaZaduzenjaRouter.route('/dodatiZaduzenje').post(
    (req, res)=> new IstorijaZaduzenjaController().dodatiZaduzenje(req, res)
)

istorijaZaduzenjaRouter.route('/dohvatiIstorijuZaduzenja').post(
    (req, res)=> new IstorijaZaduzenjaController().dohvatiIstorijuZaduzenja(req, res)
)

istorijaZaduzenjaRouter.route('/brojZaduzenja').post(
    (req, res)=> new IstorijaZaduzenjaController().brojZaduzenja(req, res)
)

istorijaZaduzenjaRouter.route('/izbrisiIstorijuZaduzenja').post(
    (req, res)=> new IstorijaZaduzenjaController().izbrisiIstorijuZaduzenja(req, res)
)

istorijaZaduzenjaRouter.route('/istorijaZaKorisnika').post(
    (req, res)=> new IstorijaZaduzenjaController().istorijaZaKorisnika(req, res)
)

export default istorijaZaduzenjaRouter;