const ul_menu = document.querySelector('#ul_menu');
const toggleMenu = () => ul_menu.classList.toggle('remover_adicionar-menu');

document.querySelector('#icone_menu').addEventListener('click', toggleMenu);
ul_menu.addEventListener('click', toggleMenu);
