export const removeBookFromDOM = (listBooks, id) => {
  if (id !== -1) {
    listBooks.removeBook(id);
  }
};

export const addRemoveButtons = (listBooks) => {
  const buttons = document.getElementsByClassName('btn remove-btn');
  for (let i = 0; i < buttons.length; i += 1) {
    buttons[i].addEventListener('click', () => {
      removeBookFromDOM(listBooks, i);
    });
  }
};