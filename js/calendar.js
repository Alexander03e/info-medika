
const date = new Date();
const requestURL = 'https://rest.info-medika.ru:45678/GET_pl_subj/?details=1'
const monthName = date.toLocaleString('default', {month: 'long'});
const curdate = document.getElementById('curdate')
const monthDay = date.getMonth()+1
let selectedDay = false;
let selectedTime = false;
curdate.innerHTML =  `${monthName.slice(0,1).toUpperCase()}${monthName.slice(1)}  2023`
const calendar = document.querySelector('.calendar')

const showLoader = () => {
    document.querySelectorAll('.docActivBtn').forEach(el=> el.style.pointerEvents = 'none')
    document.querySelector('.loader').classList.remove('hidden')
}
const hideLoader = () => {
    document.querySelectorAll('.docActivBtn').forEach(el=> el.style.pointerEvents = 'auto')
    document.querySelector('.loader').classList.add('hidden')
}
const hideCalendar = () => {
    document.querySelector('.calendar').innerHTML = ' '
}
const nextBtnOff = () => {
    document.getElementById('next').style.pointerEvents = 'none';
    document.getElementById('next').style.backgroundColor = '#CDE7B7';
}
// const selectDoctor = (item) => {
//     store.doctors.forEach(el => {
//         let arrName = item.closest('.content-item').firstElementChild.textContent.split(' ')
//         let surName = arrName[0]+' '+arrName[1]
//         let arrNameApi = el.name.split(' ')
    
//         let surNameApi = arrNameApi[0]+' '+arrNameApi[1]
//         nextBtnOff()
//         if (surName === surNameApi) {
//             console.log('true')
//             generateCalApi(el.details)        
//             bool = !bool
//             hideLoader()
//         }
//         console.log(false)
//     })
// }
////парсинг 
let store = {
    doctors:[]
}
let times = []
let i=0;

function getStateGrid(subj_id,item){
    return new Promise(async(resolve,reject)=>{
        try{
            const requestURL2 = `https://rest.info-medika.ru:45678/get_pl_subj_grid/?pl_subj_id=${subj_id}&d1=2023-09-10&d2=2030-12-20`
            const response_grid = await fetch(requestURL2)
            const data_grid = await response_grid.json()
            // times.push({id: subj_id, data:[]})
            store.doctors.push({id:item.pl_subj_id, name: item.pl_subj_name, details: item.details, times:[]})
            await data_grid.forEach((el) => {
                store.doctors[i].times.push(el)
            })
            resolve()
            i++
        }
        catch(e){
            console.log(e)
            reject(e)
        }
    })
}

async function getState(){
    try {
        const response = await fetch(requestURL)
        const data = await response.json()
        console.log(data)
        const promises = data.map(el=>{
            let subj_id = el.pl_subj_id
            return getStateGrid(subj_id,el)
        })
        showLoader()
        await Promise.all(promises)
        console.log(store)
    }catch(e){
        console.log(e)
    }
}


async function run(item){
    await getState()
    hideLoader()
    console.log(store)
}
run()


// fetch(requestURL2)
//     .then((response)=>{
//         return response.json()
//     })
//     .then((data) => console.log(data))


//проверка запроса на pl_subj_grid

let doctorsPrimary = document.querySelectorAll('.docActivBtn')
async function getData(item){
    try {
        hideCalendar()
        console.log(data)
        let bool = false
        store.doctors.forEach(el => {
            
            let arrName = item.closest('.content-item').firstElementChild.textContent.split(' ')
            let surName = arrName[0]+' '+arrName[1]
            let arrNameApi = el.name.split(' ')

            let surNameApi = arrNameApi[0]+' '+arrNameApi[1]
            nextBtnOff()
            if (surName === surNameApi) {
                generateCalApi(el.details, el.times)
                bool = !bool
            }
            
            hideLoader()
        })
        if (bool == false ){
            document.querySelector('.calendar').textContent = 'Для этого врача пока нет расписания'
            document.querySelector('.calendar-days').classList.add('hidden')
            document.querySelector('.calendar__time').classList.add('hidden')
        }
        return data;
        
    }catch(e){
        console.log(e)
        document.querySelector('.calendar').textContent = 'Ошибка при загрузке данных'
    }
}

function generateCalApi(details, times){

    clearField()
    document.querySelector('.calendar-days').classList.remove('hidden')
    document.querySelector('.calendar__time').classList.remove('hidden')
    
    for (let i=0; i<monthLength; i++){
        
        // data.push({id:i, time:'Нет приема', isActive:true, isWorking: false, content:'Нет приема', docTime: [] })
        for (let j = 0; j<details.length; j++){
            let workDate = details[j].date.split('-')
            let workDay = workDate[2]
            let wokrTime = []
            if (data[i].id == workDay && monthDay == workDate[1]){
                data[i-1].time = `${details[j].start_time}-${details[j].end_time}`
                for(let time of times){
                
                    if (time.date == details[j].date){
                        data[i-1].docTime.push({start: time.time_start, end: time.time_end})
                    }
                }
            }
            
        }
    }
    generateCal(data)
    console.log(data)
}
//выбор доктора
doctorsPrimary.forEach(item => item.addEventListener('click',()=>{
    let name = item.closest('.content-item').firstElementChild.textContent
    let surname = name.split(' ')
    let result = surname[0] + '.' + surname[1].slice(0,1) + '.'+surname[2].slice(0,1);
    document.getElementById('doc__name').innerHTML = `Доступные дни приема для  ${result} :`
    console.log(item.closest('.content-item').firstElementChild.textContent)
    document.querySelector('.calendar__time').innerHTML = ' '
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
let data = []

//очищает массив с данными
function clearField(){
    data = []
    for (let i=0; i<monthLength; i+=1){
        data.push({id:i, time:'Нет приема', isActive:true, isWorking: false, content:'Нет приема', docTime: []})
    }
    let container = document.querySelector(".calendar");
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

}
const timeEl = document.querySelector('.hide')


//генерация календаря
const generateCal = (data) =>{
const timeBlock = document.createElement('div')
selectedDay = false;
selectedTime = false;
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

dayButtons.forEach(button => {
    button.addEventListener('click', (e) => {
    let id = e.currentTarget.textContent.split('.')[0]
    selectedTime = false
    dayButtons.forEach(btn => btn.classList.remove('-active'));
    button.classList.add('-active');
    document.querySelector('.calendar__time').innerHTML = ' '
    console.log(data[id-1].docTime)
    for (let timeItem of (data[id-1].docTime)){
        document.querySelector('.calendar__time').innerHTML += `<button class="variable">${timeItem.start}-${timeItem.end}</p>`
    }   
    const buttons = document.querySelectorAll('.variable');

    buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        buttons.forEach(btn => btn.classList.remove('-active'));
        button.classList.add('-active');
        
        selectedTime = true;
        checkSelection()
    });
    });
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

// проверка на выбор
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

