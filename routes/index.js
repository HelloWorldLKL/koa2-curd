const router = require('koa-router')();

// 导入MySQL模块
const mysql = require('mysql2');
const dbConfig = require('../db/DBConfig.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const sequelize = new Sequelize(dbConfig.mysql.database, dbConfig.mysql.username, dbConfig.mysql.password, {
  host: dbConfig.mysql.host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 30000
  }
});

const Student = sequelize.define(
  'student',
  {
    sno: {
      type: Sequelize.INTEGER(9),
      primaryKey: true,
      autoIncrement: true
    },
    sname: Sequelize.STRING(20),
    ssex: Sequelize.STRING(2),
    sage: Sequelize.INTEGER(6),
    sdept: Sequelize.STRING(20)
  },
  {
    timestamps: false
  }
);

router.get('/', async (ctx, next) => {
  let param = ctx.request.query || ctx.request.params;
  let sName = param.sName || '';
  let data = [];
  await Student.findAll({
    where: {
      sname: {
        [Op.like]: `%${sName}%`
      }
    }
  })
    .then(info => {
      data = info;
    })
    .catch(function(err) {
      data = [];
      console.log('failed: ' + err);
    });
  await ctx.render('index', {
    data: data
  });
});

router.post('/addStudent', async (ctx, next) => {
  let param = ctx.request.body;
  await Student.create({
    sname: param.sName,
    ssex: param.sSex,
    sage: param.sAge,
    sdept: param.sDept
  })
    .then(function(info) {
      ctx.redirect('/');
    })
    .catch(function(err) {
      console.log('failed: ' + err);
    });
});
router.post('/deleteStudent', async (ctx, next) => {
  let param = ctx.request.body;
  await Student.destroy({
    where: {
      sno: param.sNO
    }
  })
    .then(function(info) {
      ctx.redirect('/');
    })
    .catch(function(err) {
      console.log('failed: ' + err);
    });
});
router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string';
});

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json',
    use: 'is here'
  };
});
// 根据uID获取info信息
router.get('/info', async (ctx, next) => {
  let param = ctx.request.query || ctx.request.params;
  await Student.findAll()
    .then(info => {
      ctx.body = info;
    })
    .catch(function(err) {
      ctx.body = {
        data: undefined
      };
      console.log('failed: ' + err);
    });
});
module.exports = router;
