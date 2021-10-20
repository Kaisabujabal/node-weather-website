console.log('Client side javascript is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#location')
const message2 = document.querySelector('#forecast')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    const url = 'http://localhost:3000/weather?address=' + location;
    message1.textContent = 'Loading...'
    message2.textContent = ''
    fetch(url).then((response) => {
    response.json().then((data) => {
        if(data.error)
        {
            message1.textContent = data.error
            console.log(data.error)
        }
        else
        {
            message1.textContent = data.location
            message2.textContent = data.forecast
            console.log(data.location)
            console.log(data.forecast)
        }
    })
})
})