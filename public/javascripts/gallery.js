let elems = document.querySelectorAll(".gallery_form");

elems.forEach((val) => {
    val.addEventListener("submit", async (e)=>{
        e.preventDefault();
     
        let response = await fetch("/gallery/delete", { 
                method: "POST", 
                headers: { "Content-Type": "application/json" },
                body: new FormData(val)
                
        });
        let result = await response.json();
    
        if (!result.success) {
            let toastElList = [].slice.call(document.querySelectorAll('.toast'))
            let toastList = toastElList.map(function (toastEl) {
                return new bootstrap.Toast(toastEl, {
                    animation: true,
                    autohide: true,
                    delay: 1000
                  })
            })
            toastList.forEach(toast => toast.show());
        }
    })
});