const form = document.getElementById("form");
form.addEventListener("submit", async (e)=>{
    e.preventDefault();
    
    const src = form.src.value;
    const text = await editor.save();
    const requirements = form.requirements.value;
    const docs = form.docs.value;
 
    const response = await fetch("/admin/news/add", { 
              method: "POST", 
              headers: { "Content-Type": "multipart/form-data" },
              body: JSON.stringify({
                src: src,
                image: image,
                mainText: mainText,
                requirements: requirements,
                docs: docs,
            })
    });
});