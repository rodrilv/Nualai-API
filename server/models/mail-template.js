const temp = function returnHtml(nombre_miembro, motivo, folio, fecha, monto, ){

const template = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Recibo de Pago Nualai</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
  </head>
  <body>
    <div class="container">
        <div style="margin-left: 10%; margin-right: 10%;">
            <div class="row">
            <div class="col-md-4">
                <center>
                   <img width="200" height="200" src="https://scontent.fntr5-1.fna.fbcdn.net/v/t1.6435-9/186564207_102218365398861_5198518192702115986_n.jpg?_nc_cat=100&ccb=1-6&_nc_sid=09cbfe&_nc_ohc=GjWDT88vc-YAX_-wD6D&_nc_ht=scontent.fntr5-1.fna&oh=00_AT8O9ZMeXbDOLXuPWQlA9LJHKfqw-RQaD5AOsPbwbSfeQA&oe=62AAE802"> 
                </center>
                
            </div>
            <div class="col-md-4">
                    <center><h3 style="color: blueviolet;">Recibo de Pago</h3><h4 style="font-size: 12px;">(original)</h4></center>
                    <center><h5>Clínica Nualai</h5></center>
                    <center><span>AV. Quinta Avenida #312 Fracc. Las Americas</span></center>    
            </div>
            <div class="col-md-4"></div>
            </div>
            <div class="row" style="margin-top: 100px;">
                <div class="col-md-4">
                    <span style="font-size: large;">Nombre del miembro: </span> <b>${nombre_miembro}</b><br>
                    <span style="font-size: large;">Motivo de Pago: </span><b>${motivo}</b><br>
                    <span style="font-size: large;">Monto: </span><b>$ ${monto}.00 MXN</b>
                </div>
                <div class="col-md-4">
                </div>
                <div class="col-md-4">
                Fecha: <b>${fecha}</b><br>
                Folio: <b>${folio}</b>
            </div>
            </div>
            <div class="row">
                <div class="col-md-4"></div>
                <div class="col-md-4">
                    <span style="font-size: 10px;">Este documento sólo tiene validez oficial como comprobante de pago en Nualai Clínica, queda prohibida su negociación con instituciones ajenas y/o terceras.</span>
                </div>
                <div class="col-md-4"></div>
            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous"></script>
  </body>
</html>`;
return template;
}
module.exports = temp;