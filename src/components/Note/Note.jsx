import './note.css'
import { getDateStringFromTimestamp } from '../../javascripts/utils'


const Note = ({note, editNote}) => {
    const {
        heading,
        mainText,
        color,
        fontColor,
        id,
        date} = note;
        
    return (
        <div className='note' style={{backgroundColor: color, color: fontColor}}>
            <div className='note-date'>
                {getDateStringFromTimestamp(date)}
            </div>
            {heading &&
            <div className='note-heading'>
                {heading}
            </div>}
            <div className='note-main'>
                {mainText}
            </div>
            <div className='note-edit-overlay' onClick={e => editNote(id)}></div>
        </div>
    )
}

export default Note