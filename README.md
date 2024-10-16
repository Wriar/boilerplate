# express-ts-ejs-scss-HTTPS-boilerplate
 A TypeScript boilerplate template for full-stack HTTPS production express apps.
 TypeScript is setup and configured, as well as a HTTP/HTTPS server with express-session. EJS as the view engine is included as well SASS for CSS.

> [!IMPORTANT]  
> HTTPS is enabled by default! You will need to use ``.generateCertificates.ps1`` script to create a self-signed certificate/key pair. If you do not want to use HTTPS, set ``useSSL = false`` in ``server.ts``.
>
> **It is advised to use THIS tool to generate SSL certificates that should most likely be TRUSTED by most browsers, as long as the cert is installed in the computer's trusted root certificate authority.**
>
> **For FireFox Users:**
> You will need to import the generated ``cert.crt`` into the browser's OWN certificate store AS WELL to disable the insecure SSL warning.
>
> ``Tools > Options > Advanced > Certificates: View Certificates``

## NPM Scripts:
* ``build-standalone``: Builds the project into ``./bin`` and runs it with TSC.
* ``dev``: Spinup a dev environment which will rebuild/restart each time a TS script is modified in the ``/src`` folder.
* ``b``: Start the SCSS parser & builder. sass files should be placed in ``static/scss``.
* ``clean``: Purge the ``./bin`` folder.

It is recommended to start both ``dev`` and ``b`` scripts to develop frontend/backend respectively. All fresh restarts of build & dev will copy over static resources to bin (those not copied over by TSC).

> [!WARNING]
> To build a standalone **portable** app in `./bin`, make sure the ``server.ts`` sets up the static directory as ``./bin/static`` NOT ``./src/static``. Even though static is copied over on each TSC build, they are not re-copied during nodemon-monitored changes (it is not ideal for nodemon to restart the server each time a static resource is updated, so ``./src/static`` is set to be ignored by nodemon). This is not a concern unless you are only wanting to use the bin folder in a distribution. To correctly build a bin distribution, set `IS_DEBUG=False`` in server.ts and run ``npm run build-standalone``!

### TypeScript Target/Module: ``es2016`` & ``commonJS``


## Pre-Installed Packages:
Ensure to run ``npm install && npm upgrade`` and install all production and development packages before using. The versions listed below may not be up to date; upgrade if needed.
```json
"dependencies": {
    "axios": "^1.6.4",
    "bcrypt": "^5.1.1",
    "cookie-parser": "^1.4.6",
    "dotenv": "^16.0.3",
    "ejs": "^3.1.9",
    "express": "^4.18.2",
    "express-rate-limit": "^7.1.4",
    "express-session": "^1.17.3",
    "mariadb": "^3.2.2",
    "typescript": "^5.3.3"
  },

"devDependencies": {
    "@types/bcrypt": "^5.0.2",
    "@types/cookie-parser": "^1.4.7",
    "@types/express": "^4.17.17",
    "@types/express-session": "^1.17.7",
    "concurrently": "^8.0.1",
    "copyfiles": "^2.4.1",
    "nodemon": "^3.0.1",
    "rimraf": "^6.0.1",
    "scss": "^0.2.4"
  }

```

