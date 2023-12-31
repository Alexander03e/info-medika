// Fetch data from the REST server
let my_choice1 = {doc_id:'', doc_date:'', doc_time:'', user_name:'', user_age:'', user_number:''}
fetch('https://rest.info-medika.ru:45678/GET_pl_exam_grp')
.then(response => response.json())
.then(data => {
  // Create the table dynamically
  
  const table = document.createElement('table');
  const secondTable = document.createElement('table');
  const thirdTable = document.createElement('table');
  document.body.appendChild(secondTable);
  // Create table body rows for each ID in the JSON data
  const tbody = document.createElement('tbody');
  data.forEach(item => {
    const row = document.createElement('p');
    row.classList.add('row-table1')
    // Create table cell for the ID property in the JSON data
    const idCell = document.createElement('td');
    idCell.style.display = 'none'; // Hide the ID cell
    idCell.appendChild(document.createTextNode(item.pl_ex_gr_id));

    // Create table cell for the name property in the JSON data
    const nameCell = document.createElement('p');

    // Create a button element
    const button = document.createElement('button');
    button.classList.add('button-table1')
    button.classList.add('nav-links')
    button.classList.add('nav-lines')
    button.classList.add('btn')
    button.classList.add('table__btn')
    button.innerText = item.name; // Set the button text to the name property
    // Add a click event listener to the button
    
    
    button.addEventListener('click', () => {
      // Get the ID from the hidden cell
      const id = item.pl_ex_gr_id;
      buttonsall = document.querySelectorAll('.button-table1')
      buttonsall.forEach(button => {
        button.classList.remove('-active')
      })
      button.classList.add('-active')
     
      console.log('s')
      
      // Make the AJAX request to the second REST server
      fetch('https://rest.info-medika.ru:45678/GET_pl_exam/?pl_ex_gr_id='+ id)
      .then(response => response.json())
      .then(secondData => {
        
        // Create the second table dynamically
        document.querySelector('.Registr_Table2').innerHTML=' ';
        document.querySelector('.Registr_Table3').innerHTML=' ';
        // Remove duplicate elements from the second data array
        const uniqueData = Array.from(new Set(secondData));
    
        // Create table body rows for each item in the unique data
        const secondTbody = document.createElement('tbody');
        const modifiedNames = []; // Array to store unique modified names
        uniqueData.forEach(secondItem => {
          
          const secondRow = document.createElement('p');
          secondRow.classList.add('row-table2')
          // Remove "первичный" and "повторный" from the name property
          const modifiedName = secondItem.name.replace(/первичный|повторный/g, '');
    
          
          // Check if modified name already exists in the array
          if (!modifiedNames.includes(modifiedName)) {
            modifiedNames.push(modifiedName); // Add modified name to the array
    
            // Create table cell for the modified name property
            const secondNameCell = document.createElement('p');
            
            const innerButton = document.createElement("button");
            innerButton.classList.add('button-table2')
            innerButton.classList.add('nav-links')
            innerButton.classList.add('nav-lines')
            innerButton.classList.add('btn')
            innerButton.classList.add('table__btn')
            innerButton.innerText = modifiedName;
            secondNameCell.appendChild(innerButton);
    
            // Append the cell to the row
            secondRow.appendChild(secondNameCell);

            
            
            let innerButtonsall = document.querySelectorAll('.button-table2')
            innerButton.addEventListener('click', function() {
              my_choice1.user_name = 'вот так записывать!!';
              localStorage.setItem('my_choice1', JSON.stringify(my_choice1))
              console.log(my_choice1)
              if (document.querySelector('.Registr_Table2').innerHTML!=' '){
              document.querySelector('.Registr_Table3').innerHTML = '<button class="nav-links nav-lines table__btn btn btn-fix">Первичный</button><button class="nav-links nav-lines table__btn btn">Повторный</button>'
              } else{
                document.querySelector('.Registr_Table3').innerHTML= ' '
              }
              
            });
            
            // Append the row to the second table body
            document.querySelector('.Registr_Table2').appendChild(secondRow);
            
                        
            
            
          }
        });
    
      
        
        // Append the second table to the document body
      })
      .catch(error => {
        console.error('Error:', error);
      })
    });

    // Append the button to the name cell
    nameCell.appendChild(button);

    // Append the cells to the row
    row.appendChild(idCell);
    row.appendChild(nameCell);

    // Append the row to the table body
    tbody.appendChild(row);
  });
  document.querySelector('.Registr_Table1').appendChild(tbody);

  // Append the table to the document body
  document.body.appendChild(table);

})


// Buttons.forEach (button => {
//   button.addEventListener('click', (e)=>{
//     selectedreception = false

//     Buttons.forEach (btn => btn.classList.remove ('--active'));
//     Button.classlist.add('--active')
//     document.querySelector('.style1241')
//     Checkselection()
//   })
// })
document.querySelector('calendar-next-btn').addEventListener('click', ()=>{
  localStorage.setItem('my_choice1', 'CHOICE')
})

.catch(error => {
  console.error('Error:', error);
});


