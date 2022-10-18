import { Autor } from "./autor";

export class IstorijaZaduzenja{
    mejl: string;
    idKnj: number;
    datum_zaduzivanja: string;
    datumBrojZ: Date;
    datum_vracanja: string;
    datumBrojV: Date;
    autori: Array<Autor>;
    autoriTekst: string;
    naziv: string;
    zanr: string;
    slika_knjige: string;
    slikaUrl: string;
}