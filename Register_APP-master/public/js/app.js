const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const _id = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/products/' + _id).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.name + data.salesPrice
                messageTwo.textContent = data.barcode

            }
        })
    })
    fetch('/products').then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.name + data.salesPrice
                messageTwo.textContent = data.barcode

            }
        })
    })
})