// * Mobile Nav
const friesMenu = document.getElementsByClassName("fries-menu")[0];
const navMobile = document.getElementsByClassName("nav-mobile")[0];
const closeButton = document.getElementsByClassName("close-button")[0];
friesMenu.addEventListener("click", () => {
  navMobile.classList.add("show");
  document.body.style.overflow = "hidden";
});
closeButton.addEventListener("click", () => {
  navMobile.classList.remove("show");
  document.body.style.overflow = "inherit";
});

// Fav Book Content Edit
const booksContent = document.getElementsByClassName("books-content")[0];
const container = document.querySelectorAll(".container");
const bookFavourites = document.querySelectorAll(".book-fav");

for (let i = 0; i < bookFavourites.length; i++) {
  const bookFavImg = document.getElementsByClassName("book-image")[0];

  bookFavourites[0].addEventListener("click", () => {
    bookFavImg.setAttribute("src", "assets/Asbunayah.jpg");

    changeBookFavContent("Asbunayah", "Pidi Baiq", "Masalah adalah apa yang kau anggap masalah, jika tidak maka bukan");
  });

  bookFavourites[1].addEventListener("click", () => {
    bookFavImg.setAttribute("src", "assets/Dr-Stone.jpeg");

    changeBookFavContent("Dr.Stone", "Riichiro Inagaki & Boichi", "berkisah tentang seorang jenius ilmiah bernama Senkū Ishigami dan temannya yang berotot, Taiju Ōki, terbangun ke dunia di mana umat manusia telah membatu");
  });
  bookFavourites[2].addEventListener("click", () => {
    bookFavImg.setAttribute("src", "assets/FMA.jpeg");

    changeBookFavContent(
      "FullMetal Alchemist",
      "Hiromu Arakawa",
      " berkisah tentang dua bersaudara yang menggunakan pengetahuan tabu untuk membangkitkan ibunya. Prosesnya gagal, dan sang kakak kehilangan kaki kirinya sementara sang adik kehilangan seluruh tubuhnya dan jiwanya diselamatkan ke baju zirah."
    );
  });
  bookFavourites[3].addEventListener("click", () => {
    bookFavImg.setAttribute("src", "assets/ErwinRommel.jpg");

    changeBookFavContent(
      "Infantry Attacks",
      "Erwin Rommel",
      "adalah buku klasik tentang taktik militer yang ditulis oleh Erwin Rommel tentang pengalamannya dalam Perang Dunia I. Pada saat buku itu ditulis pada pertengahan tahun 1930-an, pangkat Rommel adalah letnan kolonel"
    );
  });
  bookFavourites[4].addEventListener("click", () => {
    bookFavImg.setAttribute("src", "assets/Lookism.jpeg");

    changeBookFavContent(
      "Lookism",
      "Park Tae Joon",
      "is a South Korean webtoon written and illustrated by Park Tae-joon. It was first published online weekly on Naver WEBTOON since November 2014. The story revolves around a high school student who can switch between two bodies—one that is fat and ugly, and the other that is fit and handsome."
    );
  });

  bookFavourites[i].addEventListener("click", () => {
    document.getElementsByClassName("books-content")[0].classList.add("show");
    booksContent.style.maxHeight = "maxcontent";
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(showContent, 900);
  });
}

// Function Untuk mengubah isi konten dari buku favorit ketika di klik
function changeBookFavContent(title, author, text) {
  const bookFavTitle = document.getElementsByClassName("book-fav-title")[0];
  const bookFavAuthor = document.getElementsByClassName(" book-fav-author")[0];
  const bookFavTextContent = document.getElementsByClassName("paragraph-edit-content")[0];

  bookFavTitle.innerText = title;
  bookFavAuthor.innerText = author;
  bookFavTextContent.innerText = text;
}

const booksContentButtonOptionDiv = document.getElementsByClassName("books-content-button-option")[0];
const editContentButton = document.getElementsByClassName("edit-content-button-icon")[0];
editContentButton.addEventListener("click", () => {
  booksContentButtonOptionDiv.classList.toggle("show-option");
  booksContentButtonOptionDiv.addEventListener("click", () => {
    Swal.fire("Sekarang kamu bisa edit isi buku", "", "success");
    document.getElementsByClassName("paragraph-edit-content")[0].setAttribute("contenteditable", "true");
    window.scrollTo({ bottom: 0, behavior: "smooth" });
  });
});

editContentButton.addEventListener("onmouseout", () => {
  booksContentButtonOptionDiv.classList.remove("show-option");
});

function showContent() {
  for (const containers of container) {
    containers.style.display = "none";
  }
}

function hideContent() {
  for (const containers of container) {
    containers.style.display = "block";
  }
}

const backButton = document.getElementsByClassName("back-button")[0];
backButton.addEventListener("click", () => {
  document.getElementsByClassName("books-content")[0].classList.remove("show");
  document.body.style.maxHeight = "auto";
  document.body.style.overflow = "inherit";
  hideContent();
});

// Real Case
const books = [];
const RENDER_EVENT = "render-book";
const SAVED_EVENT = "saved-book";
const STORAGE_KEY = "BOOKS_APPS";

// Mungkin ini kelemahan dari sistemnya
const form = document.getElementById("form");

document.addEventListener("DOMContentLoaded", function () {
  if (isStorageExist()) {
    loadDataFromStorage();
  }
  const form = document.getElementById("form");
  form.addEventListener("submit", function (event) {
    addBook();
    // event.preventDefault();
  });
});

function generateID() {
  return +new Date();
}

function addBook() {
  const bookImg = document.getElementById("file-upload").value;
  const bookTitle = document.getElementById("nama-buku").value;
  const bookAuthor = document.getElementsByClassName("FormBookAuthor")[0].value;
  const bookYear = Number(document.getElementsByClassName("tahun-terbit")[0].value);
  const generatedID = generateID();
  const bookObject = generateBookObject(generatedID, bookImg, bookTitle, bookAuthor, bookYear, false);

  books.push(bookObject);

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function generateBookObject(id, bookImg, title, author, year, isCompleted) {
  return {
    id,
    bookImg,
    title,
    author,
    year,
    isCompleted,
  };
}

document.addEventListener(RENDER_EVENT, () => {
  console.log(books);
  const uncompletedBookList = document.getElementsByClassName("currently-reading")[0];
  uncompletedBookList.innerHTML = "";

  const completedBookList = document.getElementsByClassName("currently-reading")[1];
  completedBookList.innerHTML = "";

  for (const bookItem of books) {
    const bookElement = makeBook(bookItem);
    if (!bookItem.isCompleted) {
      uncompletedBookList.append(bookElement);
    } else {
      completedBookList.append(bookElement);
    }
  }
});

function makeBook(bookObject) {
  const textTitle = document.createElement("h4");
  textTitle.innerHTML = bookObject.title;
  textTitle.classList.add("book-title");

  const textAuthor = document.createElement("p");
  textAuthor.classList.add("book-info-author");
  textAuthor.innerText = bookObject.author;

  const bookImg = document.createElement("img");
  bookImg.classList.add("img");
  bookImg.setAttribute("src", "assets/book-img.jpeg");

  const textYear = document.createElement("p");
  textYear.classList.add("year");
  textYear.innerHTML = bookObject.year;

  const containerImg = document.createElement("div");
  containerImg.classList.add("book-img");
  containerImg.append(bookImg);

  const textContainer = document.createElement("div");

  textContainer.classList.add("book-info");
  textContainer.append(textTitle, textAuthor, textYear);
  textContainer.setAttribute("id", `book-${bookObject.id}`);

  const container = document.createElement("div");
  container.classList.add("books");
  container.classList.add("flex-row");

  container.append(containerImg, textContainer);

  if (bookObject.isCompleted) {
    const undoIcon = document.createElement("i");
    undoIcon.classList.add("fa-solid", "fa-arrow-rotate-left", "undo-button");

    undoIcon.addEventListener("click", () => {
      Swal.fire({
        title: "Kembalikan ke rak semula?",
        text: "Pilih iya untuk konfirmasi",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "batal",
        confirmButtonText: "Iya, kembalikan ini!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Undo berhasil!", "Buku kamu berhasil di kembalikan.", "success");
          undoBookfromCompleted(bookObject.id);
        }
      });
    });

    const trashIcon = document.createElement("i");
    trashIcon.classList.add("fa-solid", "fa-trash", "trash-button");

    trashIcon.addEventListener("click", () => {
      Swal.fire({
        title: "Kamu yakin?",
        text: "Kamu tidak bisa mengembalikan buku ini!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Kembali",
        confirmButtonText: "Iya, hapus ini!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Deleted!", "Buku kamu berhasil di hapus.", "success");
          removeBookFromCompleted(bookObject.id);
        }
      });
    });

    const completeButton = document.createElement("div");
    completeButton.classList.add("complete-or-not-button", "flex-row");

    completeButton.append(undoIcon, trashIcon);

    container.append(completeButton);
  } else {
    const completeICon = document.createElement("i");
    completeICon.classList.add("fa-solid", "fa-check", "check-button");

    const trashIcon = document.createElement("i");
    trashIcon.classList.add("fa-solid", "fa-trash", "trash-button");

    const completeButton = document.createElement("div");
    completeButton.classList.add("complete-or-not-button", "flex-row");

    completeButton.append(completeICon, trashIcon);

    completeICon.addEventListener("click", () => {
      Swal.fire({
        title: "Berhasil!",
        text: "Buku sudah selesai dibaca.",
        icon: "success",
      }).then((result) => {
        if (result.isConfirmed) {
          addBookToCompleted(bookObject.id);
        }
      });
    });

    trashIcon.addEventListener("click", () => {
      Swal.fire({
        title: "Kamu yakin?",
        text: "Kamu tidak bisa mengembalikan buku ini!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Kembali",
        confirmButtonText: "Iya, hapus ini!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Deleted!", "Buku kamu berhasil di hapus.", "success");
          removeBookFromCompleted(bookObject.id);
        }
      });
    });

    container.append(completeButton);
  }
  return container;
}

function addBookToCompleted(bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget == null) return;

  bookTarget.isCompleted = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function findBook(bookId) {
  for (const bookItem of books) {
    if (bookItem.id === bookId) {
      return bookItem;
    }
  }
  return null;
}

function removeBookFromCompleted(bookId) {
  const bookTarget = findBookIndex(bookId);

  if (bookTarget === -1) return;

  books.splice(bookTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function undoBookfromCompleted(bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget == null) return;

  bookTarget.isCompleted = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function findBookIndex(bookId) {
  for (const index in books) {
    if (books[index].id === bookId) {
      return index;
    }
  }
  return -1;
}
// Menggunakan WebStorage LocalStorage
function saveData() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}
function isStorageExist() {
  if (typeof Storage === undefined) {
    alert("Browser Anda tidak mendukung local Storage");
    return false;
  }
  return true;
}
document.addEventListener(SAVED_EVENT, function () {
  console.log(localStorage.getItem(STORAGE_KEY));
});

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) {
    for (const book of data) {
      books.push(book);
    }
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
}
