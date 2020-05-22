/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

const listItems = document.querySelectorAll('.student-list')[0].children; //selects a collection of list elements
const itemsPerPage = 10; // defines the number of list items to show per page


/*** 
   A showPage function that accepts the page number as its first parameter and the list to
   be paginated as its second. A loop hides all the list items that shouldn't be displayed.
***/

function showPage(page, list){
   let startIndex = (page * itemsPerPage)-itemsPerPage;
   let endIndex = page * itemsPerPage;
   for (let i = 0; i < list.length; i++) {
      list[i].style.display = 'block'; //shows those list items that have been handed to the function
      if(i < startIndex || i >= endIndex) {list[i].style.display = 'none'; } //hides all items that are on pages that should not currently be displayed
   }
}

showPage(1, listItems); //shows first page

/*** 
   A function to generate a pagination navigation. It creates a 
   list of clickable page numbers and shows which page is currently active.
***/

function appendPageLinks(list) {

//Creates the container div inside the page div
const container = document.createElement('div');
container.className = 'pagination';
const pageDiv = document.querySelector('.page');
pageDiv.appendChild(container);

//Creates the ul inside the container
const ul = document.createElement('ul');
container.appendChild(ul);

//Creates the li elements inside the ul
const numberOfPages = list.length / itemsPerPage;
for (i = 0; i < numberOfPages; i++){
   const li = document.createElement('li');
   ul.appendChild(li)
   const a = document.createElement('a');
   a.href = '#';
   a.textContent = i+1;
   li.appendChild(a); 
}

//Adds the active class name to the first pagination link
ul.firstElementChild.firstElementChild.className= 'active'

//When clicked the handler reassigns the 'active' class and calls show page
ul.addEventListener('click', (e)=>{if(e.target.tagName.toLowerCase() === 'a') {
   let pageNumber = e.target.textContent;
   let activeElements = document.getElementsByClassName('active');
   for (let j = 0; j < activeElements.length; j++) {activeElements[j].className = '';} 
   for (let i = 0; i < list.length; i++) {list[i].style.display = 'block';} //shows all listItems. Including the ones previously hidden.
   showPage(pageNumber, list) //hides the listItems that shouldn't be displayed
   e.target.className = 'active';
}});
}

appendPageLinks(listItems); //shows pagination menu for the first page

/*** 
   The following lines of code create a search field and a search button.
***/

//creates the searchDiv and adds 'student-search' class 
const searchDiv = document.createElement('div');
searchDiv.className = 'student-search'

//creates the input field, adds appropriate attributes and appends it to the searchDiv
const inputField = document.createElement('input');
inputField.type = 'text';
inputField.id = 'search-input';
inputField.placeholder = 'Search for students...';
searchDiv.appendChild(inputField);

//creates the button and appends it to the searchDiv
const searchButton = document.createElement('button');
searchButton.textContent = 'Search';

//selects the header and appends the div with the inputField
const header = document.getElementsByClassName('page-header')[0];
header.appendChild(searchDiv);
searchDiv.appendChild(searchButton);

/*** 
   A search function to search for contacts in the list.
***/

function performSearch(searchInput, list) {  

   //this part of the functions creates a list of search results
   let searchList = [];
   let inputLength = searchInput.value.length;
   for (let i = 0; i<list.length; i++){
         if(inputLength > 0 && list[i].textContent.toLowerCase().includes(searchInput.value.toLowerCase())){
            searchList.push(list[i]); //
         }
         else if (inputLength > 0 && list[i].textContent.toLowerCase().includes(searchInput.value.toLowerCase()) === false) {
            for (let i = 0; i < list.length; i++) {
               list[i].style.display = 'none';} //hides the list if there are no matches
         }
   } 
   
   //this part of the function displays the search results
   removePaginationLinks() //removes the pagination links that need to be refreshed
   if (inputLength === 0) {showPage(1, listItems); appendPageLinks(listItems)} //shows the start page if the input field is empty
   else if (searchList.length > 0) {
      for (let i = 0; i<list.length; i++){list[i].style.display = 'none';} //resets the list
      showPage(1, searchList);
      appendPageLinks(searchList);     //append appropriate menu
   }
}

//removes pagination menu
function removePaginationLinks() { 
let navParent = document.getElementsByClassName('pagination')[0];
const pageDiv = document.querySelector('.page');
if (navParent){      //checks if there is an item that can be remove
pageDiv.removeChild(navParent);}} 
   
//fires when the search button gets clicked
searchButton.addEventListener('click', (e) => {
   performSearch(inputField, listItems);
   e.preventDefault();
   console.log('button is functional!')});

//creates a live search effect
inputField.addEventListener('keyup', (e) => {
   performSearch(inputField, listItems);
   e.preventDefault()
   console.log('input is functional!');})