const STORAGE_KEY = 'readingList';

export const getReadingList = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

export const saveToReadingList = (book) => {
  const list = getReadingList();
  if (!list.some((b) => b.key === book.key)) {
    list.push(book);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }
}