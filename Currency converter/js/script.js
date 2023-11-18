const dropList = document.querySelectorAll(".drop-list select"),
fromCurrency = document.querySelector("from select"),
toCurrency = document.querySelector(".to select"),
getButton = document.querySelector("form button");



for (let i = 0; i < dropList.length; i++){
    for(currency_code in country_code){
        // selecting USD as by default as FROM currency and NPR as TO currency
        let selected;
        if (i == 0){
            selected = currency_code == "USD" ? "selected" : "";
        }else if(i == 1){
            selected = currency_code == "NPR" ? "selected" : "";
            
        }
        // Creating option tag with passing currency code as a text and value
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        // inserting options tag inside select tag
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
   }
   dropList[i].addEventListener("change", e=>{
    loadFlag(e.target);
   })
}

function loadFlag(element){
    for(code in country_code){
        if(code == element.value){
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `https://flagsapi.com/${country_code[code]}/flat/64.png`
        }
    }
}

window.addEventListener("load", ()=>{
    getExchangeRate();
});

getButton.addEventListener("click", e=>{
    e.preventDefault();  //preventing form from submitting
    getExchangeRate();
});

const exchangeIcon = document.querySelector(".drop-list .icon");
exchangeIcon.addEventListener("click", ()=>{
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate();
})


function getExchangeRate(){
    const amount = document.querySelector(".amount input");
    exchangeRateTxt = document.querySelector(".exchange-rate");
    let amountVal = amount.value;
    // if user don't enter any value or enters 0 then by default 1 will be shown
    if(amountVal == "" || amountVal == "0"){
        amount.value = "1";
        amountVal = 1;
    }


    exchangeRateTxt.innerText = "Getting exchange rate...";
    let url = `https://v6.exchangerate-api.com/v6/86022c6bf866d9793d1cc5c8/latest/${fromCurrency.value}`;
    fetch(url).then(response =>response.json()).then(result =>{
        let exchangeRate = result.conversion_rates[toCurrency.value];
        let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
        exchangeRateTxt.innerText = `$(amountVal} 4{fromCurrency.value} = ${totalExchangeRate} ${fromCurrency.value}`;
    }).catch(() =>{
        exchangeRateTxt.innerText = "Something went wrong";
    });

}
