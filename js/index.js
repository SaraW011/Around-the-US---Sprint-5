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


//-->> close modal with buttons:
function closeModal() {
  editProfilePopup.classList.remove("modal_open");
  addNewPlacePopup.classList.remove("modal_open");
}

//comment from reviewer: ^ ^ ^ (line 33)
// Both functions take the DOM element of a popup as a parameter and add/remove the necessary control class.
// These functions should be used wherever we work with a popup. 
//If you need to do something else besides opening or closing the popup, use the composition of functions:

// const profilePopup = document.querySelector(' ... ');

// function openPopup(popup) {
//   //  functionality for adding a class to a modal element
// }
 
// function openProfilePopup() {
//   openPopup(profilePopup);
//   profileInput.value = '';
//   // ...
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

  closeModal();
}


// close ALL modals with x button:
const closeAllBtns = document.querySelectorAll('.modal__close-button');
closeAllBtns.forEach(btn => btn.addEventListener('click', () => {
    const allPopus = document.querySelectorAll('.modal');
    allPopus.forEach(popup => popup.classList.remove('modal_open'))
}));

//comment from reviewer: ^ ^ ^ (line 103)
// There is no point in closing all popups when clicking on one close button. 
//You need to close the popup that is under the button. You can find current closest popup with closest method:
// const popup = btn.closest('.modal');
// closePopup(popup);


//**-->>PROFILE FORM <<--**

//**--->>> previous function for profile edit form:
// function openProfileModal(editProfilePopup){
//   if (!editProfilePopup.classList.contains("modal_open")){
//     inputName.value = userNameElement.textContent;
//     inputJob.value = userJobElement.textContent;
//   }
//   editProfilePopup.classList.toggle("modal_open");
// }

//------>>> another way of writing the above function: ------<<<

//allows editing form:
function openProfileModal(editProfilePopup) { 
  const userName = userNameElement.textContent;
  const userJob = userJobElement.textContent;

  // ------------->>>>>>  holds initial values inside form when open:
  inputName.value = userName;
  inputJob.value = userJob;

  editProfilePopup.classList.add("modal_open");
}

// insert new name into profile:
function submitProfileForm(e) {
  e.preventDefault();

  const nameValue = inputName.value;
  const jobValue = inputJob.value;

  //--->>>>>>  allows filling new content into form:
  userNameElement.textContent = nameValue;
  userJobElement.textContent = jobValue;

  closeModal(); // button close
}



//*****---->>> EVT LISTENERS <<----*****

profileForm.addEventListener("submit", submitProfileForm);

openProfileEditButton.addEventListener("click", (evt) =>
openProfileModal(editProfilePopup)
);
addNewPlacePopupButton.addEventListener("click", () =>
openProfileModal(addNewPlacePopup)
);

placeForm.addEventListener("submit", submitNewPlaceForm);