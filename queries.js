var promise = require('bluebird');

var options = {
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:a@localhost:5432/chamados';
var db = pgp(connectionString);

function tokenValido(t){
    var data = new Date();
    var token = ((data.getMonth() + 1) * 100) * data.getDate();
    if (t == token){
      return true;
    }

    return false;
}

// ***************************
// USUARIO
// ****************************
function registrar(req, res, next){
  var obj = req.params.obj;
  console.log("objto"+obj);
  var reg = JSON.parse(obj);
  console.log("json"+reg);

  db.query('insert into usuario(nome,sobrenome,cpf,email,senha) values($1,$2,$3,$4,md5($5)) returning id',
  [reg.usuNome,reg.usuSobrenome,reg.usuCpf,reg.usuEmail,reg.usuSenha])
  .then(function (data){
    let id = data[0].id;
    console.log('id '+id);
    db.query('insert into fornecedor(nome,cnpj,endereco,telefone,celular,email,cidade,estado,usuario,cep,bairro,complemento) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)',
    [reg.fornNome, reg.fornCnpj, reg.fornEndereco, reg.fornTelefone, reg.fornCelular, reg.fornEmail,reg.fornCidade,reg.fornEstado,id,reg.fornCep,reg.fornBairro,reg.fornComplemento])
    .then(function (){
      res.status(200)
      .json({
        status: 'succes'
      });
    })
  })
  .catch(function (e){
    return next(e);
  })
}

function updatePerfil(req, res, next){
  var usuario = req.params.usu;
  var token = req.params.token;
  var u = JSON.parse(usuario);

  if(tokenValido(token)){
    db.query('update usuarios set nome = $1, email = $2, imagem = $4 where id = $3', [u.nome, u.email, u.id, u.imagem])
    .then(function (){
      res.status(200)
      .json({
        message: 'sucesso'
      });
    }). catch(function (e){
      res.status(500)
      .json({
        status: 'error',
        message: ''+e
      })
    });
  }else{
    res.status(406)
    .json({
      status: 'Not Acceptable',
      message: 'token inválido!'
    });
  }
}

function getUsuario(req, res, next){
  var e = req.params.email;
  var s = req.params.senha;
  var token = req.params.token;

  if (tokenValido(token)){
    db.any('select * from usuarios where email = $1 and senha = $2', [e, s])
    .then(function (data){
      res.status(200)
      .json({
        status: 'success',
        data: data
      });
    })
    .catch(function (err){
      res.status(500)
      .json({
        status: 'error',
        message: ''+err
      });
    });
  }else{
    res.status(406)
    .json({
      status: 'Not Acceptable',
      message: 'token inválido!'
    });
  }
}

function getUsuarioPorId(req, res, next){
  var token = req.params.token;
  var id = req.params.id;

  if(tokenValido(token)){
    db.one('select * from usuarios where id = $1', id)
    .then(function (data){
      res.status(200)
      .json({
        data:data
      });
    }).catch(function (e){
      return next(e);
    });
  }else{
    res.status(406)
    .json({
      status:'Not acceptable',
      message: 'token inválido!'
    });
  }
}

// **************
// EMPRESA
// **************
function updateEmpresa(req, res, next){
  var objeto = JSON.parse(req.params.empresa);
  db.query('update empresas set nome = $1, telefone = $2, email = $3, endereco = $4, celular = $5 where id = $6', [objeto.nome, objeto.telefone, objeto.email, objeto. endereco, objeto.celular, objeto.id])
  .then(function (f){
    res.status(200)
    .json({
      status: 'success'
    })
  }).catch(function (e){
    return next(e);
  })
}

function getEmpresa(req, res, next){
  var empresa = req.params.empresa;
  db.one('select * from empresas where id = $1', empresa)
  .then(function (data){
    res.status(200)
    .json({
      data: data
    });
  })
  .catch(function (err){
    return next(err);
  })
}

function adicionarEmpresa(req, res, next){
  var objeto = JSON.parse(req.params.empresa);
  db.query('insert into empresas(nome,telefone,email,endereco) values($1,$2,$3,$4)', [objeto.nome, objeto.telefone, objeto.email, objeto. endereco])
  .then(function (f){
    res.status(200)
    .json({
      status: 'success'
    })
  }).catch(function (e){
    return next(e);
  })
}

function getTodasEmpresas(req, res, next){
  var token = req.params.token;
  if(tokenValido(token)){
    db.any('select * from empresas')
    .then(function (data){
      res.status(200)
      .json({
        data: data
      });
    })
    .catch(function (err){
      return next(err);
    })
  }else{
    res.status(406)
    .json({
      status:'Not acceptable',
      message: 'token inválido!'
    });
  }
}

function deleteEmpresa(req, res, next){
  var id = req.params.id;
  db.query('delete from empresas where id = $1', id)
  .then(function (f){
    res.status(200)
    .json({
      status: 'success'
    })
  }).catch(function (e){
      res.status(500)
      .json({
        status: 'error',
        message: ''+e
      });
  })
}

function getEmpresasProduto(req, res, next){
  var id = req.params.id;
  db.query('select ep.id, p.nome, ep.ativo from empresas_produtos ep join produtos p on p.id = ep.produto where empresa = $1', id)
  .then(function (data){
    res.status(200)
    .json({
      data: data
    })
  }).catch(function (e){
    res.status(500)
    .json({
      status: 'error',
      message: ''+e
    })
  })
}

function addEmpresasProdutos(req, res, next){
  var objeto = JSON.parse(req.params.empresaProduto);
  db.query('insert into empresas_produtos(produto, empresa, ativo) values($1,$2,$3)', [objeto.produto, objeto.empresa, objeto.ativo])
  .then(function (f){
    res.status(200)
    .json({
      status: 'success'
    })
  }).catch(function (e){
    res.status(500)
    .json({
      status: 'error',
      message: ''+e
    })
  })
}

function updateEmpresasProdutos(req, res, next){
  var objeto = JSON.parse(req.params.empresaProduto);
  db.query('update empresas_produtos set produto = $1, set empresa = $2, set ativo = $3 where id = $4) values($1,$2,$3)', [objeto.produto, objeto.empresa, objeto.ativo, objeto.id])
  .then(function (f){
    res.status(200)
    .json({
      status: 'success'
    })
  }).catch(function (e){
    res.status(500)
    .json({
      status: 'error',
      message: ''+e
    })
  })
}

function deleteEmpresasProdutos(req, res, next){
  var id = req.params.id;
  db.query('delete from empresas_produtos where id = $1', id)
  .then(function (f){
    res.status(200)
    .json({
      status: 'success'
    })
  }).catch(function (e){
      res.status(500)
      .json({
        status: 'error',
        message: ''+e
      });
  })
}

// ***********************
// PRODUTOS
// **********************
function updateProduto(req, res, next){
  var objeto = JSON.parse(req.params.produto);
  db.query('update produtos set nome = $1, ativo = $2 where id = $3', [objeto.nome, objeto.ativo, objeto.id])
  .then(function (f){
    res.status(200)
    .json({
      status: 'success'
    })
  }).catch(function (e){
    return next(e);
  })
}

function getProduto(req, res, next){
  var produto = req.params.produto;
  db.one('select * from produtos where id = $1', produto)
  .then(function (data){
    res.status(200)
    .json({
      data: data
    });
  })
  .catch(function (err){
    return next(err);
  })
}

function adicionarProduto(req, res, next){
  var objeto = JSON.parse(req.params.produto);
  db.query('insert into produtos(nome,ativo) values($1,$2)', [objeto.nome, objeto.ativo])
  .then(function (f){
    res.status(200)
    .json({
      status: 'success'
    })
  }).catch(function (e){
    return next(e);
  })
}

function getTodosProdutos(req, res, next){
    db.any('select * from produtos')
    .then(function (data){
      res.status(200)
      .json({
        data: data
      });
    })
    .catch(function (err){
      return next(err);
    })
}

function deleteProduto(req, res, next){
  var id = req.params.id;
  db.query('delete from produtos where id = $1', id)
  .then(function (f){
    res.status(200)
    .json({
      status: 'success'
    })
  }).catch(function (e){
      res.status(200)
      .json({
        status: 'error',
        message: ''+e
      });
  })
}


module.exports = {
  // usuario
  registrar: registrar,
  getUsuario: getUsuario,
  updatePerfil: updatePerfil,
  getUsuarioPorId: getUsuarioPorId,
  // empresas
  getEmpresa: getEmpresa,
  getTodasEmpresas: getTodasEmpresas,
  adicionarEmpresa: adicionarEmpresa,
  deleteEmpresa: deleteEmpresa,
  updateEmpresa: updateEmpresa,
  getEmpresasProduto: getEmpresasProduto,
  addEmpresasProdutos: addEmpresasProdutos,
  updateEmpresasProdutos: updateEmpresasProdutos,
  deleteEmpresasProdutos: deleteEmpresasProdutos,
  // produtos
  getProduto: getProduto,
  getTodosProdutos: getTodosProdutos,
  adicionarProduto: adicionarProduto,
  deleteProduto: deleteProduto,
  updateProduto: updateProduto
};
