# Koa2-CURD

本应用使用了以下工具或技术构建，主要目的是为了完成作业和自我练习

+ koa2 Node框架

+ pug 模版引擎

+ BootStrap 4.0 CSS库

+ MySql 数据库

  > 所以这个东西是不支持SQL server 哒，使用其它数据库的小伙伴请自行魔改

+ Sequelize ORM框架

## 使用方法

1. 使用DB目录下的 `createDB.sql` ，将数据库和里面的表建好
2. 打开DB目录下的 `DBconfig.js` ，根据自己的情况修改变量的值

```javascript
module.exports = {
  mysql: {
    host: '127.0.0.1',
    username: 'YOUR_USERNAME',
    password: 'YOUR_PASSWORD',
    database: 'YOUR_DATABASE_NAME',
    port: 3306
  }
};
```

3. 在项目的根目录执行 shell 命令

```Bash
npm install
# 安装依赖
npm start
# 默认部署在 3000 端口
```

