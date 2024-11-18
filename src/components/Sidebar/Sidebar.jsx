import './sidebar.css'

// TODO change user confirmation implementation 

const Sidebar = ({ 
    open,
    folders,
    folderFilter,
    setFolderFilter,
    deleteFolder,
    toggleSidebar,
    createNewFolder }) => {


    const handleNewFolderInput = (e, folders) => {
        e.preventDefault();
        const target = e.target.previousElementSibling;
        const folderName = target.value.toLowerCase();
        // TODO add error messages component
        if (target.value.length < 3)  {
            alert('Folder name should at least be 3 characters long')
            return;
        };
        if (folders.includes(folderName)) {
            alert(`Folder "${folderName}" already exist`)
            return
        };
        createNewFolder(folderName);
        target.value = '';
    }
    return (
        <div className={`sidebar ${open ? 'sidebar-open' : ''}`}>
            
            <button className='btn sidebar-close-btn' onClick={toggleSidebar}>✕</button>

            <div className='sidebar-folders-container'>
                <h3>Folders</h3>

                <ul className='folders-list'>

                    <li
                        className={`folders-list-item ${folderFilter === null ? 'folders-selected' : ''}`}
                        onClick={e => {
                            setFolderFilter(null);
                            toggleSidebar();
                            }
                        }>show all</li>

                    {folders.map((item, index) => {
                       return  (
                           <li
                               key={`sidebar-${item}`}
                               className='list-item-container'
                            >
                               <div
                                className={`folders-list-item ${folderFilter === item ? 'folders-selected' : ''}`}
                                onClick={e => {
                                    setFolderFilter(item);
                                    toggleSidebar();
                                }
                                }>{item}</div>
                               <button
                                   className='delete-folder-btn'
                                   onClick={e => {
                                       e.stopPropagation();
                                       const confirmDeletion = confirm('Delete folder?')
                                       if (confirmDeletion) deleteFolder(index, item);
                                       return;
                                   }}>delete</button>
                           </li>
                        )
                    })}
                </ul>

                <div className='new-folder'>
                    <label
                        className='new-folder-label'
                        htmlFor='new-folder-input'>
                        Create new folder
                    </label>
                    <input
                        type='text'
                        id='new-folder-input'
                        maxLength={40}
                        className='new-folder-input' />
                    <button
                        className='btn new-folder-btn'
                        onClick={e => {
                            handleNewFolderInput(e, folders)
                        }
                        }>
                        create
                    </button>
                </div>
            </div>
            <button className='btn-clear' onClick={(e) => {
                    e.preventDefault();
                    const confirmClear = confirm('Delete all notes data?');
                    if (confirmClear) {
                        localStorage.clear();
                        window.location.reload();
                    }
                    }}>Clear local storage</button>
        </div>
    )
}

export default Sidebar