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
   list[i].style.display = 'block'; //resets the list
   if(i < startIndex || i >= endIndex) {list[i].style.display = 'none'; }  
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
appendPageLinks(listItems);

/*** 
   A search function to search for contacts in the list.
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



function performSearch(searchInput, list) {    
   let searchList = [];
   let inputLength = searchInput.value.length;
   for (let i = 0; i<list.length; i++){
         if (inputLength === 0) {
            showPage(1, list); 
            break;}
         else if(inputLength > 0 && list[i].textContent.toLowerCase().includes(searchInput.value.toLowerCase())){
            searchList.push(list[i]);
         }
   } 
   
   removePaginationLinks()

   if (inputLength === 0) {appendPageLinks(listItems)}
   else if (searchList.length > 0) {
      for (let i = 0; i<list.length; i++){list[i].style.display = 'none';} //resets the list
      showPage(1, searchList);
      appendPageLinks(searchList); //append appropriate menu
   }
}

function removePaginationLinks() { 
let navParent = document.getElementsByClassName('pagination')[0];
const pageDiv = document.querySelector('.page');
pageDiv.removeChild(navParent);} //removes pagination menu
   

searchButton.addEventListener('click', (e) => {
   performSearch(inputField, listItems);
   e.preventDefault();
   console.log('button is functional!')});

inputField.addEventListener('keyup', (e) => {
   performSearch(inputField, listItems);
   e.preventDefault()
   console.log('input is functional!');})