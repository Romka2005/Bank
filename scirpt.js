const url = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json";
let now = `${new Date()}`.slice(0,25);

const money = document.querySelectorAll(".money");
const lang = document.querySelectorAll(".lang");
let data = document.querySelectorAll(".data");
const button = document.querySelector("form .btn");
let res = document.querySelector("form .result");

async function Server() {
    try{
        const response = await fetch(url)
        let result = await response.json()
        let select = document.querySelectorAll(".select")
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
            let element = '';
            for (const el of select) {
                element += el.value;
                switch(element) {
                    case "CZKUAH":
                        num *= czk.rate;
                        break;
                    case "PLNUAH":
                        num *= pln.rate;
                        break;
                    case "UAHCZK":
                        num /= czk.rate;
                        break;
                    case "UAHPLN":
                        num /= pln.rate;
                        break;
                    case "CZKPLN":
                        num *= (czk.rate / pln.rate);
                        break;
                    case "PLNCZK":
                        num *= (pln.rate / czk.rate);
                        break;
                }
            }
            if(isNaN(num)) {
                res.value = `Error`;
            }
            else {
                num = num.toFixed(3);
                res.value = `${num}`;
            }
            return false;
        };
    }catch(e) {
        alert(e)
    }
    
}

Server();
