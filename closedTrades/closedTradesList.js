const baseURL = 'https://crypto-hub-api.herokuapp.com'

const mainContainer = document.querySelector('.main-container')
const tableContainer = document.querySelector('.assets-table-container')
const mainMenuBtn = document.querySelector('.header-btn-menu')
const LogoutBtn = document.querySelector('.logout-btn')
const AssetsBtnHeader = document.querySelector('.header-btn-assets')
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

let callableBtn = true;

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
        showCurrentAssetsSinceDateBySymbol(year, month, dayOfMonth, symbolSelected)
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
            showCurrentAssetsSinceDateBySymbol(year, month, dayOfMonth, symbolSelected)
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
                showCurrentAssetsSinceDateBySymbol(year, month, dayOfMonth, symbolSelected)
            
            } else {
                // all time
                last1DayBtn.classList.remove('headerBtnSelected')
                last7DayBtn.classList.remove('headerBtnSelected')
                last30DayBtn.classList.remove('headerBtnSelected')
                allTimeBtn.classList.add('headerBtnSelected')
                customTimeDiv.classList.remove('headerBtnSelected')
                showCurrentAssetsBySymbol(symbolSelected);
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
    showCurrentAssetsSinceDate(year, month, dayOfMonth)
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
    showCurrentAssetsSinceDate(year, month, dayOfMonth)
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
    showCurrentAssetsSinceDate(year, month, dayOfMonth)
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
    showCurrentAssets()
})
refreshDBBtn.addEventListener('click', async () => {
    last1DayBtn.classList.remove('headerBtnSelected')
    last7DayBtn.classList.remove('headerBtnSelected')
    last30DayBtn.classList.remove('headerBtnSelected')
    allTimeBtn.classList.add('headerBtnSelected')
    customTimeDiv.classList.remove('headerBtnSelected')

    refreshDBBtn.disabled = true
    console.log('pressing btn')

    await axios.get(`${baseURL}/api/v1/closedTrades/refresh`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    refreshDBBtn.innerHTML = 'Refresh database (disabled 5 minutes)<br>This action takes 2 minutes !'
    refreshDBBtn.classList.add('btnIsRed')
    setTimeout(() => {
        console.log('done waiting 5 min')
        refreshDBBtn.innerHTML = 'Refresh database'
        refreshDBBtn.classList.remove('btnIsRed')
        refreshDBBtn.disabled = false
    }, 5 * 60 * 1000)

    
})
refreshTableBtn.addEventListener('click', () => {

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
        showCurrentAssetsSinceDate(year, month, dayOfMonth)
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
            showCurrentAssetsSinceDate(year, month, dayOfMonth)
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
                showCurrentAssetsSinceDate(year, month, dayOfMonth)
            
            } else {
                // all time
                last1DayBtn.classList.remove('headerBtnSelected')
                last7DayBtn.classList.remove('headerBtnSelected')
                last30DayBtn.classList.remove('headerBtnSelected')
                allTimeBtn.classList.add('headerBtnSelected')
                customTimeDiv.classList.remove('headerBtnSelected')
                showCurrentAssets();
            }
        }
    }
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
        showCurrentAssetsSinceUntilDate(firstValues[0], firstValues[1], firstValues[2], secondValues[0], secondValues[1], secondValues[2])
    } else {
        console.log('date not selected properly')
    }

})

const token = localStorage.getItem('token')

LogoutBtn.addEventListener('click', () => {
    localStorage.removeItem('token')
    location.href = '../index.html'
})
AssetsBtnHeader.addEventListener('click', () => {
    location.href = '../assets/assetsCurrent.html'
})

const showCurrentAssets = async () => {
    const { data } = await axios.get(`${baseURL}/api/v1/closedTrades`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    console.log(data)

    populateTable(data)
    populateChart(data, new Date(2022, 3, 11), new Date())
}

const showCurrentAssetsBySymbol = async (symbol) => {
    const { data } = await axios.get(`${baseURL}/api/v1/closedTrades/${symbol}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    console.log(data)

    populateTable(data)
    populateChart(data, new Date(2022, 3, 11), new Date())
}

const showCurrentAssetsSinceDate = async (year, month, day) => {
    const { data } = await axios.get(`${baseURL}/api/v1/closedTrades/since/${year}/${month}/${day}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    console.log(data)

    populateTable(data)
    populateChart(data, new Date(year, month - 1, day), new Date())
}

const showCurrentAssetsSinceDateBySymbol = async (year, month, day, symbol) => {
    const { data } = await axios.get(`${baseURL}/api/v1/closedTrades/since/${year}/${month}/${day}/${symbol}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    console.log(data)

    populateTable(data)
    populateChart(data, new Date(year, month - 1, day), new Date())
}

const showCurrentAssetsSinceUntilDate = async (year1, month1, day1, year2, month2, day2) => {
    const { data } = await axios.get(`${baseURL}/api/v1/closedTrades/since/until/${year1}/${month1}/${day1}/to/${year2}/${month2}/${day2}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    console.log(data)

    populateTable(data)
    populateChart(data, new Date(year1, month1 - 1, day1), new Date(year2, month2 - 1, day2))
}

const showCurrentAssetsSinceUntilDateBySymbol = async (year1, month1, day1, year2, month2, day2, symbol) => {
    const { data } = await axios.get(`${baseURL}/api/v1/closedTrades/since/until/${year1}/${month1}/${day1}/to/${year2}/${month2}/${day2}/${symbol}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    console.log(data)

    populateTable(data)
    populateChart(data, new Date(year1, month1 - 1, day1), new Date(year2, month2 - 1, day2))
}

const populateChart = (tradesArray, dateSince, dateUntil) => {
    
    let labels = []
    let totalPnL = 0;
    let PnLArray = []

    let daysDiff = Math.abs(Math.ceil(((dateSince.getTime() - dateUntil.getTime()) / (24 * 60 * 60 * 1000))))
    console.log('days diff = ', daysDiff)
    for(let k = daysDiff; k >= 0; k --) {
        timestamp = dateUntil.getTime()
        timestamp = timestamp - k * 24 * 60 * 60 * 1000

        year =  (Number)(moment(timestamp).format('y'))
        month =  (Number)(moment(timestamp).format('M'))
        dayOfMonth =  (Number)(moment(timestamp).format('D'))
        
        labels.push(`${dayOfMonth}/${month}`)

        let foundArray = tradesArray.filter(e => (e.time.year == year && e.time.month == month  && e.time.dayOfMonth == dayOfMonth))
        if(foundArray.length == 0) {
            if(k == daysDiff) {
                PnLArray = [0]
            } else {
                PnLArray = [...PnLArray, PnLArray[PnLArray.length - 1]]
            }
        } else {
            for(let t = 0; t < foundArray.length; t++) {
                totalPnL = totalPnL + foundArray[t].closedPnL
            }
            PnLArray = [...PnLArray, totalPnL]
        }
    }

    console.log(labels)
    console.log(PnLArray)
    console.log(totalPnL)
    
    const data = {
        labels: labels,
        datasets: [{
            label: `Closed Trades PnL in the last ${daysDiff} days`,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: PnLArray,
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

const populateTable = (data) => {
    let symbolTableHeader = document.createElement('div')
    symbolTableHeader.innerHTML = 'Symbol'
    symbolTableHeader.classList.add('table-header', 'table-header-first')
    
    let directionTableHeader = document.createElement('div')
    directionTableHeader.innerHTML = 'Direction'
    directionTableHeader.classList.add('table-header')

    let closedPnLnTableHeader = document.createElement('div')
    closedPnLnTableHeader.innerHTML = 'Closed PnL'
    closedPnLnTableHeader.classList.add('table-header')

    let entryValueTableHeader = document.createElement('div')
    entryValueTableHeader.innerHTML = 'Entry Value'
    entryValueTableHeader.classList.add('table-header')

    let entryPriceTableHeader = document.createElement('div')
    entryPriceTableHeader.innerHTML = 'Entry Price'
    entryPriceTableHeader.classList.add('table-header')

    let exitPriceTableHeader = document.createElement('div')
    exitPriceTableHeader.innerHTML = 'Exit Price'
    exitPriceTableHeader.classList.add('table-header')

    let dateTableHeader = document.createElement('div')
    dateTableHeader.innerHTML = 'Date-Hour'
    dateTableHeader.classList.add('table-header')

    let exchangeTableHeader = document.createElement('div')
    exchangeTableHeader.innerHTML = 'Exchange'
    exchangeTableHeader.classList.add('table-header', 'table-header-last')

    tableContainer.innerHTML = '' // remove all children
    tableContainer.appendChild(symbolTableHeader)
    tableContainer.appendChild(directionTableHeader)
    tableContainer.appendChild(closedPnLnTableHeader)
    tableContainer.appendChild(entryValueTableHeader)
    tableContainer.appendChild(entryPriceTableHeader)
    tableContainer.appendChild(exitPriceTableHeader)
    tableContainer.appendChild(dateTableHeader)
    tableContainer.appendChild(exchangeTableHeader)

    let totalValue = 0;
    for(let i = 0; i < data.length; i++) {
        totalValue = (Number) (totalValue + (Number)(data[i].closedPnL));

        let rowWrapper = document.createElement('div')
        rowWrapper.classList.add('rowWrapper')
        


        let symbol = document.createElement('div')
        symbol.classList.add('table-entry')
        symbol.innerHTML = `${data[i].symbol}`

        let direction = document.createElement('div')
        if(data[i].direction == 'Long') {
            direction.classList.remove('textIsYellow')
            direction.classList.remove('textIsBlue')
            direction.classList.add('textIsBlue')
        } else {
            direction.classList.remove('textIsYellow')
            direction.classList.remove('textIsBlue')
            direction.classList.add('textIsYellow')
        }
        direction.innerHTML = `${data[i].direction}`
        direction.classList.add('table-entry')

        let entryValue = document.createElement('div')
        entryValue.innerHTML = `${(Number)(data[i].entryValue).toFixed(2)}$`
        entryValue.classList.add('table-entry')
        
        let closedPnL = document.createElement('div')
        if(data[i].closedPnL >= 0) {
            closedPnL.classList.remove("textIsRed")
            closedPnL.classList.remove("textIsGreen")
            closedPnL.classList.add("textIsGreen")
        } else {
            closedPnL.classList.remove("textIsRed")
            closedPnL.classList.remove("textIsGreen")
            closedPnL.classList.add("textIsRed")
        }

        closedPnL.innerHTML = `${(Number)(data[i].closedPnL).toFixed(2)}$`
        closedPnL.classList.add('table-entry')

        let entryPrice = document.createElement('div')
        let entryPriceValue = data[i].entryPrice
        if(entryPriceValue > 10) {
            entryPriceValue = (Number)(entryPriceValue).toFixed(2)
        }
        entryPrice.innerHTML = `${entryPriceValue}$`
        entryPrice.classList.add('table-entry')

        let exitPrice = document.createElement('div')
        let exitPriceValue = data[i].exitPrice
        if(exitPriceValue > 10) {
        let exitPriceValue = data[i].exitPrice
            exitPriceValue = (Number)(exitPriceValue).toFixed(2)
        }
        exitPrice.innerHTML = `${exitPriceValue}$`
        exitPrice.classList.add('table-entry')

        let date = document.createElement('div')
        date.innerHTML = `${data[i].time.year}/${data[i].time.month}/${data[i].time.dayOfMonth}-${data[i].time.hour}`
        date.classList.add('table-entry')

        let exchange = document.createElement('div')
        exchange.innerHTML = `${data[i].exchange}`
        exchange.classList.add('table-entry')
        


        rowWrapper.appendChild(symbol);
        rowWrapper.appendChild(direction);
        rowWrapper.appendChild(closedPnL);
        rowWrapper.appendChild(entryValue);
        rowWrapper.appendChild(entryPrice);
        rowWrapper.appendChild(exitPrice);
        rowWrapper.appendChild(date);
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
    emptyDiv4.classList.add('table-footer')
    let emptyDiv5 = document.createElement('div')
    emptyDiv5.classList.add('table-footer')
    let emptyDiv6 = document.createElement('div')
    emptyDiv6.classList.add('table-footer', 'table-footer-last')

    rowWrapperFooter.appendChild(totalText)
    rowWrapperFooter.appendChild(totalValueDiv)
    rowWrapperFooter.appendChild(emptyDiv1)
    rowWrapperFooter.appendChild(emptyDiv2)
    rowWrapperFooter.appendChild(emptyDiv3)
    rowWrapperFooter.appendChild(emptyDiv4)
    rowWrapperFooter.appendChild(emptyDiv5)
    rowWrapperFooter.appendChild(emptyDiv6)

    tableContainer.appendChild(rowWrapperFooter)

    mainContainer.appendChild(tableContainer)
}

const getSymbolList = async () => {
    const { data } = await axios.get(`${baseURL}/api/v1/closedTrades/symbol/list`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },   
    })
    console.log('bro')

    return data
}

const addOptionsToSelectSymbol = async (symbolList) => {
    symbolListDataList.innerHTML = ''
    for(let i = 0; i < symbolList.length; i++) {
        let option = document.createElement('option')
        option.value = symbolList[i]
        option.innerHTML = symbolList[i]
        option.classList.add('option-symbol')
        symbolListDataList.appendChild(option)
    }
}

const verifyUser = async () => {

    // console.log(token)
    try {

        const { data } = await axios.post(`${baseURL}/api/v1/auth/verify`, {} , {
            headers: {
                'Authorization': `Bearer ${token}`
            },   
        })
        console.log(data)
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

    // activate last 30 Days functionality
    last1DayBtn.classList.remove('headerBtnSelected')
    last7DayBtn.classList.remove('headerBtnSelected')
    last30DayBtn.classList.add('headerBtnSelected')
    allTimeBtn.classList.remove('headerBtnSelected')
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
    
    let date = new Date(year, month - 1, dayOfMonth)
    console.log(`date = `, date)
    console.log(Math.abs(Math.ceil(((date.getTime() - Date.now() )/ (24 * 60 * 60 * 1000)))))
    
    showCurrentAssetsSinceDate(year, month, dayOfMonth)
    
    let symbolList = await getSymbolList()
    console.log(symbolList)
    addOptionsToSelectSymbol(symbolList)
}

main()