cd ../webssh-vue
npm install
npm run build

cd ../webssh-koa
npm install
npm run build

cd ../
mv static dist/static

cd dist
node server.bundle.js