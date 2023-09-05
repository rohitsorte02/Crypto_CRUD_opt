let selectedRow = null;

// Get references to the buttons by their IDs
const addCryptoButton = document.getElementById("add-crypto-btn");
const updateButton = document.getElementById("update-btn");
const cancelButton = document.getElementById("cancel-btn");

// Attach event listeners to the buttons
addCryptoButton.addEventListener("click", addOrUpdateCrypto);
updateButton.addEventListener("click", addOrUpdateCrypto);
cancelButton.addEventListener("click", cancelUpdate);

// Function to add or update crypto data
function addOrUpdateCrypto() {
    const name = document.getElementById("crypto-name").value;
    const quantity = document.getElementById("crypto-quantity").value;
    const price = document.getElementById("crypto-price").value;

    if (selectedRow == null) {
        // Add new row
        const table = document.getElementById("crypto-table-body");
        const newRow = table.insertRow(table.rows.length);
        newRow.insertCell(0).innerHTML = name;
        newRow.insertCell(1).innerHTML = quantity;
        newRow.insertCell(2).innerHTML = price;
        newRow.insertCell(3).innerHTML = `
            <button class="update-btn" onclick="updateCrypto(this)">Update</button>
            <button class="delete-btn" onclick="deleteCrypto(this)">Delete</button>
        `;
         if (!name || isNaN(quantity) || isNaN(price)) {
            alert("Please Enter Valid Data.");
            return;
        }
    
        // Calculate the value of the holding
        // const value = quantity * price;
    
        // // Create a new holding object 
        // const holding = {
        //     name: name,
        //     quantity: quantity,
        //     price: price,
        //     value: value,
        // };
    } else {
        // Update selected row
        selectedRow.cells[0].innerHTML = name;
        selectedRow.cells[1].innerHTML = quantity;
        selectedRow.cells[2].innerHTML = price;
        selectedRow.cells[3].innerHTML = `
            <button class="update-btn" onclick="updateCrypto(this)">Update</button>
            <button class="delete-btn" onclick="deleteCrypto(this)">Delete</button>
        `;
        selectedRow = null;
        document.getElementById("update-btn").style.display = "none";
        document.getElementById("cancel-btn").style.display = "none";
    }

    // Clear input fields
    document.getElementById("crypto-name").value = "";
    document.getElementById("crypto-quantity").value = "";
    document.getElementById("crypto-price").value = "";
}

// Function to update crypto data
function updateCrypto(btn) {
    selectedRow = btn.parentElement.parentElement;
    document.getElementById("crypto-name").value = selectedRow.cells[0].innerHTML;
    document.getElementById("crypto-quantity").value = selectedRow.cells[1].innerHTML;
    document.getElementById("crypto-price").value = selectedRow.cells[2].innerHTML;
    document.getElementById("update-btn").style.display = "inline-block";
    document.getElementById("cancel-btn").style.display = "inline-block";
}

// Function to delete crypto data
function deleteCrypto(btn) {
    if (confirm("Are you sure you want to delete this cryptocurrency?")) {
        const row = btn.parentElement.parentElement;
        row.parentNode.removeChild(row); // Delete the selected row
    }
}

// Function to cancel the update operation
function cancelUpdate() {
    selectedRow = null;
    document.getElementById("update-btn").style.display = "none";
    document.getElementById("cancel-btn").style.display = "none";
    document.getElementById("crypto-name").value = "";
    document.getElementById("crypto-quantity").value = "";
    document.getElementById("crypto-price").value = "";
}