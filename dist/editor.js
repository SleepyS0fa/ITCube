import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Image from "@editorjs/image";
import Link from "@editorjs/link";
import Attach from "@editorjs/attaches";


const editorPrograms = new EditorJS({ 
  placeholder: "краткий обзор (2-3 предложения)", 
  holder: 'editorjs',  
  tools: {
    header: Header,
    list: List,
    image: {
      class: Image,
      config: {
        field: "image",
        endpoints: {
          byFile: 'http://localhost:8080/uploadImageEditor',
          byUrl: 'http://localhost:8080/uploadImageEditorUrl',
        }
      }
    },
    link: Link,
    attach: Attach
  },
    onReady: () => {
        console.log('Editor.js готов к работе!')
     }
  })

const editor = new EditorJS({ 
  placeholder: "Первый абзац будет перенесён в заголовок", 
  holder: 'editorjs',  
  tools: {
    header: Header,
    list: List,
    image: {
      class: Image,
      config: {
        field: "image",
        endpoints: {
          byFile: 'http://localhost:8080/uploadImageEditor',
          byUrl: 'http://localhost:8080/uploadImageEditorUrl',
        }
      }
    },
    link: Link,
    attach: Attach
  },
    onReady: () => {
        console.log('Editor.js готов к работе!')
     }
  })

const formProgramsCard = document.getElementById("form");
formProgramsCard.addEventListener("submit", async (e)=>{
    e.preventDefault();
    
    const response = await fetch("/photo/uploadImageEditor", { 
              method: "POST", 
              headers: { "Content-Type": "multipart/form-data" },
              body: formData
    });
});

const form = document.getElementById("form");
form.addEventListener("submit", async (e)=>{
    e.preventDefault();
    
    const src = form.src.value;
    const image = form.image;
    const mainText = await editor.save();
    const requirements = form.requirements.value;
    const docs = form.docs.value;
 
    const response = await fetch("/photo/uploadImageEditor", { 
              method: "POST", 
              headers: { "Content-Type": "multipart/form-data" },
              body: formData
    });
});

module.exports.editor = editor;