'use strict';

const elModal = document.querySelector('.modal');
const elContent = document.querySelector('.modal__content');
const elResult = document.querySelector('.modal__result');

function openModal(e, content) {
  // console.log('content:', content);
  if (typeof elModal.showModal === 'function') {
    elModal.showModal();

    elContent.innerHTML = content || '';
    elResult.textContent = '';
  } else {
    elResult.textContent =
      'Sorry, the <dialog> API is not supported by this browser.';
  }
}

const elCloseBtn = document.querySelector('.modal__closeBtn');
elCloseBtn.addEventListener('click', closeModal);

function closeModal() {
  console.log('close');
  onCloseModal();
  elModal.close();
}
