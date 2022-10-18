import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let RegistracijaZahtevi = new Schema(
    {
        korisnicko_ime: {
            type: String
        },
        lozinka: {
            type: String
        },
        ime: {
            type: String
        },
        prezime: {
            type: String
        },
        adresa: {
            type: String
        },
        kontakt: {
            type: String
        },
        mejl:{
            type: String
        },
        slika: {
            type: String
        },
        tip: {
            type: String
        },
        blokiran: {
            type: Boolean
        },
        broj_zaduzenja: {
            type: Number
        }
    }
)

export default mongoose.model('RegistracijaZahtevi', RegistracijaZahtevi, 'registracijaZahtevi');