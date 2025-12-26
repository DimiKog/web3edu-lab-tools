// ---------------------------------
// Web3Edu shared theme loader
// ---------------------------------
(function loadWeb3EduTheme() {
    const existing = document.querySelector('link[data-web3edu-theme]');
    if (existing) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "../../shared/web3edu-theme.css";
    link.setAttribute("data-web3edu-theme", "true");
    document.head.appendChild(link);
})();

// ---------------------------------
// Crypto libraries loader (js-sha3 + noble-secp256k1)
// ---------------------------------
async function loadCryptoLibs() {
    if (!window.keccak256 && window.sha3_256) {
        window.keccak256 = window.sha3_256;
    }

    if (!window.keccak256) {
        throw new Error("Failed to load js-sha3.");
    }

    if (!window.nobleSecp256k1) {
        throw new Error("Failed to load noble-secp256k1.");
    }
}

const messageInput = document.getElementById("messageInput");
const privateKeyInput = document.getElementById("privateKeyInput");

const resultBox = document.getElementById("resultBox");
const hashOutput = document.getElementById("hashOutput");
const signatureOutput = document.getElementById("signatureOutput");
const addressOutput = document.getElementById("addressOutput");
const copyAllBtn = document.getElementById("copyAllBtn");

// Helpers
function hexToBytes(hex) {
    hex = hex.replace(/^0x/, "");
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < bytes.length; i++) {
        bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
    }
    return bytes;
}

function bytesToHex(bytes) {
    return "0x" + Array.from(bytes)
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}

// Core signing
async function updateSignature() {
    try {
        await loadCryptoLibs();

        const message = messageInput.value.trim();
        const privHex = privateKeyInput.value.trim();

        if (!message || !privHex) {
            return;
        }

        // 1️⃣ Hash message
        const keccak = window.keccak256 || window.sha3_256;
        if (!keccak) {
            throw new Error("Keccak hash function not available.");
        }
        const msgHashHex = keccak(message);
        const msgHashBytes = hexToBytes(msgHashHex);

        // 2️⃣ Sign hash
        if (!window.nobleSecp256k1) {
            throw new Error("secp256k1 library not loaded.");
        }
        const privKeyBytes = hexToBytes(privHex);
        const signature = window.nobleSecp256k1.signSync(
            msgHashBytes,
            privKeyBytes,
            { recovered: true }
        );

        const sigBytes = signature[0];
        const recovery = signature[1];

        // Display
        hashOutput.value = "0x" + msgHashHex;
        signatureOutput.value = bytesToHex(sigBytes) + " (v=" + recovery + ")";
        resultBox.classList.remove("hidden");

    } catch (err) {
        console.error(err);
    }
}

messageInput.addEventListener("input", updateSignature);
privateKeyInput.addEventListener("input", updateSignature);


// Copy helper
copyAllBtn.onclick = async () => {
    const text =
        `Message:
${messageInput.value}

Hash:
${hashOutput.value}

Signature:
${signatureOutput.value}`;

    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
        } else {
            const textarea = document.createElement("textarea");
            textarea.value = text;
            textarea.setAttribute("readonly", "");
            textarea.style.position = "absolute";
            textarea.style.left = "-9999px";
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
        }
    } catch (err) {
        console.error(err);
    }

    // Visual feedback
    copyAllBtn.classList.add("copied");
    copyAllBtn.innerText = "Copied!";

    setTimeout(() => {
        copyAllBtn.classList.remove("copied");
        copyAllBtn.innerText = "Copy All";
    }, 1200);
};
