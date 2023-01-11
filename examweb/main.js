const url = "http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/";
const apiKey = "9256d97b-2265-4342-a81f-8fc7f82ad611";

const holidays = [                                 
    "01-01",
    "02-23",
    "03-08",
    "05-09",
    "09-01",
    "06-12",
    "05-01",
];

function showAlert(error, color) {                             
    let alerts = document.querySelector(".alerts");
    let alert = document.createElement("div");
    alert.classList.add("alert", "alert-dismissible", color);
    alert.setAttribute("role", "alert");
    alert.append(error);
    let btn = document.createElement("button");
    btn.setAttribute("type", "button");
    btn.classList.add("btn-close");
    alert.classList.add("position-sticky");
    alert.classList.add("end-50");
    alert.classList.add("my-0");
    btn.setAttribute("data-bs-dismiss", "alert");
    btn.setAttribute("aria-label", "Close");
    alert.append(btn);
    alerts.append(alert);
    setTimeout(() => alert.remove(), 4000);
}

function clickMainObject(event) {                                             
    let mainObject = document.querySelector(".btn-main-object");
    mainObject.textContent = event.target.textContent;
    newSearch();
}

function createTooltipTh(data) {                                              
    let desc = document.createElement("th");
    desc.setAttribute("data-bs-toggle", "tooltip");
    desc.setAttribute("data-bs-placement", "top");
    desc.setAttribute("data-bs-custom-class", "custom-tooltip");
    desc.setAttribute("data-bs-title", data);
    return desc;
}

function createTooltip(data) {                                               
    let desc = document.createElement("td");
    desc.setAttribute("data-bs-toggle", "tooltip");
    desc.setAttribute("data-bs-placement", "top");
    desc.setAttribute("data-bs-custom-class", "custom-tooltip");
    desc.setAttribute("data-bs-title", data);
    return desc;
}

function onClickGuide(event) {                                               
    if (!event.target.classList.contains("btn")) return;
    let oldBtn = document.querySelector(".btn-guide");
    if (oldBtn) {
        oldBtn.classList.remove("btn-guide");
        oldBtn.classList.remove("btn-secondary");
        oldBtn.classList.add("btn-light");
    }
    event.target.classList.add("btn-guide");
    event.target.classList.remove("btn-light");
    event.target.classList.add("btn-secondary");
    document.querySelector(".checkout-route").removeAttribute("disabled");
    document.querySelector(".checkout-route").scrollIntoView();
}

function createLanguageList(guides) {                                       
    let newList = [];
    let list = document.querySelector(".language-list");
    let li = document.createElement("li");
    let a = document.createElement("a");
    a.setAttribute("href", "#lan");
    a.classList.add("dropdown-item")
    a.textContent = "Язык экскурсии";
    li.append(a);
    list.append(li);
    for (let guide of guides) {
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.setAttribute("href", "#lan");
        a.classList.add("dropdown-item")
        a.textContent = guide.language;
        li.append(a);
        if (!newList.includes(guide.language)) {
            newList.push(guide.language);
            list.append(li);
        }
    }
}

function fieldsDisable(lan, minExp, maxExp, searchBtn){
    lan = document.querySelector(".btn-language")
    minExp = document.querySelector("#work-min-experience")
    maxExp = document.querySelector("#work-max-experience")
    minExp.value = ""
    maxExp.value = ""
    createGuidesTable([])
    searchBtn = document.querySelector(".search-btn-guides")
    lan.setAttribute("disabled", "")
    minExp.setAttribute("disabled", "")
    maxExp.setAttribute("disabled", "")
    searchBtn.setAttribute("disabled", "")
} 
function fieldsEnable(lan, minExp, maxExp, searchBtn){
    lan = document.querySelector(".btn-language")
    minExp = document.querySelector("#work-min-experience")
    maxExp = document.querySelector("#work-max-experience")
    searchBtn = document.querySelector(".search-btn-guides")
    lan.disabled = false
    minExp.disabled = false
    maxExp.disabled = false
    searchBtn.disabled = false
} 


function createGuidesTable(guides, lang, minInput, maxInput) {                  
    let guidesTable = document.querySelector(".table-guides");
    guidesTable.innerHTML = "";
    document.querySelector(".language-list").innerHTML = "";
    createLanguageList(guides);
    for (let guide of guides) {
        let row = document.createElement("tr");
        row.classList.add("fs-6");
        let th = document.createElement("th");               
        th.setAttribute("scope", "row");
        th.classList.add("fs-1");
        th.classList.add("text-center");
        let icon = document.createElement("span");
        icon.classList.add("bi");
        icon.classList.add("bi-person-rolodex");
        th.append(icon);
        row.append(th);

        let nameGuide = document.createElement("td");              
        nameGuide.classList.add("nameOfGuide");
        nameGuide.textContent = guide.name;
        row.append(nameGuide);

        let languageGuide = document.createElement("td");          
        languageGuide.textContent = guide.language;
        row.append(languageGuide);

        let workExp = document.createElement("td");             
        workExp.textContent = guide.workExperience;
        row.append(workExp);

        let price = document.createElement("td");                  
        price.classList.add("priceOfGuide");
        price.textContent = guide.pricePerHour;
        row.append(price);

        let btnTd = document.createElement("td");              
        let btn = document.createElement("button");
        btn.classList.add("btn");
        btn.classList.add("btn-light");
        btn.setAttribute("type", "button");
        btn.setAttribute("aria-expanded", "false");
        btn.textContent = "✓";
        btn.setAttribute("data-guide-id", guide.id);
        btnTd.append(btn);
        btnTd.onclick = onClickGuide;
        row.append(btnTd);
        
        if ((lang == guide.language || lang == "Язык экскурсии") && (minInput <= guide.workExperience) && (guide.workExperience <= maxInput)) guidesTable.append(row);
    }
    if (document.querySelector(".table-guides").children.length == 0) {
        document.querySelector(".checkout-route").setAttribute("disabled", "");
    }
}

function createWorkExperience(data) {                             
    let minInput = document.querySelector("#work-min-experience");
    let maxInput = document.querySelector("#work-max-experience");
    maxInput.value = "";
    minInput.value = "";
    let min = 1000;
    let max = 0;
    for (let guide of data) {
        if (guide.workExperience < min) {
            min = guide.workExperience;
        }
        if (guide.workExperience > max) {
            max = guide.workExperience;
        }
    }
    maxInput.value = max;
    minInput.value = min;
}

async function searchingGuides(idRoute) {                                  
    let nUrl = new URL(url + "routes/" + idRoute + "/guides");
    nUrl.searchParams.append("api_key", apiKey);
    try {
        let response = await fetch(nUrl);
        let data = await response.json();
        createGuidesTable(data, "Язык экскурсии", 0, 100);
        createWorkExperience(data);
    } catch (error) {
        console.log(error.message);
    }
}

function searchGuidesForRoute(event) {
    let oldBtn = event.target.parentNode.parentNode.parentNode.querySelector(".btn-secondary");
    lan = document.querySelector(".btn-language")
    lan.textContent = "Язык экскурсии";
    if (oldBtn && oldBtn.id == event.target.id) {
        oldBtn.classList.remove("btn-secondary");
        oldBtn.classList.add("btn-light");
        fieldsDisable()
    } else {
        fieldsEnable()
        if (!event.target.classList.contains("btn-for-guides")) return;
        document.querySelector(".search-btn-guides").setAttribute("data-route-id", event.target.id);
        document.querySelector(".checkout-route").setAttribute("disabled", "");
        let nameOfRoute = document.querySelector(".guides").querySelector("p");
        nameOfRoute.textContent = "";
        nameOfRoute.scrollIntoView();
        if (oldBtn) {
            oldBtn.classList.remove("btn-secondary");
            oldBtn.classList.add("btn-light");
        }

        event.target.classList.remove("btn-light");
        event.target.classList.add("btn-secondary");
        let str = "Доступные гиды по маршруту: ";
        let onClickRoute = event.target.parentNode.parentNode;
        nameOfRoute.textContent = str + onClickRoute.firstChild.getAttribute("data-bs-title");
        searchingGuides(event.target.id);
    }
}

function createRoute(data) {                     
    let table = document.querySelector(".table-routes");
    let row = document.createElement("tr");
    let th = createTooltipTh(data.name);               
    th.setAttribute("scope", row);
    let numOfChars = 0;
    let name = "";
    for (let char of data.name) {
        if (numOfChars == 30) {
            name += "...";
            break;
        }
        name += char;
        numOfChars++
    }
    
    th.textContent = name;
    row.append(th);

               
    numOfChars = 0;
    let descWords = "";
    for (let char of data.description) {
        if (numOfChars == 20) break;
        descWords += char;
        numOfChars++;
    }
    let desc = createTooltip(data.description);

    desc.textContent = descWords + "...";
    row.append(desc);

    
    numOfChars = 0;
    let mainObjects = "";
    for (let char of data.mainObject) {

        if (numOfChars == 20) break;
        mainObjects += char;
        numOfChars++;
    }
    let mainObj = createTooltip(data.mainObject);
    mainObj.textContent = mainObjects + "...";
    row.append(mainObj);

    let btnTd = document.createElement("td");              
    let btn = document.createElement("button");
    btn.classList.add("btn");
    btn.classList.add("btn-light");
    btn.classList.add("btn-for-guides");
    btn.setAttribute("type", "button");
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("id", data.id);
    
    btn.textContent = "✓";
    btnTd.append(btn);
    btnTd.onclick = searchGuidesForRoute;
    row.append(btnTd);

    table.append(row);
}

function createTableRouteElements(allData, activePage) {                     
    document.querySelector(".table-routes").innerHTML = "";
    let pagination = document.querySelector(".pagination");
    pagination.innerHTML = "";

    to = (allData.length == 0) ? 1 : Math.ceil(allData.length / 10)

    for (let i = 1; i < to + 1; i++) {
        let li = document.createElement("li");
        li.classList.add("page-item");
        let a = document.createElement("a");
        a.classList.add("page-link");
        a.classList.add("bg-secondary");
        a.classList.add("text-light");
        if (activePage == i) a.classList.add("active");
        a.setAttribute("href", "#pages");
        a.textContent = i;
        li.append(a);
        pagination.append(li);
    }
    let currentPage = activePage
    let start = currentPage * 10 - 10;
    let end = (start + 10) > allData.length ? (start + allData.length % 10) : start + 10;
    for (let i = start; i < end; i++) {
        createRoute(allData[i]);
    }
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
}

function downloadMainObjectsList(data) {                         
    let dropList = document.querySelector(".main-objects-list");
    newList = [];
    for (let drop of data) {
        let l = drop.mainObject.split(" - ");
        for (let newObj of l) {
            let li = document.createElement("li");
            let a = document.createElement("a");
            a.classList.add("dropdown-item");
            a.setAttribute("href", "#sights");
            shortString = newObj.substring(0, 15);
            seenString = shortString + "...";
            if (!newList.includes(seenString)) {
                a.textContent = seenString
                a.setAttribute("data-bs-toggle", "tooltip");
                a.setAttribute("data-bs-placement", "top");
                a.setAttribute("data-bs-custom-class", "custom-tooltip");
                a.setAttribute("data-bs-title", newObj);
                newList.push(shortString);
                li.append(a);
                dropList.append(li);
            }
        }
    }
    return newList
}

async function getData() {
    try {
        let nUrl = new URL(url + "routes");
        nUrl.searchParams.append("api_key", apiKey);
        let response = await fetch(nUrl);
        let data = await response.json();
        return data
    } catch (error) {
        showAlert(error.message, "alert-danger");
    }
}

function expListener() {
    input = document.querySelector("#work-min-experience")
    input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.querySelector(".search-btn-guides").click();
        }
    })
    input = document.querySelector("#work-max-experience")
    input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.querySelector(".search-btn-guides").click();
        }
    })
}

function waysSearchBtnListener() {
    input = document.querySelector(".search-field")
    input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.querySelector(".search-btn").click();
        }
    })
}

function newSearch() {
    activePage = 1
    searchBtnHandler(activePage)
}

async function searchBtnHandler(activePage) {
    try {
        data = await getData()
        newList = downloadMainObjectsList(data);
        let searchField = document.querySelector(".search-field").value.toLowerCase();
        let nUrl = new URL(url + "routes");
        nUrl.searchParams.append("api_key", apiKey);
        let mainObjText = document.querySelector(".btn-main-object").textContent.slice(0, -3);
        if (newList.includes(mainObjText)) findList = [mainObjText];
        else findList = newList.slice();
        console.log(findList)
        let newRoutes = [];
        for (let route of data) {
            for (let obj of findList) {
                if (route.mainObject.includes(obj)) {
                    if (searchField.length != 0) {
                        if (!route.name.toLowerCase().includes(searchField)) {
                            continue
                        }
                    }
                    newRoutes.push(route);
                    break
                }
            }
        }
        createTableRouteElements(newRoutes, activePage);
    } catch (error) {
        showAlert(error.message, "alert-danger");
    }
}

function pageBtnHandler(event) {                                     
    if (!event.target.classList.contains("page-link")) return;
    activePage = event.target.textContent
    searchBtnHandler(activePage);
}

async function searchGuidesWithLanguageClick() {                    
    let language = document.querySelector(".btn-language");
    let minInput = document.querySelector("#work-min-experience");
    let maxInput = document.querySelector("#work-max-experience");
    let dataRouteId = document.querySelector(".search-btn-guides").getAttribute("data-route-id");
    let nUrl = new URL(url + "routes/" + dataRouteId + "/guides");
    nUrl.searchParams.append("api_key", apiKey);

    try {
        let response = await fetch(nUrl);
        let data = await response.json();
        createGuidesTable(data, language.textContent, minInput.value, maxInput.value);
    } catch (error) {
        showAlert("Не найдено", "alert-warning");
    }
}

function btnLanguageClick(event) {                           
    if (!event.target.classList.contains("dropdown-item")) return;
    document.querySelector(".btn-language").textContent = event.target.textContent;
    searchGuidesWithLanguageClick();
}

function changeWorkExperience(event) {

}

async function searchGuidesWithFilters(event) {                  
    let language = document.querySelector(".btn-language");
    let minInput = document.querySelector("#work-min-experience");
    let maxInput = document.querySelector("#work-max-experience");

    let nUrl = new URL(url + "routes/" + event.target.getAttribute("data-route-id") + "/guides");
    nUrl.searchParams.append("api_key", apiKey);

    try {
        let response = await fetch(nUrl);
        let data = await response.json();
        createGuidesTable(data, language.textContent, minInput.value, maxInput.value);
    } catch (error) {
        showAlert("Не найдено", "alert-warning");
    }
}

function numberOfVisitors() {                
    let form = document.querySelector("#create-task-form");
    let number = form.elements["customRange2"].value;
    let plus = 0;
    if (number <= 5) plus = 0;
    else if ((number > 5) && (number <= 10)) plus = 1000;
    else if ((number > 10) && (number <= 20)) plus = 1500;
    return plus;
}

function guideServiceCost() {                
    let form = document.querySelector("#create-task-form");
    let checkedGuide = document.querySelector(".btn-guide");
    let guideInfo = checkedGuide.parentElement.parentElement.children;
    let route = document.querySelector(".guides").textContent.split(":");
    let name = "";
    let price = 0;

    for (let guide of guideInfo) {
        if (guide.classList.contains("nameOfGuide")) name = guide.textContent;
        if (guide.classList.contains("priceOfGuide")) price = parseInt(guide.textContent);
    }
    return price;
}

function isThisDayOff() {                          
    let form = document.querySelector("#create-task-form");
    let isHoliday = new Date(form.elements["date"].value);
    let YearMonthDay = isHoliday.toJSON().slice(0, 10).split("-");
    let MonthDay = YearMonthDay[1] + "-" + YearMonthDay[2];
    let plus = 1;
    if ((isHoliday.getDay() == 0) || (isHoliday.getDay() == 6) || (holidays.includes(MonthDay))) {
        plus = 1.5;
    }
    return plus;
}

function isItMorningOrEvening() {              
    let form = document.querySelector("#create-task-form");
    let time = parseInt(form.elements["time"].value.split(":")[0]);
    let plus = 0;
    if ((time >= 9) && (time < 12)) plus = 400;
    else if ((time >= 20) && (time <= 23)) plus = 1000;
    return plus;
}

function hoursNumber() {                         
    let form = document.querySelector("#create-task-form");
    let hours = form.elements["selectLength"].value;
    return hours;
}

function checkOptionFirst() {              
    let option = document.querySelector("#option1");
    let price = 1;
    if (option.checked) {
        price = 0.75;
    }
    return price;
}

function checkOptionSecond() {                   
    let option = document.querySelector("#option2");
    let price = 0;
    let form = document.querySelector("#create-task-form");
    let number = form.elements["customRange2"].value;
    if (option.checked) {
        price = 1000 * number;
    }
    return price;
}

function changeNumberOfPeople(event) {               
    document.querySelector("#number-people").value = event.target.value;
    let form = document.querySelector("#create-task-form");
    let checkedGuide = document.querySelector(".btn-guide");
    let guideInfo = checkedGuide.parentElement.parentElement.children;
    let route = document.querySelector(".guides").textContent.split(":");
    let name = "";
    let price = 0;
    let hours = form.elements["selectLength"].value;
    for (let guide of guideInfo) {
        if (guide.classList.contains("nameOfGuide")) name = guide.textContent;
        if (guide.classList.contains("priceOfGuide")) price = parseInt(guide.textContent);
    }
    price = (guideServiceCost() * hoursNumber() * isThisDayOff() + isItMorningOrEvening() + numberOfVisitors() + checkOptionSecond()) * checkOptionFirst();
    form.elements["price"].value = parseInt(price);
}

function checkoutRoute(event) {                      
    let form = document.querySelector("#create-task-form");
    let checkedGuide = document.querySelector(".btn-guide");
    let guideInfo = checkedGuide.parentElement.parentElement.children;
    let route = document.querySelector(".guides").textContent.split(":");
    let date = new Date();
    date.setDate(date.getDate() + 1);
    form.querySelector("#date").value = date.toJSON().slice(0, 10);
    form.querySelector("#date").setAttribute("min", date.toJSON().slice(0, 10));
    let name = "";
    let price = 0;
    for (let guide of guideInfo) {
        if (guide.classList.contains("nameOfGuide")) name = guide.textContent;
        if (guide.classList.contains("priceOfGuide")) price = parseInt(guide.textContent);
    }
    form.elements["name"].value = name;
    form.elements["route"].value = route[1];
    price = (guideServiceCost() * hoursNumber() * isThisDayOff() + isItMorningOrEvening() + numberOfVisitors() + checkOptionSecond()) * checkOptionFirst();
    form.elements["price"].value = parseInt(price);
}

function changeTotalPrice(event) {           
    let form = document.querySelector("#create-task-form");
    price = (guideServiceCost() * hoursNumber() * isThisDayOff() + isItMorningOrEvening() + numberOfVisitors() + checkOptionSecond()) * checkOptionFirst();
    form.elements["price"].value = parseInt(price);
}

async function sendRequest(event) {                               
    if (!event.target.classList.contains("create-btn")) return;
    let formForSend = new FormData();
    let guideId = document.querySelector(".btn-guide").getAttribute("data-guide-id");
    let routeId = document.querySelector(".search-btn-guides").getAttribute("data-route-id");
    let form = document.querySelector("#create-task-form");
    formForSend.append("guide_id", guideId);
    formForSend.append("route_id", routeId);
    formForSend.append("date", form.elements["date"].value);
    formForSend.append("time", form.elements["time"].value);
    formForSend.append("duration", form.elements["selectLength"].value);
    formForSend.append("persons", form.elements["customRange2"].value);
    formForSend.append("price", form.elements["price"].value);
    formForSend.append("optionFirst", (form.elements["option1"].checked) ? 1 : 0);
    formForSend.append("optionSecond", (form.elements["option2"].checked) ? 1 : 0);
    let nUrl = new URL(url + "orders");
    nUrl.searchParams.append("api_key", apiKey);
    if (form.elements["time"].validity.valid) {                    
        try {
            event.target.setAttribute("type", "button");
            let modal = document.querySelector("#addTask");
            var modalInstance = bootstrap.Modal.getInstance(modal);
            modalInstance.hide();
            let response = await fetch(nUrl, {
                method: "POST",
                body: formForSend,
            });
            let data = await response.json();
            if (data.error) showAlert(data.error, "alert-danger");
            else showAlert("Заявка успешно оформлена", "alert-success");
        } catch (error) {
            showAlert(error.message, "alert-danger");
        }
    } else {
        event.target.setAttribute("type", "submit");
    }
}

window.onload = function () {
    waysSearchBtnListener()
    expListener()
    newSearch()
    document.querySelector(".main-objects-list").onclick = clickMainObject;
    document.querySelector(".pagination").onclick = pageBtnHandler;
    document.querySelector(".search-btn").onclick = newSearch;
    document.querySelector(".language-list").onclick = btnLanguageClick;
    document.querySelector(".search-btn-guides").onclick = searchGuidesWithFilters;
    document.querySelector("#customRange2").oninput = changeNumberOfPeople;
    document.querySelector(".checkout-route").onclick = checkoutRoute;
    document.querySelector("#selectLength").oninput = changeTotalPrice;
    document.querySelector("#time").oninput = changeTotalPrice;
    document.querySelector("#date").oninput = changeTotalPrice;
    document.querySelector("#option1").oninput = changeTotalPrice;
    document.querySelector("#option2").oninput = changeTotalPrice;
    document.querySelector(".create-btn").onclick = sendRequest;
};