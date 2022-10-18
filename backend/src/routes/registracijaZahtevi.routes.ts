import express from 'express';
//import multer from 'multer';

import { RegistracijaZahteviController } from '../controllers/registracijaZahtevi.controller';

const registracijaZahteviRouter = express.Router();

// const storage = multer.diskStorage({
//     destination: (req, file, cb)=>{
//         cb(null, '../slikeKorisnik');
//     },
//     filename: (req, file, cb) => {
//         console.log(file);
//         cb(null, 'imeSlike');
//     }
// });

// const upload = multer({storage: storage});

registracijaZahteviRouter.route('/registrujSe').post(
    (req, res)=> new RegistracijaZahteviController().registrujSe(req, res)
)

registracijaZahteviRouter.route('/dohvatiSveZahteve').get(
    (req, res)=> new RegistracijaZahteviController().dohvatiSveZahteve(req, res)
)

registracijaZahteviRouter.route('/izbrisiZahtev').post(
    (req, res)=> new RegistracijaZahteviController().izbrisiZahtev(req, res)
)

export default registracijaZahteviRouter