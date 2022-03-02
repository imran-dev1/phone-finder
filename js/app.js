// Spinner show/hide
const displaySpinner = (display) => {
  const spinnerDiv = document.getElementById("spinner");
  if (display === true) {
    spinnerDiv.style.display = "block";
  } else {
    spinnerDiv.style.display = "none";
  }
};
const displayNoneSpinner = () => displaySpinner(false);

// Search Results show/hide
const displayResults = (display) => {
  const resultsDiv = document.getElementById("results-container");
  if (display === true) {
    resultsDiv.style.display = "flex";
  } else {
    resultsDiv.style.display = "none";
  }
};
const displayFlexResults = () => displayResults(true);

//Display load More Button
const displayLoadMoreBtn = () => {
  document.getElementById("load-more").style.display = "inline-block";
};

// Load Search Phone API
const messageDiv = document.getElementById("message");
const searchField = document.getElementById("search-field");
const searchPhone = () => {
  if (searchField.value == "") {
    document.getElementById("load-more").style.display = "none";
    document.getElementById("results-container").textContent = "";
    document.getElementById("phone-details").textContent = "";

    const noFoundMsg = "Please write something in the search form!";
    messageDiv.innerText = noFoundMsg;
  } else {
    displaySpinner(true);
    messageDiv.innerText = "";

    // Fetch API
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchField.value}`;
    searchField.value = "";
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayPhones(data.data));
  }
};
// Display Phone Results
const displayPhones = (phones) => {
  const resultsContainer = document.getElementById("results-container");

  // If Doesn't find the result
  if (phones.length === 0) {
    resultsContainer.textContent = "";
    messageDiv.textContent = "";
    document.getElementById("load-more").style.display = "none";

    const displayMessage = () => {
      messageDiv.innerText = "Sorry, no results found 🥺";
    };
    document.getElementById("phone-details").textContent = "";
    displaySpinner(true);
    setTimeout(displayNoneSpinner, 1000);
    setTimeout(displayMessage, 1000);
    messageDiv.style.display = "block";
  } else {
    // If Found the Result
    messageDiv.innerText = "";
    resultsContainer.textContent = "";

    displaySpinner(true);

    displayResults(false);
    document.getElementById("phone-details").textContent = "";
    const loadMoreBtn = document.getElementById("load-more");

    // Show 20 products
    if (phones.length > 20) {
      loadMoreBtn.style.display = "none";
      for (let i = 0; i < 20; i++) {
        const phone = phones[i];
        const childDiv = document.createElement("div");
        childDiv.classList.add("col");
        childDiv.innerHTML = `
                <div class="card border-0 shadow-sm text-center p-4">
                    <img src="${phone.image}" class="card-img-top w-50 mx-auto" alt="Phone Image">
                    <div class="card-body p-0">
                        <p class="card-text mt-3">${phone.brand}</p>
                        <h5 class="card-title">${phone.phone_name}</h5>
                        <a href="#phone-details" class="btn btn-info mt-2 px-4" onclick="phoneDetails('${phone.slug}')">Details</a>
                    </div>
                </div>
                `;
        resultsContainer.appendChild(childDiv);
      }

      // Show All Button Handler
      setTimeout(displayLoadMoreBtn, 1000);
      loadMoreBtn.addEventListener("click", () => {
        loadMoreBtn.style.display = "none";
        resultsContainer.textContent = "";
        document.getElementById("phone-details").textContent = "";

        messageDiv.innerText = "";

        phones.forEach((phone) => {
          const childDiv = document.createElement("div");
          childDiv.classList.add("col");
          childDiv.innerHTML = `
          <div class="card border-0 shadow-sm text-center p-4">
              <img src="${phone.image}" class="card-img-top w-50 mx-auto" alt="Phone Image">
              <div class="card-body p-0">
                  <p class="card-text mt-3">${phone.brand}</p>
                  <h5 class="card-title">${phone.phone_name}</h5>
                  <a href="#phone-details" class="btn btn-info mt-2 px-4" onclick="phoneDetails('${phone.slug}')">Details</a>
              </div>
          </div>
          `;
          resultsContainer.appendChild(childDiv);
        });
      });
    } else {
      // If less than 20 products
      loadMoreBtn.style.display = "none";

      phones.forEach((phone) => {
        const childDiv = document.createElement("div");
        childDiv.classList.add("col");
        childDiv.innerHTML = `
          <div class="card border-0 shadow-sm text-center p-4">
              <img src="${phone.image}" class="card-img-top w-50 mx-auto" alt="Phone Image">
              <div class="card-body p-0">
                  <p class="card-text mt-3">${phone.brand}</p>
                  <h5 class="card-title">${phone.phone_name}</h5>
                  <a href="#phone-details" class="btn btn-info mt-2 px-4" onclick="phoneDetails('${phone.slug}')">Details</a>
              </div>
          </div>
          `;
        resultsContainer.appendChild(childDiv);
      });
    }
    setTimeout(displayFlexResults, 1000);
    setTimeout(displayNoneSpinner, 1000);
  }
};

// Phone Details APi
const phoneDetails = (slug) => {
  const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPhnDetails(data.data));
};

// Display Phone Details
const displayPhnDetails = (phone) => {
  console.log(phone);
  const detailsContainer = document.getElementById("phone-details");
  detailsContainer.textContent = "";
  const div = document.createElement("div");
  div.classList.add("row", "g-0");
  div.innerHTML = `
        <div class="col-md-4 p-3">
            <img src="${phone.image}" class="img-fluid rounded-start w-100" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body"> 
                <h3 class="card-title">${phone.name}</h3>
                <p class="card-text mb-0"><small class="text-muted"><strong>Brand: </strong>${phone.brand}</small></p>
                <p class="card-text"><small class="text-muted"><strong>Release: </strong>${phone.releaseDate}</small></p>
                <h6 class="heading">Main Features:</h6>
                <p class="card-text mb-0"><small class="text-muted"><strong>Chipset: </strong>${phone.mainFeatures.chipSet}</small></p>
                <p class="card-text mb-0"><small class="text-muted"><strong>Display: </strong>${phone.mainFeatures.displaySize}</small></p>
                <p class="card-text mb-0"><small class="text-muted"><strong>Memory: </strong>${phone.mainFeatures.memory}</small></p>
                <p class="card-text mb-0"><small class="text-muted"><strong>Sensors: </strong>${phone.mainFeatures.sensors}</small></p>
                <p class="card-text mb-0"><small class="text-muted"><strong>Storage: </strong>${phone.mainFeatures.storage}</small></p>
                <h6 class="heading mt-3">Others:</h6>
                <p class="card-text mb-0"><small class="text-muted"><strong>Bluetooth: </strong>${phone.others.Bluetooth}</small></p>
                <p class="card-text mb-0"><small class="text-muted"><strong>GPS: </strong>${phone.others.GPS}</small></p>
                <p class="card-text mb-0"><small class="text-muted"><strong>NFC: </strong>${phone.others.NFC}</small></p>
                <p class="card-text mb-0"><small class="text-muted"><strong>Radio: </strong>${phone.others.Radio}</small></p>
                <p class="card-text mb-0"><small class="text-muted"><strong>USB: </strong>${phone.others.USB}</small></p>
                <p class="card-text mb-0"><small class="text-muted"><strong>WLAN: </strong>${phone.others.WLAN}</small></p>
                
            </div>
        </div>
  `;
  detailsContainer.appendChild(div);
};
