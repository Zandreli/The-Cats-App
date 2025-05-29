import axios from "axios";

const factsInput = document.getElementById("cFactInput");
const factsButton = document.getElementById("submitButton");
const factsResult = document.getElementById("cFactResult");

const photosInput = document.getElementById("cPhotoInput");
const photosButton = document.getElementById("submitButton2");
const photosResult = document.getElementById("cPhotoResult");

factsButton.addEventListener("click", async () => {
    const count = parseInt(factsInput.value);
    factsResult.innerHTML = "";

    if (count > 0 && count <= 50) {
        for (let i = 0; i < count; i++) {
            try {
                const response = await axios.get("https://meowfacts.herokuapp.com/");
                const p = document.createElement("p");
                p.textContent = `${response.data.data[0]}`;
                factsResult.appendChild(p);
            }catch (error) {
                factsResult.textContent = "Error fetching cat fact.";
                break;
            }
        }
    }else {
    factsResult.textContent = "Please enter a number between 1 and 50.";
    }
});

photosButton.addEventListener("click", async () => {
    const count = parseInt(photosInput.value);
    photosResult.innerHTML = "";

    if (count > 0 && count <= 50) {
        try {
            const res = await axios.get(`https://api.thecatapi.com/v1/images/search?limit=${count}`);
            res.data.forEach((imgData) => {
                const img = document.createElement("img");
                img.src = imgData.url;
                img.alt = "Cat Photo";
                img.style.width = "100px";
                img.style.marginTop = "10px";
                photosResult.appendChild(img);
            });
        } catch (error) {
            photosResult.textContent = "Error fetching cat photos.";
        }
    } else {
        photosResult.textContent = "Please enter a number between 1 and 10.";
    }
});
