// DOM: ДЗ

// Таблица умножения
// Сделать таблицу умножения, используя DOM createElement и innerText. Создайте таблицу, вложенные строки и ячейки в циклах.

// Подсветить ячейку
// над которой находится курсор мыши. Используйте события mouseover и mouseout, и style.backgroundColor для подсветки.

// Подсветить строку и столбец,
// в которой находится подсвеченная ячейка. Используйте parentElement (родительский элемент элемента DOM), и список его детей: children.

    // Всё в одном. 
    // Немного не по заданию - цвет менял и прямо, и путём присвоения классов.
    // Размеры было бы легче (и не так каряво), задавать через СSS (используя vmin), ноооо... решил немного помутить (с костылями).
    // Вообщем, разные способы передачи данных попробовал, пусть и не уместно.

    // Objects

    let myTableObj = {
        
        // HTML Object
        htmlObj: "",
        
        // Parameters by default
        styleParam: {
            // Naming convention "--" + {name_of_selector} + "__" + {name_of_style_attribute}.
            "--td__width": "30",
            "--td__height": "30",
            "--myTable__font_size": "14",
            "--td__border_radius": "2"
        },

        selectClasses: ["selected_row", "selected_column"],

        tdArray: "",

    // Actions

        calculateParameters: function() {
            let style = this.styleParam
            style["--td__width"] = (0.08 * Math.min(document.documentElement.clientHeight, document.documentElement.clientWidth)).toFixed(0)
            style["--td__height"] = style["--td__width"]
            style["--myTable__font_size"] = (style["--td__width"] * 0.4).toFixed(0) 
            style["--td__border_radius"] = (style["--td__width"] * 0.15).toFixed(0)
        },

        setParamToCSS: function() {
            // Loosing virginity (CSS+JS).
            for (const [key, value] of Object.entries(this.styleParam)) {
                this.htmlObj.style.setProperty(key, value);
            }
        },

        reload: function() {
            this.calculateParameters()
            this.setParamToCSS()
        },

        removeSelectClasses: function() {
            this.tdArray.map(td => td.classList.remove(...this.selectClasses))
        },

        setSelection: function(event) {
            // Clear classes of selection
            this.removeSelectClasses()

            // Set new classes
            let tdSelected = this.tdArray.filter(cell => cell == event.path[0])
            if (tdSelected != undefined && tdSelected.length >0) {

                // For selected row
                let rowIndex = event.path[1].rowIndex
                let selectedRowCells = [...myTable.rows[rowIndex].cells]
                selectedRowCells.map(cell => cell.classList.add(this.selectClasses[0])) // this.selectClasses[0] =  "selected_row"

                // For selected column
                let columnIndex = event.path[0].cellIndex
                let selectedColumnCells = this.tdArray.filter(cell => cell.cellIndex == columnIndex)
                selectedColumnCells.map(cell => cell.classList.add(this.selectClasses[1])) // this.selectClasses[1] =  "selected_column"
            }
        },

        drawTable: function(quantityOfRows = 9, quantityOfColumns = 9) {
            let myTable = document.createElement("table")
            myTable.className = "myTable"
    
            let tableBgColorArr = ["#ffffff","#f0f0f0"]
    
            // Caption
            let caption = document.createElement("caption")
            myTable.appendChild(caption)
            caption.innerText = "Таблица умножения"
            caption.className = "tableCaption"
    
            for (let rowIndex = 0; rowIndex <= +quantityOfRows; rowIndex++ ) {
                
                tr = document.createElement("tr")
                for (let columnIndex = 0; columnIndex <= +quantityOfColumns; columnIndex++) {
                    
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
                    if (rowIndex == 0 || columnIndex == 0) {
                        td.className = "captionNumber"
                    } else {
                        td.bgColor = tableBgColorArr[rowIndex % 2]
                    }
                    
                    tr.appendChild(td)
                }

                myTable.appendChild(tr)
            }

            this.htmlObj = myTable
            this.tdArray = [...this.htmlObj.querySelectorAll("td")]
            this.reload()
        }
    }


// Code

    myTableObj.drawTable()
    let myTable = myTableObj.htmlObj
    let tableWrapper = document.body.getElementsByClassName("tableWrapper")[0]
    tableWrapper.appendChild(myTable)

// Events

    // If user resize window
    window.onresize = function() { // Цікаво onresize реагирует на разворачивание окна на весь экран.
        myTableObj.reload()
    };

    // If user select table
    myTable.onmouseover = function(event){
        myTableObj.setSelection(event)
    }

    //  If user unselect table
    myTable.onmouseout = function(){
        myTableObj.removeSelectClasses()
    }

// Интересно, что если я передвину блок "Code" вверх или вниз, ничего работать не будет. Т.е. объекты объявляем вверху. События пишем внизу.