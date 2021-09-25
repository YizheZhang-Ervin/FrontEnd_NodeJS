// 接收文件
// input的type="file" accept=".csv"
let file = xxinput.files[0];

// 读取文件
let fr = new FileReader();
fr.onload = () => { }
fr.readAsText(file);

// 下载文件
let xxData = "";
let xxName = "";
let dld = document.createElement("a");
dld.setAttribute("href", "data:application/csv;charset=utf-8," + xxData);
dld.setAttribute("download",`${xxName}.csv`);
dld.click();