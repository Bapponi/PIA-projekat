import { Autor } from "./autor";

export class Knjiga{
    idKnj: number;
    naziv: string;
    slika_knjige: string;
    autori: Array<Autor>;
    autoriTekst: string;
    broj_uzimanja: number;
    godina_izdavanja: string;
    izdavac: string;
    jezik: string;
    zanr: string;
    br_stanje: number;
    slikaUrl: string;
}