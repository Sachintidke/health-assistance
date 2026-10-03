document.addEventListener("DOMContentLoaded", () => {

            /* =====================================================
               ELEMENTS
               ===================================================== */

            const homeLogo = document.getElementById("homeLogo");
            const navHome = document.getElementById("navHome");
            const navHealthCheck = document.getElementById("navHealthCheck");
            const navAbout = document.getElementById("navAbout");

            const languageSelect = document.getElementById("languageSelect");

            const startHealthBtn = document.getElementById("startHealthBtn");
            const learnMoreBtn = document.getElementById("learnMoreBtn");
            const backToHomeBtn = document.getElementById("backToHomeBtn");

            const heroSection = document.getElementById("heroSection");
            const healthChecker = document.getElementById("healthChecker");
            const aboutSection = document.getElementById("aboutSection");

            const checkerContent = document.getElementById("checkerContent");

            const progressText = document.getElementById("progressText");
            const progressPercent = document.getElementById("progressPercent");
            const progressFill = document.getElementById("progressFill");

            /* =====================================================
               APP STATE
               ===================================================== */

            let currentLanguage = "en";
            let currentStep = 0;
            let answers = {};
            let selectedConcern = "";

            /* =====================================================
               TRANSLATIONS
               ===================================================== */

            const translations = {

                en: {
                    home: "Home",
                    healthCheck: "Health Check",
                    about: "About",

                    start: "Start Health Check",
                    learn: "Learn More",
                    back: "← Back to Home",

                    progressStart: "Getting started",
                    question: "Question",
                    of: "of",

                    next: "Next",
                    backQuestion: "Back",
                    restart: "Start Again",
                    homeButton: "Back to Home",

                    concernTitle: "What is your main health concern?",
                    concernHelp: "Choose the option that best matches your concern.",

                    fever: "Fever or feeling unusually hot",
                    cough: "Cough, cold or throat discomfort",
                    stomach: "Stomach pain or digestive discomfort",
                    headache: "Headache or body discomfort",
                    injury: "Minor injury or pain",
                    skin: "Skin concern",
                    other: "Other / Not sure",

                    emergencyQuestion: "Are you experiencing any serious danger sign right now?",
                    emergencyHelp: "Choose Yes if you feel you need urgent medical attention.",
                    yes: "Yes",
                    no: "No",

                    severityQuestion: "How severe is the problem?",
                    mild: "Mild",
                    moderate: "Moderate",
                    severe: "Severe",

                    durationQuestion: "How long have you had this concern?",
                    lessDay: "Less than 1 day",
                    oneThree: "1–3 days",
                    moreThree: "More than 3 days",

                    worseningQuestion: "Is the problem getting worse?",
                    gettingBetter: "No, it is improving",
                    same: "About the same",
                    worse: "Yes, it is getting worse",

                    resultHome: "Home Care & Monitoring",
                    resultClinic: "Visit a Local Clinic",
                    resultUrgent: "Seek Urgent Medical Attention",
                    homeReason: "Your answers do not indicate an immediate danger sign. General home monitoring may be reasonable if symptoms remain mild and do not worsen.",
                    clinicReason: "Your answers suggest that speaking with a healthcare professional at a local clinic would be appropriate.",
                    urgentReason: "Your answers include a potential warning sign or a concern that may need prompt professional assessment.",

                    emergencyReason: "A possible danger sign was selected. SwasthPath cannot assess emergencies remotely, so seek urgent medical attention now.",

                    why: "Why this recommendation?",
                    generalAdvice: "General guidance",
                    safety: "Safety information",

                    homeAdvice: [
                        "Rest and monitor how you feel.",
                        "Stay hydrated if you can drink normally.",
                        "Keep track of whether the concern improves or worsens.",
                        "If symptoms become severe or new danger signs appear, seek medical help promptly."
                    ],

                    clinicAdvice: [
                        "Consider visiting a local clinic or healthcare centre.",
                        "Tell the healthcare professional when the problem started.",
                        "Share any important medicines or health information you already have.",
                        "Seek urgent care if the condition suddenly becomes severe."
                    ],

                    urgentAdvice: [
                        "Seek urgent medical attention.",
                        "If possible, ask a trusted person to stay with you.",
                        "Follow instructions from local healthcare professionals.",
                        "Do not delay professional assessment when danger signs are present."
                    ],

                    nearby: "Find Nearby Healthcare",
                    locationButton: "Use My Location",
                    locating: "Requesting your location...",
                    locationSuccess: "Location received. You can search for nearby healthcare facilities.",
                    locationError: "Location could not be accessed. Please use your map application to find a nearby healthcare facility.",

                    disclaimerTitle: "Important",
                    disclaimer: "SwasthPath provides general health guidance only. It does not diagnose medical conditions.",

                    medicalDisclaimer: "SwasthPath is a hackathon prototype for general health guidance. It is not a medical diagnosis system and does not replace a qualified healthcare professional."
                },

                hi: {
                    home: "होम",
                    healthCheck: "स्वास्थ्य जाँच",
                    about: "हमारे बारे में",

                    start: "स्वास्थ्य जाँच शुरू करें",
                    learn: "और जानें",
                    back: "← होम पर वापस जाएँ",

                    progressStart: "शुरुआत",
                    question: "प्रश्न",
                    of: "में से",

                    next: "आगे",
                    backQuestion: "पीछे",
                    restart: "फिर से शुरू करें",
                    homeButton: "होम पर वापस जाएँ",

                    concernTitle: "आपकी मुख्य स्वास्थ्य चिंता क्या है?",
                    concernHelp: "अपनी स्थिति से सबसे मिलते-जुलते विकल्प को चुनें।",

                    fever: "बुखार या शरीर गर्म लगना",
                    cough: "खाँसी, सर्दी या गले में परेशानी",
                    stomach: "पेट दर्द या पाचन संबंधी परेशानी",
                    headache: "सिरदर्द या शरीर में परेशानी",
                    injury: "हल्की चोट या दर्द",
                    skin: "त्वचा संबंधी समस्या",
                    other: "अन्य / निश्चित नहीं",

                    emergencyQuestion: "क्या आपको अभी कोई गंभीर खतरे का संकेत महसूस हो रहा है?",
                    emergencyHelp: "अगर आपको तुरंत चिकित्सा सहायता की जरूरत लगती है तो हाँ चुनें।",
                    yes: "हाँ",
                    no: "नहीं",

                    severityQuestion: "समस्या कितनी गंभीर है?",
                    mild: "हल्की",
                    moderate: "मध्यम",
                    severe: "गंभीर",

                    durationQuestion: "यह समस्या कितने समय से है?",
                    lessDay: "1 दिन से कम",
                    oneThree: "1–3 दिन",
                    moreThree: "3 दिन से अधिक",

                    worseningQuestion: "क्या समस्या बढ़ रही है?",
                    gettingBetter: "नहीं, सुधार हो रहा है",
                    same: "लगभग समान है",
                    worse: "हाँ, समस्या बढ़ रही है",

                    resultHome: "घर पर देखभाल और निगरानी",
                    resultClinic: "स्थानीय क्लिनिक जाएँ",
                    resultUrgent: "तुरंत चिकित्सा सहायता लें",

                    homeReason: "आपके उत्तरों में तत्काल खतरे का संकेत नहीं मिला। यदि समस्या हल्की है और बढ़ नहीं रही है, तो सामान्य निगरानी उचित हो सकती है।",
                    clinicReason: "आपके उत्तर बताते हैं कि स्थानीय क्लिनिक या स्वास्थ्य केंद्र में स्वास्थ्यकर्मी से सलाह लेना उचित होगा।",
                    urgentReason: "आपके उत्तरों में संभावित चेतावनी संकेत दिखाई देता है या समस्या के लिए जल्द पेशेवर जाँच की आवश्यकता हो सकती है।",

                    emergencyReason: "एक संभावित खतरे का संकेत चुना गया है। SwasthPath दूर से आपात स्थिति का आकलन नहीं कर सकता, इसलिए तुरंत चिकित्सा सहायता लें।",

                    why: "यह सुझाव क्यों?",
                    generalAdvice: "सामान्य मार्गदर्शन",
                    safety: "सुरक्षा जानकारी",

                    homeAdvice: [
                        "आराम करें और अपनी स्थिति पर नज़र रखें।",
                        "यदि आप सामान्य रूप से पी सकते हैं तो पर्याप्त पानी पिएँ।",
                        "ध्यान रखें कि समस्या बेहतर हो रही है या बिगड़ रही है।",
                        "लक्षण गंभीर होने या नए खतरे के संकेत आने पर तुरंत चिकित्सा सहायता लें।"
                    ],

                    clinicAdvice: [
                        "स्थानीय क्लिनिक या स्वास्थ्य केंद्र जाने पर विचार करें।",
                        "स्वास्थ्यकर्मी को बताएँ कि समस्या कब शुरू हुई।",
                        "जो महत्वपूर्ण दवाएँ या स्वास्थ्य जानकारी आपके पास है, उसे साझा करें।",
                        "स्थिति अचानक गंभीर होने पर तुरंत सहायता लें।"
                    ],

                    urgentAdvice: [
                        "तुरंत चिकित्सा सहायता लें।",
                        "यदि संभव हो तो किसी भरोसेमंद व्यक्ति को अपने साथ रखें।",
                        "स्थानीय स्वास्थ्यकर्मियों के निर्देशों का पालन करें।",
                        "खतरे के संकेत होने पर चिकित्सा जाँच में देरी न करें।"
                    ],

                    nearby: "पास के स्वास्थ्य केंद्र खोजें",
                    locationButton: "मेरी लोकेशन इस्तेमाल करें",
                    locating: "आपकी लोकेशन ली जा रही है...",
                    locationSuccess: "लोकेशन मिल गई। अब आप पास के स्वास्थ्य केंद्र खोज सकते हैं।",
                    locationError: "लोकेशन प्राप्त नहीं हो सकी। कृपया अपने मैप ऐप से पास का स्वास्थ्य केंद्र खोजें।",

                    disclaimerTitle: "महत्वपूर्ण",
                    disclaimer: "SwasthPath केवल सामान्य स्वास्थ्य मार्गदर्शन देता है। यह किसी बीमारी का निदान नहीं करता।",

                    medicalDisclaimer: "SwasthPath सामान्य स्वास्थ्य मार्गदर्शन के लिए बनाया गया है। यह मेडिकल डायग्नोसिस सिस्टम नहीं है और योग्य स्वास्थ्यकर्मी का विकल्प नहीं है।"
                },
                mr: {
                    home: "मुख्यपृष्ठ",
                    healthCheck: "आरोग्य तपासणी",
                    about: "आमच्याबद्दल",

                    start: "आरोग्य तपासणी सुरू करा",
                    learn: "अधिक जाणून घ्या",
                    back: "← मुख्यपृष्ठावर जा",

                    progressStart: "सुरुवात",
                    question: "प्रश्न",
                    of: "पैकी",

                    next: "पुढे",
                    backQuestion: "मागे",
                    restart: "पुन्हा सुरू करा",
                    homeButton: "मुख्यपृष्ठावर जा",

                    concernTitle: "तुमची मुख्य आरोग्याची समस्या कोणती आहे?",
                    concernHelp: "तुमच्या परिस्थितीशी सर्वात जुळणारा पर्याय निवडा.",

                    fever: "ताप किंवा शरीर गरम वाटणे",
                    cough: "खोकला, सर्दी किंवा घशाचा त्रास",
                    stomach: "पोटदुखी किंवा पचनाचा त्रास",
                    headache: "डोकेदुखी किंवा शरीरात अस्वस्थता",
                    injury: "किरकोळ दुखापत किंवा वेदना",
                    skin: "त्वचेशी संबंधित समस्या",
                    other: "इतर / खात्री नाही",

                    emergencyQuestion: "तुम्हाला सध्या कोणतीही गंभीर धोक्याची लक्षणे जाणवत आहेत का?",
                    emergencyHelp: "तातडीने वैद्यकीय मदतीची गरज वाटत असल्यास होय निवडा.",
                    yes: "होय",
                    no: "नाही",

                    severityQuestion: "समस्या किती गंभीर आहे?",
                    mild: "सौम्य",
                    moderate: "मध्यम",
                    severe: "गंभीर",

                    durationQuestion: "ही समस्या किती काळापासून आहे?",
                    lessDay: "1 दिवसापेक्षा कमी",
                    oneThree: "1–3 दिवस",
                    moreThree: "3 दिवसांपेक्षा जास्त",

                    worseningQuestion: "समस्या वाढत आहे का?",
                    gettingBetter: "नाही, सुधारणा होत आहे",
                    same: "जवळपास तशीच आहे",
                    worse: "होय, समस्या वाढत आहे",

                    resultHome: "घरी काळजी आणि निरीक्षण",
                    resultClinic: "स्थानिक दवाखान्यात जा",
                    resultUrgent: "तातडीने वैद्यकीय मदत घ्या",

                    homeReason: "तुमच्या उत्तरांमध्ये तातडीच्या धोक्याचे संकेत दिसत नाहीत. समस्या सौम्य असेल आणि वाढत नसेल तर सामान्य निरीक्षण योग्य असू शकते.",
                    clinicReason: "तुमच्या उत्तरांनुसार स्थानिक दवाखाना किंवा आरोग्य केंद्रातील आरोग्यकर्मचाऱ्यांचा सल्ला घेणे योग्य ठरेल.",
                    urgentReason: "तुमच्या उत्तरांमध्ये संभाव्य इशारा दिसतो किंवा समस्येसाठी लवकर व्यावसायिक तपासणीची गरज असू शकते.",

                    emergencyReason: "संभाव्य धोक्याचे एक चिन्ह निवडले आहे. SwasthPath दूरून आपत्कालीन स्थितीचे मूल्यांकन करू शकत नाही, त्यामुळे तातडीने वैद्यकीय मदत घ्या.",

                    why: "हा सल्ला का?",
                    generalAdvice: "सामान्य मार्गदर्शन",
                    safety: "सुरक्षिततेची माहिती",

                    homeAdvice: [
                        "विश्रांती घ्या आणि तुमच्या स्थितीवर लक्ष ठेवा.",
                        "सामान्यपणे पाणी पिऊ शकत असल्यास पुरेसे पाणी प्या.",
                        "समस्या सुधारत आहे की वाढत आहे याकडे लक्ष द्या.",
                        "लक्षणे गंभीर झाल्यास किंवा नवीन धोक्याची चिन्हे दिसल्यास तातडीने वैद्यकीय मदत घ्या."
                    ],

                    clinicAdvice: [
                        "स्थानिक दवाखाना किंवा आरोग्य केंद्रात जाण्याचा विचार करा.",
                        "समस्या कधी सुरू झाली हे आरोग्यकर्मचाऱ्यांना सांगा.",
                        "तुमच्याकडे असलेली महत्त्वाची औषधे किंवा आरोग्यविषयक माहिती सांगा.",
                        "स्थिती अचानक गंभीर झाल्यास तातडीने मदत घ्या."
                    ],

                    urgentAdvice: [
                        "तातडीने वैद्यकीय मदत घ्या.",
                        "शक्य असल्यास एखाद्या विश्वासू व्यक्तीला तुमच्यासोबत ठेवा.",
                        "स्थानिक आरोग्यकर्मचाऱ्यांच्या सूचनांचे पालन करा.",
                        "धोक्याची चिन्हे असल्यास वैद्यकीय तपासणीत विलंब करू नका."
                    ],

                    nearby: "जवळचे आरोग्य केंद्र शोधा",
                    locationButton: "माझी लोकेशन वापरा",
                    locating: "तुमची लोकेशन मिळवत आहे...",
                    locationSuccess: "लोकेशन मिळाली. आता तुम्ही जवळची आरोग्य केंद्रे शोधू शकता.",
                    locationError: "लोकेशन मिळू शकली नाही. कृपया तुमच्या मॅप अॅपमधून जवळचे आरोग्य केंद्र शोधा.",

                    disclaimerTitle: "महत्त्वाचे",
                    disclaimer: "SwasthPath फक्त सामान्य आरोग्य मार्गदर्शन देते. हे कोणत्याही आजाराचे निदान करत नाही.",

                    medicalDisclaimer: "SwasthPath सामान्य आरोग्य मार्गदर्शनासाठी तयार केलेला हॅकाथॉन प्रोटोटाइप आहे. हे मेडिकल डायग्नोसिस सिस्टम नाही आणि पात्र आरोग्यकर्मचाऱ्यांचा पर्याय नाही."
                }
            };

            /* =====================================================
               HEALTH QUESTION FLOW
               ===================================================== */

            const questions = [{
                    id: "emergency",
                    type: "emergency"
                },
                {
                    id: "severity",
                    type: "severity"
                },
                {
                    id: "duration",
                    type: "duration"
                },
                {
                    id: "worsening",
                    type: "worsening"
                }
            ];

            function t(key) {
                return translations[currentLanguage][key] || translations.en[key] || key;
            }

            function scrollToSection(element) {
                if (!element) return;

                element.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

            /* =====================================================
               HOME / HEALTH CHECK NAVIGATION
               ===================================================== */

            function showHome() {

                heroSection.style.display = "block";
                healthChecker.style.display = "none";
                aboutSection.style.display = "block";

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }

            function showHealthChecker() {

                heroSection.style.display = "none";
                aboutSection.style.display = "none";
                healthChecker.style.display = "block";

                startCheck();

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }

            function showAbout() {

                heroSection.style.display = "block";
                healthChecker.style.display = "none";
                aboutSection.style.display = "block";

                setTimeout(() => {
                    scrollToSection(aboutSection);
                }, 50);
            }

            /* =====================================================
               START / RESET CHECK
               ===================================================== */

            function startCheck() {

                currentStep = 0;
                answers = {};
                selectedConcern = "";

                renderConcernQuestion();

                updateProgress(0, 5);
            }

            /* =====================================================
               CONCERN QUESTION
               ===================================================== */

            function renderConcernQuestion() {

                checkerContent.innerHTML = `
            <div class="question-screen">

                <div class="question-number">
                    ${t("question")} 1 ${t("of")} 5
                </div>

                <h3>${t("concernTitle")}</h3>

                <p class="question-help">
                    ${t("concernHelp")}
                </p>

                <div class="answer-grid">

                    <button class="answer-button" data-concern="fever">
                        🌡️ ${t("fever")}
                    </button>

                    <button class="answer-button" data-concern="cough">
                        😷 ${t("cough")}
                    </button>

                    <button class="answer-button" data-concern="stomach">
                        🩺 ${t("stomach")}
                    </button>

                    <button class="answer-button" data-concern="headache">
                        🤕 ${t("headache")}
                    </button>

                    <button class="answer-button" data-concern="injury">
                        🩹 ${t("injury")}
                    </button>

                    <button class="answer-button" data-concern="skin">
                        🔹 ${t("skin")}
                    </button>

                    <button class="answer-button" data-concern="other">
                        ❓ ${t("other")}
                    </button>

                </div>

            </div>
        `;

                const buttons = checkerContent.querySelectorAll("[data-concern]");

                buttons.forEach(button => {

                    button.addEventListener("click", () => {

                        selectedConcern = button.dataset.concern;

                        buttons.forEach(btn => {
                            btn.classList.remove("selected");
                        });

                        button.classList.add("selected");

                        setTimeout(() => {
                            currentStep = 1;
                            renderCurrentQuestion();
                        }, 200);
                    });
                });
            }

            function renderCurrentQuestion() {

                if (currentStep === 1) {
                    renderQuestion(
                        "emergencyQuestion",
                        "emergencyHelp", [
                            ["yes", "yes"],
                            ["no", "no"]
                        ],
                        "emergency"
                    );
                    return;
                }

                if (currentStep === 2) {
                    renderQuestion(
                        "severityQuestion",
                        "", [
                            ["mild", "mild"],
                            ["moderate", "moderate"],
                            ["severe", "severe"]
                        ],
                        "severity"
                    );
                    return;
                }

                if (currentStep === 3) {
                    renderQuestion(
                        "durationQuestion",
                        "", [
                            ["lessDay", "lessDay"],
                            ["oneThree", "oneThree"],
                            ["moreThree", "moreThree"]
                        ],
                        "duration"
                    );
                    return;
                }

                if (currentStep === 4) {
                    renderQuestion(
                        "worseningQuestion",
                        "", [
                            ["gettingBetter", "gettingBetter"],
                            ["same", "same"],
                            ["worse", "worse"]
                        ],
                        "worsening"
                    );
                    return;
                }

                if (currentStep >= 5) {
                    showResult();
                }
            }

            /* =====================================================
               GENERIC QUESTION RENDERER
               ===================================================== */

            function renderQuestion(titleKey, helpKey, options, answerKey) {

                const questionNumber = currentStep + 1;

                let optionHTML = "";

                options.forEach(([value, textKey]) => {

                    const isSelected = answers[answerKey] === value ?
                        "selected" :
                        "";

                    optionHTML += `
                <button
                    class="answer-button ${isSelected}"
                    data-answer="${value}"
                >
                    ${t(textKey)}
                </button>
            `;
                });

                checkerContent.innerHTML = `
            <div class="question-screen">

                <div class="question-number">
                    ${t("question")} ${questionNumber} ${t("of")} 5
                </div>

                <h3>${t(titleKey)}</h3>

                ${helpKey ? `
                    <p class="question-help">
                        ${t(helpKey)}
                    </p>
                ` : ""}

                <div class="answer-grid">
                    ${optionHTML}
                </div>

                <div class="question-actions">

                    <button
                        class="small-btn"
                        id="questionBackBtn"
                        type="button"
                    >
                        ${t("backQuestion")}
                    </button>

                </div>

            </div>
        `;

        const answerButtons =
            checkerContent.querySelectorAll("[data-answer]");

        answerButtons.forEach(button => {

            button.addEventListener("click", () => {

                const value = button.dataset.answer;

                answers[answerKey] = value;

                answerButtons.forEach(btn => {
                    btn.classList.remove("selected");
                });

                button.classList.add("selected");

                setTimeout(() => {

                    currentStep++;

                    if (
                        answerKey === "emergency" &&
                        value === "yes"
                    ) {
                        currentStep = 5;
                    }

                    renderCurrentQuestion();

                }, 180);
            });
        });

        const backButton =
            document.getElementById("questionBackBtn");

        if (backButton) {

            backButton.addEventListener("click", () => {

                if (currentStep === 1) {
                    renderConcernQuestion();
                    currentStep = 0;
                    updateProgress(0, 5);
                    return;
                }

                currentStep--;

                renderCurrentQuestion();
            });
        }

        updateProgress(currentStep, 5);
    }

    /* =====================================================
       PROGRESS BAR
       ===================================================== */

    function updateProgress(step, total) {

        if (step === 0) {

            progressText.textContent = t("progressStart");
            progressPercent.textContent = "0%";
            progressFill.style.width = "0%";

            return;
        }

        const percent =
            Math.min(100, Math.round((step / total) * 100));

        progressText.textContent =
            `${t("question")} ${step} ${t("of")} ${total}`;

        progressPercent.textContent =
            `${percent}%`;

        progressFill.style.width =
            `${percent}%`;
    }
    function calculateRecommendation() {

        /* Emergency answer always gets urgent escalation */

        if (answers.emergency === "yes") {
            return "urgent";
        }

        /* Severe problem */

        if (answers.severity === "severe") {
            return "urgent";
        }

        /* Worsening + moderate/severe */

        if (
            answers.worsening === "worse" &&
            (
                answers.severity === "moderate" ||
                answers.severity === "severe"
            )
        ) {
            return "urgent";
        }

        /* Persistent concern */

        if (
            answers.duration === "moreThree" ||
            answers.worsening === "worse"
        ) {
            return "clinic";
        }

        /* Moderate concern */

        if (answers.severity === "moderate") {
            return "clinic";
        }

        /* Default */

        return "home";
    }

    /* =====================================================
       RESULT SCREEN
       ===================================================== */

    function showResult() {

        updateProgress(5, 5);

        const recommendation =
            calculateRecommendation();

        let title = "";
        let reason = "";
        let advice = [];
        let icon = "";
        let resultClass = "";

        if (recommendation === "home") {

            title = t("resultHome");
            reason = t("homeReason");
            advice = t("homeAdvice");
            icon = "🏠";
            resultClass = "home";

        } else if (recommendation === "clinic") {

            title = t("resultClinic");
            reason = t("clinicReason");
            advice = t("clinicAdvice");
            icon = "🏥";
            resultClass = "clinic";

        } else {

            title = t("resultUrgent");
            reason =
                answers.emergency === "yes"
                    ? t("emergencyReason")
                    : t("urgentReason");

            advice = t("urgentAdvice");
            icon = "🚨";
            resultClass = "urgent";
        }

        const adviceHTML = advice
            .map(item => `<li>${item}</li>`)
            .join("");

        checkerContent.innerHTML = `

            <div class="result-screen">

                <div class="result-banner ${resultClass}">

                    <div class="result-icon">
                        ${icon}
                    </div>

                    <h3>${title}</h3>

                    <p>
                        ${reason}
                    </p>

                </div>

                <div class="result-section">

                    <h4>
                        ${t("why")}
                    </h4>

                    <p>
                        ${reason}
                    </p>

                </div>

                <div class="result-section">

                    <h4>
                        ${t("generalAdvice")}
                    </h4>

                    <ul>
                        ${adviceHTML}
                    </ul>

                </div>

                ${
                    recommendation === "urgent"
                    ? `
                        <div class="result-section emergency-result">

                            <h4>
                                ${t("safety")}
                            </h4>

                            <p>
                                ${t("emergencyReason")}
                            </p>

                        </div>
                    `
                    : ""
                }

                <div class="location-box">

                    <strong>
                        📍 ${t("nearby")}
                    </strong>

                    <p
                        class="location-status"
                        id="locationStatus"
                    >
                        ${t("locationError")}
                    </p>

                    <button
                        class="small-btn primary"
                        id="locationButton"
                        type="button"
                    >
                        ${t("locationButton")}
                    </button>

                </div>

                <div class="result-actions">

                    <button
                        class="small-btn primary"
                        id="restartButton"
                        type="button"
                    >
                        ${t("restart")}
                    </button>

                    <button
                        class="small-btn"
                        id="resultHomeButton"
                        type="button"
                    >
                        ${t("homeButton")}
                    </button>

                </div>

            </div>
        `;
        const restartButton =
            document.getElementById("restartButton");

        const resultHomeButton =
            document.getElementById("resultHomeButton");

        const locationButton =
            document.getElementById("locationButton");

        if (restartButton) {
            restartButton.addEventListener(
                "click",
                startCheck
            );
        }

        if (resultHomeButton) {
            resultHomeButton.addEventListener(
                "click",
                showHome
            );
        }

        if (locationButton) {
            locationButton.addEventListener(
                "click",
                findNearbyHealthcare
            );
        }
    }

    /* =====================================================
       LOCATION / NEARBY HEALTHCARE
       ===================================================== */

    function findNearbyHealthcare() {

        const status =
            document.getElementById("locationStatus");

        if (!status) return;

        status.textContent = t("locating");

        if (!navigator.geolocation) {

            status.textContent = t("locationError");

            return;
        }

        navigator.geolocation.getCurrentPosition(

            (position) => {

                const latitude =
                    position.coords.latitude;

                const longitude =
                    position.coords.longitude;

                status.textContent =
                    t("locationSuccess");

                const mapQuery =
                    `${latitude},${longitude}`;

                const searchURL =
                    "https://www.google.com/maps/search/hospital+clinic+health+center/@"
                    + latitude
                    + ","
                    + longitude
                    + ",14z";

                const existingLink =
                    document.getElementById("nearbyMapLink");

                if (!existingLink) {

                    const link =
                        document.createElement("a");

                    link.id = "nearbyMapLink";
                    link.href = searchURL;
                    link.target = "_blank";
                    link.rel = "noopener noreferrer";

                    link.className =
                        "small-btn primary";

                    link.style.display = "inline-block";
                    link.style.textDecoration = "none";
                    link.style.marginTop = "10px";

                    link.textContent =
                        t("nearby");

                    status.parentElement.appendChild(link);
                }

            },

            () => {

                status.textContent =
                    t("locationError");
            },

            {
                enableHighAccuracy: false,
                timeout: 10000,
                maximumAge: 300000
            }
        );
    }

    /* =====================================================
       LANGUAGE SWITCHING
       ===================================================== */

    function updateStaticLanguage() {

        /* Navbar */

        navHome.textContent = t("home");
        navHealthCheck.textContent = t("healthCheck");
        navAbout.textContent = t("about");

        /* Hero */

        startHealthBtn.innerHTML =
            `<span>🩺</span> ${t("start")}`;

        learnMoreBtn.innerHTML =
            `${t("learn")} <span>→</span>`;

        /* Back button */

        backToHomeBtn.textContent =
            t("back");

        /* Re-render active checker */

        if (healthChecker.style.display !== "none") {

            if (currentStep === 0) {
                renderConcernQuestion();
            } else if (currentStep >= 5) {
                showResult();
            } else {
                renderCurrentQuestion();
            }
        }
    }

    /* =====================================================
       NAVIGATION EVENT LISTENERS
       ===================================================== */

    homeLogo.addEventListener("click", showHome);

    navHome.addEventListener("click", showHome);

    navHealthCheck.addEventListener(
        "click",
        showHealthChecker
    );

    navAbout.addEventListener(
        "click",
        showAbout
    );

    startHealthBtn.addEventListener(
        "click",
        showHealthChecker
    );

    learnMoreBtn.addEventListener(
        "click",
        showAbout
    );

    backToHomeBtn.addEventListener(
        "click",
        showHome
    );
    languageSelect.addEventListener(
        "change",
        () => {

            currentLanguage =
                languageSelect.value;

            updateStaticLanguage();
        }
    );

    /* =====================================================
       INITIAL STATE
       ===================================================== */

    updateStaticLanguage();

    showHome();

});