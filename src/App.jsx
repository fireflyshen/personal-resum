import './App.css'
import PdfButton from './component/common/PdfButton'
import Header from './component/Header/Header'
import EducationExperience from './component/Main/EducationExperience/EducationExperience'
import Projects from './component/Main/Projects/Projects'
import WorkExperience from './component/Main/WorkExperience/WorkExperience'
import html2pdf from 'html2pdf.js';
function App() {
  return (
    <>
      <PdfButton save={handleClick} />
      <div className="container">
        <Header />
        <EducationExperience />
        <WorkExperience />
        <Projects />

      </div>
    </>
  )
}


async function handleClick() {
  var element = document.querySelector(".container");
  if (!element) {
    console.warn(`Element with id '${element}' not found.`);
    return;
  }

  const opt = {
    margin: [0, 0, 0, 0], // [top, left, bottom, right]
    filename: 'myfile.pdf',
    image: { type: 'jpeg', quality: 0.98 },
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
