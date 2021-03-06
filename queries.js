var promise = require('bluebird');
var multer = require('multer');
var upload = multer().single('arquivo');

var options = {
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:info2013@localhost:5432/chamados';
var db = pgp(connectionString);

function tokenValido(t) {
  var data = new Date();
  var token = ((data.getMonth() + 1) * 100) * data.getDate();
  if (t == token) {
    return true;
  }

  return false;
}

// ***************************
// USUARIO
// ****************************
function registrar(req, res, next) {
  var obj = req.params.obj;
  console.log("objto" + obj);
  var reg = JSON.parse(obj);
  console.log("json" + reg);

  db.query('insert into usuario(nome,sobrenome,cpf,email,senha) values($1,$2,$3,$4,md5($5)) returning id',
    [reg.usuNome, reg.usuSobrenome, reg.usuCpf, reg.usuEmail, reg.usuSenha])
    .then(function (data) {
      let id = data[0].id;
      console.log('id ' + id);
      db.query('insert into fornecedor(nome,cnpj,endereco,telefone,celular,email,cidade,estado,usuario,cep,bairro,complemento) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)',
        [reg.fornNome, reg.fornCnpj, reg.fornEndereco, reg.fornTelefone, reg.fornCelular, reg.fornEmail, reg.fornCidade, reg.fornEstado, id, reg.fornCep, reg.fornBairro, reg.fornComplemento])
        .then(function () {
          res.status(200)
            .json({
              status: 'succes'
            });
        })
    })
    .catch(function (e) {
      return next(e);
    })
}

function updatePerfil(req, res, next) {
  var usuario = req.params.usu;
  var token = req.params.token;
  var u = JSON.parse(usuario);

  if (tokenValido(token)) {
    db.query('update usuarios set nome = $1, email = $2 where id = $3', [u.nome, u.email, u.id])
      .then(function () {
        res.status(200)
          .json({
            message: 'sucesso'
          });
      }).catch(function (e) {
        res.status(500)
          .json({
            status: 'error',
            message: '' + e
          })
      });
  } else {
    res.status(406)
      .json({
        status: 'Not Acceptable',
        message: 'token inválido!'
      });
  }
}

function getUsuario(req, res, next) {
  var e = req.params.email;
  var s = req.params.senha;
  var token = req.params.token;

  if (tokenValido(token)) {
    console.log('valido');
    db.any('select * from usuarios where email = $1 and senha = $2', [e, s])
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data
          });
      })
      .catch(function (err) {
        res.status(500)
          .json({
            status: 'error',
            message: '' + err
          });
      });
  } else {
    res.status(406)
      .json({
        status: 'Not Acceptable',
        message: 'token inválido!'
      });
  }
}

// **************
// EMPRESA
// **************
function updateEmpresa(req, res, next) {
  var objeto = JSON.parse(req.params.empresa);
  db.query('update empresas set nome = $1, telefone = $2, email = $3, endereco = $4, celular = $5 where id = $6', [objeto.nome, objeto.telefone, objeto.email, objeto.endereco, objeto.celular, objeto.id])
    .then(function (f) {
      res.status(200)
        .json({
          status: 'success'
        })
    }).catch(function (e) {
      return next(e);
    })
}

function getEmpresa(req, res, next) {
  var empresa = req.params.empresa;
  db.one('select * from empresas where id = $1', empresa)
    .then(function (data) {
      res.status(200)
        .json({
          data: data
        });
    })
    .catch(function (err) {
      return next(err);
    })
}

function adicionarEmpresa(req, res, next) {
  var objeto = JSON.parse(req.params.empresa);
  db.query('insert into empresas(nome,telefone,email,endereco) values($1,$2,$3,$4)', [objeto.nome, objeto.telefone, objeto.email, objeto.endereco])
    .then(function (f) {
      res.status(200)
        .json({
          status: 'success'
        })
    }).catch(function (e) {
      return next(e);
    })
}

function getTodasEmpresas(req, res, next) {
  var token = req.params.token;
  if (tokenValido(token)) {
    db.any('select * from empresas')
      .then(function (data) {
        res.status(200)
          .json({
            data: data
          });
      })
      .catch(function (err) {
        return next(err);
      })
  } else {
    res.status(406)
      .json({
        status: 'Not acceptable',
        message: 'token inválido!'
      });
  }
}

function deleteEmpresa(req, res, next) {
  var id = req.params.id;
  db.query('delete from empresas where id = $1', id)
    .then(function (f) {
      res.status(200)
        .json({
          status: 'success'
        })
    }).catch(function (e) {
      res.status(500)
        .json({
          status: 'error',
          message: '' + e
        });
    })
}

function getEmpresasProduto(req, res, next) {
  var id = req.params.id;
  db.query('select ep.id, p.nome, ep.ativo from empresas_produtos ep join produtos p on p.id = ep.produto where empresa = $1', id)
    .then(function (data) {
      res.status(200)
        .json({
          data: data
        })
    }).catch(function (e) {
      res.status(500)
        .json({
          status: 'error',
          message: '' + e
        })
    })
}

function addEmpresasProdutos(req, res, next) {
  var objeto = JSON.parse(req.params.empresaProduto);
  db.query('insert into empresas_produtos(produto, empresa, ativo) values($1,$2,$3)', [objeto.produto, objeto.empresa, objeto.ativo])
    .then(function (f) {
      res.status(200)
        .json({
          status: 'success'
        })
    }).catch(function (e) {
      res.status(500)
        .json({
          status: 'error',
          message: '' + e
        })
    })
}

function updateEmpresasProdutos(req, res, next) {
  var objeto = JSON.parse(req.params.empresaProduto);
  db.query('update empresas_produtos set produto = $1, set empresa = $2, set ativo = $3 where id = $4) values($1,$2,$3)', [objeto.produto, objeto.empresa, objeto.ativo, objeto.id])
    .then(function (f) {
      res.status(200)
        .json({
          status: 'success'
        })
    }).catch(function (e) {
      res.status(500)
        .json({
          status: 'error',
          message: '' + e
        })
    })
}

function deleteEmpresasProdutos(req, res, next) {
  var id = req.params.id;
  db.query('delete from empresas_produtos where id = $1', id)
    .then(function (f) {
      res.status(200)
        .json({
          status: 'success'
        })
    }).catch(function (e) {
      res.status(500)
        .json({
          status: 'error',
          message: '' + e
        });
    })
}

// ***********************
// PRODUTOS
// **********************
function updateProduto(req, res, next) {
  var objeto = JSON.parse(req.params.produto);
  db.query('update produtos set nome = $1, ativo = $2 where id = $3', [objeto.nome, objeto.ativo, objeto.id])
    .then(function (f) {
      res.status(200)
        .json({
          status: 'success'
        })
    }).catch(function (e) {
      return next(e);
    })
}

function getProduto(req, res, next) {
  var produto = req.params.produto;
  db.one('select * from produtos where id = $1', produto)
    .then(function (data) {
      res.status(200)
        .json({
          data: data
        });
    })
    .catch(function (err) {
      return next(err);
    })
}

function adicionarProduto(req, res, next) {
  var objeto = JSON.parse(req.params.produto);
  db.query('insert into produtos(nome,ativo) values($1,$2)', [objeto.nome, objeto.ativo])
    .then(function (f) {
      res.status(200)
        .json({
          status: 'success'
        })
    }).catch(function (e) {
      return next(e);
    })
}

function getTodosProdutos(req, res, next) {
  db.any('select * from produtos')
    .then(function (data) {
      res.status(200)
        .json({
          data: data
        });
    })
    .catch(function (err) {
      return next(err);
    })
}

function getProdutosPorEmpresa(req, res, next) {
  var empresa = req.params.empresa;

  db.any('select p.* from empresas_produtos ep join produtos p on p.id = ep.produto where ep.empresa = $1', empresa)
    .then(function (data) {
      res.status(200)
        .json({
          data: data
        });
    })
    .catch(function (err) {
      return next(err);
    })
}

function deleteProduto(req, res, next) {
  var id = req.params.id;
  db.query('delete from produtos where id = $1', id)
    .then(function (f) {
      res.status(200)
        .json({
          status: 'success'
        })
    }).catch(function (e) {
      res.status(200)
        .json({
          status: 'error',
          message: '' + e
        });
    })
}

function getProdutosComponente(req, res, next) {
  var id = req.params.id;
  db.query('select ep.id, c.nome from produtos_componentes ep join componentes c on c.id = ep.componente where produto = $1', id)
    .then(function (data) {
      res.status(200)
        .json({
          data: data
        })
    }).catch(function (e) {
      res.status(500)
        .json({
          status: 'error',
          message: '' + e
        })
    })
}

function getProdutosComponente(req, res, next) {
  var id = req.params.id;
  db.query('select ep.id, c.nome from produtos_componentes ep join componentes c on c.id = ep.componente where produto = $1', id)
    .then(function (data) {
      res.status(200)
        .json({
          data: data
        })
    }).catch(function (e) {
      res.status(500)
        .json({
          status: 'error',
          message: '' + e
        })
    })
}

function addProdutosComponentes(req, res, next) {
  var objeto = JSON.parse(req.params.produtoComponente);
  db.query('insert into produtos_componentes(produto, componente) values($1,$2)', [objeto.produto, objeto.componente])
    .then(function (f) {
      res.status(200)
        .json({
          status: 'success'
        })
    }).catch(function (e) {
      res.status(500)
        .json({
          status: 'error',
          message: '' + e
        })
    })
}

function updateProdutosComponentes(req, res, next) {
  var objeto = JSON.parse(req.params.produtoComponente);
  db.query('update produtos_componentes set produto = $1, set componente = $2 where id = $3) values($1,$2)', [objeto.produto, objeto.componente, objeto.id])
    .then(function (f) {
      res.status(200)
        .json({
          status: 'success'
        })
    }).catch(function (e) {
      res.status(500)
        .json({
          status: 'error',
          message: '' + e
        })
    })
}

function deleteProdutosComponentes(req, res, next) {
  var id = req.params.id;
  db.query('delete from produtos_componentes where id = $1', id)
    .then(function (f) {
      res.status(200)
        .json({
          status: 'success'
        })
    }).catch(function (e) {
      res.status(500)
        .json({
          status: 'error',
          message: '' + e
        });
    })
}

// **************
// USUARIO
// **************
function updateUsuario(req, res, next) {
  var objeto = JSON.parse(req.params.usuario);
  db.query('update usuarios set nome = $1, email = $2, adm = $3, empresa = $4 where id = $5', [objeto.nome, objeto.email, objeto.adm, objeto.empresa, objeto.id])
    .then(function (f) {
      res.status(200)
        .json({
          status: 'success'
        })
    }).catch(function (e) {
      return next(e);
    })
}

function getUsuarioPorId(req, res, next) {
  var usuario = req.params.usuario;
  db.one('select * from usuarios where id = $1', usuario)
    .then(function (data) {
      res.status(200)
        .json({
          data: data
        });
    })
    .catch(function (err) {
      return next(err);
    })
}

function adicionarUsuario(req, res, next) {
  var objeto = JSON.parse(req.params.usuario);
  db.query('insert into usuarios(nome,email,adm,empresa,senha) values($1,$2,$3,$4,$5)', [objeto.nome, objeto.email, objeto.adm, objeto.empresa, objeto.senha])
    .then(function (f) {
      res.status(200)
        .json({
          status: 'success'
        })
    }).catch(function (e) {
      res.status(500)
        .json({
          status: 'error',
          message: '' + e
        });
    })
}

function getTodosUsuarios(req, res, next) {
  var token = req.params.token;
  if (tokenValido(token)) {
    db.any('select u.id,u.nome,u.email,u.adm,u.imagem,e.nome as empresa from usuarios u join empresas e on e.id = u.empresa')
      .then(function (data) {
        res.status(200)
          .json({
            data: data
          });
      })
      .catch(function (err) {
        return next(err);
      })
  } else {
    res.status(406)
      .json({
        status: 'Not acceptable',
        message: 'token inválido!'
      });
  }
}

function deleteUsuario(req, res, next) {
  var id = req.params.id;
  db.query('delete from usuarios where id = $1', id)
    .then(function (f) {
      res.status(200)
        .json({
          status: 'success'
        })
    }).catch(function (e) {
      res.status(500)
        .json({
          status: 'error',
          message: '' + e
        });
    })
}

function updateSenha(req, res, next) {
  var usuario = req.params.id;
  var senha = req.params.senha;

  db.query('update usuarios set senha = $2 where id = $1', [usuario, senha])
    .then(function (f) {
      res.status(200)
        .json({
          status: 'success'
        })
    }).catch(function (e) {
      res.status(500)
        .json({
          status: 'error',
          message: '' + e
        });
    })
}

function updateAvatar(req, res, next) {
  console.log(req.file);
  upload(req, res, function (err) {
    if (err) {
      res.status(200)
        .json({
          status: 'error',
          message: '' + err
        });
    }
    var bytes = new Buffer(req.file.buffer, 'base64').toString('base64');
    var id = req.params.id;
    db.query('update usuarios set imagem = $1 where id = $2', [bytes, id])
      .then(function (f) {
        res.status(200)
          .json({
            status: 'success',
            message: 'Imagem alterada com sucesso!'
          })
      }).catch(function (e) {
        res.status(200)
          .json({
            status: 'error',
            message: 'ERRO: ' + e
          });
      })

  })
}

// ***********************
// COMPONENTES
// **********************
function updateComponente(req, res, next) {
  var objeto = JSON.parse(req.params.componente);
  db.query('update componentes set nome = $1, ativo = $2 where id = $3', [objeto.nome, objeto.ativo, objeto.id])
    .then(function (f) {
      res.status(200)
        .json({
          status: 'success'
        })
    }).catch(function (e) {
      return next(e);
    })
}

function getComponente(req, res, next) {
  var componente = req.params.componente;
  db.one('select * from componentes where id = $1', componente)
    .then(function (data) {
      res.status(200)
        .json({
          data: data
        });
    })
    .catch(function (err) {
      return next(err);
    })
}

function adicionarComponente(req, res, next) {
  var objeto = JSON.parse(req.params.componente);
  db.query('insert into componentes(nome) values($1)', [objeto.nome])
    .then(function (f) {
      res.status(200)
        .json({
          status: 'success'
        })
    }).catch(function (e) {
      return next(e);
    })
}

function getTodosComponentes(req, res, next) {
  db.any('select * from componentes')
    .then(function (data) {
      res.status(200)
        .json({
          data: data
        });
    })
    .catch(function (err) {
      return next(err);
    })
}

function getTodosComponentesPorProduto(req, res, next) {
  var id = req.params.id;
  db.any('select c.* from produtos_componentes pc join componentes c on c.id = pc.componente where pc.produto = $1', id)
    .then(function (data) {
      res.status(200)
        .json({
          data: data
        });
    })
    .catch(function (err) {
      return next(err);
    })
}

function getComponetesVincular(req, res, next) {
  var id = req.params.id;
  db.any('select c.* from componentes c where c.id not in (select pc.componente from produtos_componentes pc where produto = $1)', id)
    .then(function (data) {
      res.status(200)
        .json({
          data: data
        });
    })
    .catch(function (err) {
      return next(err);
    })
}

function deleteComponente(req, res, next) {
  var id = req.params.id;
  db.query('delete from componentes where id = $1', id)
    .then(function (f) {
      res.status(200)
        .json({
          status: 'success'
        })
    }).catch(function (e) {
      res.status(200)
        .json({
          status: 'error',
          message: '' + e
        });
    })
}

/********************
 * TICKETS
 *******************/

function getTodosTicketsPorEmpresa(req, res, next) {
  var empresa = req.params.empresa;
  var usuario = req.params.usuario;

  db.one('select adm from usuarios where id = $1', usuario)
    .then(function (data) {
      if (data.adm) {
        db.any('select t.id, p.nome as produto, t.estado, c.nome as componente, t.dt_abertura, t.prioridade, e.nome as cliente from tickets t join produtos p on p.id = t.produto ' +
          'join componentes c on c.id = t.componente join empresas e on e.id = t.empresa')
          .then(function (data) {
            res.status(200)
              .json({
                data: data
              });
          })
          .catch(function (err) {
            return next(err);
          })
      } else {
        db.any('select t.id, p.nome as produto, t.estado, c.nome as componente, t.dt_abertura, t.prioridade, e.nome as cliente from tickets t join produtos p on p.id = t.produto ' +
          'join componentes c on c.id = t.componente join empresas e on e.id = t.empresa where t.empresa = $1', empresa)
          .then(function (data) {
            res.status(200)
              .json({
                data: data
              });
          })
          .catch(function (err) {
            return next(err);
          })
      }
    })
}

function getTodosTicketsPorId(req, res, next) {
  var empresa = req.params.empresa;
  var usuario = req.params.usuario;
  var ticket = req.params.ticket;

  db.one('select adm from usuarios where id = $1', usuario)
    .then(function (data) {
      if (data.adm) {
        db.any('select t.id, p.nome as produto, t.estado, c.nome as componente, t.dt_abertura, t.prioridade, e.nome as cliente from tickets t join produtos p on p.id = t.produto ' +
          'join componentes c on c.id = t.componente join empresas e on e.id = t.empresa where t.id = $1', ticket)
          .then(function (data) {
            res.status(200)
              .json({
                data: data
              });
          })
          .catch(function (err) {
            return next(err);
          })
      } else {
        db.any('select t.id, p.nome as produto, t.estado, c.nome as componente, t.dt_abertura, t.prioridade, e.nome as cliente from tickets t join produtos p on p.id = t.produto ' +
          'join componentes c on c.id = t.componente join empresas e on e.id = t.empresa where t.empresa = $1 and t.id = $2', [empresa, ticket])
          .then(function (data) {
            res.status(200)
              .json({
                data: data
              });
          })
          .catch(function (err) {
            return next(err);
          })
      }
    })
}

function getTodosTicketsPorProduto(req, res, next) {
  var empresa = req.params.empresa;
  var usuario = req.params.usuario;
  var produto = req.params.produto;

  db.one('select adm from usuarios where id = $1', usuario)
    .then(function (data) {
      if (data.adm) {
        db.any('select t.id, p.nome as produto, t.estado, c.nome as componente, t.dt_abertura, t.prioridade, e.nome as cliente from tickets t join produtos p on p.id = t.produto ' +
          'join componentes c on c.id = t.componente join empresas e on e.id = t.empresa where upper(p.nome) like upper(\'%$1#%\')', produto)
          .then(function (data) {
            res.status(200)
              .json({
                data: data
              });
          })
          .catch(function (err) {
            return next(err);
          })
      } else {
        db.any('select t.id, p.nome as produto, t.estado, c.nome as componente, t.dt_abertura, t.prioridade, e.nome as cliente from tickets t join produtos p on p.id = t.produto ' +
          'join componentes c on c.id = t.componente join empresas e on e.id = t.empresa where t.empresa = $1 and upper(p.nome) like upper(\'%$2#%\')', [empresa, produto])
          .then(function (data) {
            res.status(200)
              .json({
                data: data
              });
          })
          .catch(function (err) {
            return next(err);
          })
      }
    })
}


function getTodosTicketsPorEstado(req, res, next) {
  var empresa = req.params.empresa;
  var usuario = req.params.usuario;
  var estado = req.params.estado;

  db.one('select adm from usuarios where id = $1', usuario)
    .then(function (data) {
      if (data.adm) {
        db.any('select t.id, p.nome as produto, t.estado, c.nome as componente, t.dt_abertura, t.prioridade, e.nome as cliente from tickets t join produtos p on p.id = t.produto ' +
          'join componentes c on c.id = t.componente join empresas e on e.id = t.empresa where t.estado = $1', estado)
          .then(function (data) {
            res.status(200)
              .json({
                data: data
              });
          })
          .catch(function (err) {
            return next(err);
          })
      } else {
        db.any('select t.id, p.nome as produto, t.estado, c.nome as componente, t.dt_abertura, t.prioridade, e.nome as cliente from tickets t join produtos p on p.id = t.produto ' +
          'join componentes c on c.id = t.componente join empresas e on e.id = t.empresa where t.empresa = $1 and t.estado = $2', [empresa, estado])
          .then(function (data) {
            res.status(200)
              .json({
                data: data
              });
          })
          .catch(function (err) {
            return next(err);
          })
      }
    })
}

function adicionarTicket(req, res, next) {
  var objeto = JSON.parse(req.params.ticket);
  db.query('insert into tickets(produto,empresa,componente,dt_abertura,prioridade,sumario,descricao,usuario,estado)'
    + ' values($1,$2,$3,$4,$5,$6,$7,$8,$9) returning id', [objeto.produto, objeto.empresa, objeto.componente, objeto.dt_abertura, objeto.prioridade, objeto.sumario, objeto.descricao, objeto.usuario, objeto.estado])
    .then(function (f) {
      res.status(200)
        .json({
          status: 'success',
          data: f
        })
    }).catch(function (e) {
      res.status(200)
        .json({
          status: 'error',
          message: '' + e
        });
    })
}

function adicionarTicketComentario(req, res, next) {
  var objeto = JSON.parse(req.params.obj);
  db.query('insert into tickets_comentarios(ticket,descricao,anexo,dt_envio,usuario) values($1,$2,$3,$4,$5)',
    [objeto.id, objeto.descricao, objeto.anexo, objeto.dt_envio, objeto.usuario])
    .then(function (f) {
      res.status(200)
        .json({
          status: 'success'
        })
    }).catch(function (e) {
      res.status(200)
        .json({
          status: 'error',
          message: '' + e
        });
    })
}

function getTicketPorId(req, res, next) {
  var id = req.params.id;
  db.one('select t.id, p.nome as produto, t.estado, c.nome as componente, t.dt_abertura, t.prioridade, e.nome as cliente, t.sumario, t.descricao, u.nome as usuario, t.anexo, t.anexo_nome, t.anexo_mimetype ' +
    'from tickets t join produtos p on p.id = t.produto ' +
    'join componentes c on c.id = t.componente join empresas e on e.id = t.empresa join usuarios u on t.usuario = u.id ' +
    'where t.id = $1', id)
    .then(function (data) {
      res.status(200)
        .json({
          data: data
        });
    })
    .catch(function (err) {
      return next(err);
    })
}


function getTicketsComentarios(req, res, next) {
  var id = req.params.id;
  db.query('select tc.id,tc.descricao,tc.dt_envio,tc.anexo,u.nome from tickets_comentarios tc join usuarios u on u.id = tc.usuario where ticket = $1 order by tc.dt_envio', id)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data
        });
    })
    .catch(function (err) {
      res.status(200)
        .json({
          status: 'error',
          message: '' + err
        });
    })
}

function addTicketAnexo(req, res, next) {
  upload(req, res, function (err) {
    if (err) {
      res.status(200)
        .json({
          status: 'error',
          message: '' + err
        });
    }
    let nome = req.file.originalname;
    let tipo = req.file.mimetype;

    var bytes = new Buffer(req.file.buffer, 'base64').toString('base64');
    var id = req.params.id;
    db.query('update tickets set anexo = $1, anexo_nome = $2, anexo_mimetype = $3 where id = $4', [bytes, nome, tipo, id])
      .then(function (f) {
        res.status(200)
          .json({
            status: 'success',
            message: 'Anexo inserido!'
          })
      }).catch(function (e) {
        res.status(200)
          .json({
            status: 'error',
            message: 'ERRO: ' + e
          });
      })

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
  getProdutosPorEmpresa: getProdutosPorEmpresa,
  adicionarProduto: adicionarProduto,
  deleteProduto: deleteProduto,
  updateProduto: updateProduto,
  getProdutosComponente: getProdutosComponente,
  addProdutosComponentes: addProdutosComponentes,
  updateProdutosComponentes: updateProdutosComponentes,
  deleteProdutosComponentes: deleteProdutosComponentes,
  // usuarios
  getTodosUsuarios: getTodosUsuarios,
  adicionarUsuario: adicionarUsuario,
  deleteUsuario: deleteUsuario,
  updateUsuario: updateUsuario,
  updateSenha: updateSenha,
  updateAvatar: updateAvatar,
  // componentes
  getComponente: getComponente,
  getTodosComponentes: getTodosComponentes,
  getTodosComponentesPorProduto: getTodosComponentesPorProduto,
  getComponetesVincular: getComponetesVincular,
  adicionarComponente: adicionarComponente,
  deleteComponente: deleteComponente,
  updateComponente: updateComponente,
  //tickets
  getTicketPorId: getTicketPorId,
  getTicketsComentarios: getTicketsComentarios,
  getTodosTicketsPorEmpresa: getTodosTicketsPorEmpresa,
  getTodosTicketsPorId: getTodosTicketsPorId,
  getTodosTicketsPorProduto: getTodosTicketsPorProduto,
  getTodosTicketsPorEstado: getTodosTicketsPorEstado,
  adicionarTicket: adicionarTicket,
  adicionarTicketComentario: adicionarTicketComentario,
  addTicketAnexo: addTicketAnexo,
};
