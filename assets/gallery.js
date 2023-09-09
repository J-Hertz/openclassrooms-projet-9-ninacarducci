document.addEventListener("DOMContentLoaded", function () {
    const gallery = document.querySelector(".gallery");
    const galleryItems = document.querySelectorAll(".gallery-item");
  
    const galleryItemsRow = document.createElement("div");
    galleryItemsRow.classList.add("gallery-items-row", "row");
  
    galleryItems.forEach((item) => {
      const itemColumn = document.createElement("div");
      itemColumn.classList.add("item-column", "mb-4", "col-12", "col-sm-6", "col-md-4", "col-lg-4", "col-xl-4");
  
      const img = item.querySelector("img");
      if (img) {
        img.classList.add("img-fluid");
      }
  
      itemColumn.appendChild(item);
      galleryItemsRow.appendChild(itemColumn);
    });
  
    gallery.appendChild(galleryItemsRow);
  
    gallery.style.display = "block";
  });
  