const defaultNotes = [
    {
      id: 1,
      date: new Date(2022, 3, 11).getTime(),
      heading: 'This is just a simple note taking app',
      mainText: 'It will probably be stuck in "work in progress" stage indefinetely',
      color: '#E2FF0A',
      fontColor: '#000000',
      folder: null
    },
    {
      id: 2,
      date: new Date(2022, 4, 12).getTime(),
      heading: 'To create a new note',
      mainText: 'Press the large "+" button in the corner',
      color: '#333333',
      fontColor: '#FFFFFF',
      folder: null
    },
    {
      id: 3,
      date: new Date(2023, 6, 20).getTime(),
      heading: 'To edit a note',
      mainText: 'Click on a note itself, and click on a gear icon to access settings',
      color: '#23AA5E',
      fontColor: '#000000',
      folder: null
    },
    {
      id: 4,
      date: new Date(2024, 8, 3).getTime(),
      heading: 'Create folders and filter notes',
      mainText: 'Use sidebar menu to create folders and filter notes, change note folders through note settings',
      color: '#23AA5E',
      fontColor: '#000000',
      folder: null
    },
    {
      id: 5,
      date: Date.now() + 31536000000,
      heading: 'This is a note from the future',
      mainText: 'You still haven\'t finished this, huh',
      color: '#23DE47',
      fontColor: '#000000',
      folder: null
    }
  ];

export default defaultNotes