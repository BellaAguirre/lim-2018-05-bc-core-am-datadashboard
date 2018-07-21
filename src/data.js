window.computeUsersStats = (users, progress, courses) => {
  const usersWithStats = users.map(user => {
    let percent = 0;
    let exercisesTotal = 0;
    let exercisesCompleted = 0;
    let totalReads = 0;
    let completedReads = 0;
    let totalQuizzes = 0;
    let completedQuizzes = 0;
    let scoreSumQuizzes = 0;
    let scoreAvgQuizzes = 0;
    let percentExercises = 0;
    let percentReads = 0;
    let percentQuizzes = 0;
    
    courses.map(course => {
      if (progress[user.id].hasOwnProperty(course)) {
          percent += Math.round(progress[user.id][course].percent / courses.length);
          Object.keys(progress[user.id][course].units).map(unit => {
            Object.values(progress[user.id][course].units[unit].parts).map(part => {
              if (part.type === 'practice') {
                  if (part.hasOwnProperty('exercises')) {
                    const exercises = Object.values(part.exercises);
                    exercisesTotal = exercises.length;
                    exercises.map(exercise => {
                      if (exercise.hasOwnProperty('completed')) {
                        exercisesCompleted += exercise.completed;
                      }
                    });
                  }
              }
              if (part.type === 'read') {
                totalReads++;
                completedReads += part.completed;
              }
              if (part.type === 'quiz') {
                totalQuizzes++;
                completedQuizzes += part.completed;
                if (part.score !== undefined) {
                  scoreSumQuizzes += part.score;
                }
              }
            });
          });     
      }
    });
    exercisesTotal !== 0 ? percentExercises = Math.round((exercisesCompleted * 100 ) / exercisesTotal) : 0;
    totalReads !== 0 ? percentReads = Math.round((completedReads * 100) / totalReads) : 0;
    totalQuizzes !== 0 ? percentQuizzes = Math.round((completedQuizzes * 100) / totalQuizzes) : 0;
    completedQuizzes !== 0 ? scoreAvgQuizzes = Math.round(scoreSumQuizzes / completedQuizzes) : 0;
      
    const stats = {
    name: user.name,  
    stats: {
      percent: percent,
      exercises: {
        total: exercisesTotal,
        completed: exercisesCompleted,
        percent: percentExercises,
      },
      reads: {
        total: totalReads,
        completed: completedReads,
        percent: percentReads,
      },
      quizzes: {
        total: totalQuizzes,
        completed: completedQuizzes,
        percent: percentQuizzes,
        scoreSum: scoreSumQuizzes,
        scoreAvg: scoreAvgQuizzes,
      }
    }
  }
    return stats;
  });
  return usersWithStats;
}
window.sortUsers = (users, orderBy, orderDirection) => {
  const orderByName = users.sort(function (a, b) {
    var x = a.name.toLowerCase();
    var y = b.name.toLowerCase();
    if (x < y) { return -1; }
    if (x > y) { return 1; }
    return 0;
  });
  if (orderBy === 'name' & orderDirection === 'asc') {
    return orderByName;
  } else if (orderBy === 'name' & orderDirection === 'desc') {
    return orderByName.reverse();
  } else if (orderBy === 'percent' & orderDirection === 'asc') {
    const order = users.sort(function (a, b) { return a.stats.percent - b.stats.percent });
    return order;
  } else if (orderBy === 'percent' & orderDirection === 'desc') {
    const order = users.sort(function (a, b) { return b.stats.percent - a.stats.percent });
    return order;
  } else if (orderBy === 'exercises' & orderDirection === 'asc') {
    const order = users.sort(function (a, b) { return a.stats.exercises.completed - b.stats.exercises.completed });
    return order;
  } else if (orderBy === 'exercises' & orderDirection === 'desc') {
    const order = users.sort(function (a, b) { return b.stats.exercises.completed - a.stats.exercises.completed });
    return order;
  } else if (orderBy === 'quizzes' & orderDirection === 'asc') {
    const order = users.sort(function (a, b) { return a.stats.quizzes.completed - b.stats.quizzes.completed });
    return order;
  } else if (orderBy === 'quizzes' & orderDirection === 'desc') {
    const order = users.sort(function (a, b) { return b.stats.quizzes.completed - a.stats.quizzes.completed });
    return order;
  } else if (orderBy === 'quizzesAvg' & orderDirection === 'asc') {
    const order = users.sort(function (a, b) { return a.stats.quizzes.scoreAvg - b.stats.quizzes.scoreAvg });
    return order;
  } else if (orderBy === 'quizzesAvg' & orderDirection === 'desc') {
    const order = users.sort(function (a, b) { return b.stats.quizzes.scoreAvg - a.stats.quizzes.scoreAvg });
    return order;
  } else if (orderBy === 'reads' & orderDirection === 'asc') {
    const order = users.sort(function (a, b) { return a.stats.reads.completed - b.stats.reads.completed });
    return order;
  } else {
    const order = users.sort(function (a, b) { return b.stats.reads.completed - a.stats.reads.completed });
    return order;
  }
}

window.filterUsers = (users, search) => users.filter(user => user.name.toLowerCase().indexOf(search.toLowerCase()) > -1);

window.processCohortData = (options) => {
  const courses = Object.keys(options.cohort.coursesIndex)
  let estudiantes = computeUsersStats(options.cohortData.users, options.cohortData.progress, courses);
  estudiantes = sortUsers(estudiantes, options.orderBy, options.orderDirection);
  if (options.search !== '') {
    estudiantes = filterUsers(estudiantes, options.search);
  }
  return estudiantes;
}
