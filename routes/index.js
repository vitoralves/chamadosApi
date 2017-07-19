var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

var db = require('../queries.js');

// usuario
router.get('/api/logar/:email/:senha/:token', db.getUsuario);
router.get('/api/usuario/getUsuarioPorId/:usuario', db.getUsuarioPorId);
router.put('/api/perfil/salvar/:usu/:token', db.updatePerfil);
router.post('/api/perfil/imagem/upload/:id', db.updateAvatar)
//empresa
router.get('/api/empresa/:empresa', db.getEmpresa);
router.get('/api/empresas/all/:token', db.getTodasEmpresas);
router.post('/api/empresas/novo/:empresa', db.adicionarEmpresa);
router.put('/api/empresa/update/:empresa', db.updateEmpresa);
router.delete('/api/empresa/delete/:id', db.deleteEmpresa);
router.get('/api/empresas/produtos/:id', db.getEmpresasProduto);
router.post('/api/empresas/produtos/novo/:empresaProduto', db.addEmpresasProdutos);
router.put('/api/empresas/produtos/update/:empresaProduto', db.updateEmpresasProdutos);
router.delete('/api/empresas/produtos/delete/:id', db.deleteEmpresasProdutos);
// produtos
router.get('/api/produto/:produto', db.getProduto);
router.get('/api/produtos/all', db.getTodosProdutos);
router.get('/api/produtos/empresa/:empresa', db.getProdutosPorEmpresa);
router.post('/api/produtos/novo/:produto', db.adicionarProduto);
router.put('/api/produto/update/:produto', db.updateProduto);
router.delete('/api/produto/delete/:id', db.deleteProduto);
router.get('/api/produtos/componentes/:id', db.getProdutosComponente);
router.post('/api/produtos/componentes/novo/:produtoComponente', db.addProdutosComponentes);
router.put('/api/produtos/componentes/update/:produtoComponente', db.updateProdutosComponentes);
router.delete('/api/produtos/componentes/delete/:id', db.deleteProdutosComponentes);
//usuarios
router.get('/api/usuarios/all/:token', db.getTodosUsuarios);
router.post('/api/usuarios/novo/:usuario', db.adicionarUsuario);
router.put('/api/usuario/update/:usuario', db.updateUsuario);
router.delete('/api/usuario/delete/:id', db.deleteUsuario);
router.put('/api/usuario/senha/:id/:senha', db.updateSenha);
// componentes
router.get('/api/componente/:componente', db.getComponente);
router.get('/api/componentes/all', db.getTodosComponentes);
router.get('/api/componentes/produtos/:id', db.getTodosComponentesPorProduto);
router.get('/api/componentes/produtos/vincular/:id', db.getComponetesVincular);
router.post('/api/componentes/novo/:componente', db.adicionarComponente);
router.put('/api/componente/update/:componente', db.updateComponente);
router.delete('/api/componente/delete/:id', db.deleteComponente);
//tickets
router.get('/api/ticket/:id', db.getTicketPorId);
router.get('/api/ticket/comentarios/:id', db.getTicketsComentarios);
router.get('/api/tickets/all/empresa/:empresa/:usuario', db.getTodosTicketsPorEmpresa);
router.post('/api/tickets/novo/:ticket', db.adicionarTicket);
router.post('/api/tickets/comentario/novo/:obj', db.adicionarTicketComentario);
router.post('/api/ticket/anexo/:id', db.addTicketAnexo);

module.exports = router;
