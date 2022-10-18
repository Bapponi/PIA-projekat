import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let IstorijaZaduzenja = new Schema(
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
        datum_vracanja: {
            type: String
        }
    }
)

export default mongoose.model('IstorijaZaduzenja', IstorijaZaduzenja, 'istorijaZaduzenja');