import TextareaAutosize from 'react-textarea-autosize'
import './noteEdit.css'
import EditControls from './EditControls'
import { useEffect, useRef } from 'react'

const NoteEdit = ({note, folders, handleChange, deleteNote, finishEditing}) => {
    const headingEl = useRef(null);
    const noteEditEl = useRef(null);
    useEffect(() => headingEl.current.focus(), []);

    const setCursorToEndOnFocus = (e) => {
        e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)
    };

    const closeEditWindow = (e, deletion=false) => {
        e.preventDefault();
        noteEditEl.current.classList.add('reverse-animation');
        setTimeout(() => {
            finishEditing(note.id);
            if(deletion) deleteNote(note.id);
        }, 200);
    };

    return (
        <div ref={noteEditEl}
             className={`note-edit`}
             onClick={e => closeEditWindow(e)}>
            <div className='note-edit-container' onClick={e => e.stopPropagation()}>
                <TextareaAutosize
                    ref={headingEl}
                    onFocus={(e) => {
                        setCursorToEndOnFocus(e)
                    }}
                    style={{backgroundColor: note.color, color: note.fontColor}}
                    className='note-edit-heading'
                    value={note.heading}
                    onChange={(e) => handleChange(e.target.value, note.id, 'heading')}
                />
                <TextareaAutosize
                    style={{backgroundColor: note.color, color: note.fontColor}}
                    onFocus={(e) => {
                        setCursorToEndOnFocus(e)
                    }}
                    className='note-edit-text'
                    value={note.mainText}
                    onChange={(e) => handleChange(e.target.value, note.id, 'mainText')}
                />
                <EditControls
                    note={note}
                    handleChange={handleChange}
                    deleteNote={deleteNote}
                    closeEditWindow={closeEditWindow}
                    finishEditing={finishEditing}
                    folders={folders}
                />
            </div>
        </div>
    )
}

export default NoteEdit