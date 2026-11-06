/* =========================================
   BNU DENTAL CARE — APPLICATION CORE
   Authentication + Patient & Student Dashboard
========================================= */

"use strict";

/* -----------------------------------------
   1. ELEMENTS & GLOBAL VARIABLES
----------------------------------------- */

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const preferencesScreen = $("#preferencesScreen");
const website = $("#website");
const authOverlay = $("#authOverlay");
const authForm = $("#authForm");

let selectedLanguage = "en";
let selectedTheme = "light";
let currentRole = "patient";
let currentAuthMode = "signup";
let currentUser = null;
let dashboardRoot = null;

const STORAGE_KEY = "bnu-demo-accounts";
const SESSION_KEY = "bnu-demo-session";

/* -----------------------------------------
   2. TRANSLATIONS
----------------------------------------- */

const translations = {
    en: {
        welcomeLabel: "WELCOME TO YOUR DENTAL HUB",
        welcomeTitle: "Let's personalize your experience.",
        welcomeDescription: "Choose your preferred language and appearance before getting started.",
        languageLabel: "Choose your language",
        appearanceLabel: "Choose your appearance",
        lightMode: "Light Mode",
        darkMode: "Dark Mode",
        continue: "Continue",
        preferencesNote: "You can change these preferences anytime.",

        navHome: "Home",
        navAbout: "About",
        navServices: "Services",
        navHow: "How It Works",
        navContact: "Contact",
        login: "Log In",
        getStarted: "Get Started",

        heroBadge: "A smarter approach to dental care",
        heroTitle: "Your Dental Care Journey, Connected & Simplified.",
        heroDescription: "Connecting patients with dental students through a smarter, more accessible clinical case experience. Your journey starts here.",
        heroGetStarted: "Get Started",
        explorePlatform: "Explore Platform",
        trustTitle: "One connected platform",
        trustDescription: "Designed for patients and dental students",
        smartCare: "SMART CARE EXPERIENCE",
        visualCaption: "Care meets connection",
        visualSubcaption: "A seamless experience from case to care.",

        floatingDoctor: "Dental Professionals",
        floatingDoctorSub: "Connected in one place",
        floatingHistory: "Medical History",
        floatingHistorySub: "Your care, organized",

        trustOne: "Patient-focused experience",
        trustTwo: "Dental case management",
        trustThree: "Privacy-conscious design",
        trustFour: "Connected communication",

        aboutEyebrow: "ABOUT THE PLATFORM",
        aboutTitle: "Bringing Dental Care Closer to Everyone.",
        aboutDescription: "BNU Dental Care helps patients and dental students connect through an organized clinical case experience.",
        aboutCardOneTitle: "One Connected Experience",
        aboutCardOneDescription: "Bring case publishing, communication, and treatment history together in one organized platform.",
        aboutCardTwoTitle: "Patient First",
        aboutCardTwoDescription: "Simple steps help patients describe their concerns and follow their cases.",
        aboutCardThreeTitle: "Professional Workspace",
        aboutCardThreeDescription: "A dedicated workspace for dental students to explore cases and track clinical requirements.",

        servicesEyebrow: "WHAT WE OFFER",
        servicesTitle: "Everything in One Dental Hub.",
        servicesDescription: "Purpose-built features for a more organized dental care journey.",

        serviceOneTitle: "Case Publishing",
        serviceOneDescription: "Share dental concerns with descriptions, images, and voice recordings.",
        serviceTwoTitle: "Case Management",
        serviceTwoDescription: "Review available cases and manage your assigned treatment journey.",
        serviceThreeTitle: "Private Communication",
        serviceThreeDescription: "Keep conversations and case-related communication in one place.",
        serviceFourTitle: "Medical History",
        serviceFourDescription: "Keep completed cases and treatment summaries organized in a personal record.",
        serviceFiveTitle: "Voice & Media",
        serviceFiveDescription: "Support visual and audio communication for clearer case descriptions.",
        serviceSixTitle: "Ratings & Profiles",
        serviceSixDescription: "Explore dental student profiles and share feedback after completed cases.",

        howEyebrow: "SIMPLE BY DESIGN",
        howTitle: "How BNU Dental Care Works.",
        howDescription: "Different portals, one connected experience.",
        stepOneTitle: "Create an Account",
        stepOneDescription: "Choose the patient or dental student portal and create your account.",
        stepTwoTitle: "Share or Discover Cases",
        stepTwoDescription: "Patients publish cases while dental students explore available cases.",
        stepThreeTitle: "Connect & Communicate",
        stepThreeDescription: "An assigned case opens a private communication channel.",
        stepFourTitle: "Keep the History",
        stepFourDescription: "Completed cases are organized in the patient's medical history.",

        portalEyebrow: "GET STARTED",
        portalTitle: "Choose Your Portal.",
        portalDescription: "Select the experience that matches your role.",
        patientLabel: "FOR PATIENTS",
        doctorLabel: "FOR DENTAL STUDENTS",
        patientPortalTitle: "Your Care, Your Way.",
        patientPortalDescription: "Publish your dental case, communicate with your assigned student, and keep track of your history.",
        doctorPortalTitle: "Your Student Workspace.",
        doctorPortalDescription: "Explore suitable cases, follow your requests, and track clinical requirements.",
        patientFeatureOne: "Publish dental cases",
        patientFeatureTwo: "Track case progress",
        patientFeatureThree: "Access medical history",
        doctorFeatureOne: "Explore public cases",
        doctorFeatureTwo: "Follow accepted cases",
        doctorFeatureThree: "Track clinical requirements",
        continueAsPatient: "Continue as Patient",
        continueAsDoctor: "Continue as Dental Student",
        alreadyAccount: "Already have an account?",
        loginHere: "Log in",

        contactEyebrow: "STAY CONNECTED",
        contactTitle: "A Better Dental Experience Starts Here.",
        contactDescription: "Discover a more organized way to connect dental care and clinical experience.",
        contactButton: "Explore the Platform",

        footerDescription: "Connecting patients and dental students through a smarter dental care experience.",
        footerExplore: "Explore",
        footerPortals: "Portals",
        footerLegal: "Information",
        privacy: "Privacy Policy",
        terms: "Terms of Use",
        rights: "All rights reserved.",
        footerTagline: "Designed for a more connected dental care experience."
    },

    ar: {
        welcomeLabel: "مرحبًا بك في منصتك لطب الأسنان",
        welcomeTitle: "دعنا نخصص تجربتك.",
        welcomeDescription: "اختر اللغة والمظهر المناسبين لك قبل البدء.",
        languageLabel: "اختر اللغة",
        appearanceLabel: "اختر المظهر",
        lightMode: "الوضع النهاري",
        darkMode: "الوضع الليلي",
        continue: "متابعة",
        preferencesNote: "يمكنك تغيير هذه الإعدادات في أي وقت.",

        navHome: "الرئيسية",
        navAbout: "عن المنصة",
        navServices: "الخدمات",
        navHow: "كيف تعمل",
        navContact: "تواصل معنا",
        login: "تسجيل الدخول",
        getStarted: "ابدأ الآن",

        heroBadge: "طريقة أكثر ذكاءً للعناية بالأسنان",
        heroTitle: "رحلتك للعناية بالأسنان، أصبحت أسهل وأكثر ترابطًا.",
        heroDescription: "نربط المرضى بطلاب طب الأسنان من خلال تجربة سهلة ومنظمة لنشر الحالات ومتابعتها. رحلتك تبدأ من هنا.",
        heroGetStarted: "ابدأ الآن",
        explorePlatform: "اكتشف المنصة",
        trustTitle: "منصة واحدة مترابطة",
        trustDescription: "مصممة للمرضى وطلاب طب الأسنان",
        smartCare: "تجربة رعاية ذكية",
        visualCaption: "الرعاية تلتقي بالتواصل",
        visualSubcaption: "تجربة متكاملة من نشر الحالة حتى الرعاية.",

        floatingDoctor: "متخصصو طب الأسنان",
        floatingDoctorSub: "كل شيء في مكان واحد",
        floatingHistory: "السجل الطبي",
        floatingHistorySub: "رعايتك منظمة",

        trustOne: "تجربة تركز على المريض",
        trustTwo: "إدارة حالات الأسنان",
        trustThree: "تصميم يراعي الخصوصية",
        trustFour: "تواصل مترابط",

        aboutEyebrow: "عن المنصة",
        aboutTitle: "نجعل رعاية الأسنان أقرب للجميع.",
        aboutDescription: "تساعد BNU Dental Care المرضى وطلاب طب الأسنان على التواصل ومتابعة الحالات بطريقة منظمة.",
        aboutCardOneTitle: "تجربة متكاملة",
        aboutCardOneDescription: "اجمع نشر الحالات والتواصل والسجل العلاجي في منصة واحدة منظمة.",
        aboutCardTwoTitle: "المريض أولًا",
        aboutCardTwoDescription: "خطوات بسيطة تساعد المريض على وصف مشكلته ومتابعة حالته.",
        aboutCardThreeTitle: "مساحة احترافية",
        aboutCardThreeDescription: "مساحة مخصصة لطلاب طب الأسنان لاستعراض الحالات ومتابعة متطلباتهم الإكلينيكية.",

        servicesEyebrow: "خدماتنا",
        servicesTitle: "كل ما تحتاجه في منصة واحدة.",
        servicesDescription: "مميزات مصممة لتنظيم رحلة رعاية الأسنان.",

        serviceOneTitle: "نشر الحالات",
        serviceOneDescription: "شارك مشكلات الأسنان بالوصف والصور والتسجيلات الصوتية.",
        serviceTwoTitle: "إدارة الحالات",
        serviceTwoDescription: "استعرض الحالات المتاحة وتابع الحالات المسندة إليك.",
        serviceThreeTitle: "تواصل خاص",
        serviceThreeDescription: "اجمع المحادثات والتواصل الخاص بالحالة في مكان واحد.",
        serviceFourTitle: "السجل الطبي",
        serviceFourDescription: "احتفظ بالحالات المكتملة وملخصات العلاج في سجل شخصي.",
        serviceFiveTitle: "الصوت والوسائط",
        serviceFiveDescription: "استخدم الصور والتسجيلات الصوتية لتوضيح الحالة.",
        serviceSixTitle: "التقييمات والملفات",
        serviceSixDescription: "استعرض الملفات المهنية وشارك تقييمك بعد اكتمال الحالة.",

        howEyebrow: "البساطة في التصميم",
        howTitle: "كيف تعمل BNU Dental Care؟",
        howDescription: "بوابتان مختلفتان وتجربة واحدة مترابطة.",
        stepOneTitle: "إنشاء حساب",
        stepOneDescription: "اختر بوابة المريض أو طالب طب الأسنان وأنشئ حسابك.",
        stepTwoTitle: "انشر أو استعرض الحالات",
        stepTwoDescription: "ينشر المرضى الحالات ويستعرض طلاب طب الأسنان الحالات المتاحة.",
        stepThreeTitle: "تواصل ومتابعة",
        stepThreeDescription: "عند استلام الحالة يتم فتح قناة تواصل خاصة.",
        stepFourTitle: "احتفظ بالسجل",
        stepFourDescription: "تُحفظ الحالات المكتملة في السجل الطبي للمريض.",

        portalEyebrow: "ابدأ الآن",
        portalTitle: "اختر بوابتك.",
        portalDescription: "اختر التجربة المناسبة لدورك.",
        patientLabel: "للمرضى",
        doctorLabel: "لطلاب طب الأسنان",
        patientPortalTitle: "رعايتك بطريقتك.",
        patientPortalDescription: "انشر حالة الأسنان وتواصل مع الطالب المسؤول وتابع حالة طلبك.",
        doctorPortalTitle: "مساحتك كطالب.",
        doctorPortalDescription: "استعرض الحالات المناسبة وتابع طلباتك ومتطلباتك الإكلينيكية.",
        patientFeatureOne: "نشر حالات الأسنان",
        patientFeatureTwo: "متابعة تقدم الحالة",
        patientFeatureThree: "الوصول للسجل الطبي",
        doctorFeatureOne: "استعراض الحالات العامة",
        doctorFeatureTwo: "متابعة الحالات المقبولة",
        doctorFeatureThree: "متابعة المتطلبات الإكلينيكية",
        continueAsPatient: "المتابعة كمريض",
        continueAsDoctor: "المتابعة كطالب أسنان",
        alreadyAccount: "لديك حساب بالفعل؟",
        loginHere: "سجل الدخول",

        contactEyebrow: "ابقَ على تواصل",
        contactTitle: "تجربة أفضل لرعاية الأسنان تبدأ من هنا.",
        contactDescription: "اكتشف طريقة أكثر تنظيمًا للربط بين رعاية الأسنان والخبرة الإكلينيكية.",
        contactButton: "اكتشف المنصة",

        footerDescription: "نربط المرضى وطلاب طب الأسنان من خلال تجربة أكثر ذكاءً وتنظيمًا.",
        footerExplore: "استكشف",
        footerPortals: "البوابات",
        footerLegal: "معلومات",
        privacy: "سياسة الخصوصية",
        terms: "شروط الاستخدام",
        rights: "جميع الحقوق محفوظة.",
        footerTagline: "مصممة لتجربة رعاية أسنان أكثر ترابطًا."
    }
};


/* -----------------------------------------
   3. LANGUAGE
----------------------------------------- */

function applyLanguage(language) {
    selectedLanguage = language;

    const isArabic = language === "ar";

    document.documentElement.lang = language;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    document.body.dir = isArabic ? "rtl" : "ltr";

    document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.dataset.i18n;

        if (translations[language][key]) {
            element.textContent = translations[language][key];
        }
    });

    const languageText = $("#languageText");

    if (languageText) {
        languageText.textContent = isArabic ? "EN" : "AR";
    }

    const arrowIcons = document.querySelectorAll(
        ".primary-button i.fa-arrow-right, .secondary-button i.fa-arrow-right"
    );

    arrowIcons.forEach(icon => {
        icon.classList.toggle("fa-arrow-left", isArabic);
        icon.classList.toggle("fa-arrow-right", !isArabic);
    });

    updateAuthLanguage();

    localStorage.setItem("bnu-language", language);

    if (currentUser && dashboardRoot) {
        renderDashboard(currentUser);
    }
}


/* -----------------------------------------
   4. THEME
----------------------------------------- */

function applyTheme(theme) {
    selectedTheme = theme;

    document.body.classList.toggle("dark-mode", theme === "dark");

    const icon = $("#themeIcon");

    if (icon) {
        icon.className = theme === "dark"
            ? "fa-solid fa-sun"
            : "fa-solid fa-moon";
    }

    localStorage.setItem("bnu-theme", theme);

    if (dashboardRoot) {
        dashboardRoot.classList.toggle("dashboard-dark", theme === "dark");

        const themeButton = dashboardRoot.querySelector('[data-action="theme"]');
        if (themeButton) {
            const ar = selectedLanguage === "ar";
            themeButton.innerHTML = `<i class="fa-solid ${theme === "dark" ? "fa-sun" : "fa-moon"}" aria-hidden="true"></i>`;
            themeButton.title = theme === "dark"
                ? (ar ? "الوضع النهاري" : "Light mode")
                : (ar ? "الوضع الليلي" : "Dark mode");
            themeButton.setAttribute("aria-label", theme === "dark"
                ? (ar ? "تفعيل الوضع النهاري" : "Enable light mode")
                : (ar ? "تفعيل الوضع الليلي" : "Enable dark mode"));
        }
    }
}

function toggleTheme() {
    applyTheme(selectedTheme === "light" ? "dark" : "light");
}


/* -----------------------------------------
   5. FIRST VISIT PREFERENCES
----------------------------------------- */

function setupPreferences() {

    $$("[data-language]").forEach(button => {
        button.addEventListener("click", () => {

            $$("[data-language]").forEach(item => {
                item.classList.remove("active");
            });

            button.classList.add("active");
            applyLanguage(button.dataset.language);
        });
    });

    $$("[data-theme]").forEach(button => {
        button.addEventListener("click", () => {

            $$("[data-theme]").forEach(item => {
                item.classList.remove("active");
            });

            button.classList.add("active");
            applyTheme(button.dataset.theme);
        });
    });

    const continueButton = $("#continueButton");

    if (continueButton) {
        continueButton.addEventListener("click", () => {
            preferencesScreen.classList.add("hidden");
            website.classList.remove("hidden");

            localStorage.setItem("bnu-preferences-completed", "true");

            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
}


/* -----------------------------------------
   6. NAVBAR
----------------------------------------- */

function setupNavbar() {

    const navbar = $("#navbar");
    const menuButton = $("#mobileMenuButton");
    const navLinks = $("#navLinks");

    if (navbar) {
        window.addEventListener("scroll", () => {
            navbar.classList.toggle("scrolled", window.scrollY > 25);
        });
    }

    if (menuButton && navLinks) {
        menuButton.addEventListener("click", () => {
            navLinks.classList.toggle("open");

            const icon = menuButton.querySelector("i");

            if (icon) {
                icon.className = navLinks.classList.contains("open")
                    ? "fa-solid fa-xmark"
                    : "fa-solid fa-bars";
            }
        });
    }

    const topLoginLink = $(".nav-login");
    if (topLoginLink) {
        topLoginLink.addEventListener("click", event => {
            event.preventDefault();
            navLinks?.classList.remove("open");
            openAuth("patient", "login");
        });
    }

    const roleSwitch = $("#authRoleSwitch");
    if (roleSwitch) {
        roleSwitch.addEventListener("click", event => {
            const button = event.target.closest("[data-auth-role]");
            if (!button || button.dataset.authRole === currentRole) return;

            currentRole = button.dataset.authRole;
            ["authName", "authEmail", "authPhone", "authAge", "authUniversity", "authLevel", "authSpecialty", "authPassword", "authConfirmPassword"]
                .forEach(id => { const field = $("#" + id); if (field) field.value = ""; });
            $("#authError")?.classList.add("hidden");
            updateAuthForm();
        });
    }

    $$(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            if (navLinks) navLinks.classList.remove("open");

            const icon = menuButton?.querySelector("i");

            if (icon) {
                icon.className = "fa-solid fa-bars";
            }
        });
    });

    const sections = $$("main section[id]");

    if ("IntersectionObserver" in window && sections.length) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    $$(".nav-link").forEach(link => {
                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") === `#${entry.target.id}`
                        );
                    });
                }
            });
        }, { threshold: 0.3 });

        sections.forEach(section => observer.observe(section));
    }
}


/* -----------------------------------------
   7. AUTHENTICATION INTERFACE
----------------------------------------- */

function openAuth(role, mode) {

    currentRole = role;
    currentAuthMode = mode;

    authOverlay.classList.remove("hidden");

    document.body.style.overflow = "hidden";

    $("#authError").classList.add("hidden");

    [
        "authName",
        "authEmail",
        "authPhone",
        "authAge",
        "authUniversity",
        "authLevel",
        "authSpecialty",
        "authPassword",
        "authConfirmPassword"
    ].forEach(id => {
        const field = $("#" + id);
        if (field) field.value = "";
    });

    $("#authPassword").type = "password";
    $("#authConfirmPassword").type = "password";
    $$(".password-toggle i").forEach(icon => { icon.className = "fa-regular fa-eye"; });
    updateAuthForm();

    $("#authOverlay").scrollTop = 0;
}

function closeAuth() {
    authOverlay.classList.add("hidden");
    document.body.style.overflow = "";
}

function switchAuthMode(mode) {
    currentAuthMode = mode;

    $("#authError").classList.add("hidden");

    updateAuthForm();
}

function setFieldVisibility(id, visible) {
    const field = $("#" + id);

    if (field) {
        field.classList.toggle("hidden", !visible);
    }
}

function updateAuthForm() {

    const isPatient = currentRole === "patient";
    const isSignup = currentAuthMode === "signup";
    const ar = selectedLanguage === "ar";

    $("#authEyebrow").textContent = isPatient
        ? (ar ? "بوابة المريض" : "PATIENT PORTAL")
        : (ar ? "بوابة الطالب" : "DENTAL STUDENT PORTAL");

    $("#authTitle").textContent = isSignup
        ? (ar ? "إنشاء حساب جديد" : "Create your account")
        : (ar ? "مرحبًا بعودتك" : "Welcome back");

    $("#authDescription").textContent = isSignup
        ? (ar
            ? "أنشئ حسابك وابدأ استخدام المنصة."
            : "Join BNU Dental Care and start your journey.")
        : (ar
            ? "سجل الدخول للوصول إلى حسابك."
            : "Log in to access your account.");

    const roleSwitch = $("#authRoleSwitch");
    if (roleSwitch) {
        roleSwitch.querySelectorAll("[data-auth-role]").forEach(button => {
            const selected = button.dataset.authRole === currentRole;
            button.classList.toggle("active", selected);
            button.setAttribute("aria-pressed", String(selected));
            button.textContent = button.dataset.authRole === "patient"
                ? (ar ? "مريض" : "Patient")
                : (ar ? "طالب أسنان" : "Dental Student");
        });
        roleSwitch.setAttribute("aria-label", ar ? "اختر نوع الحساب" : "Choose account type");
    }

    const fieldLabels = {
        nameField: ar ? "الاسم الكامل" : "Full Name",
        emailField: ar ? "البريد الإلكتروني" : "Email Address",
        phoneField: ar ? "رقم الهاتف" : "Phone Number",
        ageField: ar ? "العمر" : "Age",
        universityField: ar ? "الجامعة" : "University",
        levelField: ar ? "المستوى الدراسي" : "Academic Level",
        specialtyField: ar ? "القسم / التخصص" : "Department / Specialty",
        passwordField: ar ? "كلمة المرور" : "Password",
        confirmPasswordField: ar ? "تأكيد كلمة المرور" : "Confirm Password"
    };
    Object.entries(fieldLabels).forEach(([id, text]) => {
        const label = $("#" + id)?.querySelector("label");
        if (label) label.textContent = text;
    });

    $("#authName").placeholder = ar ? "اكتبي اسمك الكامل" : "Enter your full name";
    $("#authEmail").placeholder = ar ? "أدخلي بريدك الإلكتروني" : "Enter your email address";
    $("#authPhone").placeholder = ar ? "أدخلي رقم هاتفك" : "Enter your phone number";
    $("#authAge").placeholder = ar ? "أدخلي عمرك" : "Enter your age";
    $("#authUniversity").placeholder = ar ? "اكتبي اسم الجامعة" : "Enter your university";
    $("#authPassword").placeholder = isSignup
        ? (ar ? "أنشئي كلمة مرور" : "Create a password")
        : (ar ? "أدخلي كلمة المرور" : "Enter your password");
    $("#authConfirmPassword").placeholder = ar ? "أعيدي كتابة كلمة المرور" : "Confirm your password";

    const levelOptions = [
        ["", ar ? "اختاري المستوى الدراسي" : "Select your academic level"],
        ["First Year", ar ? "الفرقة الأولى" : "First Year"],
        ["Second Year", ar ? "الفرقة الثانية" : "Second Year"],
        ["Third Year", ar ? "الفرقة الثالثة" : "Third Year"],
        ["Fourth Year", ar ? "الفرقة الرابعة" : "Fourth Year"],
        ["Fifth Year", ar ? "الفرقة الخامسة" : "Fifth Year"],
        ["Intern", ar ? "امتياز" : "Intern"],
        ["Graduate", ar ? "خريج" : "Graduate"]
    ];
    const specialtyOptions = [
        ["Operative Dentistry", ar ? "العلاج التحفظي" : "Operative Dentistry"],
        ["Endodontics", ar ? "علاج الجذور" : "Endodontics"],
        ["Prosthodontics", ar ? "تركيبات الأسنان" : "Prosthodontics"],
        ["Periodontics", ar ? "أمراض اللثة" : "Periodontics"],
        ["Oral Surgery", ar ? "جراحة الفم" : "Oral Surgery"],
        ["Orthodontics", ar ? "تقويم الأسنان" : "Orthodontics"],
        ["Pediatric Dentistry", ar ? "طب أسنان الأطفال" : "Pediatric Dentistry"],
        ["Other", ar ? "أخرى" : "Other"]
    ];
    const selectedLevel = $("#authLevel").value;
    const selectedSpecialty = $("#authSpecialty").value;
    $("#authLevel").innerHTML = levelOptions.map(([value, text]) => `<option value="${escapeHTML(value)}">${escapeHTML(text)}</option>`).join("");
    $("#authSpecialty").innerHTML = `<option value="">${ar ? "اختاري القسم" : "Select department"}</option>` + specialtyOptions.map(([value, text]) => `<option value="${escapeHTML(value)}">${escapeHTML(text)}</option>`).join("");
    $("#authLevel").value = selectedLevel;
    $("#authSpecialty").value = selectedSpecialty;

    $("#signupTab").textContent = ar ? "إنشاء حساب" : "Sign Up";
    $("#loginTab").textContent = ar ? "تسجيل الدخول" : "Log In";

    $("#signupTab").classList.toggle("active", isSignup);
    $("#loginTab").classList.toggle("active", !isSignup);

    setFieldVisibility("nameField", isSignup);

    setFieldVisibility("emailField", true);
    setFieldVisibility("phoneField", true);

    setFieldVisibility("ageField", isSignup && isPatient);
    setFieldVisibility("genderField", false);

    setFieldVisibility("universityField", isSignup && !isPatient);
    setFieldVisibility("levelField", isSignup && !isPatient);
    setFieldVisibility("specialtyField", isSignup && !isPatient);

    setFieldVisibility("confirmPasswordField", isSignup);

    $("#authEmail").required = isSignup && !isPatient;
    $("#authPhone").required = isSignup;
    $("#authName").required = isSignup;
    $("#authAge").required = isSignup && isPatient;

    $("#authPassword").autocomplete = isSignup
        ? "new-password"
        : "current-password";

    $("#authConfirmPassword").required = isSignup;

    $("#authSubmit span").textContent = isSignup
        ? (ar ? "إنشاء الحساب" : "Create Account")
        : (ar ? "تسجيل الدخول" : "Log In");

    $("#authSwitchPrompt").textContent = isSignup
        ? (ar ? "لديك حساب بالفعل؟" : "Already have an account?")
        : (ar ? "ليس لديك حساب؟" : "Don't have an account?");

    $("#authSwitchButton").textContent = isSignup
        ? (ar ? "سجل الدخول" : "Log In")
        : (ar ? "إنشاء حساب" : "Sign Up");

    const disclaimer = $(".auth-disclaimer");
    if (disclaimer) {
        disclaimer.textContent = ar
            ? "بالمتابعة، فإنك توافق على شروط الاستخدام وسياسة الخصوصية."
            : "By continuing, you agree to our Terms of Use and Privacy Policy.";
    }

    $$(".password-toggle").forEach(button => {
        const input = button.closest(".input-wrap")?.querySelector("input");
        const isVisible = input?.type === "text";
        button.setAttribute("aria-label", isVisible
            ? (ar ? "إخفاء كلمة المرور" : "Hide password")
            : (ar ? "إظهار كلمة المرور" : "Show password"));
    });
}

function updateAuthLanguage() {
    if (authOverlay && !authOverlay.classList.contains("hidden")) {
        updateAuthForm();
    }
}


/* -----------------------------------------
   8. PASSWORD VISIBILITY
----------------------------------------- */

function togglePassword(inputId, button) {

    const input = $("#" + inputId);
    const icon = button.querySelector("i");

    const isPassword = input.type === "password";

    input.type = isPassword ? "text" : "password";

    icon.className = isPassword
        ? "fa-regular fa-eye-slash"
        : "fa-regular fa-eye";

    const ar = selectedLanguage === "ar";
    button.setAttribute("aria-label", isPassword
        ? (ar ? "إخفاء كلمة المرور" : "Hide password")
        : (ar ? "إظهار كلمة المرور" : "Show password"));
}


/* -----------------------------------------
   9. ACCOUNT STORAGE
----------------------------------------- */

/*
    FRONTEND DEMO ONLY.

    localStorage is not secure authentication.
    Passwords are not encrypted in this demo.

    Do not use this system for real patient records.
    A production platform requires a secure backend,
    password hashing, database authorization and validation.
*/

function getAccounts() {
    try {
        const accounts = JSON.parse(
            localStorage.getItem(STORAGE_KEY)
        );

        return Array.isArray(accounts) ? accounts : [];
    } catch {
        return [];
    }
}

function saveAccounts(accounts) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));
}

function normalizePhone(phone) {
    return String(phone || "").replace(/\D/g, "");
}

function showAuthError(message) {
    const error = $("#authError");

    error.textContent = message;
    error.classList.remove("hidden");
}

function validateSignup() {

    const name = $("#authName").value.trim();
    const email = $("#authEmail").value.trim().toLowerCase();
    const phone = normalizePhone($("#authPhone").value);
    const password = $("#authPassword").value;
    const confirmPassword = $("#authConfirmPassword").value;

    const ar = selectedLanguage === "ar";

    if (!name || !phone || !password || !confirmPassword) {
        return ar
            ? "من فضلك املئي جميع البيانات المطلوبة."
            : "Please complete all required fields.";
    }

    if (currentRole === "patient" && !$("#authAge").value) {
        return ar
            ? "من فضلك أدخلي عمرك."
            : "Please enter your age.";
    }

    if (currentRole === "doctor") {
        if (
            !email ||
            !$("#authUniversity").value.trim() ||
            !$("#authLevel").value ||
            !$("#authSpecialty").value
        ) {
            return ar
                ? "من فضلك أكملي البيانات الجامعية."
                : "Please complete your student information.";
        }
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return ar
            ? "البريد الإلكتروني غير صحيح."
            : "Please enter a valid email address.";
    }

    if (currentRole === "doctor" && !email) {
        return ar
            ? "البريد الإلكتروني مطلوب."
            : "Email is required.";
    }

    if (phone.length < 8) {
        return ar
            ? "رقم الهاتف غير صحيح."
            : "Please enter a valid phone number.";
    }

    if (password.length < 8) {
        return ar
            ? "كلمة المرور يجب أن تكون 8 أحرف على الأقل."
            : "Password must contain at least 8 characters.";
    }

    if (password !== confirmPassword) {
        return ar
            ? "كلمتا المرور غير متطابقتين."
            : "Passwords do not match.";
    }

    const accounts = getAccounts();

    const duplicatePhone = accounts.some(account =>
        normalizePhone(account.phone) === phone
    );

    const duplicateEmail = email && accounts.some(account =>
        account.email &&
        account.email.toLowerCase() === email
    );

    if (duplicatePhone || duplicateEmail) {
        return ar
            ? "يوجد حساب مسجل بهذا البريد أو رقم الهاتف بالفعل."
            : "An account already exists with this email or phone number.";
    }

    return null;
}


/* -----------------------------------------
   10. REGISTER ACCOUNT
----------------------------------------- */

function registerAccount() {

    const validationError = validateSignup();

    if (validationError) {
        showAuthError(validationError);
        return;
    }

    const account = {
        id: crypto.randomUUID
            ? crypto.randomUUID()
            : String(Date.now()),

        role: currentRole,

        name: $("#authName").value.trim(),

        email: $("#authEmail").value.trim().toLowerCase(),

        phone: normalizePhone($("#authPhone").value),

        password: $("#authPassword").value,

        age: currentRole === "patient"
            ? $("#authAge").value
            : null,

        gender: currentRole === "patient"
            ? $("#authGender").value
            : null,

        university: currentRole === "doctor"
            ? $("#authUniversity").value.trim()
            : null,

        level: currentRole === "doctor"
            ? $("#authLevel").value
            : null,

        specialty: currentRole === "doctor"
            ? $("#authSpecialty").value
            : null,

        createdAt: new Date().toISOString()
    };

    const accounts = getAccounts();

    accounts.push(account);

    saveAccounts(accounts);

    localStorage.setItem(SESSION_KEY, account.id);

    closeAuth();

    showToast(
        selectedLanguage === "ar"
            ? "تم إنشاء الحساب بنجاح."
            : "Account created successfully!"
    );

    renderDashboard(account);
}


/* -----------------------------------------
   11. LOGIN ACCOUNT
----------------------------------------- */

function loginAccount() {

    const email = $("#authEmail").value.trim().toLowerCase();
    const phone = normalizePhone($("#authPhone").value);
    const password = $("#authPassword").value;

    const ar = selectedLanguage === "ar";

    if ((!email && !phone) || !password) {
        showAuthError(
            ar
                ? "أدخلي البريد الإلكتروني أو رقم الهاتف وكلمة المرور."
                : "Enter your email or phone number and password."
        );

        return;
    }

    const accounts = getAccounts();

    const account = accounts.find(item => {

        const emailMatches = email &&
            item.email &&
            item.email.toLowerCase() === email;

        const phoneMatches = phone &&
            item.phone &&
            normalizePhone(item.phone) === phone;

        return (emailMatches || phoneMatches) &&
            item.password === password &&
            item.role === currentRole;
    });

    if (!account) {
        showAuthError(
            ar
                ? "الحساب غير موجود أو البيانات غير صحيحة. تأكدي من اختيار البوابة الصحيحة."
                : "Account not found. Check your details and selected portal."
        );

        return;
    }

    localStorage.setItem(SESSION_KEY, account.id);

    closeAuth();

    showToast(
        ar
            ? "أهلًا بعودتك " + account.name
            : "Welcome back, " + account.name + "!"
    );

    renderDashboard(account);
}


/* -----------------------------------------
   12. LOGOUT
----------------------------------------- */

function logoutAccount() {

    localStorage.removeItem(SESSION_KEY);

    currentUser = null;

    if (dashboardRoot) {
        dashboardRoot.remove();
        dashboardRoot = null;
    }

    if (website) {
        website.classList.remove("hidden");
    }

    window.scrollTo({ top: 0, behavior: "smooth" });

    showToast(
        selectedLanguage === "ar"
            ? "تم تسجيل الخروج بنجاح."
            : "Logged out successfully."
    );
}


/* -----------------------------------------
   13. FORM SUBMISSION
----------------------------------------- */

if (authForm) {
    authForm.addEventListener("submit", event => {

        event.preventDefault();

        $("#authError").classList.add("hidden");

        if (currentAuthMode === "signup") {
            registerAccount();
        } else {
            loginAccount();
        }
    });
}


/* -----------------------------------------
   14. THEME & LANGUAGE BUTTONS
----------------------------------------- */

const languageToggle = $("#languageToggle");
const themeToggle = $("#themeToggle");

if (languageToggle) {
    languageToggle.addEventListener("click", () => {
        applyLanguage(selectedLanguage === "en" ? "ar" : "en");
    });
}

if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
}


/* -----------------------------------------
   15. TOAST NOTIFICATIONS
----------------------------------------- */

function showToast(message) {

    const container = $("#toastContainer");

    if (!container) return;

    const toast = document.createElement("div");
    toast.className = "toast";

    const icon = document.createElement("i");
    icon.className = "fa-solid fa-circle-check";

    const text = document.createElement("span");
    text.textContent = message;

    toast.append(icon, text);

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(10px)";

        setTimeout(() => toast.remove(), 300);
    }, 3500);
}


/* -----------------------------------------
   16. CLOSE AUTH MODAL
----------------------------------------- */

if (authOverlay) {

    authOverlay.addEventListener("click", event => {
        if (event.target === authOverlay) {
            closeAuth();
        }
    });
}

document.addEventListener("keydown", event => {
    if (event.key === "Escape" && authOverlay) {
        closeAuth();
    }

    if (event.key === "Escape") {
        $(".db-confirm-backdrop")?.remove();
    }
});


/* -----------------------------------------
   17. RESTORE LOGIN SESSION
----------------------------------------- */

function restoreSession() {

    const savedSession = localStorage.getItem(SESSION_KEY);

    if (!savedSession) return;

    const account = getAccounts().find(
        item => item.id === savedSession
    );

    if (account) {
        renderDashboard(account);
    } else {
        localStorage.removeItem(SESSION_KEY);
    }
}


/* -----------------------------------------
   18. INITIALIZE APPLICATION
----------------------------------------- */

function initializeApp() {

    const currentYear = $("#currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    const savedLanguage = localStorage.getItem("bnu-language");
    const savedTheme = localStorage.getItem("bnu-theme");

    const preferencesCompleted =
        localStorage.getItem("bnu-preferences-completed");

    applyLanguage(savedLanguage || "en");
    applyTheme(savedTheme || "light");

    setupPreferences();
    setupNavbar();

    if (preferencesCompleted === "true") {

        if (preferencesScreen) {
            preferencesScreen.classList.add("hidden");
        }

        if (website) {
            website.classList.remove("hidden");
        }

        restoreSession();

    } else {

        if (preferencesScreen) {
            preferencesScreen.classList.remove("hidden");
        }

        if (website) {
            website.classList.add("hidden");
        }
    }
}

document.addEventListener("DOMContentLoaded", initializeApp);
/* =====================================================
   BNU DENTAL CARE — CASE MANAGEMENT SYSTEM
   Patient Publishing + Student Requests + Private Chat
===================================================== */

const CASES_KEY = "bnu-dental-cases";
const REQUESTS_KEY = "bnu-dental-requests";
const MESSAGES_KEY = "bnu-dental-messages";

let activeDashboardTab = "home";
let activeChatCaseId = null;
let dashboardNavigationTimer = null;
let recordedVoiceBlob = null;
let selectedCaseImage = null;
let mediaRecorder = null;
let recordingChunks = [];

/* ---------- STORAGE ---------- */

function readStorage(key) {
    try {
        const value = JSON.parse(localStorage.getItem(key));
        return Array.isArray(value) ? value : [];
    } catch {
        return [];
    }
}

function writeStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getCases() {
    return readStorage(CASES_KEY);
}

function saveCases(items) {
    writeStorage(CASES_KEY, items);
}

function getRequests() {
    return readStorage(REQUESTS_KEY);
}

function saveRequests(items) {
    writeStorage(REQUESTS_KEY, items);
}

function getMessages() {
    return readStorage(MESSAGES_KEY);
}

function saveMessages(items) {
    writeStorage(MESSAGES_KEY, items);
}

function makeId() {
    return crypto.randomUUID
        ? crypto.randomUUID()
        : "bnu-" + Date.now() + "-" + Math.random().toString(36).slice(2);
}

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[char]);
}

function dashboardText(en, ar) {
    return selectedLanguage === "ar" ? ar : en;
}

function formatDate(date) {
    return new Date(date).toLocaleString(
        selectedLanguage === "ar" ? "ar-EG" : "en-US",
        { dateStyle: "medium", timeStyle: "short" }
    );
}

/* ---------- VOICE STORAGE: INDEXED DB ---------- */

function openVoiceDatabase() {
    return new Promise((resolve, reject) => {
        if (!window.indexedDB) {
            reject(new Error("IndexedDB unavailable"));
            return;
        }

        const request = indexedDB.open("BNUDentalVoiceDB", 2);

        request.onupgradeneeded = () => {
            const db = request.result;

            if (!db.objectStoreNames.contains("voices")) {
                db.createObjectStore("voices");
            }
            if (!db.objectStoreNames.contains("images")) {
                db.createObjectStore("images");
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

async function saveVoice(blob, key) {
    const db = await openVoiceDatabase();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction("voices", "readwrite");

        transaction.objectStore("voices").put(blob, key);

        transaction.oncomplete = () => {
            db.close();
            resolve(true);
        };

        transaction.onerror = () => {
            db.close();
            reject(transaction.error);
        };
    });
}

async function getVoice(key) {
    if (!key) return null;

    const db = await openVoiceDatabase();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction("voices", "readonly");
        const request = transaction.objectStore("voices").get(key);

        request.onsuccess = () => {
            const result = request.result || null;
            db.close();
            resolve(result);
        };

        request.onerror = () => {
            db.close();
            reject(request.error);
        };
    });
}

async function deleteVoice(key) {
    if (!key) return;

    const db = await openVoiceDatabase();

    return new Promise((resolve, reject) => {
        const transaction = db.transaction("voices", "readwrite");
        transaction.objectStore("voices").delete(key);
        transaction.oncomplete = () => { db.close(); resolve(true); };
        transaction.onerror = () => { db.close(); reject(transaction.error); };
    });
}

async function saveCaseImage(blob, key) {
    const db = await openVoiceDatabase();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction("images", "readwrite");
        transaction.objectStore("images").put(blob, key);
        transaction.oncomplete = () => { db.close(); resolve(true); };
        transaction.onerror = () => { db.close(); reject(transaction.error); };
    });
}

async function getCaseImage(key) {
    if (!key) return null;
    const db = await openVoiceDatabase();
    return new Promise((resolve, reject) => {
        const request = db.transaction("images", "readonly").objectStore("images").get(key);
        request.onsuccess = () => { const image = request.result || null; db.close(); resolve(image); };
        request.onerror = () => { db.close(); reject(request.error); };
    });
}

async function deleteCaseImage(key) {
    if (!key) return;
    const db = await openVoiceDatabase();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction("images", "readwrite");
        transaction.objectStore("images").delete(key);
        transaction.oncomplete = () => { db.close(); resolve(true); };
        transaction.onerror = () => { db.close(); reject(transaction.error); };
    });
}

/* ---------- DASHBOARD STYLES ---------- */

function injectDashboardStyles() {
    if ($("#dashboardStyles")) return;

    const style = document.createElement("style");
    style.id = "dashboardStyles";

    style.textContent = `
        #bnuDashboard {
            --dash-bg:#f3f7fb;
            --dash-card:#ffffff;
            --dash-text:#17324f;
            --dash-muted:#718096;
            --dash-primary:#176b8b;
            --dash-border:#e1e9f0;
            min-height:100vh;
            padding:25px 5%;
            background:var(--dash-bg);
            color:var(--dash-text);
            font-family:inherit;
            transition:.25s;
        }

        #bnuDashboard.patient-dashboard {
            --dash-primary:#177c68;
            --dash-bg:#eff7f4;
        }

        #bnuDashboard.student-dashboard {
            --dash-primary:#176b9b;
            --dash-bg:#f0f5fb;
        }

        #bnuDashboard.dashboard-dark {
            --dash-bg:#101b29;
            --dash-card:#1b2a3b;
            --dash-text:#edf4fb;
            --dash-muted:#b0bdcb;
            --dash-border:#334459;
        }

        #bnuDashboard * { box-sizing:border-box; }

        #bnuDashboard button,
        #bnuDashboard input,
        #bnuDashboard textarea,
        #bnuDashboard select {
            font:inherit;
        }

        .db-header {
            display:flex;
            align-items:center;
            justify-content:space-between;
            gap:15px;
            flex-wrap:wrap;
            margin-bottom:28px;
        }

        .db-brand {
            font-size:23px;
            font-weight:900;
            letter-spacing:-.5px;
        }

        .db-brand span { color:var(--dash-primary); }

        .db-actions {
            display:flex;
            align-items:center;
            gap:9px;
            flex-wrap:wrap;
        }

        .db-button {
            border:1px solid var(--dash-border);
            background:var(--dash-card);
            color:var(--dash-text);
            border-radius:11px;
            padding:10px 15px;
            cursor:pointer;
            font-weight:700;
            transition:.2s;
        }

        .db-button:hover { transform:translateY(-2px); }

        .db-button.primary {
            background:var(--dash-primary);
            border-color:var(--dash-primary);
            color:white;
        }

        .db-button.danger {
            background:#b83c48;
            color:white;
            border-color:#b83c48;
        }

        .db-button.success {
            background:#16845d;
            color:white;
            border-color:#16845d;
        }

        .db-nav {
            display:flex;
            gap:8px;
            flex-wrap:wrap;
            padding:10px;
            background:var(--dash-card);
            border:1px solid var(--dash-border);
            border-radius:16px;
            margin-bottom:28px;
        }

        .db-nav button {
            border:0;
            background:transparent;
            color:var(--dash-muted);
            padding:12px 15px;
            border-radius:10px;
            cursor:pointer;
            font-weight:700;
        }

        .db-nav button.active {
            color:white;
            background:var(--dash-primary);
        }

        .db-welcome {
            padding:30px;
            border-radius:20px;
            background:linear-gradient(120deg,var(--dash-card),var(--dash-bg));
            border:1px solid var(--dash-border);
            margin-bottom:25px;
        }

        .db-welcome h1 {
            margin:10px 0;
            font-size:clamp(25px,4vw,36px);
        }

        .db-muted { color:var(--dash-muted); line-height:1.8; }

        .db-grid {
            display:grid;
            grid-template-columns:repeat(auto-fit,minmax(210px,1fr));
            gap:17px;
        }

        .db-quick-start {
            display:grid;
            grid-template-columns:minmax(0,1.3fr) minmax(240px,.7fr);
            gap:18px;
            margin-top:20px;
        }

        .db-action-card {
            display:flex;
            flex-direction:column;
            align-items:flex-start;
            gap:12px;
            padding:23px;
            border:1px solid var(--dash-border);
            border-radius:17px;
            background:var(--dash-card);
        }

        .db-action-card h2,
        .db-action-card h3 { margin:0; }

        .db-action-card p { margin:0; }

        .db-action-card .db-button { margin-top:auto; }

        .db-step-list {
            display:grid;
            gap:11px;
            margin:0;
            padding:0;
            list-style:none;
        }

        .db-step-list li {
            display:flex;
            align-items:center;
            gap:10px;
            color:var(--dash-muted);
            line-height:1.5;
        }

        .db-step-number {
            display:grid;
            place-items:center;
            flex:0 0 27px;
            width:27px;
            height:27px;
            border-radius:50%;
            background:var(--dash-bg);
            color:var(--dash-primary);
            font-size:12px;
            font-weight:900;
        }

        .db-card {
            padding:23px;
            background:var(--dash-card);
            border:1px solid var(--dash-border);
            border-radius:17px;
            min-width:0;
            box-shadow:0 7px 25px rgba(20,50,80,.035);
        }

        .db-card h3 { margin:0 0 10px; }

        .db-stat {
            font-size:30px;
            font-weight:900;
            color:var(--dash-primary);
        }

        .db-section-title {
            margin:0 0 20px;
            font-size:25px;
        }

        .db-form {
            display:grid;
            gap:15px;
            max-width:850px;
        }

        .db-field {
            display:grid;
            gap:7px;
        }

        .db-field label { font-weight:800; }

        .db-field input,
        .db-field textarea,
        .db-field select {
            width:100%;
            padding:13px 14px;
            border:1px solid var(--dash-border);
            border-radius:11px;
            background:var(--dash-card);
            color:var(--dash-text);
            outline:none;
        }

        .db-field textarea {
            min-height:125px;
            resize:vertical;
        }

        .db-field input:focus,
        .db-field textarea:focus,
        .db-field select:focus {
            border-color:var(--dash-primary);
        }

        .db-case-list {
            display:grid;
            grid-template-columns:repeat(auto-fit,minmax(270px,1fr));
            gap:17px;
        }

        .db-case {
            padding:21px;
            border:1px solid var(--dash-border);
            border-radius:17px;
            background:var(--dash-card);
            min-width:0;
        }

        .db-case h3 { margin:10px 0; }

        .db-tag {
            display:inline-block;
            padding:6px 10px;
            border-radius:30px;
            background:var(--dash-bg);
            color:var(--dash-primary);
            font-size:12px;
            font-weight:800;
        }

        .db-status {
            display:inline-block;
            padding:6px 10px;
            border-radius:30px;
            font-size:12px;
            font-weight:800;
            background:#fff0d6;
            color:#9b6400;
        }

        .db-status.accepted {
            background:#d8f5e7;
            color:#116c45;
        }

        .db-status.unavailable {
            background:#ffe1e1;
            color:#a32c37;
        }

        .db-case-actions {
            display:flex;
            flex-wrap:wrap;
            gap:8px;
            margin-top:17px;
        }

        .db-empty {
            padding:35px 20px;
            border:1px dashed var(--dash-border);
            border-radius:16px;
            text-align:center;
            color:var(--dash-muted);
            background:var(--dash-card);
        }

        .db-profile {
            margin-top:25px;
        }

        .db-chat-layout {
            display:grid;
            grid-template-columns:minmax(220px,300px) 1fr;
            gap:17px;
        }

        .db-chat-list {
            display:grid;
            align-content:start;
            gap:9px;
        }

        .db-chat-item {
            width:100%;
            text-align:start;
            padding:14px;
            background:var(--dash-card);
            color:var(--dash-text);
            border:1px solid var(--dash-border);
            border-radius:12px;
            cursor:pointer;
        }

        .db-chat-item.active {
            border-color:var(--dash-primary);
        }

        .db-chat-window {
            min-height:390px;
            display:flex;
            flex-direction:column;
            background:var(--dash-card);
            border:1px solid var(--dash-border);
            border-radius:16px;
            overflow:hidden;
        }

        .db-chat-messages {
            flex:1;
            padding:18px;
            display:flex;
            flex-direction:column;
            gap:12px;
            overflow-y:auto;
            min-height:260px;
        }

        .db-message {
            max-width:80%;
            padding:12px 15px;
            border-radius:14px;
            background:var(--dash-bg);
            overflow-wrap:anywhere;
        }

        .db-message.mine {
            align-self:flex-end;
            background:var(--dash-primary);
            color:white;
        }

        .db-message small {
            display:block;
            opacity:.7;
            margin-top:6px;
            font-size:10px;
        }

        .db-chat-form {
            display:flex;
            gap:8px;
            padding:12px;
            border-top:1px solid var(--dash-border);
        }

        .db-chat-form input {
            flex:1;
            min-width:0;
            padding:12px;
            border:1px solid var(--dash-border);
            border-radius:10px;
            background:var(--dash-bg);
            color:var(--dash-text);
        }

        .db-audio {
            width:100%;
            max-width:300px;
            margin-top:10px;
        }

        .db-recording {
            color:#c43b47;
            font-weight:800;
        }

        @media(max-width:650px) {
            #bnuDashboard { padding:18px 4%; }
            .db-header { align-items:flex-start; }
            .db-chat-layout { grid-template-columns:1fr; }
            .db-chat-list { grid-template-columns:1fr 1fr; }
            .db-nav { display:grid; grid-template-columns:1fr 1fr; }
            .db-nav button { padding:10px 6px; }
            .db-welcome { padding:22px; }
            .db-quick-start { grid-template-columns:1fr; }
        }
    `;

    document.head.appendChild(style);
}

/* ---------- DASHBOARD NAVIGATION ---------- */

function dashboardNavigation(isPatient) {
    const items = isPatient
        ? [
            ["home", "Home", "الرئيسية", "fa-house"],
            ["publish", "Publish Case", "نشر حالة", "fa-circle-plus"],
            ["cases", "My Cases", "حالاتي", "fa-folder-open"],
            ["requests", "Requests", "الطلبات", "fa-clipboard-list"],
            ["messages", "Messages", "الرسائل", "fa-comments"]
        ]
        : [
            ["home", "Home", "الرئيسية", "fa-house"],
            ["available", "Available Cases", "الحالات المتاحة", "fa-magnifying-glass"],
            ["requests", "My Requests", "طلباتي", "fa-clipboard-check"],
            ["messages", "Messages", "الرسائل", "fa-comments"],
            ["requirements", "Requirements", "متطلباتي", "fa-list-check"]
        ];

    return items.map(([id, en, ar, icon]) => `
        <button type="button"
            data-tab="${id}"
            aria-current="${activeDashboardTab === id ? "page" : "false"}"
            class="${activeDashboardTab === id ? "active" : ""}">
            <i class="fa-solid ${icon}" aria-hidden="true"></i>
            ${dashboardText(en, ar)}
        </button>
    `).join("");
}

/* ---------- DASHBOARD RENDERER ---------- */

function renderDashboard(account) {
    if (!account) return;

    currentUser = account;
    injectDashboardStyles();

    if (website) website.classList.add("hidden");
    if (preferencesScreen) preferencesScreen.classList.add("hidden");

    if (dashboardRoot) dashboardRoot.remove();

    const isPatient = account.role === "patient";
    const ar = selectedLanguage === "ar";

    dashboardRoot = document.createElement("section");
    dashboardRoot.id = "bnuDashboard";
    dashboardRoot.className = isPatient
        ? "patient-dashboard"
        : "student-dashboard";

    if (selectedTheme === "dark") {
        dashboardRoot.classList.add("dashboard-dark");
    }

    dashboardRoot.innerHTML = `
        <header class="db-header">
            <div class="db-brand">
                <span class="db-brand-icon"><i class="fa-solid fa-tooth" aria-hidden="true"></i></span>
                <span>BNU <b>Dental Care</b><small>${ar ? "رعاية أسنان أقرب إليك" : "Dental care, connected"}</small></span>
            </div>

            <div class="db-actions">
                <div class="db-user-chip">
                    <span class="db-avatar" aria-hidden="true">${escapeHTML((account.name || "B").trim().charAt(0).toUpperCase())}</span>
                    <span class="db-user-meta"><strong>${escapeHTML(account.name)}</strong><small>${isPatient
                        ? (ar ? "حساب مريض" : "Patient account")
                        : (ar ? "طالب طب أسنان" : "Dental student")}</small></span>
                </div>

                <button class="db-icon-button" type="button" data-action="language"
                    aria-label="${ar ? "Switch language to English" : "تغيير اللغة إلى العربية"}"
                    title="${ar ? "English" : "العربية"}">
                    <i class="fa-solid fa-language" aria-hidden="true"></i>
                </button>

                <button class="db-icon-button" type="button" data-action="theme"
                    aria-label="${selectedTheme === "light"
                        ? (ar ? "تفعيل الوضع الليلي" : "Enable dark mode")
                        : (ar ? "تفعيل الوضع النهاري" : "Enable light mode")}"
                    title="${selectedTheme === "light"
                        ? (ar ? "الوضع الليلي" : "Dark mode")
                        : (ar ? "الوضع النهاري" : "Light mode")}">
                    <i class="fa-solid ${selectedTheme === "light" ? "fa-moon" : "fa-sun"}" aria-hidden="true"></i>
                </button>

                <button class="db-button danger" data-action="logout">
                    ${ar ? "تسجيل الخروج" : "Log Out"}
                </button>
            </div>
        </header>

        <nav class="db-nav">
            <p class="db-nav-caption">${ar ? "القائمة الرئيسية" : "WORKSPACE"}</p>
            ${dashboardNavigation(isPatient)}
        </nav>

        <main id="dashboardContent"></main>
    `;

    document.body.appendChild(dashboardRoot);
    renderDashboardPage();
    window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ---------- DASHBOARD PAGE CONTENT ---------- */

function renderDashboardPage() {
    if (!currentUser || !dashboardRoot) return;

    const area = $("#dashboardContent");
    if (!area) return;

    const patient = currentUser.role === "patient";
    const ar = selectedLanguage === "ar";

    dashboardRoot.querySelectorAll("[data-tab]").forEach(button => {
        const isActive = button.dataset.tab === activeDashboardTab;
        button.classList.toggle(
            "active",
            isActive
        );
        button.setAttribute("aria-current", isActive ? "page" : "false");
    });

    if (activeDashboardTab === "home") {
        const cases = getCases().filter(c => c.patientId === currentUser.id);
        const requests = getRequests().filter(r =>
            patient
                ? cases.some(c => c.id === r.caseId)
                : r.studentId === currentUser.id
        );

        const accepted = requests.filter(r => r.status === "accepted").length;

        const pending = requests.filter(r => r.status === "pending").length;
        const primaryTab = patient ? "publish" : "available";

        area.innerHTML = `
            <section class="db-welcome">
                <span class="db-tag">
                    ${patient
                        ? (ar ? "حساب المريض" : "PATIENT ACCOUNT")
                        : (ar ? "حساب طالب طب الأسنان" : "DENTAL STUDENT ACCOUNT")}
                </span>

                <h1>
                    ${ar ? "أهلًا بك، " : "Welcome, "}
                    ${escapeHTML(currentUser.name)}
                </h1>

                <p class="db-muted">
                    ${patient
                        ? (ar
                            ? "انشر حالتك وتابع طلبات الطلاب وتواصل مع الطالب الذي تم اختياره."
                            : "Publish your case, review student requests and communicate with your assigned student.")
                        : (ar
                            ? "استعرض الحالات المتاحة وأرسل طلباتك وتابع الحالات التي تم قبولك فيها."
                            : "Explore available cases, send requests and manage your accepted cases.")}
                </p>
            </section>

            <section class="db-quick-start" aria-label="${ar ? "ابدأ من هنا" : "Get started"}">
                <article class="db-action-card">
                    <span class="db-tag">${ar ? "الخطوة التالية" : "YOUR NEXT STEP"}</span>
                    <h2>${patient
                        ? (ar ? "ابدأ بنشر حالتك" : "Start by sharing your case")
                        : (ar ? "اكتشف الحالات المناسبة لك" : "Find a case that fits your goals")}</h2>
                    <p class="db-muted">${patient
                        ? (ar ? "اكتب وصفًا واضحًا للحالة، وبعدها راجع طلبات الطلاب من لوحة الطلبات." : "Add a clear description, then review student applications in your Requests tab.")
                        : (ar ? "استخدم البحث لاستعراض الحالات، ثم أرسل طلبك وتابع الرد من طلباتي." : "Browse the available cases, send a request and follow its status in My Requests.")}</p>
                    <button type="button" class="db-button primary" data-tab="${primaryTab}">
                        ${patient
                            ? (ar ? "نشر حالة جديدة" : "Publish a case")
                            : (ar ? "استعراض الحالات" : "Browse cases")}
                        <span aria-hidden="true">${ar ? "←" : "→"}</span>
                    </button>
                </article>

                <article class="db-action-card">
                    <h3>${ar ? "رحلتك على المنصة" : "Your journey"}</h3>
                    <ol class="db-step-list">
                        ${patient
                            ? `<li><span class="db-step-number">1</span>${ar ? "انشر الحالة" : "Publish your case"}</li>
                               <li><span class="db-step-number">2</span>${ar ? `راجع الطلبات${pending ? ` (${pending} قيد الانتظار)` : ""}` : `Review requests${pending ? ` (${pending} pending)` : ""}`}</li>
                               <li><span class="db-step-number">3</span>${ar ? "اقبل الطالب لبدء المحادثة" : "Accept a student to start chatting"}</li>`
                            : `<li><span class="db-step-number">1</span>${ar ? "استعرض الحالات المفتوحة" : "Explore open cases"}</li>
                               <li><span class="db-step-number">2</span>${ar ? `أرسل طلبك${pending ? ` (${pending} قيد الانتظار)` : ""}` : `Send a request${pending ? ` (${pending} pending)` : ""}`}</li>
                               <li><span class="db-step-number">3</span>${ar ? "تواصل بعد قبول الطلب" : "Chat after your request is accepted"}</li>`}
                    </ol>
                </article>
            </section>

            <div class="db-grid">
                <article class="db-card">
                    <div class="db-stat">${patient ? cases.length : getCases().filter(c => c.status === "open").length}</div>
                    <h3>${patient
                        ? (ar ? "حالاتي المنشورة" : "My Published Cases")
                        : (ar ? "الحالات المتاحة" : "Available Cases")}</h3>
                </article>

                <article class="db-card">
                    <div class="db-stat">${requests.length}</div>
                    <h3>${ar ? "الطلبات" : "Requests"}</h3>
                </article>

                <article class="db-card">
                    <div class="db-stat">${accepted}</div>
                    <h3>${ar ? "طلبات مقبولة" : "Accepted Requests"}</h3>
                </article>
            </div>

            <section class="db-card db-profile">
                <h3>${ar ? "بيانات الحساب" : "Account Information"}</h3>
                <p>${ar ? "الاسم: " : "Name: "}${escapeHTML(currentUser.name)}</p>
                <p>${ar ? "الهاتف: " : "Phone: "}${escapeHTML(currentUser.phone)}</p>
                ${currentUser.email
                    ? `<p>${ar ? "البريد: " : "Email: "}${escapeHTML(currentUser.email)}</p>`
                    : ""}
            </section>
        `;

        return;
    }

    if (activeDashboardTab === "publish" && patient) {
        renderPublishPage(area);
        return;
    }

    if (activeDashboardTab === "available" && !patient) {
        renderAvailableCases(area);
        return;
    }

    if (activeDashboardTab === "cases" && patient) {
        renderPatientCases(area);
        return;
    }

    if (activeDashboardTab === "requests") {
        patient ? renderPatientRequests(area) : renderStudentRequests(area);
        return;
    }

    if (activeDashboardTab === "messages") {
        renderMessagesPage(area);
        return;
    }

    if (activeDashboardTab === "requirements" && !patient) {
        area.innerHTML = `
            <h2 class="db-section-title">
                ${ar ? "متطلباتي الإكلينيكية" : "Clinical Requirements"}
            </h2>
            <div class="db-empty">
                ${ar
                    ? "سيتم إضافة متابعة المتطلبات الإكلينيكية في المرحلة التالية."
                    : "Clinical requirement tracking will be added in the next stage."}
            </div>
        `;
        return;
    }

    area.innerHTML = `<div class="db-empty">Page not found</div>`;
}

/* ---------- PUBLISH CASE ---------- */

const EGYPT_GOVERNORATES = [
    ["Cairo", "القاهرة"], ["Giza", "الجيزة"], ["Alexandria", "الإسكندرية"],
    ["Qalyubia", "القليوبية"], ["Beheira", "البحيرة"], ["Matrouh", "مطروح"],
    ["Damietta", "دمياط"], ["Dakahlia", "الدقهلية"], ["Kafr El Sheikh", "كفر الشيخ"],
    ["Gharbia", "الغربية"], ["Monufia", "المنوفية"], ["Sharqia", "الشرقية"],
    ["Port Said", "بورسعيد"], ["Ismailia", "الإسماعيلية"], ["Suez", "السويس"],
    ["North Sinai", "شمال سيناء"], ["South Sinai", "جنوب سيناء"], ["Beni Suef", "بني سويف"],
    ["Fayoum", "الفيوم"], ["Minya", "المنيا"], ["Assiut", "أسيوط"],
    ["New Valley", "الوادي الجديد"], ["Red Sea", "البحر الأحمر"], ["Sohag", "سوهاج"],
    ["Qena", "قنا"], ["Luxor", "الأقصر"], ["Aswan", "أسوان"]
];
const CASE_DEPARTMENTS = [
    ["General Dentistry", "طب أسنان عام"], ["Operative", "علاج تحفظي"],
    ["Endodontics", "علاج جذور"], ["Prosthodontics", "تركيبات الأسنان"],
    ["Periodontics", "أمراض اللثة"], ["Oral Surgery", "جراحة الفم"],
    ["Orthodontics", "تقويم الأسنان"], ["Pediatric Dentistry", "أسنان الأطفال"]
];

function renderPublishPage(area) {
    const ar = selectedLanguage === "ar";
    const age = currentUser.age || "";

    area.innerHTML = `
        <header class="db-page-heading">
            <span class="db-tag">${ar ? "طلب رعاية أسنان" : "DENTAL CARE REQUEST"}</span>
            <h1 class="db-section-title">${ar ? "احكي لنا عن مشكلتك" : "Tell us what’s bothering you"}</h1>
            <p class="db-muted">${ar ? "اكتبي عن المشكلة أو سجّليها أو أرفقي صورة واضحة للمكان المتألم؛ يكفي اختيار طريقة واحدة." : "Write about the concern, record a voice message, or add a clear photo of the affected area. One is enough."}</p>
        </header>

        <form class="db-card db-form db-publish-form" id="publishCaseForm">
            <section class="db-form-section">
                <div class="db-form-section-title">
                    <span class="db-step-number">1</span>
                    <div><h2>${ar ? "معلومات أساسية" : "Basic information"}</h2><p class="db-muted">${ar ? "تظهر هذه المعلومات لطلاب الأسنان المهتمين بالحالة." : "This information helps dental students understand your request."}</p></div>
                </div>
                <div class="db-form-grid">
                    <div class="db-field">
                        <label for="casePatientName">${ar ? "الاسم" : "Name"}</label>
                        <input id="casePatientName" name="patientName" required maxlength="100" value="${escapeHTML(currentUser.name)}" autocomplete="name">
                    </div>
                    <div class="db-field">
                        <label for="caseAge">${ar ? "العمر" : "Age"}</label>
                        <input id="caseAge" name="age" type="number" required min="1" max="120" value="${escapeHTML(age)}" inputmode="numeric">
                    </div>
                    <div class="db-field db-field-wide">
                        <label for="caseGovernorate">${ar ? "المحافظة" : "Governorate"}</label>
                        <select id="caseGovernorate" name="governorate" required>
                            <option value="">${ar ? "اختاري المحافظة" : "Choose your governorate"}</option>
                            ${EGYPT_GOVERNORATES.map(([en, arabic]) => `<option value="${escapeHTML(en)}">${ar ? arabic : en}</option>`).join("")}
                        </select>
                    </div>
                </div>
            </section>

            <section class="db-form-section">
                <div class="db-form-section-title">
                    <span class="db-step-number">2</span>
                    <div><h2>${ar ? "ما المشكلة التي تشتكين منها؟" : "What dental concern do you have?"}</h2><p class="db-muted">${ar ? "اكتبي وصفًا أو سجّلي رسالة صوتية أو أرفقي صورة. يكفي اختيار طريقة واحدة." : "Write a description, record a voice message or add a photo. Any one is enough."}</p></div>
                </div>
                <div class="db-field">
                    <label for="caseDescription">${ar ? "اكتبي عن المشكلة (اختياري إذا سجلتِ صوتًا)" : "Describe the concern (optional if you record audio)"}</label>
                    <textarea id="caseDescription" name="description" maxlength="3000" placeholder="${ar ? "مثال: أشعر بألم في الضرس عند المضغ..." : "Example: I feel pain in a tooth when chewing..."}"></textarea>
                    <small class="db-field-hint">${ar ? "لا تكتبي معلومات تواصل أو بيانات شخصية إضافية هنا." : "Please don’t include contact details or extra personal information here."}</small>
                </div>
                <div class="db-media-grid">
                    <article class="db-media-card">
                        <div class="db-media-icon"><i class="fa-solid fa-microphone-lines" aria-hidden="true"></i></div>
                        <div><h3>${ar ? "تسجيل صوتي" : "Voice message"}</h3><p class="db-muted">${ar ? "اشرحي الحالة بصوتك بدلًا من الكتابة." : "Explain your concern in your own words."}</p></div>
                        <div class="db-case-actions">
                            <button type="button" class="db-button primary" data-action="start-recording"><i class="fa-solid fa-microphone" aria-hidden="true"></i> ${ar ? "ابدئي التسجيل" : "Start recording"}</button>
                            <button type="button" class="db-button" data-action="stop-recording" disabled>${ar ? "إيقاف" : "Stop"}</button>
                            <button type="button" class="db-button" data-action="delete-recording">${ar ? "حذف" : "Remove"}</button>
                        </div>
                        <p id="recordingStatus" class="db-muted" aria-live="polite"></p>
                        <audio id="recordedAudioPreview" class="db-audio" controls hidden></audio>
                    </article>
                    <article class="db-media-card">
                        <div class="db-media-icon"><i class="fa-regular fa-image" aria-hidden="true"></i></div>
                        <div><h3>${ar ? "صورة للمكان المتألم" : "Photo of the affected area"}</h3><p class="db-muted">${ar ? "اختياري — صورة واحدة واضحة، بدون إظهار الوجه." : "Optional — one clear photo; avoid including your face."}</p></div>
                        <label class="db-button db-upload-button" for="caseImageInput"><i class="fa-solid fa-arrow-up-from-bracket" aria-hidden="true"></i> ${ar ? "اختيار صورة" : "Choose photo"}</label>
                        <input class="db-visually-hidden" id="caseImageInput" name="caseImage" type="file" accept="image/jpeg,image/png,image/webp" capture="environment">
                        <div id="caseImagePreview" class="db-image-preview" hidden>
                            <img alt="${ar ? "معاينة صورة الحالة" : "Case photo preview"}">
                            <button type="button" class="db-button" data-action="delete-case-image">${ar ? "إزالة الصورة" : "Remove photo"}</button>
                        </div>
                    </article>
                </div>
            </section>

            <details class="db-optional-field">
                <summary>${ar ? "تفاصيل إضافية للطلاب (اختياري)" : "Optional student details"}</summary>
                <div class="db-field">
                    <label for="caseDepartment">${ar ? "القسم الأقرب للحالة" : "Closest department"}</label>
                    <select id="caseDepartment" name="department">
                        ${CASE_DEPARTMENTS.map(([en, arabic]) => `<option value="${escapeHTML(en)}">${ar ? arabic : en}</option>`).join("")}
                    </select>
                </div>
            </details>

            <p id="caseSubmissionError" class="db-form-error" role="alert" hidden></p>
            <button type="submit" class="db-button primary db-submit-case"><i class="fa-solid fa-paper-plane" aria-hidden="true"></i> ${ar ? "إرسال الحالة" : "Submit case"}</button>
            <p class="db-privacy-note"><i class="fa-solid fa-shield-halved" aria-hidden="true"></i> ${ar ? "بيانات التواصل لا تظهر للطلاب ضمن تفاصيل الحالة." : "Your contact details are not shown to students on the case page."}</p>
        </form>
    `;

    selectedCaseImage = null;
    recordedVoiceBlob = null;
}

/* ---------- AVAILABLE CASES ---------- */

function renderAvailableCases(area) {
    const ar = selectedLanguage === "ar";

    const cases = getCases()
        .filter(c => c.status === "open")
        .sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    area.innerHTML = `
        <h2 class="db-section-title">
            ${ar ? "الحالات المنشورة" : "Available Cases"}
        </h2>

        <div class="db-field" style="max-width:500px;margin-bottom:20px">
            <input id="caseSearch" placeholder="${ar ? "ابحث عن حالة أو قسم..." : "Search cases or departments..."}">
        </div>

        <div id="availableCaseList" class="db-case-list"></div>
    `;

    const search = $("#caseSearch");

    function draw(filter = "") {
        const filtered = cases.filter(c => {
            const text = [
                c.title, c.department, c.description, c.symptoms
            ].join(" ").toLowerCase();

            return text.includes(filter.toLowerCase());
        });

        const list = $("#availableCaseList");
        list.innerHTML = filtered.length
            ? filtered.map(c => {
                const unavailable = c.status !== "open";
                const ownRequest = getRequests().find(r =>
                    r.caseId === c.id && r.studentId === currentUser.id
                );

                return `
                    <article class="db-case">
                        <span class="db-tag">${escapeHTML(c.department)}</span>

                        <span class="db-status ${unavailable ? "unavailable" : ""}">
                            ${unavailable
                                ? (ar ? "غير متاحة" : "Unavailable")
                                : (ar ? "متاحة" : "Available")}
                        </span>

                        <h3>${escapeHTML(c.title)}</h3>

                        ${c.age || c.governorate ? `<div class="db-case-meta">
                            ${c.age ? `<span><i class="fa-regular fa-user" aria-hidden="true"></i> ${escapeHTML(c.age)} ${ar ? "سنة" : "years"}</span>` : ""}
                            ${c.governorate ? `<span><i class="fa-solid fa-location-dot" aria-hidden="true"></i> ${escapeHTML(ar ? (EGYPT_GOVERNORATES.find(([en]) => en === c.governorate)?.[1] || c.governorate) : c.governorate)}</span>` : ""}
                        </div>` : ""}

                        <p class="db-muted">${escapeHTML(c.description)}</p>

                        ${c.imageKey ? `<div class="db-case-image"><img data-case-image-key="${escapeHTML(c.imageKey)}" alt="${ar ? "صورة توضيحية لمكان الألم" : "Reference photo of the affected area"}"></div>` : ""}

                        ${c.audioKey ? `<div class="db-case-audio"><span>${ar ? "رسالة المريض الصوتية" : "Patient voice message"}</span><audio class="db-audio" controls data-audio-key="${escapeHTML(c.audioKey)}"></audio></div>` : ""}

                        ${c.symptoms
                            ? `<p><strong>${ar ? "الأعراض: " : "Symptoms: "}</strong>${escapeHTML(c.symptoms)}</p>`
                            : ""}

                        <small class="db-muted">${formatDate(c.createdAt)}</small>

                        <div class="db-case-actions">
                            ${unavailable
                                ? `<button class="db-button" disabled>${ar ? "تم حجز الحالة" : "Case Taken"}</button>`
                                : ownRequest
                                    ? `<button class="db-button" disabled>${ownRequest.status === "pending"
                                        ? (ar ? "تم إرسال طلبك" : "Request Sent")
                                        : (ar ? "تم رفض طلبك" : "Request Rejected")}</button>`
                                    : `<button class="db-button primary" data-action="request-case" data-id="${escapeHTML(c.id)}">
                                        ${ar ? "طلب الحالة" : "Request Case"}
                                       </button>`
                            }
                        </div>
                    </article>
                `;
            }).join("")
            : `<div class="db-empty">${ar ? "لا توجد حالات مطابقة." : "No matching cases found."}</div>`;
        hydrateAudioPlayers(list);
        hydrateCaseImages(list);
    }

    search.addEventListener("input", () => draw(search.value));
    draw();
}

/* ---------- PATIENT CASES ---------- */

function renderPatientCases(area) {
    const ar = selectedLanguage === "ar";

    const cases = getCases().filter(c =>
        c.patientId === currentUser.id
    );

    area.innerHTML = `
        <h2 class="db-section-title">${ar ? "حالاتي" : "My Cases"}</h2>
        <div class="db-case-list">
            ${cases.length ? cases.map(c => `
                <article class="db-case">
                    <span class="db-tag">${escapeHTML(c.department)}</span>
                    <span class="db-status ${c.status === "open" ? "" : "unavailable"}">
                        ${c.status === "open"
                            ? (ar ? "في انتظار الطلبات" : "Open")
                            : (ar ? "تم حجز الحالة" : "Assigned")}
                    </span>

                    <h3>${escapeHTML(c.title)}</h3>
                    <p class="db-muted">${escapeHTML(c.description)}</p>
                    ${c.age || c.governorate ? `<div class="db-case-meta">
                        ${c.age ? `<span><i class="fa-regular fa-user" aria-hidden="true"></i> ${escapeHTML(c.age)} ${ar ? "سنة" : "years"}</span>` : ""}
                        ${c.governorate ? `<span><i class="fa-solid fa-location-dot" aria-hidden="true"></i> ${escapeHTML(ar ? (EGYPT_GOVERNORATES.find(([en]) => en === c.governorate)?.[1] || c.governorate) : c.governorate)}</span>` : ""}
                    </div>` : ""}
                    ${c.imageKey ? `<div class="db-case-image"><img data-case-image-key="${escapeHTML(c.imageKey)}" alt="${ar ? "صورة توضيحية لمكان الألم" : "Reference photo of the affected area"}"></div>` : ""}
                    <small class="db-muted">${formatDate(c.createdAt)}</small>
                    ${c.audioKey
                        ? `<div><audio class="db-audio" controls data-audio-key="${escapeHTML(c.audioKey)}"></audio></div>`
                        : ""}
                    <div class="db-case-actions">
                        <button type="button" class="db-button danger" data-action="delete-case" data-id="${escapeHTML(c.id)}">
                            <i class="fa-regular fa-trash-can" aria-hidden="true"></i>
                            ${ar ? "حذف الحالة" : "Delete case"}
                        </button>
                    </div>
                </article>
            `).join("") : `
                <div class="db-empty">
                    ${ar ? "لم تنشري أي حالة حتى الآن." : "You have not published any cases yet."}
                </div>
            `}
        </div>
    `;

    hydrateAudioPlayers(area);
    hydrateCaseImages(area);
}

function navigateDashboardTab(tab) {
    if (!dashboardRoot || !tab) return;
    if (dashboardNavigationTimer) clearTimeout(dashboardNavigationTimer);

    const area = $("#dashboardContent");
    if (activeDashboardTab === tab) {
        area?.classList.remove("db-content-leaving", "db-content-entering");
        return;
    }

    area?.classList.add("db-content-leaving");
    dashboardNavigationTimer = setTimeout(() => {
        activeDashboardTab = tab;
        activeChatCaseId = null;
        renderDashboardPage();

        const updatedArea = $("#dashboardContent");
        if (updatedArea) {
            updatedArea.classList.remove("db-content-leaving");
            updatedArea.classList.add("db-content-entering");
            requestAnimationFrame(() => requestAnimationFrame(() => {
                updatedArea.classList.remove("db-content-entering");
            }));
        }
    }, 130);
}

function openDeleteCaseDialog(caseId) {
    const dentalCase = getCases().find(c => c.id === caseId);
    if (!dentalCase || dentalCase.patientId !== currentUser?.id) return;
    $(".db-confirm-backdrop")?.remove();

    const ar = selectedLanguage === "ar";
    const dialog = document.createElement("div");
    dialog.className = "db-confirm-backdrop";
    dialog.innerHTML = `
        <section class="db-confirm-dialog" role="alertdialog" aria-modal="true" aria-labelledby="deleteCaseTitle">
            <span class="db-confirm-icon"><i class="fa-regular fa-trash-can" aria-hidden="true"></i></span>
            <h2 id="deleteCaseTitle">${ar ? "حذف الحالة؟" : "Delete this case?"}</h2>
            <p>${ar
                ? "سيتم حذف الحالة وكل الطلبات والرسائل المرتبطة بها. لا يمكن التراجع عن هذا الإجراء."
                : "This will permanently remove the case and its related requests and messages."}</p>
            <div class="db-confirm-actions">
                <button type="button" class="db-button" data-action="close-delete-dialog">${ar ? "إلغاء" : "Cancel"}</button>
                <button type="button" class="db-button danger" data-action="confirm-delete-case" data-id="${escapeHTML(caseId)}">${ar ? "نعم، احذفها" : "Delete case"}</button>
            </div>
        </section>`;
    dashboardRoot.appendChild(dialog);
    dialog.querySelector('[data-action="close-delete-dialog"]')?.focus();
}

async function deletePatientCase(caseId) {
    const cases = getCases();
    const dentalCase = cases.find(c => c.id === caseId);
    if (!dentalCase || dentalCase.patientId !== currentUser?.id || currentUser?.role !== "patient") return;

    saveCases(cases.filter(c => c.id !== caseId));
    saveRequests(getRequests().filter(r => r.caseId !== caseId));
    saveMessages(getMessages().filter(m => m.caseId !== caseId));
    if (activeChatCaseId === caseId) activeChatCaseId = null;

    if (dentalCase.audioKey) {
        try { await deleteVoice(dentalCase.audioKey); }
        catch (error) { console.warn("Could not remove the case audio from IndexedDB.", error); }
    }
    if (dentalCase.imageKey) {
        try { await deleteCaseImage(dentalCase.imageKey); }
        catch (error) { console.warn("Could not remove the case image from IndexedDB.", error); }
    }

    showToast(dashboardText("Case deleted.", "تم حذف الحالة."));
    renderDashboardPage();
}

/* ---------- PATIENT REQUESTS ---------- */

function renderPatientRequests(area) {
    const ar = selectedLanguage === "ar";
    const cases = getCases().filter(c => c.patientId === currentUser.id);
    const caseIds = cases.map(c => c.id);

    const requests = getRequests()
        .filter(r => caseIds.includes(r.caseId))
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    area.innerHTML = `
        <h2 class="db-section-title">${ar ? "طلبات الطلاب" : "Student Requests"}</h2>

        <div class="db-case-list">
            ${requests.length ? requests.map(r => {
                const dentalCase = cases.find(c => c.id === r.caseId);
                if (!dentalCase) return "";

                return `
                    <article class="db-case">
                        <span class="db-tag">${escapeHTML(dentalCase.department)}</span>
                        <h3>${escapeHTML(dentalCase.title)}</h3>
                        <p><strong>${ar ? "الطالب: " : "Student: "}</strong>${escapeHTML(r.studentName)}</p>
                        <p class="db-muted">${formatDate(r.createdAt)}</p>

                        <span class="db-status ${r.status === "accepted" ? "accepted" : ""}">
                            ${r.status === "pending"
                                ? (ar ? "في انتظار قرارك" : "Pending")
                                : r.status === "accepted"
                                    ? (ar ? "تم القبول" : "Accepted")
                                    : (ar ? "مرفوض" : "Rejected")}
                        </span>

                        <div class="db-case-actions">
                            ${r.status === "pending" && dentalCase.status === "open"
                                ? `
                                    <button class="db-button success"
                                        data-action="accept-request"
                                        data-id="${escapeHTML(r.id)}">
                                        ${ar ? "قبول الطالب" : "Accept"}
                                    </button>

                                    <button class="db-button danger"
                                        data-action="reject-request"
                                        data-id="${escapeHTML(r.id)}">
                                        ${ar ? "رفض" : "Reject"}
                                    </button>
                                `
                                : r.status === "accepted"
                                    ? `<button class="db-button primary" data-action="open-chat" data-id="${escapeHTML(dentalCase.id)}">
                                        ${ar ? "فتح المحادثة" : "Open Chat"}
                                       </button>`
                                    : ""
                            }
                        </div>
                    </article>
                `;
            }).join("") : `
                <div class="db-empty">
                    ${ar ? "لا توجد طلبات على حالاتك حتى الآن." : "No student requests yet."}
                </div>
            `}
        </div>
    `;
}

/* ---------- STUDENT REQUESTS ---------- */

function renderStudentRequests(area) {
    const ar = selectedLanguage === "ar";

    const requests = getRequests()
        .filter(r => r.studentId === currentUser.id)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const cases = getCases();

    area.innerHTML = `
        <h2 class="db-section-title">${ar ? "طلباتي" : "My Requests"}</h2>

        <div class="db-case-list">
            ${requests.length ? requests.map(r => {
                const c = cases.find(item => item.id === r.caseId);

                return `
                    <article class="db-case">
                        <h3>${escapeHTML(c?.title || (ar ? "حالة غير موجودة" : "Case unavailable"))}</h3>
                        <p class="db-muted">${escapeHTML(c?.department || "")}</p>

                        <span class="db-status ${r.status === "accepted" ? "accepted" : r.status === "rejected" ? "unavailable" : ""}">
                            ${r.status === "pending"
                                ? (ar ? "في انتظار المريض" : "Pending")
                                : r.status === "accepted"
                                    ? (ar ? "تم قبولك" : "Accepted")
                                    : (ar ? "مرفوض" : "Rejected")}
                        </span>

                        ${c && c.status !== "open" && r.status !== "accepted"
                            ? `<p class="db-muted">${ar ? "تم حجز الحالة لطالب آخر." : "This case has been assigned to another student."}</p>`
                            : ""}

                        ${r.status === "accepted"
                            ? `<div class="db-case-actions">
                                <button class="db-button primary" data-action="open-chat" data-id="${escapeHTML(r.caseId)}">
                                    ${ar ? "فتح المحادثة" : "Open Chat"}
                                </button>
                               </div>`
                            : ""}
                    </article>
                `;
            }).join("") : `
                <div class="db-empty">
                    ${ar ? "لم ترسل أي طلبات حتى الآن." : "You have not sent any requests yet."}
                </div>
            `}
        </div>
    `;
}

/* ---------- CHAT ACCESS CONTROL ---------- */

function canAccessChat(caseId) {
    const dentalCase = getCases().find(c => c.id === caseId);

    if (!dentalCase || dentalCase.status !== "assigned") {
        return false;
    }

    return currentUser.id === dentalCase.patientId ||
        currentUser.id === dentalCase.assignedStudentId;
}

function getMyChats() {
    return getCases().filter(c =>
        c.status === "assigned" &&
        (
            c.patientId === currentUser.id ||
            c.assignedStudentId === currentUser.id
        )
    );
}

/* ---------- MESSAGES PAGE ---------- */

function renderMessagesPage(area) {
    const ar = selectedLanguage === "ar";
    const chats = getMyChats();

    if (!activeChatCaseId || !chats.some(c => c.id === activeChatCaseId)) {
        activeChatCaseId = chats[0]?.id || null;
    }

    area.innerHTML = `
        <h2 class="db-section-title">${ar ? "المحادثات الخاصة" : "Private Messages"}</h2>

        <div class="db-chat-layout">
            <div class="db-chat-list">
                ${chats.length ? chats.map(c => {
                    const otherName = currentUser.id === c.patientId
                        ? c.assignedStudentName
                        : c.patientName;

                    return `
                        <button class="db-chat-item ${activeChatCaseId === c.id ? "active" : ""}"
                            data-action="select-chat"
                            data-id="${escapeHTML(c.id)}">
                            <strong>${escapeHTML(otherName || "")}</strong>
                            <br>
                            <small>${escapeHTML(c.title)}</small>
                        </button>
                    `;
                }).join("") : `
                    <div class="db-empty">
                        ${ar ? "لا توجد محادثات بعد. الشات يفتح بعد قبول الحالة فقط." : "No chats yet. Chat opens only after a case is accepted."}
                    </div>
                `}
            </div>

            <div class="db-chat-window" id="chatWindow">
                ${activeChatCaseId
                    ? renderChatWindow(activeChatCaseId)
                    : `<div class="db-empty">${ar ? "اختاري محادثة بعد قبول الحالة." : "A chat will appear here after case acceptance."}</div>`
                }
            </div>
        </div>
    `;
}

function renderChatWindow(caseId) {
    if (!canAccessChat(caseId)) {
        return `<div class="db-empty">Access denied</div>`;
    }

    const ar = selectedLanguage === "ar";
    const messages = getMessages().filter(m => m.caseId === caseId);

    return `
        <div class="db-chat-messages" id="chatMessages">
            ${messages.length ? messages.map(m => `
                <div class="db-message ${m.senderId === currentUser.id ? "mine" : ""}">
                    ${escapeHTML(m.text)}
                    <small>${formatDate(m.createdAt)}</small>
                </div>
            `).join("") : `
                <p class="db-muted">
                    ${ar ? "ابدئي المحادثة الآن." : "Start your conversation."}
                </p>
            `}
        </div>

        <form class="db-chat-form" id="chatForm" data-case-id="${escapeHTML(caseId)}">
            <input name="message" required maxlength="2000"
                placeholder="${ar ? "اكتبي رسالتك..." : "Type your message..."}">
            <button class="db-button primary" type="submit">
                ${ar ? "إرسال" : "Send"}
            </button>
        </form>
    `;
}

/* ---------- AUDIO PLAYER ---------- */

async function hydrateAudioPlayers(container) {
    const players = container.querySelectorAll("audio[data-audio-key]");

    for (const player of players) {
        try {
            const blob = await getVoice(player.dataset.audioKey);

            if (blob) {
                player.src = URL.createObjectURL(blob);
            }
        } catch (error) {
            console.error("Audio loading error:", error);
        }
    }
}

async function hydrateCaseImages(container) {
    for (const image of container.querySelectorAll("img[data-case-image-key]")) {
        try {
            const blob = await getCaseImage(image.dataset.caseImageKey);
            if (blob && image.isConnected) image.src = URL.createObjectURL(blob);
        } catch (error) {
            console.error("Case image loading error:", error);
        }
    }
}

function handleCaseImageChange(input) {
    const ar = selectedLanguage === "ar";
    const file = input.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
        input.value = "";
        showToast(ar ? "اختاري ملف صورة صالحًا." : "Please choose a valid image file.");
        return;
    }
    if (file.size > 8 * 1024 * 1024) {
        input.value = "";
        showToast(ar ? "حجم الصورة يجب ألا يتجاوز 8 ميجابايت." : "The photo must be 8 MB or smaller.");
        return;
    }

    selectedCaseImage = file;
    const preview = $("#caseImagePreview");
    const image = preview?.querySelector("img");
    if (image) {
        if (image.dataset.objectUrl) URL.revokeObjectURL(image.dataset.objectUrl);
        image.dataset.objectUrl = URL.createObjectURL(file);
        image.src = image.dataset.objectUrl;
        preview.hidden = false;
    }
}

function removeSelectedCaseImage() {
    selectedCaseImage = null;
    const input = $("#caseImageInput");
    const preview = $("#caseImagePreview");
    const image = preview?.querySelector("img");
    if (image?.dataset.objectUrl) URL.revokeObjectURL(image.dataset.objectUrl);
    if (image) { image.removeAttribute("src"); delete image.dataset.objectUrl; }
    if (input) input.value = "";
    if (preview) preview.hidden = true;
}

/* ---------- VOICE RECORDING ---------- */

async function startVoiceRecording() {
    const ar = selectedLanguage === "ar";

    if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
        showToast(ar
            ? "المتصفح لا يدعم تسجيل الصوت."
            : "Voice recording is not supported by this browser.");
        return;
    }

    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true
        });

        recordingChunks = [];
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = event => {
            if (event.data.size > 0) recordingChunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
            recordedVoiceBlob = new Blob(recordingChunks, {
                type: mediaRecorder.mimeType || "audio/webm"
            });

            const preview = $("#recordedAudioPreview");

            if (preview) {
                preview.src = URL.createObjectURL(recordedVoiceBlob);
                preview.hidden = false;
            }

            const status = $("#recordingStatus");
            if (status) {
                status.textContent = ar
                    ? "تم تسجيل الصوت بنجاح."
                    : "Voice recording completed.";
            }

            stream.getTracks().forEach(track => track.stop());

            const stopButton = $('[data-action="stop-recording"]');
            const startButton = $('[data-action="start-recording"]');

            if (stopButton) stopButton.disabled = true;
            if (startButton) startButton.disabled = false;
        };

        mediaRecorder.start();

        const status = $("#recordingStatus");
        if (status) {
            status.innerHTML = `<span class="db-recording">${ar ? "جاري التسجيل..." : "Recording..."}</span>`;
        }

        $('[data-action="start-recording"]').disabled = true;
        $('[data-action="stop-recording"]').disabled = false;

    } catch (error) {
        showToast(ar
            ? "يرجى السماح باستخدام الميكروفون."
            : "Please allow microphone access.");
    }
}

function stopVoiceRecording() {
    if (mediaRecorder && mediaRecorder.state === "recording") {
        mediaRecorder.stop();
    }
}

/* ---------- PUBLISH SUBMISSION ---------- */

async function submitNewCase(form) {
    const formData = new FormData(form);

    const patientName = String(formData.get("patientName") || "").trim();
    const age = String(formData.get("age") || "").trim();
    const governorate = String(formData.get("governorate") || "").trim();
    const department = String(formData.get("department") || "General Dentistry");
    const description = String(formData.get("description") || "").trim();
    const error = $("#caseSubmissionError");

    if (!patientName || !age || !governorate) {
        if (error) {
            error.textContent = dashboardText("Please enter your name, age and governorate.", "من فضلك اكتبي الاسم والعمر والمحافظة.");
            error.hidden = false;
        }
        return;
    }

    if (!description && !recordedVoiceBlob && !selectedCaseImage) {
        if (error) {
            error.textContent = dashboardText("Please write about the concern, record a voice message or add a photo.", "اكتبي عن المشكلة أو سجّلي رسالة صوتية أو أرفقي صورة؛ يكفي اختيار طريقة واحدة.");
            error.hidden = false;
        }
        return;
    }

    const caseId = makeId();
    let audioKey = null;
    let imageKey = null;

    if (recordedVoiceBlob) {
        audioKey = "voice-" + caseId;

        try {
            await saveVoice(recordedVoiceBlob, audioKey);
        } catch (error) {
            console.error(error);
            showToast(dashboardText(
                "The voice recording could not be saved.",
                "تعذر حفظ التسجيل الصوتي."
            ));
            return;
        }
    }

    if (selectedCaseImage) {
        imageKey = "case-image-" + caseId;
        try {
            await saveCaseImage(selectedCaseImage, imageKey);
        } catch (saveError) {
            console.error(saveError);
            if (audioKey) { try { await deleteVoice(audioKey); } catch {} }
            if (error) {
                error.textContent = dashboardText("The photo could not be saved. Please try another image.", "تعذر حفظ الصورة. جرّبي اختيار صورة أخرى.");
                error.hidden = false;
            }
            return;
        }
    }

    const generatedTitle = description
        ? description.slice(0, 72)
        : recordedVoiceBlob
            ? dashboardText("Voice-described dental concern", "شكوى أسنان مسجلة صوتيًا")
            : dashboardText("Dental concern with photo", "شكوى أسنان مرفقة بصورة");

    const newCase = {
        id: caseId,
        patientId: currentUser.id,
        patientName,
        age,
        governorate,
        title: generatedTitle,
        department,
        description: description || (recordedVoiceBlob
            ? dashboardText("Voice recording attached.", "تم إرفاق تسجيل صوتي للحالة.")
            : dashboardText("Reference photo attached.", "تم إرفاق صورة توضيحية للحالة.")),
        symptoms: description,
        details: "",
        audioKey,
        imageKey,
        status: "open",
        assignedStudentId: null,
        assignedStudentName: null,
        createdAt: new Date().toISOString()
    };

    const cases = getCases();
    cases.unshift(newCase);
    saveCases(cases);

    recordedVoiceBlob = null;
    selectedCaseImage = null;
    activeDashboardTab = "cases";

    showToast(dashboardText(
        "Your case has been published!",
        "تم نشر الحالة بنجاح!"
    ));

    renderDashboardPage();
}

/* ---------- REQUEST A CASE ---------- */

function requestCase(caseId) {
    if (!currentUser || currentUser.role !== "doctor") return;

    const cases = getCases();
    const dentalCase = cases.find(c => c.id === caseId);

    if (!dentalCase || dentalCase.status !== "open") {
        showToast(dashboardText(
            "This case is no longer available.",
            "الحالة لم تعد متاحة."
        ));
        renderDashboardPage();
        return;
    }

    if (dentalCase.patientId === currentUser.id) return;

    const requests = getRequests();

    const existing = requests.find(r =>
        r.caseId === caseId && r.studentId === currentUser.id
    );

    if (existing) {
        showToast(dashboardText(
            "You have already requested this case.",
            "لقد أرسلت طلبًا لهذه الحالة بالفعل."
        ));
        return;
    }

    requests.push({
        id: makeId(),
        caseId,
        studentId: currentUser.id,
        studentName: currentUser.name,
        patientId: dentalCase.patientId,
        status: "pending",
        createdAt: new Date().toISOString()
    });

    saveRequests(requests);

    showToast(dashboardText(
        "Your request has been sent to the patient.",
        "تم إرسال طلبك للمريض."
    ));

    renderDashboardPage();
}

/* ---------- ACCEPT / REJECT ---------- */

function acceptCaseRequest(requestId) {
    const requests = getRequests();
    const cases = getCases();

    const request = requests.find(r => r.id === requestId);

    if (!request || request.patientId !== currentUser.id) return;

    const dentalCase = cases.find(c => c.id === request.caseId);

    if (!dentalCase || dentalCase.status !== "open") {
        showToast(dashboardText(
            "This case has already been assigned.",
            "تم حجز هذه الحالة بالفعل."
        ));
        renderDashboardPage();
        return;
    }

    dentalCase.status = "assigned";
    dentalCase.assignedStudentId = request.studentId;
    dentalCase.assignedStudentName = request.studentName;
    dentalCase.assignedAt = new Date().toISOString();

    request.status = "accepted";

    requests.forEach(other => {
        if (
            other.caseId === dentalCase.id &&
            other.id !== request.id &&
            other.status === "pending"
        ) {
            other.status = "rejected";
            other.reason = "case_assigned";
        }
    });

    saveCases(cases);
    saveRequests(requests);

    activeChatCaseId = dentalCase.id;

    showToast(dashboardText(
        "Student accepted. Private chat is now available.",
        "تم قبول الطالب وفتح المحادثة الخاصة."
    ));

    activeDashboardTab = "messages";
    renderDashboardPage();
}

function rejectCaseRequest(requestId) {
    const requests = getRequests();

    const request = requests.find(r => r.id === requestId);

    if (!request || request.patientId !== currentUser.id) return;

    if (request.status !== "pending") return;

    request.status = "rejected";
    saveRequests(requests);

    showToast(dashboardText(
        "Request rejected.",
        "تم رفض الطلب."
    ));

    renderDashboardPage();
}

/* ---------- SEND MESSAGE ---------- */

function sendChatMessage(form) {
    const caseId = form.dataset.caseId;

    if (!canAccessChat(caseId)) {
        showToast(dashboardText(
            "You are not allowed to access this chat.",
            "غير مسموح لك بدخول هذه المحادثة."
        ));
        return;
    }

    const input = form.elements.message;
    const text = input.value.trim();

    if (!text) return;

    const messages = getMessages();

    messages.push({
        id: makeId(),
        caseId,
        senderId: currentUser.id,
        senderName: currentUser.name,
        text,
        createdAt: new Date().toISOString()
    });

    saveMessages(messages);

    activeChatCaseId = caseId;
    renderDashboardPage();

    const messageArea = $("#chatMessages");
    if (messageArea) {
        messageArea.scrollTop = messageArea.scrollHeight;
    }
}

/* ---------- DASHBOARD EVENT HANDLERS ---------- */

document.addEventListener("click", event => {
    const tabButton = event.target.closest("[data-tab]");

    if (tabButton && dashboardRoot?.contains(tabButton)) {
        navigateDashboardTab(tabButton.dataset.tab);
        return;
    }

    if (event.target.classList?.contains("db-confirm-backdrop")) {
        event.target.remove();
        return;
    }

    const button = event.target.closest("[data-action]");

    if (!button || !dashboardRoot?.contains(button)) return;

    const action = button.dataset.action;
    const id = button.dataset.id;

    switch (action) {
        case "logout":
            logoutAccount();
            break;

        case "language":
            applyLanguage(selectedLanguage === "en" ? "ar" : "en");
            showToast(dashboardText("Language updated.", "تم تغيير اللغة."));
            break;

        case "theme":
            applyTheme(selectedTheme === "light" ? "dark" : "light");
            showToast(dashboardText("Appearance updated.", "تم تغيير المظهر."));
            break;

        case "delete-case":
            openDeleteCaseDialog(id);
            break;

        case "close-delete-dialog":
            $(".db-confirm-backdrop")?.remove();
            break;

        case "confirm-delete-case":
            $(".db-confirm-backdrop")?.remove();
            deletePatientCase(id);
            break;

        case "request-case":
            requestCase(id);
            break;

        case "accept-request":
            acceptCaseRequest(id);
            break;

        case "reject-request":
            rejectCaseRequest(id);
            break;

        case "open-chat":
        case "select-chat":
            if (canAccessChat(id)) {
                activeChatCaseId = id;
                activeDashboardTab = "messages";
                renderDashboardPage();
            }
            break;

        case "start-recording":
            startVoiceRecording();
            break;

        case "stop-recording":
            stopVoiceRecording();
            break;

        case "delete-recording":
            recordedVoiceBlob = null;

            const preview = $("#recordedAudioPreview");
            const status = $("#recordingStatus");

            if (preview) {
                preview.pause();
                preview.removeAttribute("src");
                preview.hidden = true;
            }

            if (status) status.textContent = "";

            showToast(dashboardText(
                "Recording removed.",
                "تم حذف التسجيل."
            ));
            break;

        case "delete-case-image":
            removeSelectedCaseImage();
            showToast(dashboardText("Photo removed.", "تمت إزالة الصورة."));
            break;
    }
});

document.addEventListener("submit", event => {
    if (event.target.id === "publishCaseForm") {
        event.preventDefault();
        submitNewCase(event.target);
    }

    if (event.target.id === "chatForm") {
        event.preventDefault();
        sendChatMessage(event.target);
    }
});

document.addEventListener("change", event => {
    if (event.target.id === "caseImageInput") {
        handleCaseImageChange(event.target);
    }
});

document.addEventListener("input", event => {
    if (event.target.closest("#publishCaseForm")) {
        const error = $("#caseSubmissionError");
        if (error) error.hidden = true;
    }
});

/* ---------- REFRESH DASHBOARD DATA ---------- */

window.addEventListener("storage", event => {
    if (
        dashboardRoot &&
        [CASES_KEY, REQUESTS_KEY, MESSAGES_KEY].includes(event.key)
    ) {
        renderDashboardPage();
    }
});

