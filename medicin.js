// ==========================================
// SWASTHPATH - MEDICINE GUIDANCE
// ==========================================

const medicineData = {

    "paracetamol": {
        category: "Pain Reliever / Fever Reducer",
        use: "Commonly used for fever, headache and mild body pain."
    },

    "crocin": {
        category: "Pain Reliever / Fever Reducer",
        use: "Commonly used for fever, headache and mild pain."
    },

    "ibuprofen": {
        category: "Pain Reliever / Anti-inflammatory",
        use: "Used for pain, inflammation and fever."
    },

    "cetirizine": {
        category: "Antihistamine",
        use: "Used for allergy symptoms such as sneezing, itching and runny nose."
    },

    "azithromycin": {
        category: "Antibiotic",
        use: "An antibiotic used for certain bacterial infections."
    },

    "amoxicillin": {
        category: "Antibiotic",
        use: "An antibiotic used for certain bacterial infections."
    },

    "omeprazole": {
        category: "Acid Reducer",
        use: "Used to reduce stomach acid and help with acidity and heartburn."
    },

    "pantoprazole": {
        category: "Acid Reducer",
        use: "Used for acidity, heartburn and acid reflux."
    },

    "antacid": {
        category: "Antacid",
        use: "Used for temporary relief from acidity and heartburn."
    },

    "ors": {
        category: "Rehydration",
        use: "Used to help replace fluids and electrolytes during dehydration."
    },

    "loperamide": {
        category: "Antidiarrheal",
        use: "Used to reduce symptoms of diarrhea."
    },

    "ondansetron": {
        category: "Anti-nausea",
        use: "Used to help control nausea and vomiting."
    },

    "dextromethorphan": {
        category: "Cough Suppressant",
        use: "Used in some cough medicines to relieve dry cough."
    },

    "guaifenesin": {
        category: "Expectorant",
        use: "Used to help loosen mucus during a cough."
    },

    "salbutamol": {
        category: "Bronchodilator",
        use: "Used to relieve breathing difficulty in certain airway conditions."
    },

    "diclofenac": {
        category: "Pain Reliever",
        use: "Used to relieve pain and inflammation."
    },

    "aspirin": {
        category: "Pain Reliever",
        use: "Used for pain and fever and has other specific medical uses."
    },

    "calamine": {
        category: "Skin Treatment",
        use: "Used externally to soothe minor skin irritation and itching."
    },

    "clotrimazole": {
        category: "Antifungal",
        use: "Used for certain fungal skin infections."
    },

    "metformin": {
        category: "Antidiabetic",
        use: "Used to help control blood glucose in type 2 diabetes."
    },

    "multivitamin": {
        category: "Vitamin Supplement",
        use: "Provides vitamins and minerals when dietary intake may be insufficient."
    },

    "vitamin c": {
        category: "Vitamin Supplement",
        use: "Provides vitamin C, an essential nutrient."
    },

    "calcium": {
        category: "Mineral Supplement",
        use: "Provides calcium, an essential mineral important for bones."
    },

    "iron": {
        category: "Mineral Supplement",
        use: "Provides iron, an essential mineral needed for making hemoglobin."
    }

};


// ==========================================
// MAIN FUNCTION
// ==========================================

function showMedicineUse() {

    const input = document.getElementById("medicineInput");
    const result = document.getElementById("medicineResult");

    if (!input || !result) {
        return;
    }

    const medicineName = input.value.trim().toLowerCase();

    // Empty input
    if (medicineName === "") {

        result.innerHTML = `
            <div style="color:#d9534f;">
                ⚠️ Please enter a medicine name.
            </div>
        `;

        return;
    }


    // Exact medicine search
    if (medicineData[medicineName]) {

        const medicine = medicineData[medicineName];

        result.innerHTML = `
            <div>
                <h3 style="color:#159a8c; margin-bottom:10px;">
                    💊 ${medicineName.toUpperCase()}
                </h3>

                <p>
                    <strong>Category:</strong>
                    ${medicine.category}
                </p>

                <p>
                    <strong>Basic Use:</strong>
                    ${medicine.use}
                </p>

                <hr>

                <p style="font-size:14px;color:#777;">
                    ⚕️ This information is for general guidance only.
                    Consult a doctor or pharmacist before using medicines.
                </p>
            </div>
        `;

        return;
    }


    // Partial search
    const matchedMedicine = Object.keys(medicineData).find(name =>
        name.includes(medicineName)
    );


    if (matchedMedicine) {

        const medicine = medicineData[matchedMedicine];

        result.innerHTML = `
            <div>

                <h3 style="color:#159a8c;">
                    💊 ${matchedMedicine.toUpperCase()}
                </h3>

                <p>
                    <strong>Category:</strong>
                    ${medicine.category}
                </p>

                <p>
                    <strong>Basic Use:</strong>
                    ${medicine.use}
                </p>

                <hr>

                <p style="font-size:14px;color:#777;">
                    ⚕️ General health information only.
                    Please consult a healthcare professional.
                </p>

            </div>
        `;

        return;
    }


    // Medicine not found
    result.innerHTML = `
        <div>

            <h3 style="color:#d9534f;">
                ❌ Medicine Not Found
            </h3>

            <p>
                This medicine is not available in our basic database.
            </p>

            <p style="font-size:14px;color:#777;">
                Try another common medicine name.
            </p>

        </div>
    `;
}


// ==========================================
// ENTER KEY SUPPORT
// ==========================================

document.addEventListener("DOMContentLoaded", function() {

    const input = document.getElementById("medicineInput");

    if (input) {

        input.addEventListener("keypress", function(event) {

            if (event.key === "Enter") {

                showMedicineUse();

            }

        });

    }

});