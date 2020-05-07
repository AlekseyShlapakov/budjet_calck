var viewController = (function () {
  var DomStrings = {
    inputType: "#input__type",
    inputDescription: "#input__description",
    inputValue: "#input__value",
    form: "#budget-form",
    incomContainer: "#income__list",
    expenseContainer: "#expenses__list",
    budgetLabel: "#budget-value",
    incomeLabel: "#income-label",
    expensesLabel: "#expense-label",
    expensesPercentLabel: "#expense-parsent-label",
    budgetTable: "#budget-table",
    monthLabel: "#month",
    yearLabel: "#year"
  };

  function getInput() {
    return {
      type: document.querySelector(DomStrings.inputType).value,
      description: document.querySelector(DomStrings.inputDescription).value,
      value: document.querySelector(DomStrings.inputValue).value,
    };
  }

  function formatNumber(num, type) {
    var numSplit, int, dec, newInt, resultNumber;

    // Убираем знак минус у отрицательных чисел
    num = Math.abs(num);

    // Приводим к двум цифрам после точки
    num = num.toFixed(2);

    // Разделяем число на целые и дробные
    numSplit = num.split("."); // 45.75 => [45, 75]
    // Определяем целую часть
    int = numSplit[0]; // 45
    // Определяем десятичную часть
    dec = numSplit[1]; // 75

    // Расставляем запятые
    // Исходя из длины числа, делим его на части по три цифры, начиная справа
    // Если длина номера бодьше, чем три цифры => ставим запятые
    if (int.length > 3) {
      console.log("formatNumber -> int.length", int.length);

      newInt = "";

      for (var i = 0; i < int.length / 3; i++) {
        console.log("formatNumber -> i", i);

        // Формируем новую строку с номером
        newInt =
          // Добавляем запятую каждые три числа
          "," +
          // Вызанный кусок из исходной строки
          int.substring(int.length - 3 * (i + 1), int.length - 3 * i) + 
          // Конец строки, правая часть 
          newInt;

      }

        // Убираем запятую в начале, если она есть
        if (newInt[0] === ","){
            newInt = newInt.substring(1);
        }

    // Если исходное число равно нулю, то в новую строку записываем ноль
    } else if (int === "0"){
        newInt = "0";
    // Если исходное число имеет три и менне символов
    } else {
        newInt = int;
    }

    resultNumber = newInt + "." + dec;

    if (type === "exp"){
        resultNumber = "- " + resultNumber;
    } else if (type === "inc"){
        resultNumber = "+ " + resultNumber;
    }

    return resultNumber;
  }

  function renderListItem(obj, type) {
    var containerElement, html;

    if (type === "inc") {
      containerElement = DomStrings.incomContainer;
      html = `<li id="inc-%id%" class="budget-list__item item item--income">
                        <div class="item__title">%description%</div>
                        <div class="item__right">
                            <div class="item__amount">%value%</div>
                            <button class="item__remove">
                                <img
                                    src="./img/circle-green.svg"
                                    alt="delete"
                                />
                            </button>
                        </div>
                    </li>`;
    } else {
      containerElement = DomStrings.expenseContainer;
      html = `<li id="exp-%id%" class="budget-list__item item item--expense">
                        <div class="item__title">%description%</div>
                        <div class="item__right">
                            <div class="item__amount">
                                %value%
                                <div class="item__badge">
                                    <div class="item__percent badge badge--dark">
                                        15%
                                    </div>
                                </div>
                            </div>
                            <button class="item__remove">
                                <img src="./img/circle-red.svg" alt="delete" />
                            </button>
                        </div>
                    </li>`;
    }

    newHtml = html.replace("%id%", obj.id);
    newHtml = newHtml.replace("%description%", obj.description);
    newHtml = newHtml.replace("%value%", formatNumber(obj.value, type));

    document
      .querySelector(containerElement)
      .insertAdjacentHTML("beforeend", newHtml);
  }

  function clearFields() {
    var inputDesc, inputVal;

    // Находим поля для сброса
    inputDesc = document.querySelector(DomStrings.inputDescription);
    inputVal = document.querySelector(DomStrings.inputValue);

    // Сбрасываем их до пустого значения
    inputDesc.value = "";
    inputDesc.focus();
    inputVal.value = "";
  }

  function updateBudget(obj) {
      var type;

    if(obj.budget > 0) {
        type = "inc";
    } else {
        type = "exp";
    }


    document.querySelector(DomStrings.budgetLabel).textContent = formatNumber(
      obj.budget,
      type
    );
    document.querySelector(DomStrings.incomeLabel).textContent = formatNumber(obj.totalInc, "inc");
    document.querySelector(DomStrings.expensesLabel).textContent = formatNumber(obj.totalExp, "exp");

    if (obj.percentage > 0) {
      document.querySelector(DomStrings.expensesPercentLabel).textContent =
        obj.percentage;
    } else {
      document.querySelector(DomStrings.expensesPercentLabel).textContent =
        "--";
    }
  }

  function deleteListItem(itemID) {
    document.getElementById(itemID).remove();
  }

  function updateItemPercentage(items) {
    items.forEach(function (item) {
      // Вывод каждой записи массива во время прохода
      console.log("updateItemPercentage -> item", item);

      // Находим li, где лежат данные и далее блок с процентами по "item__percent"
      var el = document
        .getElementById(`exp-${item[0]}`)
        .querySelector(".item__percent");

      // Меняем в этом блоке текстовое содержимое

      if (item[1] >= 0) {
        // Если есть, то показываем блок с процентами
        el.parentElement.style.display = "block";

        // Меняем контент внутрии бейджа с процентами
        el.textContent = item[1] + "%";
      } else {
        // Если нет, то скрываем бейдж с процентами
        el.parentElement.style.display = "none";
      }
    });
  }

  function displayMonth(){
      var now, year, month, monthArr;

      now = new Date();
      year = now.getFullYear(); // 2020
      month = now.getMonth(); // Апрель => 3(Индекс месяца)

      monthArr = [
          'Январь', 'Февраль', 'Март',
          'Апрель', 'Май', 'Июнь',
          'Июль', 'Август', 'Сентябрь',
          'Октябрь', 'Ноябрь', 'Декабрь'
        ];
      

      month = monthArr[month];

      document.querySelector(DomStrings.monthLabel).innerText = month;
      document.querySelector(DomStrings.yearLabel).innerText = year;
  }

  return {
    getInput: getInput,
    clearFields: clearFields,
    renderListItem: renderListItem,
    deleteListItem: deleteListItem,
    updateItemPercentage: updateItemPercentage,
    displayMonth: displayMonth,
    updateBudget: updateBudget,
    getDomStrings: function () {
      return DomStrings;
    }
  };
})();
