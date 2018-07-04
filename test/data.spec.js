describe('data', () => {

  it('debería exponer función computeUsersStats en objeto global', () => {
    assert.isFunction(computeUsersStats);
  });

  it('debería exponer función sortUsers en objeto global', () => {
    assert.isFunction(sortUsers);
  });

  it('debería exponer función filterUsers en objeto global', () => {
    assert.isFunction(filterUsers);
  });

  it('debería exponer función processCohortData en objeto global', () => {
    assert.isFunction(processCohortData);
  });

  describe('computeUsersStats(users, progress, courses)', () => {

    const cohort = fixtures.cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw');
    const courses = Object.keys(cohort.coursesIndex);
    const { users, progress } = fixtures;

    it('debería retornar arreglo de usuarios con propiedad stats', () => {
      const processed = computeUsersStats(users, progress, courses);
      assert.equal(users.length, processed.length);

      processed.forEach(user => {
        assert.ok(user.hasOwnProperty('stats'));
        assert.isNumber(user.stats.percent);
        assert.isObject(user.stats.exercises);
        assert.isObject(user.stats.quizzes);
        assert.isObject(user.stats.reads);
      });
    });

    describe('user.stats para el primer usuario en data de prueba - ver carpeta data/', () => {

      const processed = computeUsersStats(users, progress, courses);

      it(
        'debería tener propiedad percent con valor 53',
        () => assert.equal(processed[0].stats.percent, 53)
      );

      it('debería tener propiedad exercises con valor {total: 2, completed: 0, percent: 0}', () => {
        assert.deepEqual(processed[0].stats.exercises, {
          total: 2,
          completed: 0,
          percent: 0,
        });
      });

      it('debería tener propiedad quizzes con valor {total: 3, completed: 2, percent: 67, scoreSum: 57, scoreAvg: 29}', () => {
        assert.deepEqual(processed[0].stats.quizzes, {
          total: 3,
          completed: 2,
          percent: 67,
          scoreSum: 57,
          scoreAvg: 29,
        });
      });

      it('debería tener propiedad reads con valor {total: 11, completed: 6, percent: 55}', () => {
        assert.deepEqual(processed[0].stats.reads, {
          total: 11,
          completed: 6,
          percent: 55,
        });
      });

    });

  });

  describe('sortUsers(users, orderBy, orderDirection)', () => {
    const cohort = fixtures.cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw');
    const courses = Object.keys(cohort.coursesIndex);
    const { users, progress } = fixtures;
    const arrLengthCheck =  users.filter(u => u.role === 'student');
assert.isOk(arrLengthCheck)
    const processed = computeUsersStats(arrLengthCheck, progress, courses);
    
    it('debería retornar arreglo de usuarios ordenado por nombre ASC', () => {
      const nuevo = sortUsers(processed, 'name', 'asc');
      assert.deepEqual(nuevo[0],{
        name: 'adriana vizcarra paitán',
        stats: {
          exercises:{total: 2, completed: 2, percent: 100},
          percent:100,
          quizzes:{total: 3, completed: 3, percent: 100, scoreSum: 237, scoreAvg: 79},
          reads:{total: 11, completed: 11, percent: 100}
        }
      });
      assert.deepEqual(nuevo[726],{
        name: 'Zurisadai Rosas Aramburú',
        stats:{
          exercises:{total: 2, completed: 2, percent: 100},
          percent:100,
          quizzes:{total: 3, completed: 3, percent: 100, scoreSum: 242, scoreAvg: 81},
          reads:{total: 11, completed: 11, percent: 100},
        }
      });
    });

    it('debería retornar arreglo de usuarios ordenado por nombre DESC', () => {
      assert.deepEqual(sortUsers(processed, 'name', 'desc')[0],{
        name: 'Zurisadai Rosas Aramburú',
        stats:{
          exercises:{total: 2, completed: 2, percent: 100},
          percent:100,
          quizzes:{total: 3, completed: 3, percent: 100, scoreSum: 242, scoreAvg: 81},
          reads:{total: 11, completed: 11, percent: 100},
        }
      });
      assert.deepEqual(sortUsers(processed, 'name', 'desc')[726],{
        name: 'adriana vizcarra paitán',
        stats: {
          exercises:{total: 2, completed: 2, percent: 100},
          percent:100,
          quizzes:{total: 3, completed: 3, percent: 100, scoreSum: 237, scoreAvg: 79},
          reads:{total: 11, completed: 11, percent: 100}
        }
      });
    });

    it('debería retornar arreglo de usuarios ordenado por porcentaje general ASC', () => {
      assert.deepEqual(sortUsers(processed, 'percent', 'asc')[0],
        {
          name:'Mitsy Patricia Quin Ramírez',
          stats:{
            exercises:{total: 0, completed: 0, percent: 0},
            percent:0,
            quizzes:{total: 0, completed: 0, percent: 0, scoreSum: 0, scoreAvg: 0},
            reads:{total: 0, completed: 0, percent: 0}
          }
        });
        assert.deepEqual(sortUsers(processed, 'percent', 'asc')[726].stats.percent,100);
    });
    
    
    it('debería retornar arreglo de usuarios ordenado por porcentaje general DESC', () => {
      
      
      assert.deepEqual(sortUsers(processed, 'percent', 'desc')[0].stats.percent,100);
      assert.deepEqual(sortUsers(processed, 'percent', 'desc')[726].stats.percent, 0);
    });
    it('debería retornar arreglo de usuarios ordenado por ejercicios completados ASC', () => {
      assert.deepEqual(sortUsers(processed, 'exercises', 'asc')[0].stats.exercises.completed, 0);
      assert.deepEqual(sortUsers(processed, 'exercises', 'asc')[726].stats.exercises.completed, 2);
    });
    it('debería retornar arreglo de usuarios ordenado por ejercicios completados DESC', () => {
      assert.deepEqual(sortUsers(processed, 'exercises', 'desc')[0].stats.exercises.completed, 2);
      assert.deepEqual(sortUsers(processed, 'exercises', 'desc')[726].stats.exercises.completed, 0);
    });
    it('debería retornar arreglo de usuarios ordenado por quizzes completados ASC', () => {

      assert.deepEqual(sortUsers(processed, 'quizzes', 'asc')[0].stats.quizzes.completed, 0);
      assert.deepEqual(sortUsers(processed, 'quizzes', 'asc')[726].stats.quizzes.completed, 3);
    });
    it('debería retornar arreglo de usuarios ordenado por quizzes completados DESC', () => {

      assert.deepEqual(sortUsers(processed, 'quizzes', 'desc')[0].stats.quizzes.completed, 3);
      assert.deepEqual(sortUsers(processed, 'quizzes', 'desc')[726].stats.quizzes.completed, 0);
    });
    it('debería retornar arreglo de usuarios ordenado por score promedio en quizzes completados ASC', () => {

      assert.deepEqual(sortUsers(processed, 'quizzesAvg', 'asc')[0].stats.quizzes.scoreAvg, 0);
      assert.deepEqual(sortUsers(processed, 'quizzesAvg', 'asc')[726].stats.quizzes.scoreAvg, 100);
    });
    it('debería retornar arreglo de usuarios ordenado por score promedio en quizzes completados DESC', () => {

      assert.deepEqual(sortUsers(processed, 'quizzesAvg', 'desc')[0].stats.quizzes.scoreAvg, 100);
      assert.deepEqual(sortUsers(processed, 'quizzesAvg', 'desc')[726].stats.quizzes.scoreAvg, 0);
    });
    it('debería retornar arreglo de usuarios ordenado por lecturas (reads) completadas ASC', () => {

      assert.deepEqual(sortUsers(processed, 'reads', 'asc')[0].stats.reads.completed, 0);
      assert.deepEqual(sortUsers(processed, 'reads', 'asc')[726].stats.reads.completed, 11);
    });
    it('debería retornar arreglo de usuarios ordenado por lecturas (reads) completadas DESC', () => {

      assert.deepEqual(sortUsers(processed, 'reads', 'desc')[0].stats.reads.completed,11);
      assert.deepEqual(sortUsers(processed, 'reads', 'desc')[726].stats.reads.completed, 0);
    });

  });

  describe('filterUsers(users, filterBy)', () => {
    const cohort = fixtures.cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw');
    const courses = Object.keys(cohort.coursesIndex);
    const { users, progress } = fixtures;
    const processed = computeUsersStats(users, progress, courses);
    it('debería retornar nuevo arreglo solo con usuarios con nombres que contengan string (case insensitive)', () => {
      assert.deepEqual(filterUsers(processed, 'alejandra')[0].name, 'Sabrina Alejandra  Campos Morón');
      assert.deepEqual(filterUsers(processed, 'alejandra')[1].name, 'Alejandra');
      assert.deepEqual(filterUsers(processed, 'alejandra')[2].name, 'Alejandra Amezaga Ortega');
    });

  });

  describe('processCohortData({ cohortData, orderBy, orderDirection, filterBy })', () => {
    const cohort = fixtures.cohorts.find(item => item.id === 'lim-2018-03-pre-core-pw');
    const { users, progress } = fixtures;
    let options = {
      cohort: cohort,
      cohortData: {
        users: users,
        progress: progress
      },
      orderBy: 'name',
      orderDirection: 'asc',
      search: ''
    }
    it('debería retornar arreglo de usuarios con propiedad stats y aplicar sort y filter', () => {
      const processed = processCohortData(options);
      assert.deepEqual(processed[0].name, 'adriana vizcarra paitán');
      options.search = 'alejandra';
      assert.deepEqual(processCohortData(options)[0].name, 'Alejandra');
      options.orderBy = 'reads';
      options.orderDirection = 'desc';
      assert.deepEqual(processCohortData(options)[0].name, 'Alejandra')
    });

  });

});
