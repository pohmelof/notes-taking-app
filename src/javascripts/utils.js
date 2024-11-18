const getDateStringFromTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const dateString = date.toISOString()
                            .slice(0, 10)
                            .split('-')
                            .reverse()
                            .join('.');
    return dateString;
  }

const saveDataIntoLocalStorage = (dataName, data) => {
    localStorage.setItem(dataName, JSON.stringify(data));
  }
const getDataFromLocalStorage = (dataName) => {
    return JSON.parse(localStorage.getItem(dataName));
  }

export {
    getDateStringFromTimestamp,
    saveDataIntoLocalStorage,
    getDataFromLocalStorage
}