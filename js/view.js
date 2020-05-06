var viewController = (function(){

    var DomStrings = {
        inputType: "#input__type",
        inputDescription: "#input__description",
        inputValue: "#input__value",
        form: "#budget-form",
        incomContainer: "#income__list",
        expenseContainer: "#expenses__list"
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
            html = `<li id="income-%id%" class="budget-list__item item item--income">
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
            html = `<li id="expense-%id%" class="budget-list__item item item--expense">
                        <div class="item__title">%description%</div>
                        <div class="item__right">
                            <div class="item__amount">
                                %value%
                                <div class="item__badge">
                                    <div class="badge badge--dark">
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

    return {
        getInput: getInput,
        clearFields: clearFields,
        renderListItem: renderListItem,
        getDomStrings: function(){
            return DomStrings;
        }
    }


})();