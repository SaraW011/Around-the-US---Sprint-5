//wrapper modals
const editProfilePopup = document.querySelector(".modal_type_edit-profile");
const addNewPlacePopup = document.querySelector(".modal_type_add-place");
const previewImage = document.querySelector(".modal_type_preview-image");

//wrapper for popup forms
const profileForm = editProfilePopup.querySelector(".form"); //submitProfileForm saves  profile form input
const placeForm = addNewPlacePopup.querySelector(".form-add-place");

//select profile name and info:
const userNameElement = document.querySelector(".profile__name");
const userJobElement = document.querySelector(".profile__title");

//input data in modal/popup forms
const inputName = document.querySelector(".form__input_type_name");
const inputJob = document.querySelector(".form__input_type_job");

const inputPlace = addNewPlacePopup.querySelector(".form__input_type_place");
const inputLink = addNewPlacePopup.querySelector(".form__input_type_link");

// buttons
const openProfileEditButton = document.querySelector(".profile__edit-button");
//const closeModalButton = document.querySelector(".modal__close-button"); //no need
const addNewPlacePopupButton = document.querySelector(".profile__add-button");
const createPlace = addNewPlacePopup.querySelector(".form__button");

//place=elements template
const placeList = document.querySelector(".elements__list"); //places all cards inside this UL
const placeTemplate = document.querySelector(".elements-template").content.querySelector(".elements__element");


//**-->>OPEN AND CLOSE MODALS <<--**

//-->> open + close modals:
const profilePopup = document.querySelector('.modal'); 

function openModal(popup) {              
  popup.classList.add("modal_open");    
}

function closeModal(popup) {
  popup.classList.remove("modal_open");
}

//-->> prev close modal with submit:
// function closeBtn() {
//   editProfilePopup.classList.remove("modal_open");
//   addNewPlacePopup.classList.remove("modal_open");
// }

//**-->>CPLACE CARD ELEMENTS <<--**

function createPlaceElement(data) {
  // data is object of {name, link}
  const place = placeTemplate.cloneNode(true);
  place.querySelector(".elements__text").textContent = data.name;
  place.querySelector(".elements__image").style.backgroundImage = `url(${data.link})`;

  place.querySelector(".elements__heart").addEventListener("click", (evt) => {
    evt.target.classList.add("elements__heart_active");
  });

  place.querySelector(".elements__trash").addEventListener("click", () => {
    place.remove();
  });

  place.querySelector(".elements__image").addEventListener("click", () => {
    openProfileModal(previewImage);
    previewImage.querySelector(".modal__image-caption").textContent =
      data.name;
    previewImage.querySelector(".modal__image-container").src =
      data.link;
  });

  return place;
}

//  import to doc initialCards from .js:
initialCards.reverse().forEach((initialCardData) => {
  placeList.prepend(createPlaceElement(initialCardData));
});

// add new place card:
function submitNewPlaceForm(e) {
  e.preventDefault(); // prevent browser refresh after form submition:
  const insertPlace = createPlaceElement({
    name: inputPlace.value,
    link: inputLink.value,
  });

  placeList.prepend(insertPlace);

  closeModal(addNewPlacePopup);
}


//**-->>PROFILE FORM <<--**

//allows editing form:
function openProfileModal(editProfilePopup) { 
  const userName = userNameElement.textContent;
  const userJob = userJobElement.textContent;

  // ------------->>>>>>  holds initial values inside form when open:
  inputName.value = userName;
  inputJob.value = userJob;

  openModal(editProfilePopup);

}

// insert new name into profile:
function submitProfileForm(e) {
  e.preventDefault();

  const nameValue = inputName.value;
  const jobValue = inputJob.value;

  //--->>>>>>  allows filling new content into form:
  userNameElement.textContent = nameValue;
  userJobElement.textContent = jobValue;

  closeModal(editProfilePopup);
}


// close ALL modals with x button:
const closeAllBtns = document.querySelectorAll('.modal__close-button');
closeAllBtns.forEach(btn => btn.addEventListener('click', (evt) => {
  closeModal(evt.target.closest('.modal'))
}));


//*****---->>> EVT LISTENERS <<----*****

profileForm.addEventListener("submit", submitProfileForm);

openProfileEditButton.addEventListener("click", (evt) =>
openProfileModal(editProfilePopup)
);
addNewPlacePopupButton.addEventListener("click", () =>
openProfileModal(addNewPlacePopup)
);

placeForm.addEventListener("submit", submitNewPlaceForm);