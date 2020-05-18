/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

let listItems = document.querySelectorAll('.student-list')[0].children; //selects a collection of list elements
let itemsPerPage = 10; // defines the number of list items to show per page


/*** 
   A showPage function that accepts the page number as its first parameter and the list to
   be paginated as its second. A loop hides all the list items that shouldn't be displayed.
***/

function showPage(page, list){
   let startIndex = (page * itemsPerPage)-itemsPerPage;
   let endIndex = page * itemsPerPage
for (let i = 0; i < listItems.length; i++) {
   if(i < startIndex || i >= endIndex) {listItems[i].style.display = 'none'; }  
   }
}
showPage(1, listItems); //shows first page


/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/
function appendPageLinks() {

//Creates the container div inside the page div
const container = document.createElement('div');
container.className = 'pagination';
const pageDiv = document.querySelector('.page');
pageDiv.appendChild(container);

//Creates the ul inside the container
const ul = document.createElement('ul');
container.appendChild(ul);

//Creates the li elements inside the ul
let numberOfPages = listItems.length / itemsPerPage;
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
   for (let i = 0; i < listItems.length; i++) {listItems[i].style.display = 'block';} //shows all listItems. Including the ones previously hidden.
   showPage(pageNumber, listItems) //hides the listItems that shouldn't be displayed
   e.target.className = 'active';
}});
}
appendPageLinks();

// Remember to delete the comments that came with this file, and replace them with your own code comments.