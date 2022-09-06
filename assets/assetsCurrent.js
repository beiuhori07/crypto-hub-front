const baseURL = 'https://crypto-hub-api.herokuapp.com'

const mainContainer = document.querySelector('.main-container')
const tableContainer = document.querySelector('.assets-table-container')
const mainMenuBtn = document.querySelector('.header-btn-menu')
const LogoutBtn = document.querySelector('.logout-btn')
const tradingDBBtnHeader = document.querySelector('.header-btn-tradingdb')

const token = localStorage.getItem('token')

LogoutBtn.addEventListener('click', () => {
    localStorage.removeItem('token')
    location.href = '../index.html'
})
tradingDBBtnHeader.addEventListener('click', () => {
    location.href = '../closedTrades/closedTradesList.html'
})

const showCurrentAssets = async () => {
    const { data } = await axios.get(`${baseURL}/api/v1/assetsCurrent`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    console.log(data)

    let totalValue = 0;
    mainContainer.innerHTML = '' // remove all children
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
    totalValueDiv.innerHTML = `${totalValue}$`
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