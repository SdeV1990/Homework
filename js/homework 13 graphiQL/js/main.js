// Request to GraphiQL
const getGQL = (url, query, variables) => { 

    return fetch(url , 
        {
            method: 'POST',
            headers:{
                "Content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({
                query, variables
            })
        }
    ).then(res => res.json())
}

// Selected category name
let selectedCategiryName = document.getElementsByClassName("section")[0].children[0]

// Place for caption
let captionField = document.getElementsByClassName("section")[0].children[1]

// Container of cards
let cardContainer = document.getElementsByClassName("container_of_cards")[0]

// Create subcategories
let subCategories

// Create categories
let categories
createCategories()
async function createCategories() {

    // GraphiQL request string to get all categories
    let query = `query getCategories{
    CategoryFind(query:"[{}]"){
        _id
        name
        parent {
            _id
        }
        goods {
            _id
        }
        subCategories{
            _id
            name
            goods {
                _id
            }
        }
    }}`    

    // Get data to of categories
    await getGQL("http://shop-roles.asmer.fs.a-level.com.ua/graphql", query, {})
        .then(res => res.data.CategoryFind)
        .then(data => {

            // Create categories class
            categories = new Categories(
                document.getElementsByClassName("burger_menu__nav")[0],
                data
            )
        })

    // Create list of categories
    categories.createListCategories()
    
}

// Get data of goods by category
async function getGoodsData(categoryId) {

    // GraphiQL request string to get all categories
    let query = `query getOneCategory {
        CategoryFindOne(query: \"[{\\"_id\\": \\"${categoryId}\\"}]\") {
              goods {
            _id
            name
            description
            price
            images {url}
          }
        }
      }`    

    // Get data to of categories
    let result
    await getGQL("http://shop-roles.asmer.fs.a-level.com.ua/graphql", query, {})
        .then(res => res.data)
        .then(data => result = data.CategoryFindOne.goods)

     return result
    
}

// Categories constructor
function Categories(parent, data) {

    // Data categories
    this.dataCategories = data

    // Create list object
    this.listObj = elementConstructor("ul", "nav_list", parent)

    // Create categories list
    this.createListCategories = () => {
        
        // For each category
        this.dataCategories.map(category => {
            
            // If category not contain parent
            if (category.parent === null) {
            
                // Create li
                let li = elementConstructor("li", "", this.listObj)
            
                // Create button
                button = elementConstructor("button", "", li)
                button.innerHTML = category.name

                button.onclick = (event) => {

                    // Write selected category name
                    selectedCategiryName.innerText = category.name
                    
                    // If contain subcategories - clear current list and create list of subcategories
                    if (category.subCategories !== null) {

                        // Clear container of cards
                        cardContainer.innerHTML = ""

                        // Create subcategories
                        this.listObj.innerHTML = ""
                        subCategories = new Subcategories(parent, category.subCategories)
                        subCategories.createListSubCategories()
                    }

                    // If contain goods - create cards
                    if (category.goods !== null) {

                        // Clear container of cards
                        cardContainer.innerHTML = ""

                        // Get goods data by category
                        getGoodsData(category._id)
                        .then(data => {

                            // Create cards
                            let cards = new Cards(data)
                            cards.createCards()

                        })

                    }
                    // If category not contain goods and not contain subcategories
                    else if (category.goods === null &&  category.subCategories === null){

                        // Goods arn't found
                        captionField.innerText = "Товары не найдены"

                    }
                
                }

            }
        })
    }
}

// Subcategories constructor
function Subcategories(parent, data) {

    // Data categories
    this.dataSubcategories = [...data]

    // Create list object
    this.listObj = elementConstructor("ul", "nav_list", parent)

    // Create categories list
    this.createListSubCategories = () => {
      
        // Create li with "back" button
        let li = elementConstructor("li", "", this.listObj)
        
        // Create button "back"
        let buttonBack = elementConstructor("button", "", li)
        buttonBack.innerHTML = "Назад"

        buttonBack.onclick = (event) => {

            // Clear selected category name
            selectedCategiryName.innerText = "Выберите товар"

            // Clear container of cards
            cardContainer.innerHTML = ""

            // Clear list of subcategories and create main list categories
            this.listObj.innerHTML = ""
            categories.createListCategories()

            // Clear caption
            captionField.innerText = ""
        }

        // li.appendChild(buttonBack)
        
        // For each category
        this.dataSubcategories.map(subcategory => {
          
            // Create li
            let li = elementConstructor("li", "", this.listObj)
                
            // Create button
            let button = elementConstructor("button", "", li)
            button.innerHTML = subcategory.name

            button.onclick = (event) => {

                // Write selected category name
                selectedCategiryName.innerText = subcategory.name

                // Clear container of cards
                cardContainer.innerHTML = ""

                // If contain goods - create cards
                if (subcategory.goods !== null) {
                    
                    // Clear container of cards
                    cardContainer.innerHTML = ""

                    // Get goods data by subcategory
                    getGoodsData(subcategory._id)
                        .then(data => {

                            // Create cards
                            let cards = new Cards(data)
                            cards.createCards()

                        })

                }
                // If subcategory not contain goods
                else { 

                    // Clear container of cards
                    cardContainer.innerHTML = ""

                    // Write caption - goods arn't found
                    captionField.innerText = "Товары не найдены"
                    
                }
                
            }

        })
    }
}

// Card constructor
function Cards(data) {

    // Set parent element
    let parent = cardContainer

    // Set data
    this.data = data

    // Create card
    this.createCards = () => {        
        
        // Clear parent
        parent.innerHTML = ""
        
        // For each good
        data.map(good => {

            // Create card
            let card = elementConstructor("div", "card", parent)
            
            // Create card content
            let cardContent = elementConstructor("div", "card_content", card)

            // Create content wrapper
            let contentWrapper = elementConstructor("div" , "content_wrapper", cardContent)

            // Create picture holder
            let pictureHolder = elementConstructor("div", "pic_holder", contentWrapper)

            // Create picture
            let picture = elementConstructor("img", "", pictureHolder)
            picture.src = "http://shop-roles.asmer.fs.a-level.com.ua/" + good.images[0].url
            picture.alt = ""

            // Create card title
            let title = elementConstructor("h2", "card_title", contentWrapper)
            title.innerText = good.name

            // Create description
            let description = elementConstructor("p", "", contentWrapper)
            description.innerText = good.description

            // Create price
            let price = elementConstructor("h2", "price", cardContent)
            price.innerText =  good.price.toLocaleString() + " $"

            // Create button
            let button = elementConstructor("a", "button", card)
            button.innerText = "Go"

            // Example
            // <div class="card">
            //     <div class="card_content">
            //         <div class="content_wrapper">
            //             <div class="pic_holder">
            //                 <img src="url" alt="">
            //             </div>
            //             <h2 class="card_title">
            //                 Title
            //             </h2>
            //             <p>
            //                 Description.
            //             </p>
            //         </div>
            //         <h2 class="card_price">
            //             Price.
            //         </h2>
            //     </div>
            //     <a href="#" class="button">Go</a>
            // </div>

        })
    }
}

// Constructor of elements
function elementConstructor(element, slassName, parent) {

    // Create element
    let newElement = document.createElement(element) 

    // Set class name
    if (slassName !== "") newElement.className = slassName

    // Appent new element to parent
    parent.appendChild(newElement)

    return newElement
    
}

