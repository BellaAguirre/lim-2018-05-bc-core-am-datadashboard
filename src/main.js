const sedeSelect = document.getElementById('sede');
const generationSelect = document.getElementById('generation');
const selectProgram = document.getElementById('program');
const stringSearch = document.getElementById('search');
const selectOrderDirection = document.getElementById('order-direction');
const selectOrderBy = document.getElementById('order-by');
const btnOrder = document.getElementById('order');
const sectionContentStudents = document.getElementById("showing");

let options = {
  cohort: '',
  cohortData: {
    users: [],
    progress: {}
  },
  orderBy: 'name',
  orderDirection: 'asc',
  search: '',

}

const handleError = () => {
  throw 'se ha presentado un error';
}
//obteniendo users y progress
const getUsers = () => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `../data/cohorts/lim-2018-03-pre-core-pw/users.json`);
  xhr.onload = function () {
    let usersData = JSON.parse(event.currentTarget.responseText);
    const xhrCohorts = new XMLHttpRequest();
    xhrCohorts.open('GET', `../data/cohorts/lim-2018-03-pre-core-pw/progress.json`);
    xhrCohorts.onload = function () {
      const progress = JSON.parse(event.currentTarget.responseText);
      const users = usersData.filter(user => user.role === 'student');
      options.cohortData.users = users;
      options.cohortData.progress = progress;
    }
    xhrCohorts.onerror = handleError;
    xhrCohorts.send();
  };
  xhr.onerror = handleError;
  xhr.send();
}

//obteniendo data cohorts
const getCohorts = () => {
  const xhrCohorts = new XMLHttpRequest();
  xhrCohorts.open('GET', `../data/cohorts.json`);
  xhrCohorts.onload = () => {
    const dataCohorts = JSON.parse(event.target.responseText);
    options.cohorts = dataCohorts;
   
  };
  xhrCohorts.onerror = handleError;
  xhrCohorts.send();
}

const dataTable = (datos) => {
  // datos.length = 10;
  // let contentDiv = '';
  for (let i in datos) {
  // contentDiv +=
  // `<div class="col-md-4">
  //     <div class="div-student">
  //       <div class="div-name">
  //         <p>${datos[i].name}</p>
  //       </div>
  //       <div class="div-progress">
  //         <ul>
  //           <li>${'Progreso General: ' + datos[i].stats.percent + '%'}</li>
  //           <li>${'% Lecturas: ' + datos[i].stats.reads.percent + '%'}</li>
  //           <li>${'% Ejercicios: ' + datos[i].stats.exercises.percent + '%'}</li>
  //           <li>${'% Quizzes: ' + datos[i].stats.quizzes.percent + '%'}</li>
  //         </ul>
  //       </div>
  //     </div>
  //   </div>`;
  //   sectionContentStudents.innerHTML = contentDiv;
    //creando div contenedores
    const newDivStudent = document.createElement('div');
    const newDivProgress = document.createElement('div');
    const newDivName = document.createElement('div');
    const divPrincipal = document.createElement('div');
    //creando atributos a los div
    newDivStudent.setAttribute('class','div-student');
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
//ordenando estudiantes
btnOrder.addEventListener('click', () => {
  options.orderBy = selectOrderBy.value;
  options.orderDirection = selectOrderDirection.value;
  const userOrder = processCohortData(options);
  sectionContentStudents.innerHTML = '';
  dataTable(userOrder);

});
//buscando estudiante
stringSearch.addEventListener('keyup', () => {
  options.search = stringSearch.value;
  const userfilter = processCohortData(options);
  sectionContentStudents.innerHTML = '';
  dataTable(userfilter);
});
getCohorts();
getUsers();
//filtrando cohorts por sede
const filterItems = query => {
  return options.cohorts.filter(sede => {
    return sede.id.toLowerCase().indexOf(query.toLowerCase()) > -1;
  });
}
//filtrando por programa 
sedeSelect.addEventListener('change', function (e) {
  e.preventDefault();
  let index = sedeSelect.value;
  const dataFilter = filterItems(index);
  let filterSede = query => {
    return dataFilter.filter(programa => {
      return programa.id.toLowerCase().indexOf(query.toLowerCase()) > -1;
    });
    
  }
  //filtrando por cohort por programa
  selectProgram.addEventListener('change', function (e) {
      //generationSelect.innerHTML = ''
    document.innerHTML = generationSelect.value = '0'; // fijar opción de selección
    document.innerHTML = generationSelect.length = 1; // elimina la opción anterior seleccionada
    let valueProgram = selectProgram.value;
    let endFilter = filterSede(valueProgram);
    for (const i in endFilter) {
      let option = document.createElement('option');
      option.setAttribute('value', endFilter[i].id)
      option.innerText = endFilter[i].id;
      generationSelect.appendChild(option);
    }
  });
  //mostrando data de cohort seleccionado
  generationSelect.addEventListener('change', function (e) {
      for (const cohort of options.cohorts) {
        if (cohort.id === generationSelect.value) {
          options.cohort = cohort;
        }
      }
      const data = processCohortData(options);
      dataTable(data)
  });
});