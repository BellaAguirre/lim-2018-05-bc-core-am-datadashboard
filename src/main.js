const li = document.getElementById('lima');
const generacion = document.getElementById('generacion');
const table = document.getElementById('container-user');
function getUsers() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `../data/cohorts/lim-2018-03-pre-core-pw/users.json`);
  xhr.onload = function () {
    const users = JSON.parse(event.currentTarget.responseText);
    const xhrCohorts = new XMLHttpRequest();
    xhrCohorts.open('GET', `../data/cohorts/lim-2018-03-pre-core-pw/progress.json`);
    xhrCohorts.onload = function () {
      const progress = JSON.parse(event.currentTarget.responseText);
      computeUsersStats(users, progress);
      addUser(users)
    }
    xhrCohorts.onerror = handleError;
    xhrCohorts.send();
  };
  xhr.onerror = handleError;
  xhr.send();
}
function handleError() {
  console.log('se ha presentado un error');
}
//obteniendo data cohorts
function getCohorts() {
  const xhrCohorts = new XMLHttpRequest();
  xhrCohorts.open('GET', `../data/cohorts.json`);
  xhrCohorts.onload = addCohorts;
  xhrCohorts.onerror = handleError;
  xhrCohorts.send();
}
function addUser(users) {
  for (let i = 0; i < users.length; i++) {
    let tr = document.createElement('tr');
    tr.innerText += users[i].name;
    table.appendChild(tr);
  }
}

function addCohorts() {
  const dataCohorts = JSON.parse(event.target.responseText);
  /*  query = li.value;
   console.log(query)
   let filterse =  query =>{
 return dataCohorts.filter(sede => sede.id.toLowerCase().indexOf(query.toLowerCase()) > -1);
}
console.log(filterse(query)) */

  for (i in dataCohorts) {
    let option = document.createElement('option');
    option.setAttribute('value', dataCohorts[i].id)
    option.innerText += dataCohorts[i].id;
    generacion.appendChild(option);
  }
  generacion.addEventListener('change', function (e) {
    if (generacion.value === 'lim-2018-03-pre-core-pw') {
      table.innerHTML = '';
      getUsers();
    } else {
      table.innerHTML = 'no hay datos para mostrar';
    }
  });
}

li.addEventListener('click', function (e) {
  e.preventDefault();
  generacion.innerHTML = '';
  getCohorts();
});