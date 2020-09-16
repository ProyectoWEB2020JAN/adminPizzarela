const controlador= {};

controlador.inicio = (req, res) =>{
    res.render('index')
}

controlador.productos = (req, res) =>{
    res.render('productos/productos');
}

controlador.pendientes = (req, res) =>{
    res.render('productos/pendientes');
}

controlador.carrusel = (req, res) =>{
    res.render('carrusel/carrusel');
}

controlador.login = (req, res) =>{
    res.render('login/login');
}
 
controlador.admin = (req,res) => {
    res.render('./admin');
}

module.exports = controlador;