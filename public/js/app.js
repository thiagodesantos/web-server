console.log('Client Side JavaScript Carregado')

const climaform = document.querySelector('form')
const busca = document.querySelector('input')
const primeiraMensagem = document.querySelector('#message-1')
const segundaMensagem = document.querySelector('#message-2')

climaform.addEventListener('submit', (e) =>{
    e.preventDefault()
    
    const localizacao = busca.value

    primeiraMensagem.textContent = 'Carregando...'
    segundaMensagem.textContent = ''

    fetch('http://localhost:3000/weather?address=' + encodeURIComponent(localizacao)).then((response)=>{
        response.json().then((data)=>{
            if(data.error)
                primeiraMensagem.textContent = data.error
            else{
                primeiraMensagem.textContent = data.location                
                segundaMensagem.textContent = data.forecast
            }
        })
    })

})
