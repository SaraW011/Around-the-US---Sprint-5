//wrapper modals 
const editProfilePopup = document.querySelector('.modal_type_edit_profile');
const addNewPlacePopup = document.querySelector('.modal_type_add_place');
const previewImage = document.querySelector('.modal_type_preview_image');

//wrapper for popup form 
const form = document.querySelector('.form'); //handlesubmit saves from input

//select profile name and info:
const userNameElement = document.querySelector('.profile__name');
const userJobElement = document.querySelector('.profile__title');

//input data in modal/popup forms
const inputName = document.querySelector('.form__input_type_name');
const inputJob = document.querySelector('.form__input_type_job');

const inputPlace = addNewPlacePopup.querySelector('.form__input_type_place');
const inputLink = addNewPlacePopup.querySelector('.form__input_type_link');

// buttons
const openProfileEditButton = document.querySelector('.profile__edit-button');
const closeModalButton = document.querySelector('.modal__close-button');
const addNewPlacePopupButton = document.querySelector('.profile__add-button');
const createPlace = addNewPlacePopup.querySelector('.form__button');

//place=elements template
const placeList = document.querySelector('.elements__list'); //places all cards inside this UL
const placeTemplate = document.querySelector('.elements-template').content.querySelector('.elements__element');

//-->> close modal with buttons:
function closeModal() {
    editProfilePopup.classList.remove('modal_open');
    addNewPlacePopup.classList.remove('modal_open');
}

//**-->>CPLACE CARD ELEMENTS <<--**

function createPlaceElement(nameAndLink) { // nameAndLink is object of {name, link}
    const place = placeTemplate.cloneNode(true);
    place.querySelector('.elements__text').textContent = nameAndLink.name;
    place.querySelector('.elements__image').style.backgroundImage = `url(${nameAndLink.link})`;

    place.querySelector('.elements__heart').addEventListener('click', (evt) => {
        evt.target.classList.add('elements__heart_active');
    });

    place.querySelector('.elements__trash').addEventListener('click', () => {
        place.remove();
    });

    place.querySelector('.elements__image').addEventListener('click', () => {
        openModal(previewImage);
        previewImage.querySelector('.modal__image-caption').textContent = nameAndLink.name;
        previewImage.querySelector('.modal__image-container').src = nameAndLink.link;
    });

    return place;
}

//  import to doc initialCards from .js: 
initialCards.reverse().forEach(initialCardData => {
    placeList.prepend(createPlaceElement(initialCardData));
})

// add new place card: 
function newPlace(e) {
    e.preventDefault(); // prevent browser refresh after form submition:
    const insertPlace = createPlaceElement({
        name: inputPlace.value,
        link: inputLink.value
    });

    placeList.prepend(insertPlace);
    
    closeModal();
}

// close ALL modals with x button:
const closeAllBtns = document.querySelectorAll('.modal__close-button');
closeAllBtns.forEach(btn => btn.addEventListener('click', () => {
    const allPopus = document.querySelectorAll('.modal');
    // const openAllPopus = classList.add('modal_open'); // just added
    allPopus.forEach(popup => popup.classList.remove('modal_open'))
}));


//**-->>PROFILE FORM <<--**

//**--->>> previous function for profile edit form:
// function openModal(editProfilePopup){
//   if (!editProfilePopup.classList.contains('modal_open')){
//     inputName.value = userNameElement.textContent;
//     inputJob.value = userJobElement.textContent;
//   }
//   editProfilePopup.classList.toggle('modal_open');
// }


//------>>> another way of writing the above function ------<<<
//allows editing form:
function openModal(editProfilePopup) {

    const userName = userNameElement.textContent
    const userJob = userJobElement.textContent
    
    // ------------->>>>>>  holds initial values inside form when open:
    inputName.value = userName
    inputJob.value = userJob
       
    editProfilePopup.classList.add('modal_open');  // error editProfilePopup undefined 
}


// insert new name into profile:
function handleSubmit(e) {
    e.preventDefault();

    const nameValue = inputName.value
    const jobValue = inputJob.value

    //--->>>>>>  allows filling new content into form:
    userNameElement.textContent = nameValue
    userJobElement.textContent = jobValue

    closeModal() // button close
}


//*****---->>> EVT LISTENERS <<----*****


form.addEventListener('submit', handleSubmit);

openProfileEditButton.addEventListener('click', openModal);


openProfileEditButton.addEventListener('click', (evt) => openModal(editProfilePopup));
addNewPlacePopupButton.addEventListener('click', () => openModal(addNewPlacePopup));


//------> old close btn only for profile popup: closeModalButton.addEventListener('click', closeModal); 

addNewPlacePopup.addEventListener('submit', newPlace);