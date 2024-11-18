import TextareaAutosize from 'react-textarea-autosize'
import './noteEdit.css'
import EditControls from './EditControls'
import { useEffect, useRef } from 'react'

const NoteEdit = ({note, folders, handleChange, deleteNote, finishEditing}) => {
    const headingEl = useRef(null);
    const mainTextEl = useRef(null);
    const noteEditEl = useRef(null);
    useEffect(() => headingEl.current.focus(), []);

    // store initial text values in refs for didNoteTextChange
    const noteHeading = useRef(note.heading);
    const noteText = useRef(note.mainText);
    const didNoteTextChange = () => {
        return noteHeading.current !== headingEl.current.value ||
               noteText.current !== mainTextEl.current.value;
    }

    const setCursorToEndOnFocus = (e) => {
        e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)
    };

    const animTime = 200;
    const closeEditWindow = (e, deletion=false) => {
        e.preventDefault();
        noteEditEl.current.classList.add('reverse-animation');
        // timeout for animation to finish before unmount
        setTimeout(() => {
            finishEditing(note.id, didNoteTextChange());
            if(deletion) deleteNote(note.id);
        }, animTime);
    };

    return (
        <div ref={noteEditEl}
             className={`note-edit`}
             style={{animationDuration: `${animTime + 10}ms`}}
             onClick={(e) => closeEditWindow(e)}>
            <div className='note-edit-container' onClick={e => e.stopPropagation()}>
                <TextareaAutosize
                    ref={headingEl}
                    name='heading'
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
                    ref={mainTextEl}
                    name='mainText'
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