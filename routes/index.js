var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var db = require('../queries.js');

// usuario
router.get('/api/logar/:email/:senha/:token', db.getUsuario);
router.get('/api/usuario/getUsuarioPorId/:id/:token', db.getUsuarioPorId);
router.get('/api/usuario/getUsuarioPorId/:id/:token', db.getUsuarioPorId);
router.put('/api/perfil/salvar/:usu/:token', db.updatePerfil);
// empresa
router.get('/api/empresa/:empresa', db.getEmpresa);
router.get('/api/empresas/all/:token', db.getTodasEmpresas);
router.post('/api/empresas/novo/:empresa', db.adicionarEmpresa);
router.put('/api/empresa/update/:empresa', db.updateEmpresa);
router.delete('/api/empresa/delete/:id', db.deleteEmpresa);

// produtos
router.get('/api/produto/:produto', db.getProduto);
router.get('/api/produtos/all/:token', db.getTodosProdutos);
router.post('/api/produtos/novo/:produto', db.adicionarProduto);
router.put('/api/produto/update/:produto', db.updateProduto);
router.delete('/api/produto/delete/:id', db.deleteProduto);

module.exports = router;
