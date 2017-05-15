var promise = require('bluebird');

var options = {
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:info2013@localhost:5432/chamados';
var db = pgp(connectionString);

function tokenValido(t){
    var data = new Date();
    var token = ((data.getMonth() + 1) * 100) * data.getDate();
    if (t == token){
      return true;
    }

    return false;
}

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
    db.query('update usuarios set nome = $1, email = $2 where id = $3', [u.nome, u.email, u.id])
    .then(function (){
      res.status(200)
      .json({
        message: 'sucesso'
      });
    }). catch(function (e){
      return next(e);
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
        data: data
      });
    })
    .catch(function (err){
      return next(err);
    });
  }else{
    res.status(406)
    .json({
      status: 'Not Acceptable',
      message: 'token inválido!'
    });
  }
}

function getCategorias(req, res, next){
  var token = req.params.token;
  if(tokenValido(token)){
    db.any('select * from categoria')
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

function getUsuarioPorId(req, res, next){
  var token = req.params.token;
  var id = req.params.id;

  if(tokenValido(token)){
    db.one('select id,nome,email,adm,empresa from usuarios where id = $1', id)
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

module.exports = {
  registrar: registrar,
  getUsuario: getUsuario,
  getCategorias: getCategorias,
  getEmpresa: getEmpresa,
  getTodasEmpresas: getTodasEmpresas,
  adicionarEmpresa: adicionarEmpresa,
  deleteEmpresa: deleteEmpresa,
  updateEmpresa: updateEmpresa,
  updatePerfil: updatePerfil,
  getUsuarioPorId: getUsuarioPorId,

};
