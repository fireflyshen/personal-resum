import './App.css'
import PdfButton from './component/common/PdfButton'
import Header from './component/Header/Header'
import EducationExperience from './component/Main/EducationExperience/EducationExperience'
import Projects from './component/Main/Projects/Projects'
import WorkExperience from './component/Main/WorkExperience/WorkExperience'
import html2pdf from 'html2pdf.js';
import { useState } from 'react';
import { ShadowDomContent } from './component/common/SettingBorad'

function App() {



  const [initPosition, setInitPosition] = useState({ x: 0, y: 303 })

  const [position, setPosition] = useState({ x: 0, y: 303 });



  const onMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.target.tagName === "svg" || e.target.className === "icon") {
      setInitPosition({ x: 0, y: e.clientY });
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }


  }



  const onMouseMove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setPosition({ x: 0, y: e.clientY });
  }

  const onMouseUp = () => {
    console.log("up");

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  return (
    <>
      <PdfButton save={handleClick} />

      <div className="container">

        <Header />

        <EducationExperience />
        <WorkExperience />

        <Projects />

      </div>

      <ShadowDomContent onMouseDown={onMouseDown} onMouseUp={onMouseUp} position={position} initPosition={initPosition} />

    </>
  )
}





async function handleClick() {
  var element = document.getElementsByClassName("container")[0];
  console.log(element);

  if (!element) {
    console.warn(`Element with id '${element}' not found.`);
    return;
  }

  const opt = {
    // margin: [0, 0, 0, 0], // [top, left, bottom, right]
    filename: 'resume.pdf',
    image: { type: 'jpeg', quality: 1 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      logging: true,
      onclone: (documentClone) => {
        const images = documentClone.querySelectorAll('img');
        images.forEach(img => {
          if (!img.complete) {
            img.onload = () => { };
            img.onerror = () => {
              console.error(`Failed to load image: ${img.src}`);
            };
          }
        });
      }
    },

    jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' }
  };




  await html2pdf().set(opt).from(element).save().then(() => {
    console.log('File saved');
  }).catch((err) => {
    console.error(err);
  });



}

export default App
