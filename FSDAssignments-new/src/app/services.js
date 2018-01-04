const API_END_POINT = "http://localhost:7070";
const TRADE_SERVICE_API_END_POINT = "http://localhost:8999";

function fetchJson(url){
    return fetch(url).then(
        response => {
            console.log(response);

            if (response.status == 400)
            throw new Error( "bad request, check token or token expired");

            if (response.status == 404)
             throw new Error("Resource not found");

             if (response.status == 403)
              throw new Error("Not permitted, auth needed");

             //generic
             if (response.state >= 400 && response.status < 500) {
                 throw new Error("client error");
             }

             if (response.status >= 500)
                 throw new Error("Server error ");

             if (response.status == 0)
                 throw new Error("Check network connection ");

           //since we can't know exact error
            if (!response.ok) {
             throw new Error("Request failed");
            }
            
            return response.json()
    })
}

export function fetchTrades() {
    return fetchJson(API_END_POINT + "/getTrades");
}


export function getTradeDataList() {
    return fetchJson(TRADE_SERVICE_API_END_POINT + "/get/trades/all");
}