import './Title.css'
// eslint-disable-next-line react/prop-types
export default function Title({ partTitle }) {
    return (
        <div className="title">
            <div className='partTitle'><span>{partTitle}</span></div>
            <div className='line'></div>
        </div>
    )
}

