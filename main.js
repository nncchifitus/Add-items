// Define items
// Date.month 0-11
var i1 = {
    id: 1,
    title: "iphoneX",
    amount: 150,
    date: new Date (2020, 6, 20),       
}

var i2 = {
    id: 2,
    title: "Oppo reno4",
    amount: 90,
    date: new Date (2020, 4, 16),
}

var i3 = {
    id: 3,
    title: "SamSung Galaxy A51",
    amount: 80,
    date: new Date (2020, 2, 25),
}

var i4 = {
    id: 4,
    title: "Oppo reno5",
    amount: 100,
    date: new Date(2021, 4, 16),        
}

var i5 = {
    id: 5,
    title: "SamSung Galaxy J3",
    amount: 10,
    date: new Date (2021, 6, 25),
}

var i6 = {
    id: 6,
    title: "Redmi X",
    amount: 120,
    date: new Date (2022, 5, 15),
}

var i7 = {
    id: 7,
    title: "SamSung Galaxy J2",
    amount: 20,
    date: new Date (2020, 10,23)
}

var i8 = {
    id: 7,
    title: "Samsung A51",
    amount: 20,
    date: new Date (2022, 1,23)
}

var i9 = {
    id: 7,
    title: "Samsung A51",
    amount: 51,
    date: new Date (2022, 9,23)
}

var listItems = [i1, i2, i3, i4, i5, i6, i7, i8, i9]
var listMonths = [  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
listYears = [2020, 2021, 2022, 2023]

// Functions

// Load chart
var loadChart = function(year) {

    // Get full items of current year
    listItemsOfCurrentYear = listItems.filter(function(item) {
        return item.date.getFullYear() == year;
    })

    // array 12*0 prices per month
    var monthsValue = []
    for (var i=0; i<12; i++) {
        monthsValue.push(0)
    }   

    // Count sum item prices per month
    listItemsOfCurrentYear.forEach(function(item) {
        monthsValue[item.date.getMonth()] += item.amount;
    })

    // Get max of months value
    maxMonthsValue = Math.max(...monthsValue)

    // Get chart element
    var barChartElement = document.querySelector('.bar-chart')

    // HTML of 12 months
    htmls = ''
    listMonths.forEach(function(month,index) {
        htmls += `<div class="chart-item" data-label="${month}">
                    <div class="item-outline">
                        <div class="item-fill" style="height:${monthsValue[index]/maxMonthsValue*100}%"></div>
                    </div>
                </div>`
    })

    // Add bar chart for charts emelent
    barChartElement.innerHTML = htmls
}

// Load all items of 1 year
var loadItems = function(year){

    // Load list item
    var listItemsElement = document.querySelector('.list-items')

    // Get full items of current year
    listItemsOfCurrentYear = listItems.filter(function(item) {
        return item.date.getFullYear() == year;
    })

    // HTML of all items of current year
    htmls = ''
    if (!listItemsOfCurrentYear.length) {
        htmls = `<h2>Not found</h2>`
    }
    else {
        listItemsOfCurrentYear.forEach(function(item) {
            htmls += `<div class="item-info">
                        <div class="info-date">
                            <div class="date-month">${item.date.getMonth() + 1}</div>
                            <div class="date-year">${item.date.getFullYear()}</div>
                            <div class="date-day">${item.date.getDate()}</div>
                        </div>
                        <label for="item-info" class="info-label">${item.title}</label>
                        <div class="info-price">
                            $${item.amount}
                        </div>
                    </div>`
        })
    
    }

    // Add items htmls for list items emelent
    listItemsElement.innerHTML = htmls
}

// Handle item input
var handleInput = function() {
    
        // Get input elements
        var titleElement = document.querySelector('input[type="text"]')
        var amountElement = document.querySelector('input[type="number"]')
        var dateElement = document.querySelector('input[type="date"]')

        // Get year button element
        var selectYearElement = document.querySelector('.year-select')

        // Get information of item input
        var title = titleElement.value
        var amount = amountElement.value 
        var date = dateElement.value

        // Create item input
        var item = {
            title: title,
            amount: Number(amount),
            date: new Date(date),
        }

        // Add item at 0 index 
        listItems.unshift(item)

        if (selectYearElement.value==item.date.getFullYear()) {
            loadChart(selectYearElement.value)
            loadItems(selectYearElement.value)
        }
}
// Get information of input item
var handle = function() {

    // Get form add expense button
    var formBtnElement = document.querySelector('.form .btn') 
    
    // Handle when click Add Expense
    formBtnElement.onclick = function() {
        handleInput()
    }

    // Load chart and items when select different year
    var selectYearElement = document.querySelector('.year-select')
    selectYearElement.onchange = function(e) {
        loadChart(e.target.value)
        loadItems(e.target.value)
    }    
}

// Load default
var load =function() {
    loadChart(2020)
    loadItems(2020)
}

// Main function
var main = function () {
    load()
    handle();
}

main()