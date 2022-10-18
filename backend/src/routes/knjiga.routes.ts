import express from 'express';
import { KnjigaController } from '../controllers/knjiga.controller';

const knjigaRouter = express.Router();

knjigaRouter.route('/brojKnjiga').get(
    (req, res)=> new KnjigaController().brojKnjiga(req, res)
)

knjigaRouter.route('/dohvatiKnjigu').post(
    (req, res)=> new KnjigaController().dohvatiKnjigu(req, res)
)

knjigaRouter.route('/dohvatiSveKnjige').get(
    (req, res)=> new KnjigaController().dohvatiSveKnjige(req, res)
)

knjigaRouter.route('/dohvatiTopKnjige').get(
    (req, res)=> new KnjigaController().dohvatiTopKnjige(req, res)
)

knjigaRouter.route('/zaduziKnjigu').post(
    (req, res)=> new KnjigaController().zaduziKnjigu(req, res)
)

knjigaRouter.route('/promeniBrojUzimanja').post(
    (req, res)=> new KnjigaController().promeniBrojUzimanja(req, res)
)

knjigaRouter.route('/ubaciKnjigu').post(
    (req, res)=> new KnjigaController().ubaciKnjigu(req, res)
)

knjigaRouter.route('/azurirajKnjigu').post(
    (req, res)=> new KnjigaController().azurirajKnjigu(req, res)
)

knjigaRouter.route('/izbrisiKnjigu').post(
    (req, res)=> new KnjigaController().izbrisiKnjigu(req, res)
)

export default knjigaRouter;