module.exports = (app)=>{
const helmet = require('helmet');
app.use(helmet());
app.use(helmet.hidePoweredBy());
app.use(helmet.ieNoOpen());
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.frameguard({
      action: "deny",
    })
   );
}
