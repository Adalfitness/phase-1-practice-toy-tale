document.addEventListener("DOMContentLoaded", () => {
  function fetchToys() {
    fetch("http://localhost:3000/toys")
      .then(response => response.json())
      .then(toys => {
        toys.forEach(toy => {
          renderToy(toy);
        });
      })
      .catch(error => console.error("Error fetching toys:", error));
  }

  function renderToy(toy) {
    const toyCollection = document.getElementById("toy-collection");

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h2>${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar"/>
      <p>${toy.likes} Likes</p>
      <button class="like-btn" id="${toy.id}">Like ❤️</button>
    `;


    const likeButton = card.querySelector(".like-btn");
    likeButton.addEventListener("click", () => updateLikes(toy.id, toy.likes));

    toyCollection.appendChild(card);
  }


  function updateLikes(toyId, currentLikes) {
    const updatedToy = { likes: currentLikes + 1 };

    fetch(`http://localhost:3000/toys/${toyId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(updatedToy)
    })
    .then(response => response.json())
    .then(updatedToy => {
   
      const toyCard = document.getElementById(toyId).parentNode; 
      toyCard.querySelector("p").innerText = `${updatedToy.likes} Likes`; 
    })
    .catch(error => console.error("Error updating likes:", error));
  }

 
  const toyForm = document.querySelector(".add-toy-form");
  toyForm.addEventListener("submit", (event) => {
    event.preventDefault(); 

    const nameInput = event.target.name.value;
    const imageInput = event.target.image.value;

    const newToy = {
      name: nameInput,
      image: imageInput,
      likes: 0 
    };

    
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(newToy)
    })
    .then(response => response.json())
    .then(toy => {
      renderToy(toy); 
      toyForm.reset(); 
    })
    .catch(error => console.error("Error adding toy:", error));
  });

  fetchToys(); 
});