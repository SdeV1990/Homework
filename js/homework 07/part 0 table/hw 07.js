// DOM: ДЗ

// Таблица умножения
// Сделать таблицу умножения, используя DOM createElement и innerText. Создайте таблицу, вложенные строки и ячейки в циклах.

// Подсветить ячейку
// над которой находится курсор мыши. Используйте события mouseover и mouseout, и style.backgroundColor для подсветки.

// Подсветить строку и столбец,
// в которой находится подсвеченная ячейка. Используйте parentElement (родительский элемент элемента DOM), и список его детей: children.

//  Всё в одном

    function drawTable () {
        let myTable = document.createElement("table")
        myTable.className = "myTable"

        let tableBgColorArr = ["#ffffff","#f0f0f0"]

        // Caption
        let caption = document.createElement("caption")
        myTable.appendChild(caption)
        caption.innerText = "Таблица умножения"
        caption.className = "tableCaption"

        for (let rowIndex = 0; rowIndex <= 9; rowIndex++ ) {
            tr = document.createElement("tr")
            for (let columnIndex = 0; columnIndex <= 9; columnIndex++) {
                td = document.createElement("td")
                
                // Text
                if (rowIndex == 0) {
                    td.innerText = columnIndex
                }
                else if (columnIndex == 0) {
                    td.innerText = rowIndex
                }
                else {
                    td.innerText = rowIndex * columnIndex
                }

                //Align
                td.align = "center"

                // Background color
                td.bgColor = tableBgColorArr[rowIndex % 2]

                tr.appendChild(td)
            }
            myTable.appendChild(tr)
        }
        return myTable
    }
    
    let myTable = drawTable()

    let tableWrapper = document.body.getElementsByClassName("tableWrapper")[0]
    tableWrapper.appendChild(myTable)

    letCSSandJSF_ckTogether()
    function letCSSandJSF_ckTogether() { // Bad name for function, but celebratory
        // Loosing virginity.
                        
        // Resizing cells
        let cellSize = (80 / 1300 * Math.min(document.documentElement.clientHeight, document.documentElement.clientWidth)).toFixed(0) 
        myTable.style.setProperty("--table_cell_size", cellSize) 

        // Resizing font
        let tableFontSize = (cellSize * 0.4).toFixed(0)
        myTable.style.setProperty("--table_font_size", tableFontSize)

        // Resizing border radius
        let cellBorderRadius = (cellSize * 0.15).toFixed(0)
        myTable.style.setProperty("--table_cell_border_radius", cellBorderRadius)

        // Resize padding left in tableWrapper
        let myTablePaddingLeft = ((document.documentElement.clientWidth - myTable.offsetWidth) / 2).toFixed(0)
        myTable.style.setProperty("--table_margin_left", myTablePaddingLeft)

        // Resize padding top in tableWrapper
        let myTablePaddingTop = ((document.documentElement.clientHeight - myTable.offsetHeight) / 2).toFixed(0)
        myTable.style.setProperty("--table_margin_top", myTablePaddingTop)
    }


// Events


    // If user resize window
    window.onresize = function( event ) {
        // Resizing cells
        let cellSize = (80 / 1299 * Math.min(document.documentElement.clientHeight, document.documentElement.clientWidth)).toFixed(0) 
        myTable.style.setProperty("--table_cell_size", cellSize)

        // Resizing font
        let tableFontSize = (cellSize * 0.4).toFixed(0)
        myTable.style.setProperty("--table_font_size", tableFontSize)

        letCSSandJSF_ckTogether() // Again
    };

    myTable.onmouseover = function(event){
        // Collection of td
        let newTDArray = [...myTable.querySelectorAll("td")]

        // Clear all class atribute
        newTDArray.map(item => item.removeAttribute("class")) 

        // Set new classes
        
        // For selected cell
        newTDArray.filter(item => item == event.path[0])[0].classList.add("selected_cell") 

        // For selected row
        let rowIndex = event.path[1].rowIndex
        let selectedRowCells = [...myTable.rows[rowIndex].cells]
        selectedRowCells.map(item => item.classList.add("selected_row"))

        // For selected column
        let columnIndex = event.path[0].cellIndex
        let selectedColumnCells = newTDArray.filter(item => item.cellIndex == columnIndex)
        selectedColumnCells.map(item => item.classList.add("selected_column"))
    }

    myTable.onmouseout = function(event){
         // Collection of td
         let newTDArray = [...myTable.querySelectorAll("td")]

        // Clear all class atribute
        newTDArray.map(item => item.removeAttribute("class")) 
    }