import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let TrenutnaZaduzenja = new Schema(
    {
        mejl: {
            type: String
        },
        idKnj: {
            type: Number
        },
        datum_zaduzivanja: {
            type: String
        },
        produzeno: {
            type: Boolean
        }
    }
)

export default mongoose.model('TrenutnaZaduzenja', TrenutnaZaduzenja, 'trenutnaZaduzenja');