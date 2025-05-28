const API_KEY = "";
const submitIcon = document.querySelector("#submit-icon");
const inputElement = document.querySelector("input");
const imageSection = document.querySelector('.image-section');

const getImages = async () => {
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            prompt: inputElement.value,
            n: 4,
            size: "1024x1024"
        })
    };

    try {
        const response = await fetch('https://api.openai.com/v1/images/generations', options);

        if (response.status === 404) {
            console.error('Resource not found. Check the URL and try again.');
            return;
        }

        if (response.status === 429) {
            console.error('Rate limit exceeded. Please wait and try again later.');
            return;
        }

        const data = await response.json();
        console.log(data);

        // Clear previous images
        imageSection.innerHTML = '';

        data?.data.forEach(imageObject => {
           const imageContainer = document.createElement("div");
           imageContainer.classList.add("image-container");
           const imageElement = document.createElement("img");
           imageElement.setAttribute("src", imageObject.url);
           imageContainer.append(imageElement);
           imageSection.append(imageContainer);
        });
    } catch (error) {
        console.error('Error:', error);
    }
};

submitIcon.addEventListener('click', () => getImages());
