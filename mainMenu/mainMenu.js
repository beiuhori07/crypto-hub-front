
const btcPricePanel = document.querySelector('.coin-last-price-1')
const ethPricePanel = document.querySelector('.coin-last-price-2')
const egldPricePanel = document.querySelector('.coin-last-price-3')
const solPricePanel = document.querySelector('.coin-last-price-4')

const btc24hChangePanel = document.querySelector('.coin-24h-change-1')
const eth24hChangePanel = document.querySelector('.coin-24h-change-2')
const egld24hChangePanel = document.querySelector('.coin-24h-change-3')
const sol24hChangePanel = document.querySelector('.coin-24h-change-4')

const LogoutBtn = document.querySelector('.logout-btn')
const AssetsBtn = document.querySelector('.assets-panel')
const AssetsBtnHeader = document.querySelector('.header-btn-assets')
const tradingDBBtn = document.querySelector('.tradingDB-panel')
const tradingDBBtnHeader = document.querySelector('.header-btn-tradingdb')

const token = localStorage.getItem('token')


AssetsBtn.addEventListener('click', () => {
    location.href = '../assets/assetsCurrent.html'
})
AssetsBtnHeader.addEventListener('click', () => {
    location.href = '../assets/assetsCurrent.html'
})
tradingDBBtn.addEventListener('click', () => {
    location.href = '../closedTrades/closedTradesList.html'
})
tradingDBBtnHeader.addEventListener('click', () => {
    location.href = '../closedTrades/closedTradesList.html'
})
LogoutBtn.addEventListener('click', () => {
    localStorage.removeItem('token')
    location.href = '../index.html'
})

const start = async () => {
    ws = new WebSocket('wss://stream.binance.com:9443/stream?streams=btcusdt@ticker/ethusdt@ticker/egldusdt@ticker/solusdt@ticker');
    ws.onopen = function() {
        console.log('WebSocket Client Connected');        
    };
    ws.onmessage = (data) => { 
        // console.log(data.data); 
        const dataParsed = JSON.parse(data.data)
        const symbol = dataParsed.data.s.replace("USDT", "")
        const lastPrice = ((Number) (dataParsed.data.c)).toFixed(2)
        const changeSince24h = ((Number)) (dataParsed.data.P).toFixed(2)
        // console.log((Number) (dataParsed.data.c), (Number) (dataParsed.data.P), dataParsed.data.s.replace("USDT", ""))
        
        if(symbol === 'BTC') {
            btcPricePanel.textContent = `${lastPrice}`
            btc24hChangePanel.textContent = `${changeSince24h}%`
            btc24hChangePanel.classList.remove('textIsGreen','textIsRed')
            btcPricePanel.classList.remove('textIsGreen','textIsRed')
            if(changeSince24h > 0) {
                btc24hChangePanel.classList.add('textIsGreen')
                btcPricePanel.classList.add('textIsGreen')
            }  else {
                btc24hChangePanel.classList.add('textIsRed')
                btcPricePanel.classList.add('textIsRed')
            }
        }
        if(symbol === 'ETH') {
            ethPricePanel.textContent = `${lastPrice}`
            eth24hChangePanel.textContent = `${changeSince24h}%`
            eth24hChangePanel.classList.remove('textIsGreen','textIsRed')
            ethPricePanel.classList.remove('textIsGreen','textIsRed')
            if(changeSince24h > 0) {
                eth24hChangePanel.classList.add('textIsGreen')
                ethPricePanel.classList.add('textIsGreen')
            } else {
                eth24hChangePanel.classList.add('textIsRed')
                ethPricePanel.classList.add('textIsRed')
            }
        }
        if(symbol === 'EGLD') {
            egldPricePanel.textContent = `${lastPrice}`
            egld24hChangePanel.textContent = `${changeSince24h}%`
            egld24hChangePanel.classList.remove('textIsGreen','textIsRed')
            egldPricePanel.classList.remove('textIsGreen','textIsRed')
            if(changeSince24h > 0) {
                egld24hChangePanel.classList.add('textIsGreen')
                egldPricePanel.classList.add('textIsGreen')
            } else {
                egld24hChangePanel.classList.add('textIsRed')
                egldPricePanel.classList.add('textIsRed')
            }
        }
        if(symbol === 'SOL') {
            solPricePanel.textContent = `${lastPrice}`
            sol24hChangePanel.textContent = `${changeSince24h}%`
            sol24hChangePanel.classList.remove('textIsGreen','textIsRed')
            solPricePanel.classList.remove('textIsGreen','textIsRed')
            if(changeSince24h > 0) {
                sol24hChangePanel.classList.add('textIsGreen')
                solPricePanel.classList.add('textIsGreen')
            } else {
                sol24hChangePanel.classList.add('textIsRed')
                solPricePanel.classList.add('textIsRed')
            }
        }
    };
    // setTimeout( () => {
    //     ws.close()
    // }, 5000)
    ws.onclose = () => {
        // Try to reconnect in 5 seconds
        setTimeout( () => start(), 5000);
    };
}

const verifyUser = async () => {

    // console.log(token)
    try {

        const { data, status } = await axios.post('http://localhost:3000/api/v1/auth/verify', {} , {
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

const main = async () => {
    verifyUser()
    start()
}

main()