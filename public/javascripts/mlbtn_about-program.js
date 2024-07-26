document.querySelector("#moreReq").addEventListener("click", () => {
    let entry = document.createElement('input');
    entry.type = 'text';
    entry.classList.add("form-control", "mt-1");
    entry.name = "requirements";
    document.querySelector(`#requirementList`).appendChild(entry);
});

document.querySelector("#lessReq").addEventListener("click", () => {
     let targetNode = document.querySelector(`#requirementList`);
    
    if (targetNode.childElementCount >= 2) {
        targetNode.children[targetNode.children.length-1].remove();
    }
});
document.querySelector("#moreDoc").addEventListener("click", () => {
    let entry = document.createElement('input');
    entry.type = 'text';
    entry.classList.add("form-control", "mt-1");
    entry.name = "docs";
    document.querySelector(`#docsList`).appendChild(entry);
});

document.querySelector("#lessDoc").addEventListener("click", () => {
    let targetNode = document.querySelector(`#docsList`);
    
    if (targetNode.childElementCount >= 2) {
        targetNode.children[targetNode.children.length-1].remove();
    }
});