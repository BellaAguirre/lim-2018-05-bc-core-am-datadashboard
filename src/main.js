const sedeSelect = document.getElementById('sede');
const generacion = document.getElementById('generacion');
const tblBody = document.getElementById('container-user');
const stringSearch = document.getElementById('search');
const searchBtn = document.getElementById('btnsearch');
const selectOrderDirection = document.getElementById('orderDirection');
const selectOrderBy = document.getElementById('orderBy');
const ordenar = document.getElementById('ordenar')
const selectProgram = document.getElementById('programa');

var sectionContentStudents = document.getElementById("showing");

let options = {
  cohort: '',
  cohortData: {
    users: [],
    progress: {}
  },
  orderBy: '',
  orderDirection: '',
  search: '',

}
function pasarDatos(users, progress, cohortSelect) {
  options.cohort = cohortSelect[0];
  options.cohortData.users = users;
  options.cohortData.progress = progress;
  options.orderBy = orderBy.value;
  options.orderDirection = orderDirection.value;
  options.search = stringSearch.value;
  const data = processCohortData(options);
  dataTable(data)

  ordenar.addEventListener('click', function () {
    options.orderBy = selectOrderBy.value;
    options.orderDirection = selectOrderDirection.value;
    const userOrder = processCohortData(options);
    sectionContentStudents.innerHTML = '';
    dataTable(userOrder);

  })
  stringSearch.addEventListener('keyup', function () {
    options.search = stringSearch.value;
    const userfilter = processCohortData(options);
    sectionContentStudents.innerHTML = '';
    dataTable(userfilter);
  })
}
function getUsers() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `../data/cohorts/lim-2018-03-pre-core-pw/users.json`);
  xhr.onload = function () {
    const usersData = JSON.parse(event.currentTarget.responseText);
    const xhrCohorts = new XMLHttpRequest();
    xhrCohorts.open('GET', `../data/cohorts/lim-2018-03-pre-core-pw/progress.json`);
    xhrCohorts.onload = function () {
      const progress = JSON.parse(event.currentTarget.responseText);
       const users = [];
      usersData.map(user => {
        if (user.role === 'student') {
          users.push(user);
        }
      }) 
      addUser(users, progress)
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
function getCohorts(callback) {
  const xhrCohorts = new XMLHttpRequest();
  xhrCohorts.open('GET', `../data/cohorts.json`);
  xhrCohorts.onload = callback;
  xhrCohorts.onerror = handleError;
  xhrCohorts.send();
}
function addUser(users, progress) {
  getCohorts(() => {
    const dataCohorts = JSON.parse(event.target.responseText);
    const cohortSelect = [];
    for (cohort of dataCohorts) {
      if (cohort.id === generacion.value) {
        cohortSelect.push(cohort);
      }
    }
    pasarDatos(users, progress, cohortSelect);
  })

}

function dataTable(datos) {
  // datos.length = 10;
  for (let i = 0; i < datos.length; i++) {
    //creando div contenedores
    const newDivStudent = document.createElement('div');
    const newDivProgress = document.createElement('div');
    const newDivName = document.createElement('div');
    const divPrincipal = document.createElement('div');
    //creando atributos a los div
    newDivStudent.setAttribute('id','div-student');
    newDivStudent.setAttribute('class','div-content')
    newDivName.setAttribute('class','div-name');
    newDivProgress.setAttribute('class','div-progress');
    divPrincipal.setAttribute('class','col-md-4');

    //creando etiqueta p y li
    const etiquetaName = document.createElement('p');
    const newList = document.createElement('ul');
    const newElementListProgress = document.createElement('li');
    const newElementListReads = document.createElement('li');
    const newElementListExercises = document.createElement('li');
    const newElementListQuizzes = document.createElement('li');
    //creando contenido
    const newContentName = document.createTextNode(datos[i].name);
    const newContentPercentProgress = document.createTextNode('Progreso General: ' + datos[i].stats.percent + '%');
    const newContentPercentReads = document.createTextNode('% Lecturas: ' + datos[i].stats.reads.percent + '%'); 
    const newContentPercentExercises = document.createTextNode('% Ejercicios: ' + datos[i].stats.exercises.percent + '%');
    const newContentPercentQuizzes = document.createTextNode('% Quizzes: ' + datos[i].stats.quizzes.percent + '%');
    //añadiendo contenido a cada item de la lista
    newElementListProgress.appendChild(newContentPercentProgress);
    newElementListReads.appendChild(newContentPercentReads);
    newElementListExercises.appendChild(newContentPercentExercises);
    newElementListQuizzes.appendChild(newContentPercentQuizzes);
    //añadiendo items a la lista
    newList.appendChild(newElementListProgress);
    newList.appendChild(newElementListReads);
    newList.appendChild(newElementListExercises);
    newList.appendChild(newElementListQuizzes);
    //añadiendo lista a un div
    newDivProgress.appendChild(newList);

    etiquetaName.appendChild(newContentName); 
    newDivName.appendChild(etiquetaName);
    
    newDivStudent.appendChild(newDivName);
    newDivStudent.appendChild(newDivProgress);

    divPrincipal.appendChild(newDivStudent);
    sectionContentStudents.appendChild(divPrincipal);
    
    // document.body.insertBefore(newDiv, currentDiv);
    /* let tr = document.createElement('tr');
    let celdaName = document.createElement('td');
    let celdaProgressPercent = document.createElement('td');
    let celdaExercisesPercent = document.createElement('td');
    let celdaReadsPercent = document.createElement('td');
    let celdaQuizzesPercent = document.createElement('td');
    let textName = document.createTextNode(datos[i].name);
    const textProgress = document.createTextNode(datos[i].stats.percent + '%')
    let textExercises = document.createTextNode(datos[i].stats.exercises.percent + '%');
    const textReadsPercent = document.createTextNode(datos[i].stats.reads.percent + '%')
    const textQuizzesPercent = document.createTextNode(datos[i].stats.quizzes.percent + '%')
    celdaName.appendChild(textName);
    celdaProgressPercent.appendChild(textProgress);
    celdaExercisesPercent.appendChild(textExercises);
    celdaReadsPercent.appendChild(textReadsPercent);
    celdaQuizzesPercent.appendChild(textQuizzesPercent);
    tr.appendChild(celdaName);
    tr.appendChild(celdaProgressPercent);
    tr.appendChild(celdaExercisesPercent);
    tr.appendChild(celdaQuizzesPercent);
    tr.appendChild(celdaReadsPercent);
    tblBody.appendChild(tr); */
  }
}

/* function addCohorts() {
  const dataCohorts = JSON.parse(event.target.responseText);

  for (i in dataCohorts) {
    let option = document.createElement('option');
    option.setAttribute('value', dataCohorts[i].id)
    option.innerText += dataCohorts[i].id;
    generacion.appendChild(option);
  }
  generacion.addEventListener('change', function (e) {
    //console.log(generacion.value)
    if (generacion.value === 'lim-2018-03-pre-core-pw') {

      getUsers();
    } else {
      tblBody.innerHTML = 'no hay datos para mostrar';
      getUsers();
    }
  });
}
selectSede.addEventListener('click', function (e) {
  e.preventDefault();
  generacion.innerHTML = '';
  getCohorts(addCohorts);
}); */

function filterSelect() {
  getCohorts((e) => {
    const dataCohorts = JSON.parse(e.target.responseText);

    const filterItems = query => {
      return dataCohorts.filter(sede => {
        return sede.id.toLowerCase().indexOf(query.toLowerCase()) > -1
      });
    }


    sedeSelect.addEventListener('change', function (e) {
      e.preventDefault();
      let index = sedeSelect.value;
      const dataFilter = filterItems(index);      
      let s = query => {
        return dataFilter.filter(programa => {
          return programa.id.toLowerCase().indexOf(query.toLowerCase()) > -1
        });
      }
      
      selectProgram.addEventListener('change', function (e) {
      // generacion.innerHTML = ''
        document.innerHTML = generacion.value = '0'; // fijar opción de selección
        document.innerHTML = generacion.length = 1; // elimina la opción anterior seleccionada
        let valueProgram = selectProgram.value;

        let endFilter = s(valueProgram);
        console.log(endFilter);
        
        for (i in endFilter) {
          let option = document.createElement('option');
          option.setAttribute('value', endFilter[i].id)
          option.innerText = endFilter[i].id;
          generacion.appendChild(option);
        }
      });
      generacion.addEventListener('change', function (e) {
        if (generacion.value === 'lim-2018-03-pre-core-pw') {
          getUsers();
        } 
      });
    });
  });
}

filterSelect()