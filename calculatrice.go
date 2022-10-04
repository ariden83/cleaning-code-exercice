let listTaxes = {
    "UT": 0.0685,
    "NV": 0.08,
    "TX": 0.0625,
    "AL": 0.04,
    "CA": 0.0825,
    "NA": 0,
}

let discount = [
    {
        prixttl: 1000,
        promo: 0.03,
    },
    {
        prixttl: 5000,
        promo: 0.05,
    },
    {
        prixttl: 7000,
        promo: 0.07,
    },
    {
        prixttl: 10000,
        promo: 0.10,
    },
    {
        prixttl: 50000,
        promo: 0.15,
    },
];

let discountSimple = 0.15;

let sigle = "$"

var activeTaxe = true;

console.log("list des taxes");
console.table(listTaxes);
console.log("list des promotions");
console.table(listTaxes);

function calculDiscount (price) {
    discount.forEach(d => {
        if (price >= d.prixttl) {
            price = price * (1 - d.promo);
            return price;
        }
    });
    return price;
}

function calculette(quantite, prix, pays) {
    if (listTaxes[pays] === undefined) {
        return "country not found"
    }
    let taxes = listTaxes[pays];
    if (prix === 0) {
        return 0;
    }

    let price =  Math.round(prix * quantite);
    let applyPromo
    discount.forEach(d => {
        if (price >= d.prixttl) {
            applyPromo = (1 - d.promo)
        }
    });
    price = price * applyPromo;

    if (taxes === 0 || !activeTaxe) {
        console.debug("no taxes");
        console.log("result: " + price);
        return sigle+ parseFloat(price).toFixed(2);
    }

    price =  (price * (1 + taxes) * 100) / 100;
    console.log("result price without discount " + price);

    return sigle+ parseFloat(price).toFixed(2);
}

function test_calculette() {
    let tests = [
        {
            price: 10,
            country: "NA",
            quantite: 5,
            wait: sigle+"50.00",
        },
        {
            price: 100,
            country: "NA",
            quantite: 10,
            wait: sigle+"4850.00",
        },
        {
            price: 500,
            country: "NA",
            quantite: 10,
            wait: sigle+"0",
        },
        {
            price: 7000,
            country: "NA",
            quantite: 5,
            wait: sigle+"0",
        },
        {
            price: 10000,
            country: "NA",
            quantite: 2,
            wait: sigle+"0",
        },
        {
            price: 50000,
            country: "NA",
            quantite: 5,
            wait: sigle+"0",
        },
        {
            price: 0,
            country: "UT",
            quantite: 2,
            wait: sigle+"0",
        },
        {
        price: 10,
        country: "UT",
        quantite: 2,
        wait: sigle+"21.37",
    },
    {
        price: 5,
        country: "NV",
        quantite: 3,
        wait: sigle+"16.2",
    },
    {
        price: 4,
        country: "TX",
        quantite: 2,
        wait: sigle+"8.5",
    },
    {
        price: 10,
        country: "AL",
        quantite: 2,
        wait: sigle+"20.8",
    },
    {
        price: 8,
        country: "CA",
        quantite: 3,
        wait: sigle+"25.98",
    },
    {
    price: 50.5,
    country: "TOTO",
    quantite: 100,
    wait: 5050,
    }];

    console.log("Start tests");
    console.table(tests);
    tests.forEach(test => {
        console.error("test " + test.quantite, test.price, test.country);
        let result = calculette( test.quantite, test.price,test.country);
        if (result === test.wait) {
            console.log("ok"+ "\n");
        } else {
            console.warn("fail, have "+ result + " want " + test.wait+ "\n");
        }
    });
    console.log("end tests");
}

test_calculette();
