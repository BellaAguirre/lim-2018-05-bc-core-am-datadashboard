window.computeUsersStats = (users, progress, courses) => {
  //console.log(courses);

  const usersWithStats = users.map(user => {
    const percentProgress = () => {
      const percent = [];
      courses.map(course => {
        if (progress[user.id] && Object.keys(progress[user.id]).length > 0 && !Array.isArray(progress[user.id])) {
            percent.push(progress[user.id][course].percent);
        }
      });
      if (percent[0] === undefined) {
        return percent[0] = 0;
      } else {
        return percent[0];
      }
    }
    const exercisesTotal = () => {
      const total = [];
      courses.map(course => {
        if (progress[user.id] && progress[user.id].hasOwnProperty(course)) {
          Object.keys(progress[user.id][course].units).map(leccion => {
            Object.keys(progress[user.id][course].units[leccion].parts).map(lectura => {
              if (progress[user.id][course].units[leccion].parts[lectura].hasOwnProperty('exercises')) {
                total.push(Object.values(progress[user.id][course].units[leccion].parts[lectura].exercises).length);
              }
            })
          })
        }
      });
      if (total[0] === undefined) {
        return total[0] = 0;
      } else {
        return total[0];
      }
    }
    const exercisesCompleted = () => {
      const completed = [];
      const initial = 0;
      courses.map(course => {
        if (progress[user.id] && progress[user.id].hasOwnProperty(course)) {
          Object.keys(progress[user.id][course].units).map(leccion => {
            Object.keys(progress[user.id][course].units[leccion].parts).map(lectura => {
              if (progress[user.id][course].units[leccion].parts[lectura].hasOwnProperty('exercises')) {
                Object.keys(progress[user.id][course].units[leccion].parts[lectura].exercises).map(exercise => {
                  if (progress[user.id][course].units[leccion].parts[lectura].exercises[exercise].hasOwnProperty('completed')) {
                    completed.push(progress[user.id][course].units[leccion].parts[lectura].exercises[exercise].completed);
                  }
                });
              }
            });
          });
        }
      });
      return completed.reduce((a, b) => a + b, initial)
    }
    const percentExercises = () => {
      let percent = 0;
      if (exercisesTotal() === 0) {
        return percent = 0;
      } else {
        return percent = (exercisesCompleted() * 100) / exercisesTotal();
      }
    }
    const totalReads = () => {
      const total = [];
      courses.map(course => {
        if (progress[user.id] && progress[user.id].hasOwnProperty(course)) {
          Object.keys(progress[user.id][course].units).map(leccion => {
            Object.keys(progress[user.id][course].units[leccion].parts).map(lectura => {
              if (progress[user.id][course].units[leccion].parts[lectura].type === 'read') {
                total.push(progress[user.id][course].units[leccion].parts[lectura].type)
              }
            })
          })
        }
      });
      return total.length;
    }
    const completedReads = () => {
      const completed = [];
      const initial = 0;
      courses.map(course => {
        if (progress[user.id] && progress[user.id].hasOwnProperty(course)) {
          Object.keys(progress[user.id][course].units).map(leccion => {
            Object.keys(progress[user.id][course].units[leccion].parts).map(lectura => {
              if (progress[user.id][course].units[leccion].parts[lectura].type === 'read') {
                completed.push(progress[user.id][course].units[leccion].parts[lectura].completed)
              }
            })
          })
        }
      });
      return completed.reduce((a, b) => a + b, initial);
    }
    const percentReads = () => {
      let percent = 0;
      if (totalReads() === 0) {
        return percent = 0;
      } else {
        return percent = Math.round((completedReads() * 100) / totalReads());
      }
    }
    const totalQuizzes = () => {
      const total = [];
      courses.map(course => {
        if (progress[user.id] && progress[user.id].hasOwnProperty(course)) {
          Object.keys(progress[user.id][course].units).map(leccion => {
            Object.keys(progress[user.id][course].units[leccion].parts).map(lectura => {
              if (progress[user.id][course].units[leccion].parts[lectura].type === 'quiz') {
                total.push(progress[user.id][course].units[leccion].parts[lectura].type)
              }
            })
          })
        }
      });
      return total.length;
    }
    const completedQuizzes = () => {
      const completed = [];
      const initial = 0;
      courses.map(course => {
        if (progress[user.id] && progress[user.id].hasOwnProperty(course)) {
          Object.keys(progress[user.id][course].units).map(leccion => {
            Object.keys(progress[user.id][course].units[leccion].parts).map(lectura => {
              if (progress[user.id][course].units[leccion].parts[lectura].type === 'quiz') {
                completed.push(progress[user.id][course].units[leccion].parts[lectura].completed)
              }
            })
          })
        }
      });
      return completed.reduce((a, b) => a + b, initial);
    }
    const percentQuizzes = () => {
      let percent = 0;
      if (totalQuizzes() === 0) {
        return percent = 0;
      } else {
        return percent = Math.round((completedQuizzes() * 100) / totalQuizzes());
      }
    }
    const scoreSumQuizzes = () => {
      const scoreSum = [];
      const initial = 0;
      courses.map(course => {
        if (progress[user.id] && progress[user.id].hasOwnProperty(course)) {
          Object.keys(progress[user.id][course].units).map(leccion => {
            Object.keys(progress[user.id][course].units[leccion].parts).map(lectura => {
              if (progress[user.id][course].units[leccion].parts[lectura].type === 'quiz') {
                if (progress[user.id][course].units[leccion].parts[lectura].score !== undefined) {
                  scoreSum.push(progress[user.id][course].units[leccion].parts[lectura].score)
                }
              }
            })
          })
        }
      });
      return scoreSum.reduce((a, b) => a + b, initial);
    }
    const scoreAvgQuizzes = () => {
      if (completedQuizzes() === 0) {
        return 0;
      } else {
        return Math.round(scoreSumQuizzes() / completedQuizzes());
      }
    }
    const stats = {
    name: user.name,
    stats : {
      percent: percentProgress(),
      exercises: {
        total: exercisesTotal(),
        completed: exercisesCompleted(),
        percent: percentExercises(),
      },
      reads: {
        total: totalReads(),
        completed: completedReads(),
        percent: percentReads(),
      },
      quizzes: {
        total: totalQuizzes(),
        completed: completedQuizzes(),
        percent: percentQuizzes(),
        scoreSum: scoreSumQuizzes(),
        scoreAvg: scoreAvgQuizzes(),
      }
    }
  }
    // console.log(stats)
    return stats;
  });
  //console.log(usersWithStats)
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
    // console.log(orderByName)
    
    return orderByName;
  } else if (orderBy === 'name' & orderDirection === 'desc') {
    const orderByName = users.sort(function (a, b) {
      var x = a.name.toLowerCase();
      var y = b.name.toLowerCase();
      if (x > y) { return -1; }
      if (x < y) { return 1; }
      return 0;
    });
    return orderByName;
  } else if (orderBy === 'percent' & orderDirection === 'asc') {
    const order = orderByName.sort(function (a, b) { return a.stats.percent - b.stats.percent });
    return order;
  } else if (orderBy === 'percent' & orderDirection === 'desc') {
    const order = orderByName.sort(function (a, b) { return b.stats.percent - a.stats.percent });
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
  } else  {
    const order = users.sort(function (a, b) { return b.stats.reads.completed - a.stats.reads.completed });
    return order;
  }

}

window.filterUsers = (users, search) => {
  const userFilter = users.filter(user => {
    return user.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
  });
  return userFilter;
}
window.processCohortData = (options) => {  
  const courses = Object.keys(options.cohort.coursesIndex)
  let estudiantes = computeUsersStats(options.cohortData.users, options.cohortData.progress, courses);
  estudiantes = sortUsers(estudiantes, options.orderBy, options.orderDirection);
  if (options.search !== '') {
    estudiantes = filterUsers(estudiantes, options.search);
  }  
  return estudiantes;

}