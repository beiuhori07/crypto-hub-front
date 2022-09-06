const baseURL = 'https://crypto-hub-api.herokuapp.com'

const mainContainer = document.querySelector('.main-container')
const tableContainer = document.querySelector('.assets-table-container')
const mainMenuBtn = document.querySelector('.header-btn-menu')
const LogoutBtn = document.querySelector('.logout-btn')
const AssetsBtnHeader = document.querySelector('.header-btn-assets')

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

    let totalValue = 0;
    mainContainer.innerHTML = '' // remove all children
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
}

main()