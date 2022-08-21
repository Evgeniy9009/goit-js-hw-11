export default function renderImgList({hits}) {
  input.value=""

  const markup = hits
    .map((hit) => {
      return `<div class="photo-card">
    <a class="gallery__link" href="${hit.largeImageURL}"> 
    <img class="gallery__image"src="${hit.webformatURL}" data-source="${hit.largeImageURL}" alt="${hit.tags}" loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes ${hit.likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${hit.views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${hit.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${hit.downloads}</b>
    </p>
  </div>
</div>`
        })
        .join("")
  gallery.insertAdjacentHTML("beforeend", markup)

lightbox.refresh()
}