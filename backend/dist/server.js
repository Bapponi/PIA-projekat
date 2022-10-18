"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const korisnik_routes_1 = __importDefault(require("./routes/korisnik.routes"));
const knjiga_routes_1 = __importDefault(require("./routes/knjiga.routes"));
const trenutnaZaduzenja_routes_1 = __importDefault(require("./routes/trenutnaZaduzenja.routes"));
const istorijaZaduzenja_routes_1 = __importDefault(require("./routes/istorijaZaduzenja.routes"));
const registracijaZahtevi_routes_1 = __importDefault(require("./routes/registracijaZahtevi.routes"));
const utisak_routes_1 = __importDefault(require("./routes/utisak.routes"));
const zahtev_routes_1 = __importDefault(require("./routes/zahtev.routes"));
const app = (0, express_1.default)();
const path = require('path');
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: '10mb' }));
//app.use(express.urlencoded({limit: '10mb'}));
app.use(express_1.default.json());
app.use("/static", express_1.default.static(path.join(__dirname, '../src/assets')));
console.log("Dirname: " + __dirname);
mongoose_1.default.connect('mongodb://localhost:27017/projekatBiblioteka');
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('db connected');
});
const router = express_1.default.Router();
router.use('/korisnici', korisnik_routes_1.default);
router.use('/knjige', knjiga_routes_1.default);
router.use('/trenutnaZaduzenja', trenutnaZaduzenja_routes_1.default);
router.use('/istorijaZaduzenja', istorijaZaduzenja_routes_1.default);
router.use('/registracijaZahtevi', registracijaZahtevi_routes_1.default);
router.use('/utisci', utisak_routes_1.default);
router.use('/zahtevi', zahtev_routes_1.default);
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map