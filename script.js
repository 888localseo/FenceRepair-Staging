
document.addEventListener("DOMContentLoaded", function () {
  const galleryImages = document.querySelectorAll(".gallery-collage img");
  const lightbox = document.createElement("div");
  lightbox.id = "lightbox";
  document.body.appendChild(lightbox);

  lightbox.style.display = "none";
  lightbox.style.position = "fixed";
  lightbox.style.top = "0";
  lightbox.style.left = "0";
  lightbox.style.width = "100%";
  lightbox.style.height = "100%";
  lightbox.style.background = "rgba(0, 0, 0, 0.8)";
  lightbox.style.justifyContent = "center";
  lightbox.style.alignItems = "center";
  lightbox.style.zIndex = "1000";

  const img = document.createElement("img");
  img.style.maxWidth = "90%";
  img.style.maxHeight = "80vh";
  img.style.border = "5px solid #fff";
  img.style.boxShadow = "0 0 20px rgba(0,0,0,0.5)";
  lightbox.appendChild(img);

  const closeBtn = document.createElement("span");
  closeBtn.innerHTML = "&times;";
  closeBtn.style.position = "absolute";
  closeBtn.style.top = "20px";
  closeBtn.style.right = "30px";
  closeBtn.style.fontSize = "40px";
  closeBtn.style.color = "#fff";
  closeBtn.style.cursor = "pointer";
  lightbox.appendChild(closeBtn);

  closeBtn.onclick = () => (lightbox.style.display = "none");
  lightbox.addEventListener("click", (e) => {
    if (e.target !== img) lightbox.style.display = "none";
  });

  galleryImages.forEach(image => {
    image.addEventListener("click", () => {
      img.src = image.src.replace("tr=w-300,f-auto", "tr=w-1600,f-auto");
      lightbox.style.display = "flex";
    });
  });
});
