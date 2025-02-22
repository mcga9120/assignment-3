const fetch = require('sync-fetch');
const Page = require("./_layout/Default");

module.exports = class extends Page {
    constructor() {
        super({ title: "Home", sName: "Aurora McGaughey" });
    }
    render(sPage) {
        const oJson = fetch("https://assignment-3-44a9e-default-rtdb.firebaseio.com/meals.json").json();
        console.log(oJson);
        let sResult = "<h1>Upcoming Popup Meals</h1>";
        Object.keys(oJson).map((key) => {
            const oEntity = oJson[key];
            console.log(oEntity);
            oEntity.id = key;
            sResult += `
            <h3>${oEntity.title}</h3>
            <p><img src="${oEntity.featured_image}" alt="${oEntity.title}"</p>
            <p>${oEntity.full_description}</p>
            <p>${oEntity.meal_date}</p>
            <p>${oEntity.meal_location}</p>
            <p>${oEntity.meal_price}</p>
            <form action="https://calm-river-59610.herokuapp.com/payment" method="post">
            <input type="hidden" name="title" value="${oEntity.title}" />
            <input type="hidden" name="price" value="${oEntity.meal_price}" />
            <input type="tel" placeholder="enter your number" name="telephone"/>
            <button type="submit">Order now</button>
            </form>
            `;
        });
        return sResult;
    }
}