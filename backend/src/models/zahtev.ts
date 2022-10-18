import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Zahtev = new Schema(
    {
        korisnicko_ime: {
            type: String
        },
        naziv: {
            type: String
        },
        slika_knjige: {
            type: String
        },
        autoriTekst: {
            type: String
        },
        godina_izdavanja: {
            type: String
        },
        izdavac: {
            type: String
        },
        jezik:{
            type: String
        },
        zanr: {
            type: String
        }
    }
)

export default mongoose.model('Zahtev', Zahtev, 'zahtevi');