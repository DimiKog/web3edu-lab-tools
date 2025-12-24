/**
 * Web3Edu — Key Generator
 * Tool for Lab 02: Encrypted Messages
 *
 * 🎓 Educational purpose:
 * Show how Web3 identity is born from cryptography alone.
 *
 * We demonstrate:
 * 1. Text → hash
 * 2. Hash → private key
 * 3. Private key → public key
 * 4. Public key → Ethereum address
 *
 * ⚠️ IMPORTANT:
 * - Deterministic
 * - NOT secure for real funds
 * - For learning only
 */

/* -----------------------------
   DOM references
----------------------------- */
const seedInput = document.getElementById("seedInput");

const resultBox = document.getElementById("result");
const privateKeyOutput = document.getElementById("privateKeyOutput");
const publicKeyOutput = document.getElementById("publicKeyOutput");
const addressOutput = document.getElementById("addressOutput");
const copyBtn = document.getElementById("copyBtn");
const copyPublicBtn = document.getElementById("copyPublicBtn");
const qrBtn = document.getElementById("qrBtn");
const qrContainer = document.getElementById("qrContainer");
const addressIdenticon = document.getElementById("addressIdenticon");

/* -----------------------------
   Helpers
----------------------------- */
function showResult(visible) {
    resultBox.classList.toggle("hidden", !visible);
}

function clearQr() {
    if (!qrContainer) return;
    qrContainer.innerHTML = "";
    qrContainer.classList.add("hidden");
}

function renderIdenticon(seed) {
    if (!addressIdenticon || !window.blockies) return;
    addressIdenticon.innerHTML = "";

    const canvas = window.blockies.create({
        seed: seed.toLowerCase(),
        size: 8,
        scale: 6
    });

    addressIdenticon.appendChild(canvas);
}

function flashButtonText(button, text) {
    const original = button.innerText;
    button.innerText = text;
    setTimeout(() => (button.innerText = original), 1500);
}

function clearOutputs() {
    privateKeyOutput.value = "";
    publicKeyOutput.value = "";
    addressOutput.value = "";
    clearQr();
    if (addressIdenticon) {
        addressIdenticon.innerHTML = "";
    }
}

function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(text);
    }

    const temp = document.createElement("textarea");
    temp.value = text;
    temp.setAttribute("readonly", "");
    temp.style.position = "absolute";
    temp.style.left = "-9999px";
    document.body.appendChild(temp);
    temp.select();

    const ok = document.execCommand("copy");
    document.body.removeChild(temp);

    return ok ? Promise.resolve() : Promise.reject();
}

/**
 * Convert ArrayBuffer → hex string
 */
function bufferToHex(buffer) {
    return [...new Uint8Array(buffer)]
        .map(b => b.toString(16).padStart(2, "0"))
        .join("");
}

/**
 * Convert hex string → Uint8Array
 */
function hexToBytes(hex) {
    const bytes = [];
    for (let i = 0; i < hex.length; i += 2) {
        bytes.push(parseInt(hex.slice(i, i + 2), 16));
    }
    return new Uint8Array(bytes);
}

/* -----------------------------
   Core cryptographic logic
----------------------------- */

/**
 * Step 1 — Derive a private key from text (deterministic)
 *
 * We hash the input using keccak256 (Ethereum-style).
 * Result: 32-byte hex string (private key).
 */
function derivePrivateKeyFromText(text) {
    if (!window.keccak256) {
        throw new Error("keccak256 library not loaded.");
    }

    // keccak256(text) → hex string (no 0x)
    const hashHex = window.keccak256(text);

    // Ensure 32 bytes (64 hex chars)
    return hashHex.slice(0, 64);
}

/**
 * Step 2 — Derive public key using secp256k1
 */
function derivePublicKey(privateKeyHex) {
    const secp = window.secp256k1 || window.nobleSecp256k1;

    if (!secp) {
        throw new Error("secp256k1 library not loaded.");
    }

    const cleanHex = privateKeyHex.startsWith("0x")
        ? privateKeyHex.slice(2)
        : privateKeyHex;

    const privKeyBytes = hexToBytes(cleanHex);

    // false → uncompressed public key (0x04 + X + Y)
    const pubKeyBytes = secp.getPublicKey(privKeyBytes, false);

    return bufferToHex(pubKeyBytes);
}

/**
 * Step 3 — Derive Ethereum address
 *
 * Ethereum address = last 20 bytes of:
 * keccak256(publicKey without 0x04 prefix)
 */
function deriveEthereumAddress(publicKeyHex) {
    if (!window.keccak256) {
        throw new Error("keccak256 library not loaded.");
    }

    const cleanHex = publicKeyHex.startsWith("0x")
        ? publicKeyHex.slice(2)
        : publicKeyHex;

    const publicKeyBytes = hexToBytes(cleanHex);

    // Drop 0x04 prefix
    const keyWithoutPrefix = publicKeyBytes.slice(1);

    // keccak256 expects bytes → convert to hex string
    const hashHex = window.keccak256(keyWithoutPrefix);

    // Take last 20 bytes (40 hex chars)
    return "0x" + hashHex.slice(-40);
}

/* -----------------------------
   Main action
----------------------------- */
function generateFromSeed(seed) {
    try {
        // Step 1
        const privateKey = derivePrivateKeyFromText(seed);

        // Step 2
        const publicKey = derivePublicKey(privateKey);

        // Step 3
        const address = deriveEthereumAddress(publicKey);

        // Display results
        privateKeyOutput.value = "0x" + privateKey;
        publicKeyOutput.value = "0x" + publicKey;
        addressOutput.value = address;

        showResult(true);
        clearQr();
        renderIdenticon(address);

    } catch (err) {
        console.error(err);
        showResult(false);
        clearOutputs();
    }
};

let seedDebounce;
seedInput.addEventListener("input", () => {
    const seed = seedInput.value.trim();
    if (!seed) {
        showResult(false);
        clearOutputs();
        return;
    }

    clearTimeout(seedDebounce);
    seedDebounce = setTimeout(() => {
        generateFromSeed(seed);
    }, 250);
});

/* -----------------------------
   Copy helper
----------------------------- */
copyBtn.onclick = async () => {
    const text =
        `Private Key:\n${privateKeyOutput.value}\n\n` +
        `Public Key:\n${publicKeyOutput.value}\n\n` +
        `Address:\n${addressOutput.value}`;

    try {
        await copyText(text);
        flashButtonText(copyBtn, "Copied ✓");
    } catch {
        alert("Copy failed.");
    }
};

copyPublicBtn.onclick = async () => {
    const publicKey = publicKeyOutput.value.trim();
    if (!publicKey) {
        alert("Generate keys first.");
        return;
    }

    try {
        await copyText(publicKey);
        flashButtonText(copyPublicBtn, "Copied ✓");
    } catch {
        alert("Copy failed.");
    }
};

qrBtn.onclick = () => {
    const address = addressOutput.value.trim();
    if (!address) {
        alert("Generate keys first.");
        return;
    }

    if (!window.QRCode) {
        alert("QR library not loaded.");
        return;
    }

    clearQr();
    qrContainer.classList.remove("hidden");

    new window.QRCode(qrContainer, {
        text: address,
        width: 180,
        height: 180,
        colorDark: "#111111",
        colorLight: "#ffffff",
        correctLevel: window.QRCode.CorrectLevel.M
    });
};
