// Load currency data.
let userCurrencySelect = document.getElementById("user_currency_select")
let exchangerCurrencySelect = document.getElementById("exchanger_currency_select")
let userCurrencyQuantity = document.getElementsByClassName("user_currency_wrapper")[0].getElementsByClassName("currency_quantity")[0]
let exchangerCurrencyQuantity = document.getElementsByClassName("exchanger_currency_wrapper")[0].getElementsByClassName("currency_quantity")[0]
let exchangeSign = document.getElementsByClassName("exchange_sign")[0].children[0]

fetch('https://api.exchangeratesapi.io/latest')
    .then(res => res.json())
    .then(data => {

        // Set first select
        for (const currency in data["rates"]) {
            const option = document.createElement("option");
            option.innerText = currency
            userCurrencySelect.append(option)
        }

        // Set second select
        for (const currency in data["rates"]) {
            const option = document.createElement("option");
            option.innerText = currency
            exchangerCurrencySelect.append(option)
        }

        // Events
        userCurrencyQuantity.oninput = calculateExchange
        userCurrencySelect.onchange = calculateExchange
        exchangerCurrencySelect.onchange = calculateExchange


        function calculateExchange() {
            let exchangeRateSale = data["rates"][userCurrencySelect.value]
            let exchangeRateBuy = data["rates"][exchangerCurrencySelect.value]
            exchangerCurrencyQuantity.value = (userCurrencyQuantity.value * +(exchangeRateBuy / exchangeRateSale).toFixed(6)).toFixed(2)
        }

        // Swap currency.
        exchangeSign.onclick = function(event) {
            [user_currency_select.value, exchanger_currency_select.value] = [exchanger_currency_select.value, user_currency_select.value]
            let rotation = exchangeSign.style["transform"] // Get transform.
            rotation =  parseInt(+(rotation).replace(/[^\d]/g, '')) + 180 // Get degrees.
            exchangeSign.style["transform"] = `rotate(${rotation}deg)`

            calculateExchange()
        }

    }
)