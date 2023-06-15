main();


function main(){
  const ul = document.querySelector("ul");
  const [characterName, gender, height, button] = document.querySelectorAll('.details>div>*');
  const homeSection = document.querySelector('.home');
  const detailsSection = document.querySelector('.details');
  fetchApi();

  button.addEventListener('click', ()=>{
    homeSection.classList.remove('hide');
    detailsSection.classList.add('hide');
  })  
  
  async function fetchApi(){
    let url = "https://swapi.dev/api/people";
    let request = new Request(url);
    let response = await fetch(request);
    let starwars = await response.json();
    // console.log(starwars);
    // console.log(starwars.results);
    // console.log(starwars.next);

    while(starwars.next !== null){
      populateList(starwars);
      url = starwars.next;
      request = new Request(url);
      response = await fetch(request);
      starwars = await response.json();
      console.log(starwars.next);
    }

    function populateList(starwars){
      starwars.results.forEach(character => {
        // console.log(character.name);
        const li = document.createElement("li");
        li.innerHTML = character.name;
        ul.append(li);
        li.addEventListener('click', () => {
          console.log(character.name)
          characterName.innerHTML = character.name;
          gender.innerHTML = character.gender;
          height.innerHTML = character.height;
          homeSection.classList.add('hide');
          detailsSection.classList.remove('hide');
        })
      });
    }
  }
}