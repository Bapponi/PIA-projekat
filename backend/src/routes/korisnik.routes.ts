import express from 'express';
import { KorisnikController } from '../controllers/korisnik.controller';

const korisnikRouter = express.Router();

korisnikRouter.route('/prijavaNaSistem').post(
    (req, res)=> new KorisnikController().prijavaNaSistem(req, res)
)

korisnikRouter.route('/registrujSe').post(
    (req, res)=> new KorisnikController().registrujSe(req, res)
)

korisnikRouter.route('/zameniImeSlike').post(
    (req, res)=> new KorisnikController().zameniImeSlike(req, res)
)

korisnikRouter.route('/dohvatiKorisnika').post(
    (req, res)=> new KorisnikController().dohvatiKorisnika(req, res)
)

korisnikRouter.route('/promeniLozinku').post(
    (req, res)=> new KorisnikController().promeniLozinku(req, res)
)

korisnikRouter.route('/promeniBrojZaduzenja').post(
    (req, res)=> new KorisnikController().promeniBrojZaduzenja(req, res)
)

korisnikRouter.route('/dohvatiSveKorisnike').get(
    (req, res)=> new KorisnikController().dohvatiSveKorisnike(req, res)
)

korisnikRouter.route('/izbrisiKorisnika').post(
    (req, res)=> new KorisnikController().izbrisiKorisnika(req, res)
)

korisnikRouter.route('/azurirajKorisnika').post(
    (req, res)=> new KorisnikController().azurirajKorisnika(req, res)
)

korisnikRouter.route('/promeniStatus').post(
    (req, res)=> new KorisnikController().promeniStatus(req, res)
)

export default korisnikRouter;