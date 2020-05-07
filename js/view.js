var viewController = (function(){

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
        budgetTable: "#budget-table"

    }

    function getInput(){
        return {
            type: document.querySelector(DomStrings.inputType).value,
            description: document.querySelector(DomStrings.inputDescription).value,
            value: document.querySelector(DomStrings.inputValue).value
        }
    }

    function renderListItem(obj, type){

        var containerElement, html;

        if ( type === "inc" ){
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
        newHtml = newHtml.replace("%value%", obj.value);

        document.querySelector(containerElement).insertAdjacentHTML("beforeend", newHtml);
    }

    function clearFields(){
        var inputDesc, inputVal;

        // Находим поля для сброса
        inputDesc = document.querySelector(DomStrings.inputDescription);
        inputVal = document.querySelector(DomStrings.inputValue);

        // Сбрасываем их до пустого значения
        inputDesc.value = "";
        inputDesc.focus();
        inputVal.value = "";


    }

    function updateBudget(obj){
        document.querySelector(DomStrings.budgetLabel).textContent = obj.budget;
        document.querySelector(DomStrings.incomeLabel).textContent = obj.totalInc;
        document.querySelector(DomStrings.expensesLabel).textContent = obj.totalExp;

        if( obj.percentage > 0 ){
            document.querySelector(DomStrings.expensesPercentLabel).textContent = obj.percentage;
        } else{
            document.querySelector(DomStrings.expensesPercentLabel).textContent = "--";
        }

    }

    function deleteListItem(itemID){
        document.getElementById(itemID).remove();
    }

    function updateItemPercentage(items){

        items.forEach(function(item){
        
        // Вывод каждой записи массива во время прохода
        console.log("updateItemPercentage -> item", item);

        // Находим li, где лежат данные и далее блок с процентами по "item__percent"
        var el = document.getElementById(`exp-${item[0]}`).querySelector(".item__percent");
        console.log("updateItemPercentage -> el", el);

        // Меняем в этом блоке текстовое содержимое
        
        if ( item[1] >= 0){
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

    return {
        getInput: getInput,
        clearFields: clearFields,
        renderListItem: renderListItem,
        deleteListItem: deleteListItem,
        updateItemPercentage: updateItemPercentage,
        updateBudget: updateBudget,
        getDomStrings: function(){
            return DomStrings;
        }
    }


})();