
// I used to use "_" in the name of variables, functions and procedures (in VBA)... 
// Is there some widespread convention among programmists not to write like that? 

// Input data
var total_Quantity_Of_Books = prompt("Введите количество книг."); // 5069
var weight_Of_Book = 0.3; //  prompt("Введите вес книги.");
var weight_Of_Wrap = 0.077; //  prompt("Введите вес упаковки.");
var quantity_Of_Books_Per_Pack = 10; //  prompt("Введите количество книг в пачке.");
var quantity_Of_Packs_Per_Level = 13; // prompt("Введите количество пачек на уровне.");
var weight_Of_Pallet = 16;
var max_Weight_Of_Pallet = 550;

// Calculations

// Packs
var total_Quantity_Of_Packs = Math.ceil(total_Quantity_Of_Books / quantity_Of_Books_Per_Pack);
var weight_Of_Complete_Pack = (weight_Of_Book * quantity_Of_Books_Per_Pack) + weight_Of_Wrap;
var quantity_Of_Books_In_Incomplete_Pack = total_Quantity_Of_Books % quantity_Of_Books_Per_Pack;
var quantity_Of_Incomplete_Packs =  Math.ceil(quantity_Of_Books_In_Incomplete_Pack / quantity_Of_Books_Per_Pack);
var weight_Of_Incomplete_Pack = (weight_Of_Book * quantity_Of_Books_In_Incomplete_Pack) + weight_Of_Wrap;
var quantity_Of_Complete_Packs = total_Quantity_Of_Packs - quantity_Of_Incomplete_Packs

// Complete pallets
var quantity_Of_Levels_On_Complete_Pallet = Math.floor(max_Weight_Of_Pallet / (quantity_Of_Packs_Per_Level *  weight_Of_Complete_Pack));
var quantity_Of_Packs_On_Complete_Pallet = quantity_Of_Levels_On_Complete_Pallet * quantity_Of_Packs_Per_Level;
var quantity_Of_Complete_Pallets = Math.floor(quantity_Of_Complete_Packs / quantity_Of_Packs_On_Complete_Pallet ); 
var weight_Of_Complete_Pallet = quantity_Of_Packs_On_Complete_Pallet * weight_Of_Complete_Pack + weight_Of_Pallet;

// Incomplete pallets
var quantity_Of_Incomplete_Pallets = Math.ceil( (quantity_Of_Complete_Packs % quantity_Of_Packs_On_Complete_Pallet) / quantity_Of_Packs_On_Complete_Pallet );
var quantity_Of_Packs_On_Incomplete_Pallets = total_Quantity_Of_Packs - quantity_Of_Packs_On_Complete_Pallet * quantity_Of_Complete_Pallets;
var quantity_Of_Complete_Levels_On_Incomplete_Pallet = Math.floor((quantity_Of_Packs_On_Incomplete_Pallets - quantity_Of_Incomplete_Packs) / quantity_Of_Packs_Per_Level);
var quantity_Of_Complete_Packs_On_Incomplete_Level = quantity_Of_Packs_On_Incomplete_Pallets - quantity_Of_Complete_Levels_On_Incomplete_Pallet * quantity_Of_Packs_Per_Level - quantity_Of_Incomplete_Packs;
var weight_Of_Incomplete_Pallet = (quantity_Of_Packs_On_Incomplete_Pallets - quantity_Of_Incomplete_Packs) * weight_Of_Complete_Pack + quantity_Of_Incomplete_Packs * weight_Of_Incomplete_Pack + quantity_Of_Incomplete_Pallets * weight_Of_Pallet;

// Total parameters
var total_Quantity_Of_Pallets = Math.ceil( total_Quantity_Of_Packs / quantity_Of_Packs_On_Complete_Pallet );
var total_Weight_Brutto = quantity_Of_Complete_Pallets * weight_Of_Complete_Pallet + weight_Of_Incomplete_Pallet;
var total_Weight_Netto = total_Quantity_Of_Books * weight_Of_Book;

// Output

// Complete pallets
var new_line = "\n";
let result = "Количество полных поддонов: " + quantity_Of_Complete_Pallets + ".";
result = result + new_line + "Количество уровней на полном поддоне: " + quantity_Of_Levels_On_Complete_Pallet + ".";
result = result + new_line + "Количество пачек на полном поддоне: " + quantity_Of_Packs_On_Complete_Pallet + ".";
result = result + new_line + "Вес одного полного поддона: " + weight_Of_Complete_Pallet + ".";

// Incomplete pallets
result = result + new_line;
result = result + new_line + "Количество неполных поддонов: " + quantity_Of_Incomplete_Pallets + ".";
result = result + new_line + "Количество полных уровней на неполном поддоне: " + quantity_Of_Complete_Levels_On_Incomplete_Pallet + ".";
result = result + new_line + "Количество полных пачек на неполном уровне неполного поддона: " + quantity_Of_Complete_Packs_On_Incomplete_Level + ".";
result = result + new_line + "Количество неполных пачек на неполном уровне неполного поддона: " + quantity_Of_Incomplete_Packs + ".";
result = result + new_line + "Количество книг в неполной пачке: " + quantity_Of_Incomplete_Packs + ".";
result = result + new_line + "Вес неполного поддона: " + weight_Of_Incomplete_Pallet + ".";

alert(result);