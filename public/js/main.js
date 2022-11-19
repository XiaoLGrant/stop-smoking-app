const btn = document.querySelector('button.mobile-menu-button')
const menu = document.querySelector('.mobile-menu')

btn.addEventListener('click', () => {
  menu.classList.toggle('hidden')
})



document.getElementById('didjaSmoke').addEventListener('change', function(e){
  if(e.target.value === 'true'){
    document.getElementById('triggerField').style.display = 'block'
  }else{
    document.getElementById('triggerField').style.display = 'none'
    }
}) 