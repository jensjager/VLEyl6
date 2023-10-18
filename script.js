(function () {
    "use strict";

    //clock

    document.addEventListener("DOMContentLoaded", function () {
        let c = document.getElementById("clock");

        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);

        function updateClock() {
            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();
            let plel = h >= 12 ? "PL" : "EL";

            if (h === 0) {
                h = 12;
            } else if (h > 12) {
                h = h - 12;
            }

            if (h < 10) {
                h = "0" + h;
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = h + ":" + m + ":" + s + " " + plel;
        }
    });

    // forms

    document
        .getElementById("form")
        .addEventListener("submit", estimateDelivery);

    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";

    function estimateDelivery(event) {
        event.preventDefault();

        let linn = document.getElementById("linn");

        if (linn.value === "") {
            alert("Palun valige linn nimekirjast");

            linn.focus();

            return;
        } else if (linn.value === "tln") {
            e.innerHTML = "0,00 &euro;";
        } else if (linn.value === "trt" || linn.value === "nrv") {
            e.innerHTML = "2,50 &euro;";
        } else if (linn.value === "prn") {
            e.innerHTML = "3,00 &euro;";
        } else {
            e.innerHTML = "ERROR";
        }

        let fname = document.getElementById("fname");
        let lname = document.getElementById("lname");
        let radiobuttons = document.getElementsByName("payment");

        if (fname.value.trim() === "") {
            alert("tekstiväljad ei tohi olla tühjad");
            fname.focus();
            return;
        } else if (lname.value.trim() === "") {
            alert("tekstiväljad ei tohi olla tühjad");
            lname.focus();
            return;
        }

        if (/^\d/.test(fname.value)) {
            alert("tekstiväljad ei tohi sisaldada numbreid");
            fname.focus();
            return;
        } else if (/^\d/.test(lname.value)) {
            alert("tekstiväljad ei tohi sisaldada numbreid");
            lname.focus();
            return;
        }

        let payment = Array.from(radiobuttons).some((radio) => radio.checked);
        if (!payment) {
            alert("Palun valige makseviis.");
            return;
        }

        console.log("Tarne hind on arvutatud");
    }
})();

// map

let mapAPIKey =
    "Avh_l4Z-hDGMKO1ictAhTqiiZG7CbJZi1DwnPtGc51Mge3bh_dbvtjogOz_yVn4g";

let map;

function GetMap() {
    "use strict";

    let ut = new Microsoft.Maps.Location(58.38104, 26.71992);
    let raagu = new Microsoft.Maps.Location(59.41516, 24.71902);

    let latitude = (ut.latitude + raagu.latitude) / 2;
    let longitude = (ut.longitude + raagu.longitude) / 2;

    let middle = new Microsoft.Maps.Location(latitude, longitude);

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: middle,
        zoom: 7,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true,
    });

    let pushpin1 = new Microsoft.Maps.Pushpin(ut, {
        title: "Tartu Ülikool",
        //subTitle: 'Hea koht',
        //text: 'UT'
    });

    let pushpin2 = new Microsoft.Maps.Pushpin(raagu, {
        title: "Räägupesa Burger",
        //subTitle: 'Hea toidukoht',
        //text: 'TLN'
    });

    map.entities.push(pushpin1);
    map.entities.push(pushpin2);

    var infobox1 = new Microsoft.Maps.Infobox(ut, {
        title: "Hea koht",
    });

    var infobox2 = new Microsoft.Maps.Infobox(raagu, {
        title: "Hea toidukoht",
    });

    infobox1.setOptions({ visible: false });
    infobox2.setOptions({ visible: false });

    Microsoft.Maps.Events.addHandler(pushpin1, "click", function () {
        infobox1.setOptions({ visible: true });
        infobox2.setOptions({ visible: false });
    });

    Microsoft.Maps.Events.addHandler(pushpin2, "click", function () {
        infobox2.setOptions({ visible: true });
        infobox1.setOptions({ visible: false });
    });

    map.entities.push(infobox1);
    map.entities.push(infobox2);
}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE
