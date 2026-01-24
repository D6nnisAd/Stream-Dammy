import { auth, db, signInWithEmailAndPassword, onAuthStateChanged, signOut, doc, getDoc, setDoc } from "./firebase-init.js";

const loginOverlay = document.getElementById('loginOverlay');
const loginForm = document.getElementById('loginForm');
const settingsForm = document.getElementById('settingsForm');
const logoutBtn = document.getElementById('logoutBtn');
const saveBtn = document.getElementById('saveBtn');

// 1. Auth Listener
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        loginOverlay.style.display = 'none';
        loadSettings();
    } else {
        // User is signed out
        loginOverlay.style.display = 'flex';
    }
});

// 2. Login Logic
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        // Listener will handle UI switch
    } catch (error) {
        alert("Login failed: " + error.message);
    }
});

// 3. Logout Logic
logoutBtn.addEventListener('click', () => {
    signOut(auth);
});

// 4. Load Settings from Firestore
async function loadSettings() {
    try {
        const docRef = doc(db, "settings", "global");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            
            // Populate Fields
            document.getElementById('enablePaystack').checked = data.enablePaystack || false;
            document.getElementById('paystackKey').value = data.paystackPublicKey || '';
            document.getElementById('supportLink').value = data.supportLink || '';
            
            document.getElementById('bankName').value = data.bankName || '';
            document.getElementById('accountNumber').value = data.accountNumber || '';
            document.getElementById('accountName').value = data.accountName || '';
        }
    } catch (error) {
        console.error("Error loading settings:", error);
        alert("Failed to load settings.");
    }
}

// 5. Save Settings to Firestore
settingsForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // UI Feedback
    const originalText = saveBtn.innerHTML;
    saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
    saveBtn.disabled = true;

    const settingsData = {
        enablePaystack: document.getElementById('enablePaystack').checked,
        paystackPublicKey: document.getElementById('paystackKey').value,
        supportLink: document.getElementById('supportLink').value,
        bankName: document.getElementById('bankName').value,
        accountNumber: document.getElementById('accountNumber').value,
        accountName: document.getElementById('accountName').value,
    };

    try {
        await setDoc(doc(db, "settings", "global"), settingsData);
        alert("Settings saved successfully!");
    } catch (error) {
        console.error("Error saving settings:", error);
        alert("Failed to save: " + error.message);
    } finally {
        saveBtn.innerHTML = originalText;
        saveBtn.disabled = false;
    }
});