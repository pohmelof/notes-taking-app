import { useEffect, useState } from 'react'
import './App.css'
import Note from './components/Note/Note'
import NoteEdit from './components/NoteEdit/NoteEdit'
import { nanoid } from 'nanoid'
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import defaultNotes from './javascripts/defaultNotes'
import { saveDataIntoLocalStorage, getDataFromLocalStorage } from './javascripts/utils'


function App() {
  // default values for state init
  const notesDefault = getDataFromLocalStorage('notes') || defaultNotes;
  const foldersDefault = getDataFromLocalStorage('folders') || ['default'];

  // edit note status
  const [edit, setEdit] = useState({
    active: false,
    editedNoteId: null
  });
  // sidebar status
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  }
  // folders
  const [folders, setFolders] = useState(foldersDefault);
  const createNewFolder = (folderName) => {
    setFolders(prev => [...prev, folderName])
  };
  const deleteFolder = (index, folderName) => {
    setFolders(prev => [...prev.slice(0, index), ...prev.slice(index+1)]);
    setFolderFilter(null);
    setNotes(prev => [...prev.map(item => {
      if (item.folder === folderName) {
        return {
          ...item,
          folder: null
        }
      } else {
        return item
      }
    })])
  }
  // filtering notes
  const [folderFilter, setFolderFilter] = useState(null);
  const applyFolderFilter = (notes, folder) => {
    const notesCopy = [...notes];
    if (folder === null) {
      return notes
    } else {
      return notesCopy.filter(item => item.folder === folder)
    }

  }
  // main notes in state
  const [notes, setNotes] = useState(notesDefault)
  const createNewNote = (folder) => {
    const note = {
      id: nanoid(),
      date: Date.now(),
      heading: '',
      mainText: '',
      color: '#CAAC00',
      fontColor: '#000000',
      folder: folder ? folder : null
    }
    setNotes(prev => [...prev, note]);
    return note.id;
  }
  // remove empty notes
  const filterEmptyNotes = () => {
    setNotes(prev => prev.filter(item => {
      if (!item.heading) {
        if (!item.mainText) {
          return false
        } else return true
      } else {
        return true
      }
    }))
  }

  const deleteNote = (id) => {
    setNotes(prev => {
      return prev.filter(item => item.id !== id)
    })
  }

  const handleChange = (text, id, attr) => {
    setNotes(prev => prev.map(item => {
        if (item.id === id) {
          return {
            ...item,
            [attr]: text
          }
        } else return item
      })
    )
  }

  const editNote = (id) => {
    setEdit({
      active: true,
      editedNoteId: id
    })
  }
  const finishEditing = (id, didNoteTextChange) => {
    setEdit({
      active: false,
      editedNoteId: null
    })
    if (didNoteTextChange) {
      handleChange(Date.now(), id, 'date');
    }
    filterEmptyNotes();
  }

  useEffect(() => {
    saveDataIntoLocalStorage('folders', folders);
  }, [folders])
  useEffect(() => {
    saveDataIntoLocalStorage('notes', notes);
  }, [notes])
 

  return (
    <>

      <Sidebar
          folders={folders}
          folderFilter={folderFilter}
          deleteFolder={deleteFolder}
          setFolderFilter={setFolderFilter}
          open={sidebarOpen}
          toggleSidebar={toggleSidebar}
          createNewFolder={createNewFolder}
      />
      {sidebarOpen && <div
        className='sidebar-clickable-overlay'
        onClick={toggleSidebar}>
      </div>}

      <div className={`blur-overlay ${edit.active || sidebarOpen ? 'blur' : ''}`} >
        <Header toggleSidebar={toggleSidebar}/>
        
        <div className={`notes-container`}>
          {applyFolderFilter(notes, folderFilter).map(note => {
            return (
              <Note
                key={note.id}
                note={note}
                editNote={editNote}
                />
            )
          })}
        </div>

      </div>

      {edit.active && <NoteEdit
          edit={edit.active}
          folders={folders}
          note={notes.find(item => item.id === edit.editedNoteId)}
          handleChange={handleChange}
          deleteNote={deleteNote}
          finishEditing={finishEditing}
      />}

      {!edit.active  && !sidebarOpen &&
        <button className='new-note-btn'
                onClick={() => {
                  const noteId = createNewNote(folderFilter);
                  setEdit({
                    active: true,
                    editedNoteId: noteId
                  })
                }}>
        +
        </button>}
        
    </>
  )
}

export default App
