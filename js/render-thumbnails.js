function createThumbnail (data) {
  const templateFragment = document.querySelector('#picture').content;
  const templateThumbnail = templateFragment.querySelector('a');
  const fragment = document.createDocumentFragment();
  for (let i=0; i < data.length; i++){
    const element = templateThumbnail.cloneNode(true);
    element.children[0].src = data[i].url;
    element.children[1].children[1].innerText = data[i].likes;
    element.children[1].children[0].innerText = data[i].comments.length;
    fragment.appendChild(element);
  }
  return fragment;
}

export {createThumbnail};
