var modelController = (function(){

    // Конструктор под доходы
    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    }

    // Конструктор под расходы
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    }

    function addItem(type, desc, val){

        var newItem, ID;

        // Генерируем ID
        if(data.allItems[type] > 0){
            var lastIndex = data.allItems[type].length - 1;
            ID = data.allItems[type][lastIndex].id + 1;
        } else {
            ID = 0;
        }

        // В зависимости от типа записи используем соотв конструктор и создаем тип записи
        if( type === "inc" ){
            newItem = new Income(ID, desc, val);
        } else if ( type === "exp" ){
            newItem = new Expense(ID, desc, val);
        }

        // Записываем "запись"/ объект в структуру данных в переменную data
        data.allItems[type].push(newItem);

        // Возвращаем новый объект
        return newItem;
    }

    var data = {
        allItems: {
            inc: [],
            exp: []
        },

        totals: {
            inc: 0,
            exp: 0
        }
    }

    return {
        addItem: addItem,
        test: function(){
            console.log(data);
        } 
    }


})();