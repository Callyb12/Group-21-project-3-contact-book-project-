// =========================================

// CONTACT BOOK APPLICATION

// =========================================

// =========================================

// CONTACT CLASS

// =========================================

class Contact {

    constructor(name, phone, email) {

        this.id = Date.now() + Math.random();

        this.name = name;

        this.phone = phone;

        this.email = email;

    }

    // Class method

    getDetails() {

        return `${this.name} - ${this.phone} - ${this.email}`;

    }

}

// =========================================

// INITIAL GROUP CONTACTS

// =========================================

const initialContacts = [

    {

        name: "NWAFOR CALLISTUS CHUKWUEMEKA",

        phone: "08000000001",

        email: "callistus@example.com"

    },

    {

        name: "NWABUEZE DAVID ONYEBUCHI",

        phone: "08000000002",

        email: "david@example.com"

    },

    {

        name: "NWACHUKWU CHIAMAKA VIVIAN",

        phone: "08000000003",

        email: "chiamaka@example.com"

    },

    {

        name: "NWACHUKWU GLORIA OLUEBUBECHI",

        phone: "08000000004",

        email: "gloria@example.com"

    },

    {

        name: "NWAFOR JOHN CHUKWUEMELIE",

        phone: "08000000005",

        email: "john@example.com"

    },

    {

        name: "NWANKWO KELVIN IKEMDINACHI",

        phone: "08000000006",

        email: "kelvin@example.com"

    }

];

// =========================================

// APPLICATION DATA

// =========================================

let contacts = [];

let editingContactId = null;

// =========================================

// HTML ELEMENTS

// =========================================

const contactForm =

    document.getElementById("contact-form");

const nameInput =

    document.getElementById("full-name");

const phoneInput =

    document.getElementById("phone");

const emailInput =

    document.getElementById("email");

const contactsList =

    document.getElementById("contacts-list");

const searchInput =

    document.getElementById("search-input");

const errorMessage =

    document.getElementById("error-message");

const contactCount =

    document.getElementById("contact-count");

const emptyMessage =

    document.getElementById("empty-message");

const formTitle =

    document.getElementById("form-title");

const submitButton =

    document.getElementById("submit-button");

const cancelButton =

    document.getElementById("cancel-button");

// =========================================

// START APPLICATION

// =========================================

loadContacts();

// =========================================

// LOAD CONTACTS

// =========================================

function loadContacts() {

    const savedContacts =

        localStorage.getItem("contactBook");

    if (savedContacts) {

        contacts = JSON.parse(savedContacts);

    }

    else {

        contacts = initialContacts.map(

            contact =>

                new Contact(

                    contact.name,

                    contact.phone,

                    contact.email

                )

        );

        saveContacts();

    }

    displayContacts(contacts);

}

// =========================================

// SAVE CONTACTS

// =========================================

function saveContacts() {

    localStorage.setItem(

        "contactBook",

        JSON.stringify(contacts)

    );

}

// =========================================

// VALIDATE CONTACT

// =========================================

function validateContact(

    name,

    phone,

    email

) {

    // Check empty fields

    if (

        name.trim() === "" ||

        phone.trim() === "" ||

        email.trim() === ""

    ) {

        return "Please fill in all fields.";

    }

    // Check name length

    if (name.trim().length < 2) {

        return "Name must contain at least 2 characters.";

    }

    // Phone validation

    const phonePattern =

        /^[0-9]{10,15}$/;

    if (!phonePattern.test(phone)) {

        return "Phone number must contain 10-15 digits.";

    }

    // Email validation

    const emailPattern =

        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        return "Please enter a valid email address.";

    }

    return "";

}

// =========================================

// ADD / UPDATE CONTACT

// =========================================

contactForm.addEventListener(

    "submit",

    function(event) {

        event.preventDefault();

        const name =

            nameInput.value.trim();

        const phone =

            phoneInput.value.trim();

        const email =

            emailInput.value.trim();

        // Validate information

        const validationError =

            validateContact(

                name,

                phone,

                email

            );

        if (validationError !== "") {

            errorMessage.textContent =

                validationError;

            return;

        }

        errorMessage.textContent = "";

        // =====================================

        // UPDATE EXISTING CONTACT

        // =====================================

        if (editingContactId !== null) {

            const contact =

                contacts.find(

                    contact =>

                        contact.id === editingContactId

                );

            if (contact) {

                contact.name = name;

                contact.phone = phone;

                contact.email = email;

            }

            editingContactId = null;

            formTitle.textContent =

                "Add New Contact";

            submitButton.textContent =

                "➕ Add Contact";

            cancelButton.classList.add(

                "hidden"

            );

        }

        // =====================================

        // ADD NEW CONTACT

        // =====================================

        else {

            const newContact =

                new Contact(

                    name,

                    phone,

                    email

                );

            contacts.push(newContact);

        }

        saveContacts();

        displayContacts(contacts);

        contactForm.reset();

    }

);

// =========================================

// DISPLAY CONTACTS

// =========================================

function displayContacts(

    contactArray

) {

    contactsList.innerHTML = "";

    contactCount.textContent =

        `${contactArray.length} contact${contactArray.length === 1 ? "" : "s"}`;

    // LOOP

    for (

        let i = 0;

        i < contactArray.length;

        i++

    ) {

        const contact =

            contactArray[i];

        const card =

            document.createElement("div");

        card.className =

            "contact-card";

        card.innerHTML = `

            <h3>

                👤 ${escapeHTML(contact.name)}

            </h3>

            <p class="contact-info">

                📞 ${escapeHTML(contact.phone)}

            </p>

            <p class="contact-info">

                ✉️ ${escapeHTML(contact.email)}

            </p>

            <div class="contact-actions">

                <button

                    class="edit-button"

                    onclick="editContact(${contact.id})"

                >

                    ✏️ Edit

                </button>

                <button

                    class="delete-button"

                    onclick="deleteContact(${contact.id})"

                >

                    🗑️ Delete

                </button>

            </div>

        `;

        contactsList.appendChild(card);

    }

    // CONDITIONAL

    if (contactArray.length === 0) {

        emptyMessage.style.display =

            "block";

    }

    else {

        emptyMessage.style.display =

            "none";

    }

}

// =========================================

// SEARCH CONTACTS

// =========================================

searchInput.addEventListener(

    "input",

    function() {

        const searchTerm =

            searchInput.value

                .toLowerCase()

                .trim();

        const filteredContacts =

            contacts.filter(

                contact =>

                    contact.name

                        .toLowerCase()

                        .includes(searchTerm)

            );

        displayContacts(

            filteredContacts

        );

    }

);

// =========================================

// EDIT CONTACT

// =========================================

function editContact(id) {

    const contact =

        contacts.find(

            contact =>

                contact.id === id

        );

    if (!contact) {

        return;

    }

    nameInput.value =

        contact.name;

    phoneInput.value =

        contact.phone;

    emailInput.value =

        contact.email;

    editingContactId = id;

    formTitle.textContent =

        "Edit Contact";

    submitButton.textContent =

        "💾 Update Contact";

    cancelButton.classList.remove(

        "hidden"

    );

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}

// =========================================

// CANCEL EDIT

// =========================================

cancelButton.addEventListener(

    "click",

    function() {

        editingContactId = null;

        contactForm.reset();

        formTitle.textContent =

            "Add New Contact";

        submitButton.textContent =

            "➕ Add Contact";

        cancelButton.classList.add(

            "hidden"

        );

        errorMessage.textContent = "";

    }

);

// =========================================

// DELETE CONTACT

// =========================================

function deleteContact(id) {

    const confirmed =

        confirm(

            "Are you sure you want to delete this contact?"

        );

    if (!confirmed) {

        return;

    }

    contacts =

        contacts.filter(

            contact =>

                contact.id !== id

        );

    saveContacts();

    displayContacts(contacts);

}

// =========================================

// SECURITY HELPER

// =========================================

function escapeHTML(value) {

    const div =

        document.createElement("div");

    div.textContent = value;

    return div.innerHTML;

}