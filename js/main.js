/*skills*/
var skill_button = window.document.querySelector('.skill_button')
var skill = window.document.querySelector('.skills')

skill_button.addEventListener("click", myFunction);

function myFunction() {
    skill.style.width = '100%'
    skill.style.display = "flex"
  
}
