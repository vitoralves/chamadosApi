var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var db = require('../queries.js');

router.get('/api/logar/:email/:senha/:token', db.getUsuario);
router.get('/api/categorias/:token', db.getCategorias);
router.get('/api/empresa/:empresa', db.getEmpresa);
router.get('/api/empresas/all/:token', db.getTodasEmpresas);
router.get('/api/usuario/getUsuarioPorId/:id/:token', db.getUsuarioPorId);
router.get('/api/usuario/getUsuarioPorId/:id/:token', db.getUsuarioPorId);
router.post('/api/empresas/novo/:empresa', db.adicionarEmpresa);
router.put('/api/empresa/update/:empresa', db.updateEmpresa);
router.put('/api/perfil/salvar/:usu/:token', db.updatePerfil);
router.delete('/api/empresa/delete/:id', db.deleteEmpresa);

module.exports = router;
