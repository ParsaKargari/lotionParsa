export const fetchFromLocalStorage = (itemName) => {
    return JSON.parse(localStorage.getItem(itemName));
}

export const storeInLocalStorage = (itemName, data) => {
    localStorage.setItem(itemName, JSON.stringify(data));
}