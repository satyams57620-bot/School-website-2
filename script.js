/**
 * GOPAL VIDYALAYA INTER COLLEGE - APPLICATION ENGINE MODULE
 * Operational Context: Production Architecture Configuration [2026]
 */

const CONFIG_REGISTRY = Object.freeze({
    intervals: { hero: 3000, courses: 4000 }
});

// --- GLOBAL MEMORY APP STATES STORE ---
let globalToppers10List = [];
let globalToppers12List = [];
let globalCoursesList = []; 
let globalTeachersList = [];

let globalSocialLinks = {
    instagram: "https://instagram.com",
    twitter: "https://x.com",
    telegram: "https://t.me",
    facebook: "https://facebook.com",
    whatsapp: "https://wa.me/919876543210"
};

let current10TopperBase64 = "";
let current12TopperBase64 = "";
let currentTeacherBase64FileStr = "";

let coursesTimerInterval = null;
let heroSliderInterval = null;
let currentCourseIndex = 0;
let currentHeroIndex = 0;

let activeToppersClassView = "10";

/**
 * Image Fallback Handler Engine
 */
function handleImageError(imgNode) {
    imgNode.onerror = null; 
    imgNode.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><rect width='100%' height='100%' fill='%23f0f3f0'/><path d='M50 20 C35 20 30 40 30 50 C30 65 40 75 50 75 C60 75 70 65 70 50 C70 40 65 20 50 20 Z' fill='%23a0b5a0'/><circle cx='50' cy='40' r='12' fill='%23ffffff'/></svg>";
}

/**
 * XSS String Anti-Injection Mask Sanitizer
 */
function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, tag => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    }[tag] || tag));
}

/**
 * Master App Bootstrap Initializer
 */
window.addEventListener('DOMContentLoaded', () => {
    seedInitialData();
    setupDOMEventBindings();
    
    // Core Rendering Initializations Arrays
    renderToppers10Display();
    renderToppers12Display();
    renderCoursesSlider();
    renderTeachersDisplayGrid();
    renderLiveSocialButtons(); 
    initHeroFullscreenSlider();
    initializeImageFallbackWatchers();
});

function initializeImageFallbackWatchers() {
    document.querySelectorAll('.image-fallback-node').forEach(img => {
        img.addEventListener('error', function() {
            handleImageError(this);
        });
    });
}

function seedInitialData() {
    globalToppers10List = [
        { name: "Satyam Singh", percentage: "98.4%", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&h=400&q=80" },
        { name: "Kriti Kumari", percentage: "96.8%", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&h=400&q=80" },
        { name: "Anand Shukla", percentage: "95.2%", image: "school.png" },
        { name: "Divya Mishra", percentage: "94.8%", image: "school.png" },
        { name: "Rajesh Yadav", percentage: "94.1%", image: "school.png" },
        { name: "Aditya Tiwari", percentage: "93.6%", image: "school.png" },
        { name: "Anjali Gupta", percentage: "92.8%", image: "school.png" },
        { name: "Neha Singh", percentage: "92.2%", image: "school.png" },
        { name: "Vikram Seth", percentage: "91.5%", image: "school.png" },
        { name: "Rohan Verma", percentage: "91.0%", image: "school.png" }
    ];

    globalToppers12List = [
        { name: "Rahul Sharma", percentage: "97.8%", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80" },
        { name: "Priya Patel", percentage: "96.2%", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=400&q=80" },
        { name: "Amit Tripathi", percentage: "95.0%", image: "school.png" },
        { name: "Sneha Mishra", percentage: "94.6%", image: "school.png" },
        { name: "Gaurav Singh", percentage: "93.8%", image: "school.png" },
        { name: "Pooja Joshi", percentage: "93.2%", image: "school.png" },
        { name: "Ravi Teja", percentage: "92.4%", image: "school.png" },
        { name: "Shweta Tiwari", percentage: "91.8%", image: "school.png" },
        { name: "Deepak Raj", percentage: "91.2%", image: "school.png" },
        { name: "Manish Kumar", percentage: "90.6%", image: "school.png" }
    ];

    globalCoursesList = [
        { quote: "LKG to 8", image: "school.jpg", desc: "Foundational primary modules covering English grammar, elementary analytics, moral and creative skill labs." },
        { quote: "09 and 10", image: "school1.webp", desc: "Core matriculation preparation paths focusing strictly on advanced board standards." },
        { quote: "11 and 12", image: "school2.webp", desc: "Senior intermediate pathways with specialized stream pipelines for PCM (Physics, Chemistry, Mathematics)." }
    ];

    globalTeachersList = [
        { name: "Mr. Satyam Singh", subject: "Physics", post: "PGT Lecturer", image: "school.png" },
        { name: "Anand Mishra", subject: "Mathematics", post: "TGT Instructor", image: "school.png" },
        { name: "R. K. Verma", subject: "Chemistry", post: "Senior Expert", image: "school.png" },
        { name: "S. P. Tripathi", subject: "English Literature", post: "HOD Language", image: "school.png" }
    ];
}

/**
 * Binds Uncoupled Inline Listeners cleanly inside the DOM Module
 */
function setupDOMEventBindings() {
    // Media Listeners & Base Inputs Base64 Pipelines
    document.getElementById('top10ImageFile').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if(file) {
            const reader = new FileReader();
            reader.onload = (ev) => { current10TopperBase64 = ev.target.result; };
            reader.readAsDataURL(file);
        }
    });

    document.getElementById('top12ImageFile').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if(file) {
            const reader = new FileReader();
            reader.onload = (ev) => { current12TopperBase64 = ev.target.result; };
            reader.readAsDataURL(file);
        }
    });

    document.getElementById('teachImageFile').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => { currentTeacherBase64FileStr = ev.target.result; };
            reader.readAsDataURL(file);
        }
    });

    // Form Processing Targets
    document.getElementById('adminAuthenticationForm').addEventListener('submit', (e) => navigateToPage('admin', e));
    document.getElementById('adminSocialLinksForm').addEventListener('submit', (e) => updateGlobalSocialLinks(e));
    document.getElementById('adminTeacherForm').addEventListener('submit', (e) => saveTeacherProfile(e));
    document.getElementById('admin10TopperForm').addEventListener('submit', (e) => saveTopper10(e));
    document.getElementById('admin12TopperForm').addEventListener('submit', (e) => saveTopper12(e));

    // Structural View Control Hooks
    document.getElementById('sidebarToggleAction').addEventListener('click', toggleSidebar);
    document.getElementById('sidebarCloseAction').addEventListener('click', toggleSidebar);
    document.getElementById('sidebarOverlay').addEventListener('click', toggleSidebar);
    
    document.getElementById('viewMore10thBtn').addEventListener('click', () => openToppersPage('10'));
    document.getElementById('viewMore12thBtn').addEventListener('click', () => openToppersPage('12'));
    document.getElementById('toppersReturnBtn').addEventListener('click', returnToMainFromToppers);
    document.getElementById('booksReturnHomeActionBtn').addEventListener('click', returnToMainFromBooks);
    document.getElementById('courseDetailsBackHomeBtn').addEventListener('click', returnToMainFromDetails);
    document.getElementById('adminTerminalExitActionBtn').addEventListener('click', logoutToMain);
    document.getElementById('cancelTeacherEditBtn').addEventListener('click', resetTeacherFormState);

    // Document Syllabus Event Capturing Bubble
    document.querySelectorAll('.dl-syllabus-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const subject = btn.getAttribute('data-subject');
            alert(`Downloading ${subject} syllabus details package.`);
        });
    });

    // Document Ebook Area Card Selector Iterators
    document.querySelectorAll('.book-grade-card').forEach(card => {
        card.addEventListener('click', () => {
            const targetGrade = card.getAttribute('data-grade');
            openEbookPage(targetGrade);
        });
    });
}

function renderToppers10Display() {
    const grid = document.getElementById('topper10MainContainer');
    if(!grid) return;
    grid.innerHTML = "";

    globalToppers10List.slice(0, 2).forEach((st, i) => {
        grid.innerHTML += `
            <div class="topper-modern-card">
                <div class="topper-badge-label">Rank ${i+1}</div>
                <div class="topper-avatar-frame">
                    <img src="${escapeHTML(st.image)}" class="image-fallback-node">
                </div>
                <div class="topper-details-panel">
                    <div class="topper-student-name">${escapeHTML(st.name)}</div>
                    <div class="topper-percentage-tag">${escapeHTML(st.percentage)}</div>
                </div>
            </div>`;
    });

    const tbody = document.getElementById('toppers10AdminTableBody');
    if(!tbody) return; tbody.innerHTML = "";
    globalToppers10List.forEach((st, i) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><img src="${escapeHTML(st.image)}" class="admin-table-row-avatar-img image-fallback-node"></td>
            <td><strong>${escapeHTML(st.name)}</strong></td>
            <td><span class="badge badge-green">${escapeHTML(st.percentage)}</span></td>
            <td>
                <button class="action-btn btn-edit edit-10-btn" data-index="${i}">Edit</button>
                <button class="action-btn btn-delete delete-10-btn" data-index="${i}">Delete</button>
            </td>`;
        
        tr.querySelector('.edit-10-btn').addEventListener('click', () => edit10Topper(i));
        tr.querySelector('.delete-10-btn').addEventListener('click', () => delete10Topper(i));
        tbody.appendChild(tr);
    });
    initializeImageFallbackWatchers();
}

function renderToppers12Display() {
    const grid = document.getElementById('topper12MainContainer');
    if(!grid) return;
    grid.innerHTML = "";

    globalToppers12List.slice(0, 2).forEach((st, i) => {
        grid.innerHTML += `
            <div class="topper-modern-card" style="border-color:#db1b1b;">
                <div class="topper-badge-label" style="background:#db1b1b;color:#fff;">Rank ${i+1}</div>
                <div class="topper-avatar-frame" style="border-bottom-color:#db1b1b;">
                    <img src="${escapeHTML(st.image)}" class="image-fallback-node">
                </div>
                <div class="topper-details-panel">
                    <div class="topper-student-name">${escapeHTML(st.name)}</div>
                    <div class="topper-percentage-tag" style="background:#db1b1b;">${escapeHTML(st.percentage)}</div>
                </div>
            </div>`;
    });

    const tbody = document.getElementById('toppers12AdminTableBody');
    if(!tbody) return; tbody.innerHTML = "";
    globalToppers12List.forEach((st, i) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><img src="${escapeHTML(st.image)}" class="admin-table-row-avatar-img image-fallback-node"></td>
            <td><strong>${escapeHTML(st.name)}</strong></td>
            <td><span class="badge badge-blue">${escapeHTML(st.percentage)}</span></td>
            <td>
                <button class="action-btn btn-edit edit-12-btn" data-index="${i}">Edit</button>
                <button class="action-btn btn-delete delete-12-btn" data-index="${i}">Delete</button>
            </td>`;
        
        tr.querySelector('.edit-12-btn').addEventListener('click', () => edit12Topper(i));
        tr.querySelector('.delete-12-btn').addEventListener('click', () => delete12Topper(i));
        tbody.appendChild(tr);
    });
    initializeImageFallbackWatchers();
}

function openToppersPage(classType) {
    activeToppersClassView = classType; 
    const mainHeading = document.getElementById('toppersPageMainHeading');
    const subTitle = document.getElementById('toppersSubPageTitle');
    const shelfContainer = document.getElementById('fullToppersShelfGridContainer');
    const returnBtn = document.getElementById('toppersReturnBtn');
    const banner = document.getElementById('topperPageBanner');
    
    shelfContainer.innerHTML = "";

    if (classType === '10') {
        mainHeading.textContent = "Class 10th Toppers Hall of Fame";
        subTitle.textContent = "High School Matriculation - Top 10 Student Registry";
        subTitle.style.color = "#034400";
        returnBtn.style.background = "#034400";
        banner.style.background = "linear-gradient(135deg, #034400 0%, #001f00 100%)";

        globalToppers10List.slice(0, 10).forEach((st, i) => {
            shelfContainer.innerHTML += `
                <div class="topper-modern-card">
                    <div class="topper-badge-label">Rank ${i+1}</div>
                    <div class="topper-avatar-frame">
                        <img src="${escapeHTML(st.image)}" class="image-fallback-node">
                    </div>
                    <div class="topper-details-panel">
                        <div class="topper-student-name">${escapeHTML(st.name)}</div>
                        <div class="topper-percentage-tag">${escapeHTML(st.percentage)}</div>
                    </div>
                </div>`;
        });
    } else {
        mainHeading.textContent = "Class 12th Board Stars Portal";
        subTitle.textContent = "Senior Intermediate Stream - Top 10 Academic Standouts";
        subTitle.style.color = "#db1b1b";
        returnBtn.style.background = "#db1b1b";
        banner.style.background = "linear-gradient(135deg, #db1b1b 0%, #610404 100%)";

        globalToppers12List.slice(0, 10).forEach((st, i) => {
            shelfContainer.innerHTML += `
                <div class="topper-modern-card" style="border-color:#db1b1b;">
                    <div class="topper-badge-label" style="background:#db1b1b;color:#fff;">Rank ${i+1}</div>
                    <div class="topper-avatar-frame" style="border-bottom-color:#db1b1b;">
                        <img src="${escapeHTML(st.image)}" class="image-fallback-node">
                    </div>
                    <div class="topper-details-panel">
                        <div class="topper-student-name">${escapeHTML(st.name)}</div>
                        <div class="topper-percentage-tag" style="background:#db1b1b;">${escapeHTML(st.percentage)}</div>
                    </div>
                </div>`;
        });
    }

    document.querySelectorAll('.page-view').forEach(view => view.classList.remove('active-view'));
    document.getElementById('toppersSeparatePage').classList.add('active-view');
    window.scrollTo(0, 0);
    initializeImageFallbackWatchers();
}

function returnToMainFromToppers() {
    document.querySelectorAll('.page-view').forEach(view => view.classList.remove('active-view'));
    document.getElementById('mainWebsitePage').classList.add('active-view');
    
    if (activeToppersClassView === '10') {
        document.getElementById('results-10th').scrollIntoView({ behavior: 'smooth' });
    } else {
        document.getElementById('results-12th').scrollIntoView({ behavior: 'smooth' });
    }
}

function openEbookPage(gradeTag) {
    document.getElementById('bookPageTitle').textContent = "Books Syllabus Library: Class " + gradeTag;
    const shelf = document.getElementById('digitalBookShelfContainer');
    shelf.innerHTML = "";
    
    let mockBooks = [];
    if(gradeTag.includes('LKG')) {
        mockBooks = ["English Alphabets Companion", "Primary Mathematics Magic", "Rhymes Harmony Book", "Drawing Sketchbook Vol 1"];
    } else if(gradeTag.includes('9')) {
        mockBooks = ["NCERT Mathematics Class 9", "Kshitij Hindi Part 1", "Science Core Standards", "Contemporary India History"];
    } else {
        mockBooks = ["NCERT Physics Part I & II", "Advanced Pure Mathematics", "Core Inorganic Chemistry", "English Flamingo & Vistas"];
    }

    mockBooks.forEach(book => {
        const itemNode = document.createElement('div');
        itemNode.className = "book-volume-item";
        itemNode.innerHTML = `
            <div class="book-cover-mock">${escapeHTML(book)}</div>
            <h4 style="font-size:14px;color:#002144;margin-bottom:5px;">${escapeHTML(book)}</h4>
            <p style="font-size:11px;color:#777;">Official NCERT Matrix Standard Publication</p>
            <button class="view-detail-action-btn read-book-action-trigger">Read Book</button>`;
        
        itemNode.querySelector('.read-book-action-trigger').style.cssText = "padding:4px 12px; font-size:11px; margin-top:10px;";
        itemNode.querySelector('.read-book-action-trigger').addEventListener('click', () => {
            alert('Downloading textbook resource stream payload successfully!');
        });
        shelf.appendChild(itemNode);
    });

    document.querySelectorAll('.page-view').forEach(v => v.classList.remove('active-view'));
    document.getElementById('bookDetailsSeparatePage').classList.add('active-view');
    window.scrollTo(0, 0);
}

function returnToMainFromBooks() {
    document.querySelectorAll('.page-view').forEach(v => v.classList.remove('active-view'));
    document.getElementById('mainWebsitePage').classList.add('active-view');
    document.getElementById('books-zone').scrollIntoView({ behavior: 'smooth' });
}

function saveTopper10(e) {
    e.preventDefault();
    const name = document.getElementById('top10Name').value.trim();
    const pct = document.getElementById('top10Percentage').value.trim();
    const index = document.getElementById('editing10TopperIndex').value;
    let finalPct = pct.includes('%') ? pct : pct + '%';

    if(index !== "") {
        globalToppers10List[index] = { name, percentage: finalPct, image: current10TopperBase64 || globalToppers10List[index].image };
    } else {
        globalToppers10List.push({ name, percentage: finalPct, image: current10TopperBase64 || "school.png" });
    }
    document.getElementById('admin10TopperForm').reset();
    document.getElementById('editing10TopperIndex').value = "";
    current10TopperBase64 = "";
    renderToppers10Display();
}

function edit10Topper(i) {
    document.getElementById('editing10TopperIndex').value = i;
    document.getElementById('top10Name').value = globalToppers10List[i].name;
    document.getElementById('top10Percentage').value = globalToppers10List[i].percentage;
    document.getElementById('topper10FormHeading').textContent = "✏️ Edit Class 10th Record File";
}

function delete10Topper(i) {
    if(confirm("Delete Class 10th record row?")) {
        globalToppers10List.splice(i,1); 
        renderToppers10Display();
    }
}

function saveTopper12(e) {
    e.preventDefault();
    const name = document.getElementById('top12Name').value.trim();
    const pct = document.getElementById('top12Percentage').value.trim();
    const index = document.getElementById('editing12TopperIndex').value;
    let finalPct = pct.includes('%') ? pct : pct + '%';

    if(index !== "") {
        globalToppers12List[index] = { name, percentage: finalPct, image: current12TopperBase64 || globalToppers12List[index].image };
    } else {
        globalToppers12List.push({ name, percentage: finalPct, image: current12TopperBase64 || "school.png" });
    }
    document.getElementById('admin12TopperForm').reset();
    document.getElementById('editing12TopperIndex').value = "";
    current12TopperBase64 = "";
    renderToppers12Display();
}

function edit12Topper(i) {
    document.getElementById('editing12TopperIndex').value = i;
    document.getElementById('top12Name').value = globalToppers12List[i].name;
    document.getElementById('top12Percentage').value = globalToppers12List[i].percentage;
    document.getElementById('topper12FormHeading').textContent = "✏️ Edit Class 12th Record File";
}

function delete12Topper(i) {
    if(confirm("Delete Class 12th record row?")) {
        globalToppers12List.splice(i,1); 
        renderToppers12Display();
    }
}

function saveTeacherProfile(event) {
    event.preventDefault();
    const nameVal = document.getElementById('teachName').value.trim();
    const subVal = document.getElementById('teachSubject').value.trim();
    const postVal = document.getElementById('teachPost').value.trim();
    const idxVal = document.getElementById('editingTeacherIndex').value;

    if (idxVal !== "") {
        let idx = parseInt(idxVal, 10);
        globalTeachersList[idx] = { name: nameVal, subject: subVal, post: postVal, image: currentTeacherBase64FileStr || globalTeachersList[idx].image };
    } else {
        globalTeachersList.push({ name: nameVal, subject: subVal, post: postVal, image: currentTeacherBase64FileStr || "school.png" });
    }
    resetTeacherFormState();
    renderTeachersDisplayGrid();
}

function resetTeacherFormState() {
    document.getElementById('editingTeacherIndex').value = "";
    document.getElementById('adminTeacherForm').reset();
    currentTeacherBase64FileStr = "";
    document.getElementById('teacherFormHeading').textContent = "👤 Admin Teachers Registry Manager";
    document.getElementById('teacherSubmitBtn').textContent = "Commit Teacher Profile";
    document.getElementById('cancelTeacherEditBtn').classList.add('hidden-node');
}

function renderTeachersDisplayGrid() {
    const gridContainer = document.getElementById('teacherMainGrid');
    if (!gridContainer) return; 
    gridContainer.innerHTML = "";

    globalTeachersList.forEach((data) => {
        gridContainer.innerHTML += `
            <div class="teacher-card">
                <img src="${escapeHTML(data.image)}" class="image-fallback-node">
                <div class="t-profile-name">${escapeHTML(data.name)}</div>
                <div class="t-profile-subject">${escapeHTML(data.subject)}</div>
                <div class="t-profile-post">${escapeHTML(data.post)}</div>
            </div>`;
    });

    const adminTbody = document.getElementById('teachersAdminTableBody');
    if (!adminTbody) return; adminTbody.innerHTML = "";
    globalTeachersList.forEach((data, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><img src="${escapeHTML(data.image)}" class="admin-table-row-faculty-avatar-img image-fallback-node"></td>
            <td><strong>${escapeHTML(data.name)}</strong></td>
            <td><span class="badge badge-blue">${escapeHTML(data.subject)}</span></td>
            <td style="color:#666;">${escapeHTML(data.post)}</td>
            <td>
                <button type="button" class="action-btn btn-edit teacher-edit-trigger">Edit</button>
            </td>`;
        
        tr.querySelector('.teacher-edit-trigger').addEventListener('click', () => editTeacherEntry(index));
        adminTbody.appendChild(tr);
    });
    initializeImageFallbackWatchers();
}

function editTeacherEntry(index) {
    const target = globalTeachersList[index];
    document.getElementById('editingTeacherIndex').value = index;
    document.getElementById('teachName').value = target.name;
    document.getElementById('teachSubject').value = target.subject;
    document.getElementById('teachPost').value = target.post;
    document.getElementById('teacherSubmitBtn').textContent = "Update Faculty";
    document.getElementById('cancelTeacherEditBtn').classList.remove('hidden-node');
}

function renderLiveSocialButtons() {
    const container = document.getElementById('liveSocialIconsContainer');
    if (!container) return; container.innerHTML = "";
    const vectors = {
        instagram: `<svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>`,
        twitter: `<svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
        facebook: `<svg viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
        whatsapp: `<svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.707 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`,
        telegram: `<svg viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.87 4.326-2.962-.924c-.643-.204-.658-.643.136-.953l11.57-4.46c.536-.2.1.303-.136.508z"/></svg>`
    };

    const platforms = [
        { key: "instagram", cls: "insta-color", title: "Instagram" },
        { key: "twitter", cls: "twitter-color", title: "Twitter / X" },
        { key: "telegram", cls: "telegram-color", title: "Telegram Channel" },
        { key: "facebook", cls: "fb-color", title: "Facebook Page" },
        { key: "whatsapp", cls: "wa-color", title: "WhatsApp" }
    ];

    platforms.forEach(p => {
        const urlValue = globalSocialLinks[p.key];
        if (urlValue && urlValue.trim() !== "") {
            const anchor = document.createElement('a');
            anchor.href = urlValue; anchor.target = "_blank";
            anchor.className = `social-link-icon-btn ${p.cls}`; anchor.title = p.title;
            anchor.innerHTML = vectors[p.key]; container.appendChild(anchor);
        }
    });
}

function updateGlobalSocialLinks(event) {
    event.preventDefault();
    globalSocialLinks.instagram = document.getElementById('inputInstaUrl').value.trim();
    globalSocialLinks.twitter = document.getElementById('inputTwitterUrl').value.trim();
    globalSocialLinks.telegram = document.getElementById('inputTelegramUrl').value.trim();
    globalSocialLinks.facebook = document.getElementById('inputFbUrl').value.trim();
    globalSocialLinks.whatsapp = document.getElementById('inputWaUrl').value.trim();
    document.getElementById('socialUpdateFeedback').textContent = "Social media URLs updated live successfully!";
    renderLiveSocialButtons();
}

function populateSocialFormFieldsOnDashboard() {
    if(!document.getElementById('inputInstaUrl')) return;
    document.getElementById('inputInstaUrl').value = globalSocialLinks.instagram;
    document.getElementById('inputTwitterUrl').value = globalSocialLinks.twitter;
    document.getElementById('inputTelegramUrl').value = globalSocialLinks.telegram;
    document.getElementById('inputFbUrl').value = globalSocialLinks.facebook;
    document.getElementById('inputWaUrl').value = globalSocialLinks.whatsapp;
}

function initHeroFullscreenSlider() {
    if(heroSliderInterval) clearInterval(heroSliderInterval);
    const
