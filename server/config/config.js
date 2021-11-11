process.env.PORT = process.env.PORT || 3000;
//Entorno de desarrollo 
process.env.NODE_ENV = process.env.NODE_ENV || 'prod';
//Coneccion a base de datos
process.env.SEED = process.env.SEED || 'firma-super-secreta';
//Firma webtoken

let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/usuarios';
} else {
    urlDB ="mongodb+srv://root:root@cluster0.ljf5e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
}
process.env.URLDB = urlDB;