const templateFragment = document.querySelector('#picture').content;
const templateThumbnail = templateFragment.querySelector('a');

const fragment = document.createDocumentFragment();

for (let i=0; i < 25; i++){
  const element = templateThumbnail.cloneNode(true);
  fragment.appendChild(element);
}
console.log(fragment);
// На основе временных данных для разработки и шаблона #picture создайте DOM-элементы, соответствующие фотографиям, и заполните их данными:

// Адрес изображения url подставьте как атрибут src изображения.
// Количество лайков likes выведите в блок .picture__likes.
// Количество комментариев comments выведите в блок .picture__comments.
// Отрисуйте сгенерированные DOM-элементы в блок .pictures. Для вставки элементов используйте DocumentFragment.
