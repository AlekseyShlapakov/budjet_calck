var modelController = (function () {
  // Конструктор под доходы
  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  // Конструктор под расходы
  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };

//   Метод, который берет общий бюджет и рассчитывать процент расхода
  Expense.prototype.calcPercentage = function(totalIncome){
    if( totalIncome > 0 ){
        this.percentage = Math.round((this.value / totalIncome) * 100);
    } else {
        this.percentage = -1;
    }
  }

    // Метод, который возвращает значение процента расходов
    Expense.prototype.getPercentage = function(){
        return this.percentage;
    }

  function addItem(type, desc, val) {
    var newItem, ID;

    // Генерируем ID
    if (data.allItems[type].length > 0) {
      var lastIndex = data.allItems[type].length - 1;
      ID = data.allItems[type][lastIndex].id + 1;
    } else {
      ID = 0;
    }

    // В зависимости от типа записи используем соотв конструктор и создаем тип записи
    if (type === "inc") {
      newItem = new Income(ID, desc, parseFloat(val));
    } else if (type === "exp") {
      newItem = new Expense(ID, desc, parseFloat(val));
    }

    // Записываем "запись"/ объект в структуру данных в переменную data
    data.allItems[type].push(newItem);

    // Возвращаем новый объект
    return newItem;
  }

  function deleteItem(type, id){

    // Находим запись по id с доходами и расходами
    var ids = data.allItems[type].map(function(item){
    
        return item.id;
    });

    console.log("deleteItem -> ids", ids);

    // Находим индекс с записями
    index = ids.indexOf(id);
    console.log("deleteItem -> index", index);

    // Удаляем найденную запись из массива по индексу
    if ( index !== -1 ){
        data.allItems[type].splice(index, 1);
    }

  }

  // Функция, возвращающая сумму всех доходов или расходов
  function calculateTotalSum(type) {
    sum = 0;

    data.allItems[type].forEach(function (item) {
      sum = sum + item.value;
    });

    return sum;
  }

  // Функция для рассчета бюджета
  function calculateBudget() {
    // Считаем все доходы
    data.totals.inc = calculateTotalSum("inc");
    console.log("calculateBudget -> data.totals.inc", data.totals.inc);

    // Считаем все расходы
    data.totals.exp = calculateTotalSum("exp");
    console.log("calculateBudget -> data.totals.exp", data.totals.exp);

    // Делаем расчет общего бюджета
    data.budget = data.totals.inc - data.totals.exp;

    // Считаем процент для расходов
    if (data.totals.inc > 0) {
      data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
    } else {
      data.percentage = -1;
    }
  }

    //Функция, которая будет возвращать наружу данные по бюджету
    function getBudget(){
        return {
            budget: data.budget,
            totalInc: data.totals.inc,
            totalExp: data.totals.exp,
            percentage: data.percentage
        }
    }   

    // Функция, которая запускает пересчет процентов
    function calculatePercentage(){
        data.allItems.exp.forEach(function(item){
            item.calcPercentage(data.totals.inc);
        });
    }

    // Функция которая вовращает список ID и список процентов, 
    // кот. нужно обновить во view (в массиве)
    function getAllIdsAndPercentages(){
        var allPerc = data.allItems.exp.map(function(item){
            return [item.id, item.getPercentage()];
        });

        return allPerc;
    }

  var data = {
    allItems: {
      inc: [],
      exp: []
    },

    totals: {
      inc: 0,
      exp: 0
    },
    budget: 0,
    percentage: -1
  };

  return {
    addItem: addItem,
    getBudget: getBudget,
    deleteItem: deleteItem,
    calculatePercentage: calculatePercentage,
    getAllIdsAndPercentages: getAllIdsAndPercentages,
    calculateBudget: calculateBudget,
    test: function () {
      console.log(data);
    }
  }
})();
