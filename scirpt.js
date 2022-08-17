const url = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json";
let now = `${new Date()}`;
now = now.slice(0,25);

const money = document.querySelectorAll(".money");
const lang = document.querySelectorAll(".lang");
let data = document.querySelectorAll(".data");
const button = document.querySelector("form .btn");
let res = document.querySelector("form .res");
let czk_ukr = document.querySelector(".czk_ukr");

async function Server(){
    try{
        const response = await fetch(url)
        let result = await response.json()
        let select = document.querySelector(".select")
        let czk = result.find(item => item.cc == "CZK")
        let pln = result.find(item => item['r030'] == "985")
        let languages = [czk, pln];
        for (let i = 0; i < languages.length; i++) {
            lang[i].innerHTML = languages[i].cc + '-UAH';
            money[i].innerHTML = languages[i].rate + '₴';
            data[i].innerHTML = now;
        }
        
        button.onclick = () => {
            let input = document.querySelector("form .input").value;
            let num = input;
            if(isNaN(num)){
                res.innerHTML = `Symbols aren't numbers!`;
            }
            switch(select.value){
                case "CZK-UKR":
                    num *= czk.rate;
                    break;
                case "PLN-UKR":
                    num *= pln.rate;
                    break;
                case "UKR-CZK":
                    num /= czk.rate;
                    break;
                case "UKR-PLN":
                    num /= pln.rate;
                    break;
                case "CZK-PLN":
                    num *= (czk.rate / pln.rate);
                    break;
                case "PLN-CZK":
                    num *= (pln.rate / czk.rate);
                    break;
            }
            num = num.toFixed(2);
            res.innerHTML = `${num}`;
            return false;
        };
        

    }catch(e){
        alert(e)
    }
    
}

Server();
