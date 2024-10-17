import express, { Request, Response, Express, Application } from 'express';
import https from 'https';
import session from 'express-session';
import path from 'path';
import dotenv from 'dotenv';
import fs from 'fs';
import crypto from 'crypto';
import cookieParser from 'cookie-parser';

import {DEBUG_ASSERT} from "./util/universalLogger";

const app: Express = express();

console.clear();
console.log('\n');
DEBUG_ASSERT("[SERVER] Starting server...", 'cyan', 'info');
dotenv.config();

//Setup Strong HTTPS Options
const productionStatus = true; //keep it true for now
const debugStatus = process.env.IS_DEBUG == 'True' || process.env.IS_DEBUG == 'true';


const certPath = productionStatus ? path.join(__dirname, '../certs/cert.crt') : path.join(__dirname, '../certs/demo_cert.crt');
const keyPath = productionStatus ? path.join(__dirname, '../certs/key.key') : path.join(__dirname, '../certs/demo_key.key');
const httpsOptions = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath)
}

const maxCookieAge = Number(process.env.COOKIE_MAX_AGE) ?? 1000 * 60 * 60 * 24 * 7;
const PORT: Number = parseInt(process.env.PORT || '3000');

app.use(session({
    secret: process.env.SESSION_SECRET || crypto.randomBytes(20).toString('hex'),
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: maxCookieAge}
}));

app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

if(debugStatus) {
    app.use('*/static', express.static('./src/static'));
} else {
    app.use('*/static', express.static('./bin/static'));
}

//Load everything in the Routes folder.
(async () => {
    const files = fs.readdirSync(path.join(__dirname, 'routes'));
    for (const file of files) {
        if (file.endsWith('.js')) {
            const route = await import(path.join(__dirname, 'routes', file));
            if (typeof route.default === 'function') {
                route.default(app);
            }
        }
    }
})();

//Include utilities or controllers here.

DEBUG_ASSERT("[OK] Initial Configuration Loaded.", 'green', 'info');

//Attempt DB Connections here.

//Setup initial routes.
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!!');
});

//Start the server!
if (productionStatus) {
    https.createServer(httpsOptions, app).listen(443, () => {
        DEBUG_ASSERT("[OK] HTTPS Server listening on port 443", 'cyan', 'info');
    });
} else {
    app.listen(PORT, () => {
        DEBUG_ASSERT(`[OK] Server listening on port ${PORT}`, 'cyan', 'info');
    });
}
