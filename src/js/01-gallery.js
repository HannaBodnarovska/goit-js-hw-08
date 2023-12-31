import SimpleLightbox from 'simplelightbox';
import { galleryItems } from './gallery-items';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');

const createGalleryItem = ({ preview, original, description }) => {
  return `
    <li class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>
  `;
};

const galleryMarkup = galleryItems
  .map(createGalleryItem)
  .join('');

gallery.innerHTML = galleryMarkup;

const instance = new SimpleLightbox('.gallery a', {});

gallery.addEventListener('click', (event) => {
  event.preventDefault();

  const target = event.target;

  if (target.nodeName !== 'IMG') {
    return;
  }

  const { dataset: { source, alt } } = target;

  if (instance.isOpen()) {
    instance.close();
    return;
  }

  const escapeKeyPushHandler = (event) => {
    if (event.code === 'Escape') {
      instance.close();
      document.removeEventListener('keydown', escapeKeyPushHandler);
    }
  };

  document.addEventListener('keydown', escapeKeyPushHandler);
  instance.show({ items: [{ src: source, description: alt }] }); // Proper format for items
});

console.log(galleryItems);
