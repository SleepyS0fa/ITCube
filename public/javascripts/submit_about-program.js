const form = document.getElementById("form");
form.addEventListener("submit", async (e)=>{
    e.preventDefault();
    
    const src = form.src.value;
    const mainText = await editor.save();
    const requirements = form.requirements.value;
    const docs = form.docs.value;
 
    const response = await fetch("/admin/programs", { 
              method: "POST", 
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                src: src,
                image: image,
                mainText: mainText,
                requirements: requirements,
                docs: docs,
            })
    });
});