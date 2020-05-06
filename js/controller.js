var controller = (function(budgetCtr, uiCtr){


    var setUpEventListeners = function(){
        var DOM = uiCtr.getDomStrings();
        document.querySelector(DOM.form).addEventListener('submit', ctrAddItem);
    }
    
    // Функция, которая срабатывает при отправке формы
    function ctrAddItem(event){
        event.preventDefault();
        console.log("Fired!");

        // Получаем данные из формы
        var input = uiCtr.getInput();
        console.log("ctrAddItem -> input", input)

        // Проверка на пустые поля
        if( input.description !== "" && !isNaN(input.value) && input.value > 0){
            // Добавляем полученные данные в модель
            var newItem = budgetCtr.addItem(input.type, input.description, input.value);
            budgetCtr.test();

            // Добавляем запись в UI
            uiCtr.renderListItem(newItem, input.type);
            uiCtr.clearFields();
            generateTestData.init();

            // Считаем бюджет
            updateBudget();

        }

        
    }

    // Функция для пересчета бюджета
    function updateBudget(){
        // Рассчитываем бюджет в модели
        budgetCtr.calculateBudget();


    }

    return {
        init: function(){
            console.log("App started!");
            setUpEventListeners();
        }
    }

    

})(modelController, viewController);

controller.init();