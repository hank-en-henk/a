console.log("loaded");
document.getElementById("test").innerText = "loaded";
function downloadFile(url, fileName){
  fetch(url, { method: 'get', mode: 'no-cors', referrerPolicy: 'no-referrer' })
    .then(res => res.blob())
    .then(res => {
      const aElement = document.createElement('a');
      aElement.setAttribute('download', fileName);
      const href = URL.createObjectURL(res);
      aElement.href = href;
      // aElement.setAttribute('href', href);
      aElement.setAttribute('target', '_blank');
      aElement.click();
      URL.revokeObjectURL(href);
    });
};
  function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
      }
      return result;
    }
  let values = {}
  const urlParams = new URLSearchParams(window.location.search)
for (const [key, value] of urlParams.entries()) {
  console.log(`${key}, ${value}`);
  values[key] = value
}


let fileAmount = values.file;
if (fileAmount == undefined) {
  fileAmount = 100;
};
console.log(fileAmount)
if (values.infinite) {
  setInterval( ()=>{
    let name = makeid(10);
    downloadFile('https://www.africau.edu/images/default/sample.pdf', name += ".pdf");
  },100);
} else {
document.getElementById("display").innerText = `downloading files: ${fileAmount}`;
    for (let i = 0; i < fileAmount; i++) {
        let name = makeid(10);
        downloadFile('https://www.africau.edu/images/default/sample.pdf', name += ".pdf");
    };
}
