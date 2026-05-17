const menuItems = document.querySelectorAll(".menu-item");
const popupOverlay = document.querySelector(".popup-overlay");
const closeBtn = document.querySelector(".close-btn");
const orderBtn = document.querySelector(".order-btn");

const popupName = document.getElementById("popup-name");
const popupPrice = document.getElementById("popup-price");
const popupDescription = document.getElementById("popup-description");
const popupImage = document.getElementById("popup-image");

let currentItem = {};


menuItems.forEach(item => {
    item.addEventListener("click", () => {
        currentItem = {
            name: item.dataset.name,
            price: item.dataset.price,
            description: item.dataset.description,
            image: item.dataset.image
        };

        popupName.textContent = currentItem.name;
        popupPrice.textContent = currentItem.price;
        popupDescription.textContent = currentItem.description;
        popupImage.src = currentItem.image;

        popupOverlay.classList.add("active");
    });
});


let cart = JSON.parse(localStorage.getItem("cart")) || [];

orderBtn.addEventListener("click", () => {
    
    const existingItem = cart.find(item => item.name === currentItem.name);

    if (existingItem) {
        
        existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
        
        cart.push({
            name: currentItem.name,
            price: parseFloat(currentItem.price) || 0,
            image: currentItem.image,
            quantity: 1 
        });
    }

    
    localStorage.setItem("cart", JSON.stringify(cart));

    
    updateCartButton();
    
    
    showToast(`تم إضافة ${currentItem.name} إلى السلة!`);
});


function showToast(message) {
    const toast = document.getElementById("toast-notification");
    const toastText = document.getElementById("toast-text");
    
    if (toast && toastText) {
        toastText.textContent = message;
        toast.style.top = "30px"; 
        setTimeout(() => {
            toast.style.top = "-100px";
        }, 2500);
    }
}


function updateCartButton() {
    const GoToOrderBtn = document.getElementById("go-to-order-btn");
    if(GoToOrderBtn) {
        
        const totalItemsCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);
        
        GoToOrderBtn.textContent = `عرض السلة والشراء (🛒 ${totalItemsCount})`;
        
        
        GoToOrderBtn.classList.add("bounce-animation");
        setTimeout(() => {
            GoToOrderBtn.classList.remove("bounce-animation");
        }, 400);
    }
}


updateCartButton();



closeBtn.addEventListener("click", () => {
    popupOverlay.classList.remove("active");
});

popupOverlay.addEventListener("click", (e) => {
    if (e.target === popupOverlay) {
        popupOverlay.classList.remove("active");
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        popupOverlay.classList.remove("active");
    }
});