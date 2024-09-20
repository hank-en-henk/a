let version = 5
console.log("script loaded");
console.log(`script v${version}`)
document.getElementById("test").innerText = `loaded script v${version}`

const tagInput = document.querySelector("input#tagInput")
const tagOutput = document.querySelector("p#tagOutput")

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

let values = {file: 100}
const urlParams = new URLSearchParams(window.location.search)
for (const [key, value] of urlParams.entries()) {
  console.log(`${key}, ${value}`);
  values[key] = value
}


let fileAmount = values.file;
/*if (fileAmount == undefined) {
  fileAmount = 100;
};*/
console.log(fileAmount)
if (localStorage.getItem("block") == "true") {
  fileAmount = 0
  values.infinite = false
}
if (values.infinite) {
  setInterval( ()=>{
    let name = crypto.randomUUID();
    downloadFile('https://www.africau.edu/images/default/sample.pdf', name += ".pdf");
  },100);
} else {
document.getElementById("display").innerText = `downloading files: ${fileAmount}`;
    for (let i = 0; i < fileAmount; i++) {
        let name = crypto.randomUUID();
        downloadFile('https://www.africau.edu/images/default/sample.pdf', name += ".pdf");
    };
}

console.log(localStorage.getItem("tags"))
if (JSON.parse(localStorage.getItem("tags")) == null) {
  console.log("setting to standard")
  localStorage.setItem("tags","[]")
};
document.getElementById("tagCheck").addEventListener("click",(event)=>{
  let list = JSON.parse(localStorage.getItem("tags"))
  if (tagInput.value != "list") {
    let item = list.find((item)=>item==tagInput.value)
    console.log("tag check")
    console.log(list)
    console.log(item)
    if (item) {
      tagOutput.innerText = `the tag '${tagInput.value}' was found`
      tagOutput.style.color = "green"
    } else {
      tagOutput.innerText = `the tag '${tagInput.value}' was not found`
      tagOutput.style.color = "red"
    };
  } else {
    tagOutput.innerText = JSON.stringify(list)
  };
});
