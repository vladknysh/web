const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    handleLocation();
};

const routes = {

    "/webclass/Lab9/": "/webclass/Lab9/index.html",
    "/webclass/Lab9/catalog": "/webclass/Lab9/pages/catalog.html",
    "/webclass/Lab9/catalog/1": "/webclass/Lab9/pages/catalog_data.html",
    "/webclass/Lab9/catalog/2": "/webclass/Lab9/pages/catalog_data.html",
    "/webclass/Lab9/catalog/3": "/webclass/Lab9/pages/catalog_data.html",
    "/webclass/Lab9/catalog/4": "/webclass/Lab9/pages/catalog_data.html",
    "/webclass/Lab9/catalog/5": "/webclass/Lab9/pages/catalog_data.html",
    "/webclass/Lab9/catalog/6": "/webclass/Lab9/pages/catalog_data.html",
};
const endsWithNumber = (text) => {
    return /\d$/.test(text);
}
function getRandomInt(max) {
    return Math.floor(Math.random() * max)+1;
  }
const handleLocation = async () => {
    const path = window.location.pathname;
    const route = routes[path];
    
    if (path === "/webclass/Lab9/") {
        const html = await fetch('/webclass/Lab9/index.html').then((data) => data.text());
        document.getElementsByTagName("html")[0].innerHTML = html;
    }
    else if (endsWithNumber(path)) {
        const html = await fetch('/webclass/Lab9/pages/catalog_data.html').then((data) => data.text());
        const data = await fetch(`/webclass/Lab9/data/catalog${path.slice(-1)}.json`).then((response) => response.json()).then((responseData) => responseData);
        const dataTitles = await fetch(`/webclass/Lab9/data/catalog.json`).then((response) => response.json()).then((responseData) => responseData);
        if (data) {
            let dataText = "";

            for (const item of data.data) {
                dataText += `<div class="flex flex-col">
                    <div  class="relative flex  overflow-hidden p-4  w-full h-full m-auto mb-2">
        
                <div class="w-full h-full absolute left-0 top-0 z-10 border-white border-2 "></div>
                <img src="${item.image}" class="w-full h-full z-0 opacity-90 object-cover" alt="">
             
                    <div class="absolute left-0 bottom-0 z-30 p-7 h-48 overflow-hidden  w-full">
                    <div class="flex w-full  justify-between  items-center">
                    <h3  class="font-bold text-2xl mr-2">Title: ${item.shortname}</h3>                      

                    <p class="opacity-60 text-xs">Price: ${item.price}</p>
                </div>
                        <p class="opacity-60 text-sm">Notes: ${item.description}</p>
                        
                    </div>
            </div>
            </div>`

            }
            dataText += '';
            document.getElementById("app").innerHTML = html;
            document.getElementById('catalog-section').innerHTML = dataText
            let title = "";
            for (const item of dataTitles.data) {
                if (item.id == path.slice(-1)) { 
                    title += item.name;
                    break;
                }
            }
            document.getElementById('catalog-h1').innerHTML = title;
            return;


        }
    }
    else {
        const html = await fetch("/webclass/Lab9/pages/catalog.html").then((data) => data.text());
        const data = await fetch(`/webclass/Lab9/data/catalog.json`).then((response) => response.json()).then((responseData) => responseData);

        if (data) {
            let dataText = "";

            for (const item of data.data) {
                dataText += `<div class="flex flex-col">
                <a href="/webclass/Lab9/catalog/${item.id}" onclick="route()" class="relative inline-flex overflow-hidden p-4 w-full h-full m-auto mb-2">
                  <div class="w-full h-full absolute left-0 top-0 z-10 border-white border-2"></div>
                  <img src="${item.image}" class="w-full h-full z-0 opacity-90 object-cover" alt="">
                  <div class="absolute left-0 bottom-0 z-30 p-7 h-48 overflow-hidden w-full">
                    <h3 class="font-bold">Title: ${item.shortname}</h3>
                    <p class="text-sm">Notes: ${item.notes}</p>
                  </div>
                </a>
                <a href="/webclass/Lab9/catalog/${item.id}" class="inline-block px-6 py-3 font-semibold bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full shadow-md hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 hover:shadow-lg transition duration-300 ease-in-out" onclick="route()">Go to</a>
              </div>`
            }
            dataText += `<a class="inline-flex col-span-3 justify-center items-center p-2 w-full font-bold bg-red-500 rounded-lg shadow-md hover:bg-red-600 transition duration-300 ease-in-out" href="/webclass/Lab9/catalog/${getRandomInt(data.data.length)}" onclick="route()">Random Catalog</a>
            `;
            document.getElementById("app").innerHTML = html;
            document.getElementById('catalog-section').innerHTML = dataText
            return;


        }
        document.getElementById("app").innerHTML = html;
    }
};

window.onpopstate = handleLocation;
window.route = route;
window.onbeforeunload = function () {
    window.setTimeout(function () {
        window.location = '/webclass/Lab9/';
    }, 0);
    window.onbeforeunload = null; // necessary to prevent infinite loop, that kills your browser 
}
handleLocation();
