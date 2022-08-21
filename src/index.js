import './css/styles.css';
import axios from 'axios';
import Notiflix from 'notiflix'
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
const MY_KEY = "29140454-a281ece1e755381c74175cb00"

const input = document.querySelector('input')
const form = document.querySelector('#search-form')
const gallery = document.querySelector(".gallery")
const loadMore = document.querySelector(".load-more")
let pageNumber = 0
let result = ""
let totalImages = 0
let pagesTotal = 0

loadMore.classList.add('hidden')

form.addEventListener("submit", (e) => {
  e.preventDefault()
  pageNumber = 0
  loadMore.classList.remove('hidden')
  gallery.textContent = ""
  result = input.value
    fetchImg()
      .then(({ hits, totalHits }) => {
        console.log(totalHits)
        totalImages = totalHits
        pagesTotal = Math.floor(totalImages / 40)
        console.log(pagesTotal)        
          
        if (totalImages < 50) {
          loadMore.classList.add("hidden")
        }
        if (input.value === "") {
          Notiflix.Notify.failure('Введите запрос.')
          return;
        }
        if (hits.length === 0) {
          Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        } else Notiflix.Notify.success(`Hooray! We found ${totalImages} images.`)

        renderImgList({ hits, totalHits })
      }
      )
      .catch((error) => console.log(error))
  
  // let lightbox = new SimpleLightbox('.gallery  a', {captionsData : "alt",captionDelay : 250});
})

loadMore.addEventListener("click", (e) => {
  e.preventDefault()
  if (totalImages > 50 && pageNumber === pagesTotal) {
    loadMore.classList.add("hidden")
    Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
  }
      fetchImg()
        .then((images) => {
        renderImgList(images)
      }
      )
    .catch((error) => console.log(error))
})



const fetchImg = async () => {
  console.log(result)
  pageNumber += 1

  const response = await axios.get(`https://pixabay.com/api/?key=${MY_KEY}&q=${result}&image_type=photo&orientation=horizontal&safesearch=true&page=${pageNumber}&per_page=40`)
  // const images = response.json()
  return response.data
}

function renderImgList({hits}) {
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

  const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: "smooth",
// });

  let lightbox = new SimpleLightbox('.gallery  a', {captionsData : "alt",captionDelay : 250});
}

// let lightbox = new SimpleLightbox('.gallery  a', {captionsData : "alt",captionDelay : 250});

