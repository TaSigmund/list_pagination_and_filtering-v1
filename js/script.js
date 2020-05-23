/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

/*** 
   Global variables to hold the list of students & how many items should be displayed per page.
***/

const listItems = document.getElementsByClassName('student-list')[0].children; //selects a collection of list elements
const itemsPerPage = 10; // defines the number of list items to show per page

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
   Functions that get called on page load
***/

showPage(1, listItems); //shows first page
appendPageLinks(listItems); //shows pagination menu for the first page

/*** 
   A showPage function that accepts the page number as its first parameter and the list to
   be paginated as its second. A loop hides all the list items that should not be displayed.
***/

function showPage(page, list){
   const startIndex = (page * itemsPerPage)-itemsPerPage;
   const endIndex = page * itemsPerPage;
   for (let i = 0; i < list.length; i++) {
      list[i].style.display = 'block'; //shows those list items that have been handed to the function
      if(i < startIndex || i >= endIndex) {list[i].style.display = 'none'; } //hides all items that are on pages that should not currently be displayed
   }
}

/*** 
   A function to generate a pagination navigation. It creates a 
   list of clickable page numbers and shows which page is currently active.
***/

function appendPageLinks(list) {

   //Creates the container div inside the page div
   const container = document.createElement('div');
   container.className = 'pagination';
   const pageDiv = document.getElementsByClassName('page')[0];
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
   const pageNumber = e.target.textContent;
   const activeElements = document.getElementsByClassName('active');
   for (let j = 0; j < activeElements.length; j++) {activeElements[j].className = '';} 
   for (let i = 0; i < list.length; i++) {list[i].style.display = 'block';} //shows all listItems. Including the ones previously hidden.
   showPage(pageNumber, list) //selects the list items that should be displayed i.e. shows the new page
   e.target.className = 'active'; //reassigns the active class to the new page
   }});
}


/*** 
   A search function to search for contacts in the list. If no results are found a message is printed to the page.
***/

function performSearch(searchInput, list) {  

   //this part of the functions creates a list of search results
   let searchList = [];
   let counter = 0 //keeps track of how many items match the search request
   const h2 = document.getElementsByTagName('h2')[0];
   const inputLength = searchInput.value.length;
   for (let i = 0; i < list.length; i++){
         if(inputLength > 0 && list[i].textContent.toLowerCase().includes(searchInput.value.toLowerCase())){ //checks whether the search string exists in the list
            searchList.push(list[i]); //creates the list
            counter += 1;
         }
         else if (inputLength > 0 && list[i].textContent.toLowerCase().includes(searchInput.value.toLowerCase()) === false) {
            for (let i = 0; i < list.length; i++) {
               list[i].style.display = 'none';} //hides the list if there are no matches
         }
   } 

   //this part of the function prints a message to the screen if no list item matches the search request.
   if (counter === 0 && inputLength > 0) {h2.textContent = 'No results found'} //changes the h2 if there are no search results
   else {h2.textContent = 'Students'} //resets the h2 if there are search results
   
   //this part of the function displays the search results
   removePaginationLinks() //removes the pagination links that need to be refreshed
   if (inputLength === 0) {showPage(1, listItems); appendPageLinks(listItems)} //shows the start page if the input field is empty
   else if (searchList.length > 0) {
      for (let i = 0; i < list.length; i++){list[i].style.display = 'none';} //resets the list
      showPage(1, searchList);
      appendPageLinks(searchList); //appends appropriate navigation bar
   }
}

//removes pagination menu
function removePaginationLinks() { 
   const navParent = document.getElementsByClassName('pagination')[0];
   const pageDiv = document.getElementsByClassName('page')[0];
   if (navParent){pageDiv.removeChild(navParent);} //checks if there is an item that can be removed before it removes it
} 
   
//fires when the search button gets clicked
searchButton.addEventListener('click', (e) => {
   performSearch(inputField, listItems);
   e.preventDefault()});

//creates a live search effect
inputField.addEventListener('keyup', (e) => {
   performSearch(inputField, listItems);
   e.preventDefault()})