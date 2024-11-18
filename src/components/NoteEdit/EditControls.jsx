import { useState } from 'react'
import './editControls.css'

const EditControls = ({note, folders, closeEditWindow, handleChange}) => {
    const [controlsOpen, setControlsOpen] = useState(false);
    return (
        <div className='edit-toggle'>
            <button
                className='btn btn-toggle-controls'
                onClick={() => setControlsOpen(prev => !prev)}>
                    {/* {controlsOpen ? 'close' : 'settings'} */}
                    ⚙
            </button>

            <div className={`note-edit-controls ${controlsOpen ? 'controls-open' : ''}`}>

                <div className='controls-cell'>
                    <label htmlFor='bgColor'>Background color: </label>
                    <input
                        className='color-picker'
                        type='color'
                        id='bgColor'
                        value={note.color}
                        onChange={e => handleChange(e.target.value, note.id, 'color')}>
                    </input>
                </div>

                <div className='controls-cell'>
                    <label htmlFor='fontColor'>Font color: </label>
                    <input
                        className='color-picker'
                        type='color'
                        id='fontColor'
                        value={note.fontColor}
                        onChange={e => handleChange(e.target.value, note.id, 'fontColor')}>
                    </input>
                </div>

                <div className='controls-cell'>
                    <label htmlFor='folderSelect'>Folder: </label>
                    <select
                        className='folder-select'
                        id='folderSelect'
                        onChange={e => {
                            const value = e.target.value.slice(0, 4) === 'none' ? null : e.target.value;
                            handleChange(value, note.id, 'folder')
                         }
                        }
                        defaultValue={note.folder}>
                            <option className='folder-none'>{`none${note.folder === null ? ' ✓' : ''}`}</option>
                        {folders.map(item => {
                            return (
                                <option
                                    key={item}
                                    value={item}
                                    className='folder-select-item'
                                >
                                    {`${item}${item === note.folder ? ' ✓' : ''}`}
                                </option>
                            )
                        })}
                    </select>
                </div>

                <div className='controls-cell'>
                    <span>Confirm:</span>
                    <button
                        id='btn-save'
                        className='btn-controls controls-save'
                        onClick={e => closeEditWindow(e)}>✓</button>
                </div>

                <div className='controls-cell'>
                    <span>Delete:</span>
                    <button
                        className='btn-controls controls-delete'
                        onClick={async (e) => {
                            e.preventDefault();
                            const deleteNote = confirm('Are you sure you want to delete this note');
                            if (deleteNote) {
                                closeEditWindow(e, true)

                            } else return;
                        }}>✗</button>
                </div>

            </div>
        </div>
    )
}

export default EditControls