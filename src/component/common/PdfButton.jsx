import './PdfButton.css';

// eslint-disable-next-line react/prop-types
export default function PdfButton({save}) {
    return (
        <button className="btn" onClick={save}>save as pdf</button>
    )
}


