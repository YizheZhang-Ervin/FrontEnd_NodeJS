var fs = require("fs");
var path = require("path");
const defaultOptions = {
  extname: [".js"], //要加载的文件扩展名，非此扩展名不加载
  root: "src/routes/", //要遍历的路由文件的根目录
  //不添加命名空间的文件或目录，相对于root的路径,比如['login/']，表示/routes/login/ 下的所有文件
  prefixIgnore: ["index.js"],
};
//要遍历的文件夹所在的路径,最后会拼到当前工作路径
const routesDir = path.resolve(defaultOptions.root);
// console.log("RoutesDir",routesDir)
//根据文件路径读取文件，返回文件列表
function loadRoutes(app, dirPath) {
  fs.readdir(dirPath, { withFileTypes: true }, function (err, files) {
    if (err) {
      console.warn(err, "读取文件夹错误！");
    } else {
      //遍历读取到的文件列表
      files.forEach(function (dirent) {
        const currentPath = path.join(dirPath, dirent.name);
        if (dirent.isDirectory()) {
          //文件夹
          loadRoutes(app, currentPath);
        } else if (dirent.isFile()) {
          //文件
          const relativePath = path.relative(__dirname, currentPath);
          const extname = path.extname(relativePath); //文件扩展名
          if (defaultOptions.extname.includes(extname)) {
            const router = require(relativePath);
            const extnameReg = new RegExp(defaultOptions.extname.join("|"));
            const prefixIgnore = defaultOptions.prefixIgnore.some((s) => {
              const ignoeSrc = path.resolve(defaultOptions.root, s);
              return currentPath.indexOf(ignoeSrc) === 0;
            });
            if (!prefixIgnore) {
              //命名空间
              const routerNamespace = path
                .relative(routesDir, currentPath)
                .replace(extnameReg, "");
              router.prefix("/" + routerNamespace); //Note: prefix always should start from / otherwise it won't work.
            }
            // console.log("Router:",router)
            app.use(router.routes(), router.allowedMethods());
          }
        }
      });
    }
  });
}

module.exports = function (app, opt = {}) {
  Object.assign(defaultOptions, opt);
  loadRoutes(app, routesDir);
};