
//текущий месяц
const date = new Date();
const monthName = date.toLocaleString('default', {month: 'long'});
const curdate = document.getElementById('curdate')

curdate.innerHTML =  `${monthName.slice(0,1).toUpperCase()}${monthName.slice(1)}  2023`

const calendar = document.querySelector('.calendar')

let doctorsPrimary = document.querySelectorAll('.primary-reception')

doctorsPrimary.forEach(item => item.addEventListener('click',()=>{
    let name = item.closest('.content-item').firstElementChild.textContent
    let surname = name.split(' ')
    let result = surname[0] + '.' + surname[1].slice(0,1) + '.'+surname[2].slice(0,1);
    document.getElementById('doc__name').innerHTML = `Доступные дни приема для  ${result} :`
    forDoc2()
    console.log(item.closest('.content-item').firstElementChild.textContent)}
    ))//получение имени

//колво дней в каждом месяце чтобы календарь сам обновлялся
switch(monthName){
    case 'сентябрь':monthLength = 30;
    break;
    case 'октябрь':monthLength = 31;
    break;
    case 'ноябрь':monthLength = 30;
    break;
    case 'декабрь':monthLength = 31;
    break;
    case 'январь':monthLength = 31;
    break;
    case 'февраль':monthLength = 28;
    break;
    case 'март':monthLength = 31;
    break;
    case 'апрель':monthLength = 31;
    break;
    case 'май':monthLength = 31;
    break;
    case 'июнь':monthLength = 31;
    break;
    case 'июль':monthLength = 31;
    break;
    case 'август':monthLength = 31;
    break;
    default: console.log('false')
}
console.log(monthLength)
let data = []
for (let i=0; i<monthLength; i+=1){
    data.push({id:i, time:'', isActive:true, isWorking: false, content:'Нет приема'})
}
function clearField(){
    data = []
    for (let i=0; i<monthLength; i+=1){
        data.push({id:i, time:'Нет приема', isActive:true, isWorking: false, content:'Нет приема'})
    }
    let container = document.querySelector(".calendar");
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

}
const timeEl = document.querySelector('.hide')

function forDoc1(){
    clearField()
    
    //добавлять данные для 1 доктора
    data[2]={
        isWorking:false,
        time: '8:00-19:00'
    }
    data[3]={
        isWorking:true,
        time:'8:00-19:00'
    }
    data[13]={
        isActive:false
    }

    //----xhr запросы
    let requestURL = 'https://rest.info-medika.ru:45678/GET_pl_exam'
    let xhr = new XMLHttpRequest()
    xhr.open('GET', requestURL)
    xhr.send()

    xhr.onload = () => {
        console.log(xhr.response)
    }
    //----
    generateCal()
    timeEl.classList.add('visible')
    
   
}
function forDoc2(){
    clearField()
    
    //добавлять данные для 2 доктора
    data[5]={
        isWorking:true,
        time:'19:00-20:00',
    }
    data[6]={
        isActive:false
    }
    generateCal()
    
}
console.log(data)

const doc1 = document.getElementById('doc1');
const doc2 = document.getElementById('doc2');

forDoc1() //начальная генерация календаря
//потом раскомментировать 
doc1.addEventListener('click', function(){
    forDoc1()
    console.log(data[2].content)
})
doc2.addEventListener('click', function(){
    forDoc2()
})



//генерация календаря
function generateCal(){

const timeBlock = document.createElement('div')

for (let i=0; i<monthLength; i++){
    const calElement = document.createElement("button")
    const elementText = document.createTextNode(data[i].content)
    calElement.className = "calendar__item item variableDays"
    calElement.appendChild(elementText)
    calElement.innerHTML='<p class="item__data">'+ (i+1)+'.'+date.getMonth()+'</p>'+'<p>' + data[i].time+'</p>'
    
    calendar.appendChild(calElement)
    
    if (data[i].isActive===false){
        calElement.lastChild.textContent='Нет приема'
        calElement.setAttribute('disabled', '')
        calElement.style.backgroundColor='#e7e7e7';
        calElement.style.borderColor='#e7e7e7'

    }
    if (data[i].time!=''){
        if (calElement.lastChild.textContent!='Нет приема'){
            calElement.setAttribute('disabled', '')
            calElement.firstChild.style.color ='var(--accent-color)'
            calElement.lastChild.style.color = 'var(--accent-color)'
            calElement.style.borderColor='var(--accent-color)'
            calElement.style.backgroundColor='#cde7b7';
        }
    }
    
   
}

const dayButtons = document.querySelectorAll('.variableDays');
let selectedDay = false;
let selectedTime = false;
dayButtons.forEach(button => {

    
    button.addEventListener('click', (e) => {

    console.log(e.target.textContent)

    dayButtons.forEach(btn => btn.classList.remove('-active'));
    button.classList.add('-active');
    checkSelection()
  });
});

const buttons = document.querySelectorAll('.variable');

buttons.forEach(button => {
  button.addEventListener('click', (e) => {
    buttons.forEach(btn => btn.classList.remove('-active'));
    button.classList.add('-active');
    selectedTime = true;
    checkSelection()
  });
});

const checkSelection = () => {
    for (let i = 0 ; i<dayButtons.length; i++){
        if(dayButtons[i].classList.contains('-active')){
            selectedDay = true;     
          
        }
    }
    if (selectedDay && selectedTime){
        document.getElementById('next').style.pointerEvents = 'auto';
        document.getElementById('next').style.backgroundColor = 'var(--accent-color)'
        document.getElementById('next').style.color='white'
    }
}


}

