import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import korisnikRouter from './routes/korisnik.routes';
import knjigaRouter from './routes/knjiga.routes';
import trenutnaZaduzenjaRouter from './routes/trenutnaZaduzenja.routes';
import istorijaZaduzenjaRouter from './routes/istorijaZaduzenja.routes';
import registracijaZahteviRouter from './routes/registracijaZahtevi.routes';
import utisakRouter from './routes/utisak.routes';
import zahtevRouter from './routes/zahtev.routes';

const app = express();
const path = require('path');
app.use(cors());

app.use(express.json({limit: '10mb'}));
//app.use(express.urlencoded({limit: '10mb'}));

app.use(express.json());
app.use("/static", express.static(path.join(__dirname, '../src/assets')));
console.log("Dirname: " + __dirname);


mongoose.connect('mongodb://localhost:27017/projekatBiblioteka')
const connection = mongoose.connection
connection.once('open', ()=>{
    console.log('db connected')
})

const router = express.Router();
router.use('/korisnici', korisnikRouter );
router.use('/knjige', knjigaRouter );
router.use('/trenutnaZaduzenja', trenutnaZaduzenjaRouter );
router.use('/istorijaZaduzenja', istorijaZaduzenjaRouter );
router.use('/registracijaZahtevi', registracijaZahteviRouter );
router.use('/utisci', utisakRouter );
router.use('/zahtevi', zahtevRouter );

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));