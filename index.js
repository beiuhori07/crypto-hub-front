const baseURL = 'https://crypto-hub-api.herokuapp.com'
// const baseURL = 'http://localhost:3000'


const userInput = document.querySelector('.login-username')
const passInput = document.querySelector('.login-password')
const btn = document.querySelector('.login-connect')

btn.addEventListener('click', async () => {
    const email = userInput.value
    const password = passInput.value
    try {
        const { data } = await axios.post(`${baseURL}/api/v1/auth/login`, { email, password })
        console.log(data);
        localStorage.setItem('token', data.token)
        localStorage.setItem('userId', data.user.id)
        location.href = './mainMenu/mainMenu.html'
    } catch (error) {
        console.log(error);
        localStorage.removeItem('token')
    }
})

document.addEventListener('keydown', async (e) => {
    if(e.key == "Enter") {
        const email = userInput.value
        const password = passInput.value
        try {
            const { data } = await axios.post(`${baseURL}/api/v1/auth/login`, { email, password })
            console.log(data);
            localStorage.setItem('token', data.token)
            localStorage.setItem('userId', data.user.id)
            location.href = './mainMenu/mainMenu.html'
        } catch (error) {
            console.log(error);
            localStorage.removeItem('token')
        }
    }
});