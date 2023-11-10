
const date = new Date();
const requestURL = 'https://rest.info-medika.ru:45678/GET_pl_subj/?details=1'
const monthName = date.toLocaleString('default', {month: 'long'});
const curdate = document.getElementById('curdate')
const monthDay = date.getMonth()+1
curdate.innerHTML =  `${monthName.slice(0,1).toUpperCase()}${monthName.slice(1)}  2023`

const calendar = document.querySelector('.calendar')

let doctorsPrimary = document.querySelectorAll('.primary-reception')
async function getData(item){
    try {
        const response = await fetch(requestURL)
        const data = await response.json()
        console.log(data)
        let bool = false
        await data.forEach(el => {
            
            let arrName = item.closest('.content-item').firstElementChild.textContent.split(' ')
            let surName = arrName[0]
           
            let arrNameApi = el.pl_subj_name.split(' ')
            let surNameApi = arrNameApi[0]
           
            if (surName === surNameApi) {
                generateCalApi(el.details)
                bool = !bool
            }
            
            
        })
        if (bool == false ){
            document.querySelector('.calendar').textContent = 'Для этого врача пока нет расписания'
            document.querySelector('.calendar-days').classList.add('hidden')
            document.querySelector('.calendar__time').classList.add('hidden')
        }
        return data;
        
    }catch(e){
        console.log(e)
    }
}

function generateCalApi(details){
    clearField()
    document.querySelector('.calendar-days').classList.remove('hidden')
    document.querySelector('.calendar__time').classList.remove('hidden')
    
    for (let i=0; i<monthLength; i++){
        
        data.push({id:i, time:'Нет приема', isActive:true, isWorking: false, content:'Нет приема'})
        for (let j = 0; j<details.length; j++){
            let workDate = details[j].date.split('-')
            let workDay = workDate[2]
            console.log(monthDay)
            if (data[i].id == workDay && monthDay == workDate[1]){
                data[i].time = `${details[j].start_time}-${details[j].end_time}`
            }
            
        }
    }
    generateCal(data)
    console.log(data)
    
}
//получение имени
doctorsPrimary.forEach(item => item.addEventListener('click',()=>{
    let name = item.closest('.content-item').firstElementChild.textContent
    let surname = name.split(' ')
    let result = surname[0] + '.' + surname[1].slice(0,1) + '.'+surname[2].slice(0,1);
    document.getElementById('doc__name').innerHTML = `Доступные дни приема для  ${result} :`
    console.log(item.closest('.content-item').firstElementChild.textContent)

    
    getData(item)
    
    })
)

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

generateCal()
//генерация календаря
function generateCal(data){

const timeBlock = document.createElement('div')

for (let i=0; i<monthLength; i++){
    const calElement = document.createElement("button")
    const elementText = document.createTextNode(data[i].content)
    calElement.className = "calendar__item item variableDays"
    calElement.appendChild(elementText)
    calElement.innerHTML='<p class="item__data">'+ (i+1)+'.'+monthDay+'</p>'+'<p>' + data[i].time+'</p>'
    
    calendar.appendChild(calElement)
    
    if (data[i].isActive===false){
        calElement.lastChild.textContent='Нет приема'
        calElement.setAttribute('disabled', '')
        calElement.style.backgroundColor='#e7e7e7';
        calElement.style.borderColor='#e7e7e7'

    }
    if (data[i].time!=''){
        if (calElement.lastChild.textContent!='Нет приема'){
            calElement.firstChild.style.color ='var(--accent-color)'
            calElement.lastChild.style.color = 'var(--accent-color)'
            calElement.style.borderColor='var(--accent-color)'
            calElement.style.backgroundColor='#cde7b7';
        }
        else{
            calElement.setAttribute('disabled', '')
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

