const controlador= {};

controlador.inicio = (req, res) =>{
    res.render('index')
}

controlador.admin = (req,res) => {
    res.render('./admin');
}

module.exports = controlador;