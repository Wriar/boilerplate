import {Application} from "express";

export default (app: Application) => {
    app.get('/test', (req, res) => {
        res.send('test page!');
    });
}
