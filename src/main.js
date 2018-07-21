const sedeSelect = document.getElementById('sede');
const generationSelect = document.getElementById('generacion');
const selectProgram = document.getElementById('programa');
const stringSearch = document.getElementById('search');
const selectOrderDirection = document.getElementById('order-direction');
const selectOrderBy = document.getElementById('order-by');
const ordenar = document.getElementById('ordenar');
const infoData = document.getElementById('info');

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

function filterSelect() {
  getCohorts((e) => {
    const dataCohorts = JSON.parse(e.target.responseText);

    const filterItems = query => {
      return dataCohorts.filter(sede => {
        return sede.id.toLowerCase().indexOf(query.toLowerCase()) > -1
      });
    }

    sedeSelect.addEventListener('click', function (e) {
      e.preventDefault();

      let index = e.target.id;
      const dataFilter = filterItems(index);

      let s = query => {
        return dataFilter.filter(programa => {
          return programa.id.toLowerCase().indexOf(query.toLowerCase()) > -1
        });
      }

      program.addEventListener('change', function (e) {
        e.preventDefault();

        let valueProgram = e.target.value;
        let endFilter = s(valueProgram);

        for (i in endFilter) {
          let option = document.createElement('option');
          option.setAttribute('value', endFilter[i].id)
          option.innerText += endFilter[i].id;
          generacion.appendChild(option);
        }
      });
    });
  });
}

function addUser(users, progress) {
  getCohorts(() => {
    const dataCohorts = JSON.parse(event.target.responseText);
    const cohortSelect = [];
    for (cohort of dataCohorts) {
      if (cohort.id === generationSelect.value) {
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
  }
}
function filterSelect() {
  getCohorts((e) => {
    const dataCohorts = JSON.parse(e.target.responseText);

    const filterItems = query => {
      return dataCohorts.filter(sede => {
        return sede.id.toLowerCase().indexOf(query.toLowerCase()) > -1;
      });
    }


    sedeSelect.addEventListener('change', function (e) {
      e.preventDefault();
      let index = sedeSelect.value;
      const dataFilter = filterItems(index);
      let filterSede = query => {
        return dataFilter.filter(programa => {
          return programa.id.toLowerCase().indexOf(query.toLowerCase()) > -1;
        });
      }

      selectProgram.addEventListener('change', function (e) {
        // generacion.innerHTML = ''
        document.innerHTML = generationSelect.value = '0'; // fijar opción de selección
        document.innerHTML = generationSelect.length = 1; // elimina la opción anterior seleccionada
        let valueProgram = selectProgram.value;
        let endFilter = filterSede(valueProgram);
        for (i in endFilter) {
          let option = document.createElement('option');
          option.setAttribute('value', endFilter[i].id)
          option.innerText = endFilter[i].id;
          generationSelect.appendChild(option);
        }
      });
      generationSelect.addEventListener('change', function (e) {
        if (generationSelect.value === 'lim-2018-03-pre-core-pw') {
          infoData.innerHTML = '   Cohort: ' + generationSelect.value;
          getUsers();
        } else {
          sectionContentStudents.innerHTML = '';
        }
      });
    });
  });
}

filterSelect()
getCohorts()