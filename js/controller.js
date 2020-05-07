var controller = (function (budgetCtr, uiCtr) {
  var setUpEventListeners = function () {
    var DOM = uiCtr.getDomStrings();
    document.querySelector(DOM.form).addEventListener("submit", ctrAddItem);

    // Прослушка клика по таблице с доходами и расходами
    document
      .querySelector(DOM.budgetTable)
      .addEventListener("click", ctrDeleteItem);
  };

  // Функция для обновления процентов у каждой записи
  function updatePercentages() {

    // Считаем проценты для каждой записи типа Expence
    budgetCtr.calculatePercentage();
    budgetCtr.test();

    // Получаем данные по процентам из модели
    var idsAndPercentage = budgetCtr.getAllIdsAndPercentages();
    console.log("updatePercentages -> idsAndPercentage", idsAndPercentage)

    // Обновляем UI с новыми процентами
    uiCtr.updateItemPercentage(idsAndPercentage);


  }

  // Функция, которая срабатывает при отправке формы
  function ctrAddItem(event) {
    event.preventDefault();

    // Получаем данные из формы
    var input = uiCtr.getInput();

    // Проверка на пустые поля
    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      // Добавляем полученные данные в модель
      var newItem = budgetCtr.addItem(
        input.type,
        input.description,
        input.value
      );
      budgetCtr.test();

      // Добавляем "запись" в UI
      uiCtr.renderListItem(newItem, input.type);
      uiCtr.clearFields();
      generateTestData.init();

      // Считаем бюджет
      updateBudget();

      // Пересчитываем проценты
      updatePercentages();
    }
  }

  function ctrDeleteItem(event) {
    var itemID, splitID, type, ID;

    if (event.target.closest(".item__remove")) {
      // Находим ID записи которую надо удалить
      itemID = event.target.closest("li.budget-list__item").id;
      console.log("ctrDeleteItem -> itemID", itemID);

      splitID = itemID.split("-");
      type = splitID[0];
      ID = parseInt(splitID[1]);

      console.log("ctrDeleteItem -> ID", ID);
      console.log("ctrDeleteItem -> type", type);

      // Удаляем запись из модели
      budgetCtr.deleteItem(type, ID);

      // Удаляем записи из шаблона
      uiCtr.deleteListItem(itemID);

      // Считаем бюджет
      updateBudget();

      // Пересчитываем проценты
      updatePercentages();
    }
  }

  // Функция для пересчета бюджета
  function updateBudget() {
    // Рассчитываем бюджет в модели
    budgetCtr.calculateBudget();

    // Получаем рассчитанный бюджет из модели
    budgetObj = budgetCtr.getBudget();
    console.log("updateBudget -> budgetObj", budgetObj);

    // Отображаем бюджет в шаблоне
    uiCtr.updateBudget(budgetObj);
  }

  return {
    init: function () {
      console.log("App started!");
      uiCtr.displayMonth();
      setUpEventListeners();
      uiCtr.updateBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: 0,
      });
    },
  };
})(modelController, viewController);

controller.init();
