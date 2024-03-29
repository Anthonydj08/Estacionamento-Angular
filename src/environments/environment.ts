/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyDbBfo1KvHch_3Fvr39OLMC9abF8hiKzBA",
    authDomain: "estacionamentoangular.firebaseapp.com",
    databaseURL: "https://estacionamentoangular.firebaseio.com",
    projectId: "estacionamentoangular",
    storageBucket: "estacionamentoangular.appspot.com",
    messagingSenderId: "106183803457",
    appId: "1:106183803457:web:8700885a6cfb190982bcc0",
    measurementId: "G-J7B20G7KDV"
  }
};