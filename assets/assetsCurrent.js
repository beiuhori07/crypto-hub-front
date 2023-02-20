const baseURL = 'https://crypto-hub-api.herokuapp.com'
// const baseURL = 'http://localhost:3000'

const mainContainer = document.querySelector('.main-container')
const tableContainer = document.querySelector('.assets-table-container')
const mainMenuBtn = document.querySelector('.header-btn-menu')
const LogoutBtn = document.querySelector('.logout-btn')
const tradingDBBtnHeader = document.querySelector('.header-btn-tradingdb')
const last1DayBtn = document.querySelector('.btn-last1day')
const last7DayBtn = document.querySelector('.btn-last7day')
const last30DayBtn = document.querySelector('.btn-last30day')
const allTimeBtn = document.querySelector('.btn-alltime')
const refreshDBBtn = document.querySelector('.btn-refresh')
const refreshTableBtn = document.querySelector('.btn-refresh-table')
const customTimeBtn = document.querySelector('.table-custom-btn')
const customTimeDiv = document.querySelector('.btn-customtime')
const dateInput1 = document.querySelector('.input1')
const dateInput2 = document.querySelector('.input2')
const chartContainer = document.querySelector('.chart-conatiner')
const symbolListInput = document.querySelector('.symbol-list-input')
const symbolListDataList = document.querySelector('.symbolList-datalist')
const symbolSearchBtn = document.querySelector('.table-symbol-btn')

const token = localStorage.getItem('token')
const userId = localStorage.getItem('userId')


symbolSearchBtn.addEventListener('click', () => {
    let symbolSelected = symbolListInput.value
    if(last1DayBtn.classList.contains('headerBtnSelected')) {
        last1DayBtn.classList.add('headerBtnSelected')
        last7DayBtn.classList.remove('headerBtnSelected')
        last30DayBtn.classList.remove('headerBtnSelected')
        allTimeBtn.classList.remove('headerBtnSelected')
        customTimeDiv.classList.remove('headerBtnSelected')

        let timestamp = Date.now()
        timestamp = timestamp - 1 * 24 * 60 * 60 * 1000
        let year =  moment(timestamp).format('y')
        let month = moment(timestamp).format('M')
        let dayOfMonth = moment(timestamp).format('D')
        console.log(year, month, dayOfMonth)
        showAssetsSinceDateBySymbol(year, month, dayOfMonth, symbolSelected)
    } else {
        if(last7DayBtn.classList.contains('headerBtnSelected')) {
            last1DayBtn.classList.remove('headerBtnSelected')
            last7DayBtn.classList.add('headerBtnSelected')
            last30DayBtn.classList.remove('headerBtnSelected')
            allTimeBtn.classList.remove('headerBtnSelected')
            customTimeDiv.classList.remove('headerBtnSelected')

            let timestamp = Date.now()
            timestamp = timestamp - 7 * 24 * 60 * 60 * 1000
            let year =  moment(timestamp).format('y')
            let month = moment(timestamp).format('M')
            let dayOfMonth = moment(timestamp).format('D')
            console.log(year, month, dayOfMonth)
            showAssetsSinceDateBySymbol(year, month, dayOfMonth, symbolSelected)
        } else {
            if(last30DayBtn.classList.contains('headerBtnSelected')) {

                last1DayBtn.classList.remove('headerBtnSelected')
                last7DayBtn.classList.remove('headerBtnSelected')
                last30DayBtn.classList.add('headerBtnSelected')
                allTimeBtn.classList.remove('headerBtnSelected')
                customTimeDiv.classList.remove('headerBtnSelected')

                let timestamp = Date.now()
                timestamp = timestamp - 30 * 24 * 60 * 60 * 1000
                let year =  moment(timestamp).format('y')
                let month = moment(timestamp).format('M')
                let dayOfMonth = moment(timestamp).format('D')
                console.log(year, month, dayOfMonth)
                showAssetsSinceDateBySymbol(year, month, dayOfMonth, symbolSelected)
            
            } else {
                // all time
                last1DayBtn.classList.remove('headerBtnSelected')
                last7DayBtn.classList.remove('headerBtnSelected')
                last30DayBtn.classList.remove('headerBtnSelected')
                allTimeBtn.classList.add('headerBtnSelected')
                customTimeDiv.classList.remove('headerBtnSelected')
                showAssetsBySymbol(symbolSelected);
            }
        }
    }
})

last1DayBtn.addEventListener('click', () => {
    last1DayBtn.classList.add('headerBtnSelected')
    last7DayBtn.classList.remove('headerBtnSelected')
    last30DayBtn.classList.remove('headerBtnSelected')
    allTimeBtn.classList.remove('headerBtnSelected')
    customTimeDiv.classList.remove('headerBtnSelected')
    const rows = document.querySelectorAll('.rowWrapper');
    for(let i = 0; i < rows.length; i++) {
        tableContainer.removeChild(rows[i])
    }
    let timestamp = Date.now()
    timestamp = timestamp - 24 * 60 * 60 * 1000
    let year =  moment(timestamp).format('y')
    let month = moment(timestamp).format('M')
    let dayOfMonth = moment(timestamp).format('D')
    console.log(year, month, dayOfMonth)
    showAssetsSinceDate(year, month, dayOfMonth)
})
last7DayBtn.addEventListener('click', () => {
    last1DayBtn.classList.remove('headerBtnSelected')
    last7DayBtn.classList.add('headerBtnSelected')
    last30DayBtn.classList.remove('headerBtnSelected')
    allTimeBtn.classList.remove('headerBtnSelected') 
    customTimeDiv.classList.remove('headerBtnSelected') 
    const rows = document.querySelectorAll('.rowWrapper');
    for(let i = 0; i < rows.length; i++) {
        tableContainer.removeChild(rows[i])
    }
    let timestamp = Date.now()
    timestamp = timestamp - 7 * 24 * 60 * 60 * 1000
    let year =  moment(timestamp).format('y')
    let month = moment(timestamp).format('M')
    let dayOfMonth = moment(timestamp).format('D')
    console.log(year, month, dayOfMonth)
    showAssetsSinceDate(year, month, dayOfMonth)
})
last30DayBtn.addEventListener('click', () => {
    last1DayBtn.classList.remove('headerBtnSelected')
    last7DayBtn.classList.remove('headerBtnSelected')
    last30DayBtn.classList.add('headerBtnSelected')
    allTimeBtn.classList.remove('headerBtnSelected')
    customTimeDiv.classList.remove('headerBtnSelected')
    const rows = document.querySelectorAll('.rowWrapper');
    for(let i = 0; i < rows.length; i++) {
        tableContainer.removeChild(rows[i])
    }
    let timestamp = Date.now()
    timestamp = timestamp - 30 * 24 * 60 * 60 * 1000
    let year =  moment(timestamp).format('y')
    let month = moment(timestamp).format('M')
    let dayOfMonth = moment(timestamp).format('D')
    console.log(year, month, dayOfMonth)
    showAssetsSinceDate(year, month, dayOfMonth)
})
allTimeBtn.addEventListener('click', () => {
    last1DayBtn.classList.remove('headerBtnSelected')
    last7DayBtn.classList.remove('headerBtnSelected')
    last30DayBtn.classList.remove('headerBtnSelected')
    allTimeBtn.classList.add('headerBtnSelected')
    customTimeDiv.classList.remove('headerBtnSelected')
    const rows = document.querySelectorAll('.rowWrapper');
    for(let i = 0; i < rows.length; i++) {
        tableContainer.removeChild(rows[i])
    }
    showAssets()
})

customTimeBtn.addEventListener('click', () => {
    last1DayBtn.classList.remove('headerBtnSelected')
    last7DayBtn.classList.remove('headerBtnSelected')
    last30DayBtn.classList.remove('headerBtnSelected')
    allTimeBtn.classList.remove('headerBtnSelected')
    customTimeDiv.classList.add('headerBtnSelected')
    const rows = document.querySelectorAll('.rowWrapper');
    for(let i = 0; i < rows.length; i++) {
        tableContainer.removeChild(rows[i])
    }

    console.log(dateInput1.value)
    console.log(dateInput2.value)
    
    let firstValues = dateInput1.value.split('-')
    let secondValues = dateInput2.value.split('-')
    
    console.log(firstValues)
    console.log(secondValues)
    if(firstValues.length == 3 && secondValues.length == 3) {
        showAssetsSinceUntilDate(firstValues[0], firstValues[1], firstValues[2], secondValues[0], secondValues[1], secondValues[2])
    } else {
        console.log('date not selected properly')
    }

})


LogoutBtn.addEventListener('click', () => {
    localStorage.removeItem('token')
    location.href = '../index.html'
})
tradingDBBtnHeader.addEventListener('click', () => {
    location.href = '../closedTrades/closedTradesList.html'
})

const showCurrentAssets = async () => {
    const { data } = await axios.get(`${baseURL}/api/v1/assetsCurrent/${userId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    console.log('current assets = ')
    console.log(data)

    let totalValue = 0;
    tableContainer.innerHTML = '' // remove all children

    let symbolTableHeader = document.createElement('div')
    symbolTableHeader.innerHTML = 'Symbol'
    symbolTableHeader.classList.add('table-header', 'table-header-first')

    let valueTableHeader = document.createElement('div')
    valueTableHeader.innerHTML = 'Value'
    valueTableHeader.classList.add('table-header')
    
    let priceTableHeader = document.createElement('div')
    priceTableHeader.innerHTML = 'Price'
    priceTableHeader.classList.add('table-header')

    let change24hTableHeader = document.createElement('div')
    change24hTableHeader.innerHTML = '24h Change'
    change24hTableHeader.classList.add('table-header')

    let quantityTableHeader = document.createElement('div')
    quantityTableHeader.innerHTML = 'Quantity'
    quantityTableHeader.classList.add('table-header')

    let exchangeTableHeader = document.createElement('div')
    exchangeTableHeader.innerHTML = 'Exchange'
    exchangeTableHeader.classList.add('table-header', 'table-header-last')

    tableContainer.innerHTML = '' // remove all children
    tableContainer.appendChild(symbolTableHeader)
    tableContainer.appendChild(valueTableHeader)
    tableContainer.appendChild(priceTableHeader)
    tableContainer.appendChild(change24hTableHeader)
    tableContainer.appendChild(quantityTableHeader)
    tableContainer.appendChild(exchangeTableHeader)

    for(let i = 0; i < data.length; i++) {
        totalValue = (Number) (totalValue + (Number)(data[i].currentValue));

        let rowWrapper = document.createElement('div')
        rowWrapper.classList.add('rowWrapper')
        


        let symbol = document.createElement('div')
        symbol.classList.add('table-entry')
        symbol.innerHTML = `${data[i].symbol}`

        let value = document.createElement('div')
        value.innerHTML = `${data[i].currentValue}$`
        value.classList.add('table-entry')

        let price = document.createElement('div')
        price.innerHTML = `${data[i].currentPrice}$`
        price.classList.add('table-entry')

        let priceChange = document.createElement('div')
        let priceChangeValue = (Number)(data[i].priceChange24h).toFixed(2)
        if(priceChangeValue >= 0) {
            priceChange.classList.remove('textIsRed')
            priceChange.classList.remove('textIsGreen')
            price.classList.remove('textIsRed')
            price.classList.remove('textIsGreen')
            priceChange.classList.add('textIsGreen')
            price.classList.add('textIsGreen')
        } else {
            priceChange.classList.remove('textIsRed')
            priceChange.classList.remove('textIsGreen')
            price.classList.remove('textIsRed')
            price.classList.remove('textIsGreen')
            priceChange.classList.add('textIsRed')
            price.classList.add('textIsRed')
        }
        priceChange.innerHTML = `${priceChangeValue}%`
        priceChange.classList.add('table-entry')

        let quantity = document.createElement('div')
        quantity.innerHTML = `${data[i].quantity}`
        quantity.classList.add('table-entry')

        let exchange = document.createElement('div')
        exchange.innerHTML = `${data[i].exchange}`
        exchange.classList.add('table-entry')
        


        rowWrapper.appendChild(symbol);
        rowWrapper.appendChild(value);
        rowWrapper.appendChild(price);
        rowWrapper.appendChild(priceChange);
        rowWrapper.appendChild(quantity);
        rowWrapper.appendChild(exchange);

        tableContainer.appendChild(rowWrapper)
    }
    let totalText = document.createElement('div')
    totalText.classList.add('table-footer', 'table-footer-first')
    totalText.innerHTML = `total balance`
    
    let totalValueDiv = document.createElement('div')
    totalValueDiv.innerHTML = `${(Number)(totalValue).toFixed(2)}$`
    totalValueDiv.classList.add('table-footer')
    
    let rowWrapperFooter = document.createElement('div')
    rowWrapperFooter.classList.add('rowWrapper-footer')
    
    let emptyDiv1 = document.createElement('div')
    emptyDiv1.classList.add('table-footer')
    let emptyDiv2 = document.createElement('div')
    emptyDiv2.classList.add('table-footer')
    let emptyDiv3 = document.createElement('div')
    emptyDiv3.classList.add('table-footer')
    let emptyDiv4 = document.createElement('div')
    emptyDiv4.classList.add('table-footer', 'table-footer-last')

    rowWrapperFooter.appendChild(totalText)
    rowWrapperFooter.appendChild(totalValueDiv)
    rowWrapperFooter.appendChild(emptyDiv1)
    rowWrapperFooter.appendChild(emptyDiv2)
    rowWrapperFooter.appendChild(emptyDiv3)
    rowWrapperFooter.appendChild(emptyDiv4)

    tableContainer.appendChild(rowWrapperFooter)

    mainContainer.appendChild(tableContainer)
}

const showAssets = async (interval) => {
    const { data } = await axios.get(`${baseURL}/api/v1/assetsByTime/${interval}/${userId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    console.log(data)

    // populateTable(data)
    populateChart(data, new Date(2022, 3, 11), new Date(), '1h')
}

const populateChart = (assetsArray, dateSince, dateUntil, interval) => {
    
    let labels = []
    let totalPnL = 0;
    let reducedArray = []

    let daysDiff = Math.abs(Math.ceil(((dateSince.getTime() - dateUntil.getTime()) / (24 * 60 * 60 * 1000))))
    console.log('days diff = ', daysDiff)
    for(let k = daysDiff; k >= 0; k --) {
        timestamp = dateUntil.getTime()
        timestamp = timestamp - k * 24 * 60 * 60 * 1000
        
        // labels.push(`${dayOfMonth}/${month}`)
        
    }
    
            year =  (Number)(moment(timestamp).format('y'))
            month =  (Number)(moment(timestamp).format('M'))
            dayOfMonth =  (Number)(moment(timestamp).format('D'))
    if(interval == '1h'){
        let returnedObject = reduceArray1h(assetsArray, year, month, dayOfMonth)
        reducedArray = returnedObject.reducedArray
        labels = returnedObject.labels
    }
    if(interval == '4h'){
        reducedArray = reduceArray4h(assetsArray, year, month, dayOfMonth)
        reducedArray = returnedObject.reducedArray
        labels = returnedObject.labels
    }
    if(interval == '1d'){
        reducedArray = reduceArray1d(assetsArray, year, month, dayOfMonth)
        reducedArray = returnedObject.reducedArray
        labels = returnedObject.labels
    }
    if(interval == '1w'){
        reducedArray = reduceArray1w(assetsArray, year, month, dayOfMonth)
        reducedArray = returnedObject.reducedArray
        labels = returnedObject.labels
    }
    let assetsValueArray = reducedArray.map(asset => asset.totalValue)
    console.log(labels)
    console.log('assetsValueArray = ')
    console.log(assetsValueArray)
    console.log('reducedArray = ')
    console.log(reducedArray)
    // console.log(totalPnL)
    
    const data = {
        labels: labels,
        datasets: [{
            label: `Assets value in the last ${daysDiff} days`,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: assetsValueArray,
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: true,
            elements: {
                line: {
                    cubicInterpolationMode: 'monotone'
                }
            }
        }
    };
    
    chartContainer.innerHTML = ''
    let newCanvas = document.createElement('canvas')
    newCanvas.id = 'myChart'
    chartContainer.appendChild(newCanvas)
    
    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
}

const reduceArray1h = (assetsArray, year, month, dayOfMonth) => {
    let reducedArray = []
    let labels = []
    let symbols = [assetsArray[0].symbol]
    let assets = [assetsArray[0]]
    let sum = assetsArray[0].currentValue;
    let ok = 0
    for(let i = 0; i < assetsArray.length - 1; i++) {
        if((assetsArray[i].time.dayOfYear == assetsArray[i+1].time.dayOfYear) && (assetsArray[i].time.hour == assetsArray[i+1].time.hour)) { // add year
            sum = sum + assetsArray[i+1].currentValue
            symbols = [...symbols, assetsArray[i+1].symbol]
            assets = [...assets, assetsArray[i+1]]
            ok = 1
        } else {
            if(ok == 0) {
                sum = assetsArray[i].currentValue
                symbols = [assetsArray[i].symbol]
                assets = [assetsArray[i]]
            }
            let object = {
                symbols: symbols,
                assets: assets,
                time: assetsArray[i].time,
                totalValue: sum
            }
            labels = [...labels, `${assetsArray[i].time.dayOfMonth}/${assetsArray[i].time.month}-${assetsArray[i].time.hour}`]
            reducedArray = [...reducedArray, object]
            sum = assetsArray[i+1].currentValue
            symbols = [assetsArray[i+1].symbol]
            assets = [assetsArray[i+1]]
            ok = 0
            console.log('brooooooo')
        }
    }
    if(ok == 0) {
        let object = {
            symbols: [assetsArray[assetsArray.length - 1].symbol],
            assets: [assetsArray[assetsArray.length - 1]],
            time: assetsArray[assetsArray.length - 1].time,
            totalValue: assetsArray[assetsArray.length - 1].currentValue
        }
        labels = [...labels, `${assetsArray[assetsArray.length - 1].time.dayOfMonth}/${assetsArray[assetsArray.length - 1].time.month}-${assetsArray[assetsArray.length - 1].time.hour}`]
        reducedArray = [...reducedArray, object]
    } else {
        let object = {
            symbols: symbols,
            assets: assets,
            time: assetsArray[assetsArray.length - 1].time,
            totalValue: sum
        }
        labels = [...labels, `${assetsArray[assetsArray.length - 1].time.dayOfMonth}/${assetsArray[assetsArray.length - 1].time.month}-${assetsArray[assetsArray.length - 1].time.hour}`]
        reducedArray = [...reducedArray, object]
    }
    return { reducedArray: reducedArray, labels: labels };
}
const reduceArray4h = (data, year, month, dayOfMonth) => {

}
const reduceArray1d = (data, year, month, dayOfMonth) => {

}
const reduceArray1w = (data, year, month, dayOfMonth) => {

}


const verifyUser = async () => {

    // console.log(token)
    try {

        const { data, status } = await axios.post(`${baseURL}/api/v1/auth/verify`, {} , {
            headers: {
                'Authorization': `Bearer ${token}`
            },   
        })
        console.log(data)
        // console.log(status)
    } catch (error) {   
        if(error.response.status == 401) {
            location.href = '../index.html';
        }
    }

}

mainMenuBtn.addEventListener('click', () => {
    location.href = '../mainMenu/mainMenu.html'
})

const main = async () => {
    verifyUser()
    showCurrentAssets()
    showAssets('1h')
}

main()