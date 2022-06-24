function createThumbnails (data) {
  const templateFragment = document.querySelector('#picture').content;
  const templateThumbnail = templateFragment.querySelector('a');
  const fragment = document.createDocumentFragment();
  data.forEach( (elementData) => {
    const element = createThumbnail(templateThumbnail, elementData);
    fragment.appendChild(element);
  });
  return fragment;
}

function createThumbnail(templateThumbnail, elementData){
  const element = templateThumbnail.cloneNode(true);
  element.classList.add(`dataImg-${elementData.id}`);
  element.children[0].src = elementData.url;
  element.children[0].alt = elementData.description;
  element.children[1].children[1].innerText = elementData.likes;
  element.children[1].children[0].innerText = elementData.comments.length;
  return element;
}

export {createThumbnails};
