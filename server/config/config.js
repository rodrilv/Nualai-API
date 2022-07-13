require('dotenv').config();
process.env.PORT = process.env.PORT || 3000;
//Entorno de desarrollo 
process.env.NODE_ENV = process.env.NODE_ENV || 'prod';
//Coneccion a base de datos
process.env.SEED = process.env.SEED || 'firma-super-secreta';
//Firma webtoken

let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = `${process.env.DEV_DB}`;
} else if(process.env.NODE_ENV === 'cloud') {
    urlDB =`${process.env.CLOUD_DB}`;
} else if(process.env.NODE_ENV === 'prod'){
    urlDB = `${process.env.PROD_DB}`;
}
process.env.URLDB = urlDB;