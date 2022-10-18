import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Knjiga = new Schema(
    {
        idKnj: {
            type: Number
        },
        naziv: {
            type: String
        },
        slika_knjige: {
            type: String
        },
        autori: {
            type: Array<String>
        },
        autoriTekst: {
            type: String
        },
        broj_uzimanja: {
            type: Number
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
        },
        br_stanje: {
            type: Number
        }
    }
)

export default mongoose.model('Knjiga', Knjiga, 'knjige');