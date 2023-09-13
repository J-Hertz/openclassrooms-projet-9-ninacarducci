// Fonction pour créer la galerie
function createGallery() {
  const gallery = document.querySelector('.gallery')
  const galleryItems = document.querySelectorAll('.gallery-item')

  const galleryItemsRow = document.createElement('div')
  galleryItemsRow.classList.add('gallery-items-row', 'row')

  galleryItems.forEach((item) => {
    const itemColumn = document.createElement('div')
    itemColumn.classList.add(
      'item-column',
      'mb-4',
      'col-12',
      'col-sm-6',
      'col-md-4',
      'col-lg-4',
      'col-xl-4'
    )

    const img = gallery.querySelector('img')
    if (img) {
      img.classList.add('img-fluid')

      // Ajoute un événement click pour ouvrir la modal
      img.addEventListener('click', () => {
        openModal(img.src, img.alt)
      })
    }

    itemColumn.appendChild(item)
    galleryItemsRow.appendChild(itemColumn)
  })

  gallery.appendChild(galleryItemsRow)

  gallery.style.display = 'block'
}

// Fonction pour créer les boutons de filtre
function createFilterButtons() {
  const gallery = document.querySelector('.gallery')

  // Crée la liste des boutons de filtre
  const filterButtonUl = document.createElement('ul')
  filterButtonUl.classList.add('my-4', 'tags-bar', 'nav', 'nav-pills')

  // Crée le bouton "Tous" et ajoutez-lui un écouteur d'événements
  const allButton = createFilterButton('Tous')
  allButton.addEventListener('click', () => {
    filterImages('Tous')
    setActiveButton(allButton)
  })

  // Ajout les classes "active-tag" et "active" au bouton "Tous"
  allButton.querySelector('.nav-link').classList.add('active-tag', 'active')

  filterButtonUl.appendChild(allButton)

  // Récupération des attributs de données "data-gallery-tag"
  const filterTags = Array.from(
    new Set(
      Array.from(gallery.querySelectorAll('.gallery-item')).map((item) =>
        item.getAttribute('data-gallery-tag')
      )
    )
  )

  // Crée des boutons pour chaque attribut
  filterTags.forEach((tag) => {
    const button = createFilterButton(tag)
    button.addEventListener('click', () => {
      filterImages(tag)
      setActiveButton(button)
    })
    filterButtonUl.appendChild(button)
  })

  // Insère la liste de boutons de filtre avant la div de la galerie
  gallery.insertBefore(filterButtonUl, gallery.firstChild)
}

// Fonction utilitaire pour créer un bouton de filtre
function createFilterButton(tag) {
  const filterButtonLi = document.createElement('li')
  filterButtonLi.classList.add('nav-item')

  const filterButtonSpan = document.createElement('span')
  filterButtonSpan.classList.add('nav-link')
  filterButtonSpan.textContent = tag

  filterButtonLi.appendChild(filterButtonSpan)
  return filterButtonLi
}

// Fonction pour définir le bouton actif
function setActiveButton(button) {
  const filterButtons = document.querySelectorAll('.nav-link')
  filterButtons.forEach((btn) => {
    btn.classList.remove('active-tag', 'active')
  })
  button.querySelector('.nav-link').classList.add('active-tag', 'active')
}

function filterImages(tag) {
  const gallery = document.querySelector('.gallery')
  const galleryItems = gallery.querySelectorAll('.gallery-item')

  galleryItems.forEach((item) => {
    const itemTag = item.getAttribute('data-gallery-tag')
    if (tag === 'Tous' || tag === itemTag) {
      item.style.display = 'block'
      item.classList.remove('display-none') // Supprime la classe display-none de l'image
      const itemColumn = item.closest('.item-column')
      if (itemColumn) {
        itemColumn.classList.remove('display-none') // Supprime la classe display-none de la div parente
      }
    } else {
      item.style.display = 'none'
      item.classList.add('display-none') // Ajoute la classe display-none à l'image
      const itemColumn = item.closest('.item-column')
      if (itemColumn) {
        itemColumn.classList.add('display-none') // Ajoute la classe display-none à la div parente
      }
    }
  })
}

// Fonction pour créer la modale
function createModal() {
  const gallery = document.querySelector('.gallery')
  // Crée la modale
  const modal = document.createElement('div')
  modal.classList.add('modal')
  modal.style.display = 'none'

  // Crée modal-content
  const modalContent = document.createElement('div')
  modalContent.classList.add('modal-content')

  // Crée modal-body
  const modalBody = document.createElement('div')
  modalBody.classList.add('modal-body')

  // Crée le bouton précédent
  const prevButton = document.createElement('div')
  prevButton.classList.add('mg-prev')
  prevButton.innerHTML = '<'

  // Crée l'image de la modal
  const modalImage = document.createElement('img')
  modalImage.classList.add('lightboxImage', 'img-fluid')

  // Crée le bouton suivant
  const nextButton = document.createElement('div')
  nextButton.classList.add('mg-next')
  nextButton.innerHTML = '>'

  // Associez des événements click aux boutons
  nextButton.addEventListener('click', handleNext)
  prevButton.addEventListener('click', handlePrev)

  // Ajoute les éléments à la modale
  modalBody.appendChild(prevButton)
  modalBody.appendChild(modalImage)
  modalBody.appendChild(nextButton)
  modalContent.appendChild(modalBody)
  modal.appendChild(modalContent)

  // Ajoute la modale à la gallerie
  gallery.appendChild(modal)
}

// Fonction pour ouvrir la modale
function openModal(src, alt) {
  const modal = document.querySelector('.modal')
  const modalImage = modal.querySelector('.lightboxImage')

  // Met à jour la source et l'alt de l'image de la modale
  modalImage.src = src
  modalImage.alt = alt

  // Affiche la modale
  modal.style.display = 'flex'
}

// Fonction pour fermer la modal en cliquant en dehors de modal-content
function closeModal() {
  const modal = document.querySelector('.modal')
  modal.style.display = 'none'
}

// Ajoute un événement pour fermer la modal en cliquant en dehors de modal-content
document.addEventListener('click', function (event) {
  const modal = document.querySelector('.modal')
  if (event.target === modal) {
    closeModal()
  }
})

// Fonction pour gérer le bouton Précédent
function handlePrev() {
  console.log('totoprev')
}

// Fonction pour gérer le bouton Suivant
function handleNext() {
  console.log('totonext')
}

// Fonction pour démarrer l'application
function start() {
  createGallery()
  createFilterButtons()
  createModal()
}

document.addEventListener('DOMContentLoaded', function () {
  start()
})
