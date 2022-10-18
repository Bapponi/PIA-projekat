import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Utisak = new Schema(
    {
        mejl: {
            type: String
        },
        idKnj: {
            type: Number
        },
        datum_postavljanja: {
            type: String
        },
        komentar: {
            type: String
        },
        ocena: {
            type: Number
        },
        azuriran: {
            type: Boolean
        }
    }
)

export default mongoose.model('Utisak', Utisak, 'utisci');