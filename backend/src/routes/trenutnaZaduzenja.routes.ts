import express from 'express';
import { TrenutnaZaduzenjaController } from '../controllers/trenutnaZaduzenja.controller';

const trenutnaZaduzenjaRouter = express.Router();


trenutnaZaduzenjaRouter.route('/dohvatiTrenutnaZaduzenja').post(
    (req, res)=> new TrenutnaZaduzenjaController().dohvatiTrenutnaZaduzenja(req, res)
)

trenutnaZaduzenjaRouter.route('/dodatiZaduzenje').post(
    (req, res)=> new TrenutnaZaduzenjaController().dodatiZaduzenje(req, res)
)

trenutnaZaduzenjaRouter.route('/zavrsiZaduzenje').post(
    (req, res)=> new TrenutnaZaduzenjaController().zavrsiZaduzenje(req, res)
)

trenutnaZaduzenjaRouter.route('/brojZaduzenja').post(
    (req, res)=> new TrenutnaZaduzenjaController().brojZaduzenja(req, res)
)

trenutnaZaduzenjaRouter.route('/produziZaduzenje').post(
    (req, res)=> new TrenutnaZaduzenjaController().produziZaduzenje(req, res)
)

trenutnaZaduzenjaRouter.route('/postojiZaduzenje').post(
    (req, res)=> new TrenutnaZaduzenjaController().postojiZaduzenje(req, res)
)

export default trenutnaZaduzenjaRouter;