/*skills*/
var skill_button = window.document.querySelector('.skill_button')
var skill = window.document.querySelector('.skills')

skill_button.addEventListener("click", myFunction);

function myFunction() {
  console.log("click")
    skill.style.width = '100%'
    skill.style.display = "flex"

}

//recent works

// fetch works.json 
function readfromJson() {
    //write to a json file
    fetch("./js/works.json")
        .then(response => response.json())
        .then(data => {
            // arquivo JSON foi convertido em um objeto JavaScript
            //console.log(data.works);
            //console.log(data.works);
            listRecent(data.works)


        }).catch(error => console.log("Erro ao tentar ler o ficheiro: " + error));

}
readfromJson()

// get the works data and create a table row for each work
let recentWorks = document.querySelector('.some_works');
function listRecent(array) {
    const recents = array
      .filter((work) => work.show_recents !== false)
      .map((work, index) => `
               
        <div class="">
				<span>0${index+1}</span>
				<div>
					<span>0${index+1}</span>
					<p>${work.title}</p>
					<span>${work.short_description}</span>
				</div>
        ${show_links(work.link)}
				
			</div>
      `)
      .join("");
  
    recentWorks.innerHTML = recents;
  }
  

//function to show the links to the work
function show_links(link) {
    let links = "";
    const sites = ["site", "git_hub"];
    sites.forEach((site) => {
        if (link[site] !== "") {
            const icon = site === "site" ? "fa-solid fa-arrow-up-right-from-square" : "fa-brands fa-github";
            links += `<a class="button_primary" href="${link[site]}" target="_blank" rel="noopener noreferrer">
            <span><i class="${icon}"></i></span>
            <svg width="15px" height="10px" viewBox="0 0 13 10">
              <path d="M1,5 L11,5"></path>
              <polyline points="8 1 12 5 8 9"></polyline>
            </svg>
          </a>`;


        }
    });
    return links;
}
