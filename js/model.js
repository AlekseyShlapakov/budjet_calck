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
  };

  function addItem(type, desc, val) {
    var newItem, ID;

    // Генерируем ID
    if (data.allItems[type] > 0) {
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

  var data = {
    allItems: {
      inc: [],
      exp: [],
    },

    totals: {
      inc: 0,
      exp: 0,
    },
    budget: 0,
    percentage: -1,
  };

  return {
    addItem: addItem,
    getBudget: getBudget,
    calculateBudget: calculateBudget,
    test: function () {
      console.log(data);
    },
  };
})();
