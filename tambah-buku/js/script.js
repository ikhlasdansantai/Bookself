const form = document.getElementById("form");

// Form IMG
const drop = document.getElementsByClassName("drop")[0];
const dropInput = document.getElementById("file-upload");
const dropInputText = document.getElementsByClassName("drop-text")[0];
const dropProgress = document.getElementsByClassName("progress")[0];
const chosenImg = document.getElementById("chosen-image");
const chosenCaption = document.getElementsByClassName("chosen-image-info")[0];

let files = [];

let width = 300;
let height = 433;

dropInput.addEventListener("change", () => {
  drop.style.display = "none";
  let reader = new FileReader();
  reader.readAsDataURL(dropInput.files[0]);
  console.log(dropInput.files[0]);
  reader.onload = () => {
    chosenImg.setAttribute("src", reader.result);
    chosenImg.style.width = `${width}px`;
    chosenImg.style.height = `${height}px`;
  };
  chosenCaption.textContent = dropInput.files[0].name;
});

drop.addEventListener("dragover", (el) => {
  // el.preventDefault();
  dropInputText.innerHTML = "Release your mouse to drop";
  drop.classList.add("active");
});

drop.addEventListener("dragleave", (el) => {
  // el.preventDefault();
  dropInputText.innerHTML = "Drag and Drop your documents";
  drop.classList.remove("active");
});

drop.addEventListener("drop", (el) => {
  // el.preventDefault();
  files = el.dataTransfer.files;
  drop.style.display = "none";
  // imgUpload();
});

// Form-Year Validation
const inputTahun = document.getElementById("tahun-terbit");
const label = document.getElementsByClassName("tahun-terbit-caption")[0];

inputTahun.addEventListener("input", () => {
  if (isNaN(inputTahun.value) === true) {
    label.innerText = "Kamu tidak memasukan nomor";
  } else if (inputTahun.value.length === 0) {
    label.innerText = "Tahun terbit...";
  } else if (inputTahun.value.length >= 0) {
    label.innerText = "Tahun terbit...";
  }
});

// INPUT ANIMATION || Interaction
const input = document.getElementsByClassName("input");
const caption = document.getElementsByClassName("caption-nama");

for (let i = 0; i < container.length; i++) {
  for (let i = 0; i < input.length; i++) {
    for (let i = 0; i < caption.length; i++) {
      input[i].addEventListener("focus", () => {
        caption[i].classList.add("input-animation");
      });

      input[i].addEventListener("blur", () => {
        if (input[i].value.length >= 1) {
          return;
        } else if (input[i].value.length < 0) {
          alert("ada value nya lebih dari 1");
          caption[i].classList.remove("input-animation");
        } else {
          caption[i].classList.remove("input-animation");
        }
      });
    }
  }
}

// let isClicked = false;
// const button = document.getElementsByClassName("btn")[1];
// button.addEventListener("click", () => {
//   if (isClicked == false) {
//     isClicked = true;
//   } else {
//     isClicked = false;
//   }
// });
