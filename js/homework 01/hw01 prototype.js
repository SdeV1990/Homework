debugger;
// I used to use "_" in the name of variables, functions and procedures (in VBA)... 
// Is there some widespread convention among programmists not to write like that? 
// In time I realize (practising blind print), that sign "_" isn't comfortable to print.


// Input data

<<<<<<< HEAD
function calculateProductWrap() {

    var inputList = [
        [, "Введите количество книг.", 5069],
        [, "Введите вес книги (кг).", 0.3],
        [, "Введите вес упаковки (кг).", 0.077],
        [, "Введите количество книг в пачке.", 10],
        [, "Введите количество пачек на уровне.", 13],
        [, "Введите вес паллеты (кг).", 16],
        [, "Введите ограничение по весу паллеты (кг).", 550],
    ]

    var totalQuantityOfBooks = inputList[0][0];
    var weight_Of_Book = inputList[1][0];
    var weight_Of_Wrap = inputList[2][0];
    var quantity_Of_Books_Per_Pack = inputList[3][0];
    var quantity_Of_Packs_Per_Level = inputList[4][0];
    var weight_Of_Pallet = inputList[5][0];
    var max_Weight_Of_Pallet = inputList[6][0];

    let inputValue = new InputValue(inputList[0][0], inputList[0][1], inputList[0][2])

    function InputValue (variable, question, defaultValue) {
        this.variable = variable;
        this.question = question;
        this.defaultValue = defaultValue;
    }

    var isUseValueOptional = confirm("Желаете использовать данные по умолчанию?");

    if (isUseValueOptional) {
        totalQuantityOfBooks = 5069;
        weight_Of_Book = 0.3;
        weight_Of_Wrap = 0.077;
        quantity_Of_Books_Per_Pack = 10;
        quantity_Of_Packs_Per_Level = 13;
        weight_Of_Pallet = 16;
        max_Weight_Of_Pallet = 550;

        return weight_Of_Pallet;
    } else {
        if (!(totalQuantityOfBooks = toCheckInputValueForValidNumber("Введите количество книг."))) return;
        if (!(weight_Of_Book = toCheckInputValueForValidNumber("Введите вес книги (кг)."))) return;
        if (!(weight_Of_Wrap = toCheckInputValueForValidNumber("Введите вес упаковки (кг)."))) return;
        if (!(quantity_Of_Books_Per_Pack = toCheckInputValueForValidNumber("Введите количество книг в пачке."))) return;
        if (!(quantity_Of_Packs_Per_Level = toCheckInputValueForValidNumber("Введите количество пачек на уровне."))) return;
        if (!(weight_Of_Pallet = toCheckInputValueForValidNumber("Введите вес паллеты (кг)."))) return;
        if (!(max_Weight_Of_Pallet = toCheckInputValueForValidNumber("Введите ограничение по весу паллеты (кг)."))) return;
    }

    function toCheckInputValueForValidNumber (question) { // Ask the value
        var inputValue = +prompt(question)
        
        if (inputValue === null) {
            if (confirm("Вы действительно хотите прекратить выполнение программы?")) {
                return false
            }
            else {
                inputValue = +prompt(question)
            }
        } 
        else if (isNaN(inputValue)) {

        } 
        else {
            return inputValue;
        }
    }

}///////////////////

    // Calculations

    // Packs
    var total_Quantity_Of_Packs = Math.ceil(totalQuantityOfBooks / quantity_Of_Books_Per_Pack);
    var weight_Of_Complete_Pack = (weight_Of_Book * quantity_Of_Books_Per_Pack) + weight_Of_Wrap;
    var quantity_Of_Books_In_Incomplete_Pack = totalQuantityOfBooks % quantity_Of_Books_Per_Pack;
    var quantity_Of_Incomplete_Packs =  Math.ceil(quantity_Of_Books_In_Incomplete_Pack / quantity_Of_Books_Per_Pack);

    // What did I do wrong?
    // weight_Of_Book = 0.3
    // quantity_Of_Books_In_Incomplete_Pack = 9
    // weight_Of_Book * quantity_Of_Books_In_Incomplete_Pack = 0.3 * 9 = 2.6999999999999997 ?
    var weight_Of_Incomplete_Pack = (weight_Of_Book * quantity_Of_Books_In_Incomplete_Pack) + weight_Of_Wrap;

    var quantity_Of_Complete_Packs = total_Quantity_Of_Packs - quantity_Of_Incomplete_Packs

    // Complete pallets
    var quantity_Of_Levels_On_Complete_Pallet = Math.floor(max_Weight_Of_Pallet / (quantity_Of_Packs_Per_Level *  weight_Of_Complete_Pack));
    var quantity_Of_Packs_On_Complete_Pallet = quantity_Of_Levels_On_Complete_Pallet * quantity_Of_Packs_Per_Level;
    var quantity_Of_Complete_Pallets = Math.floor(quantity_Of_Complete_Packs / quantity_Of_Packs_On_Complete_Pallet ); 
    var weight_Of_Complete_Pallet = Math.round(quantity_Of_Packs_On_Complete_Pallet * weight_Of_Complete_Pack + weight_Of_Pallet);

    // Incomplete pallets
    var quantity_Of_Incomplete_Pallets = Math.ceil( (quantity_Of_Complete_Packs % quantity_Of_Packs_On_Complete_Pallet) / quantity_Of_Packs_On_Complete_Pallet );
    var quantity_Of_Packs_On_Incomplete_Pallets = total_Quantity_Of_Packs - quantity_Of_Packs_On_Complete_Pallet * quantity_Of_Complete_Pallets;
    var quantity_Of_Complete_Levels_On_Incomplete_Pallet = Math.floor((quantity_Of_Packs_On_Incomplete_Pallets - quantity_Of_Incomplete_Packs) / quantity_Of_Packs_Per_Level);
    var quantity_Of_Complete_Packs_On_Incomplete_Level = quantity_Of_Packs_On_Incomplete_Pallets - quantity_Of_Complete_Levels_On_Incomplete_Pallet * quantity_Of_Packs_Per_Level - quantity_Of_Incomplete_Packs;
    var weight_Of_Incomplete_Pallet = Math.round((quantity_Of_Packs_On_Incomplete_Pallets - quantity_Of_Incomplete_Packs) * weight_Of_Complete_Pack + quantity_Of_Incomplete_Packs * weight_Of_Incomplete_Pack + quantity_Of_Incomplete_Pallets * weight_Of_Pallet);

    // Total parameters
    var total_Quantity_Of_Pallets = Math.ceil( total_Quantity_Of_Packs / quantity_Of_Packs_On_Complete_Pallet );
    var total_Weight_Brutto = quantity_Of_Complete_Pallets * weight_Of_Complete_Pallet + weight_Of_Incomplete_Pallet;
    var total_Weight_Netto = totalQuantityOfBooks * weight_Of_Book;


    // Output

    var newLine = "\n";
    let result = "";

    // Complete pallets
    if (quantity_Of_Complete_Pallets > 0) {
    result = "Количество полных поддонов: " + quantity_Of_Complete_Pallets + ".";
    result += newLine + "Количество уровней на полном поддоне: " + quantity_Of_Levels_On_Complete_Pallet + ".";
    result += newLine + "Количество пачек на полном поддоне: " + quantity_Of_Packs_On_Complete_Pallet + ".";
    result += newLine + "Вес одного полного поддона: " + weight_Of_Complete_Pallet + " кг.";
    }

    // Incomplete pallets
    if (quantity_Of_Incomplete_Pallets > 0) {
    result += newLine;
    result += newLine + "Количество неполных поддонов: " + quantity_Of_Incomplete_Pallets + ".";
    result += newLine + "Количество полных уровней на неполном поддоне: " + quantity_Of_Complete_Levels_On_Incomplete_Pallet + ".";
    result += newLine + "Количество полных пачек на неполном уровне неполного поддона: " + quantity_Of_Complete_Packs_On_Incomplete_Level + ".";
    result += newLine + "Количество неполных пачек на неполном уровне неполного поддона: " + quantity_Of_Incomplete_Packs + ".";
    result += newLine + "Количество книг в неполной пачке: " + quantity_Of_Incomplete_Packs + ".";
    result += newLine + "Вес неполного поддона: " + weight_Of_Incomplete_Pallet + " кг.";
    }

    // Total

    result = result + newLine;

    // If there are complete and incomplete pallets.
    if ((quantity_Of_Complete_Pallets > 0) && (quantity_Of_Incomplete_Pallets > 0)) {
    result += newLine + "Всего паллет: " + total_Quantity_Of_Pallets + ".";
    }

    result += newLine + "Общий вес брутто: " + total_Weight_Brutto + " кг.";
    result += newLine + "Общий вес нетто: " + total_Weight_Netto + " кг.";

    return result;
=======
var is_Using_Prompt = false;

if (is_Using_Prompt === false) {
    var total_Quantity_Of_Books = 5069;
    var weight_Of_Book = 0.3;
    var weight_Of_Wrap = 0.077;
    var quantity_Of_Books_Per_Pack = 10;
    var quantity_Of_Packs_Per_Level = 13;
    var weight_Of_Pallet = 16;
    var max_Weight_Of_Pallet = 550;
} else {
    var total_Quantity_Of_Books = Number(prompt("Введите количество книг.")); // First made it by "* 1" XD
    var weight_Of_Book = Number(prompt("Введите вес книги (кг)."));
    var weight_Of_Wrap = Number(prompt("Введите вес упаковки (кг)."));
    var quantity_Of_Books_Per_Pack = Number(prompt("Введите количество книг в пачке."));
    var quantity_Of_Packs_Per_Level = Number(prompt("Введите количество пачек на уровне."));
    var weight_Of_Pallet = Number(prompt("Введите вес паллеты."));
    var max_Weight_Of_Pallet = Number(prompt("Введите ограничение по весу паллеты."));
}


// Calculations

// Packs
var total_Quantity_Of_Packs = Math.ceil(total_Quantity_Of_Books / quantity_Of_Books_Per_Pack);
var weight_Of_Complete_Pack = weight_Of_Book * quantity_Of_Books_Per_Pack + weight_Of_Wrap;
var quantity_Of_Books_In_Incomplete_Pack = total_Quantity_Of_Books % quantity_Of_Books_Per_Pack;
var quantity_Of_Incomplete_Packs =  Math.ceil(quantity_Of_Books_In_Incomplete_Pack / quantity_Of_Books_Per_Pack);

// What did I do wrong?
// weight_Of_Book = 0.3
// quantity_Of_Books_In_Incomplete_Pack = 9
// weight_Of_Book * quantity_Of_Books_In_Incomplete_Pack = 0.3 * 9 = 2.6999999999999997 ?
var weight_Of_Incomplete_Pack = weight_Of_Book * quantity_Of_Books_In_Incomplete_Pack + weight_Of_Wrap;

var quantity_Of_Complete_Packs = total_Quantity_Of_Packs - quantity_Of_Incomplete_Packs

// Complete pallets
var quantity_Of_Levels_On_Complete_Pallet = Math.floor(max_Weight_Of_Pallet / (quantity_Of_Packs_Per_Level *  weight_Of_Complete_Pack));
var quantity_Of_Packs_On_Complete_Pallet = quantity_Of_Levels_On_Complete_Pallet * quantity_Of_Packs_Per_Level;
var quantity_Of_Complete_Pallets = Math.floor(quantity_Of_Complete_Packs / quantity_Of_Packs_On_Complete_Pallet); 
var weight_Of_Complete_Pallet = Math.round(quantity_Of_Packs_On_Complete_Pallet * weight_Of_Complete_Pack + weight_Of_Pallet);

// Incomplete pallets
var quantity_Of_Incomplete_Pallets = Math.ceil((quantity_Of_Complete_Packs % quantity_Of_Packs_On_Complete_Pallet) / quantity_Of_Packs_On_Complete_Pallet );
var quantity_Of_Packs_On_Incomplete_Pallets = total_Quantity_Of_Packs - quantity_Of_Packs_On_Complete_Pallet * quantity_Of_Complete_Pallets;
var quantity_Of_Complete_Levels_On_Incomplete_Pallet = Math.floor((quantity_Of_Packs_On_Incomplete_Pallets - quantity_Of_Incomplete_Packs) / quantity_Of_Packs_Per_Level);
var quantity_Of_Complete_Packs_On_Incomplete_Level = quantity_Of_Packs_On_Incomplete_Pallets - quantity_Of_Complete_Levels_On_Incomplete_Pallet * quantity_Of_Packs_Per_Level - quantity_Of_Incomplete_Packs;
var weight_Of_Incomplete_Pallet = Math.round((quantity_Of_Packs_On_Incomplete_Pallets - quantity_Of_Incomplete_Packs) * weight_Of_Complete_Pack + quantity_Of_Incomplete_Packs * weight_Of_Incomplete_Pack + quantity_Of_Incomplete_Pallets * weight_Of_Pallet);

// Total parameters
var total_Quantity_Of_Pallets = Math.ceil(total_Quantity_Of_Packs / quantity_Of_Packs_On_Complete_Pallet);
var total_Weight_Brutto = quantity_Of_Complete_Pallets * weight_Of_Complete_Pallet + weight_Of_Incomplete_Pallet;
var total_Weight_Netto = total_Quantity_Of_Books * weight_Of_Book;
>>>>>>> 8ec08b04b964a6a79da0cce9efda0820d9bb7043

}

alert(calculateProductWrap);