/**
 * Web3Edu — Message Encryptor
 * Lab 02 Tool: Encrypted Messages
 *
 * 🎯 Educational Goal
 * This tool demonstrates how end‑to‑end encryption works in Web3 using
 * wallet‑based cryptographic identities (MetaMask).
 *
 * Students should understand that:
 * - Encryption happens OFF‑CHAIN
 * - Wallets hold cryptographic keys, not usernames/passwords
 * - The blockchain is NOT involved in message confidentiality
 *
 * 🧩 What happens step‑by‑step:
 * 1. We ask MetaMask for the receiver’s encryption public key
 * 2. We encrypt the message locally in the browser
 * 3. We output a structured payload (JSON)
 * 4. Only the receiver’s wallet can decrypt this payload
 *
 * ⚠️ Important notes:
 * - Requires MetaMask
 * - Uses MetaMask-compatible NaCl (libsodium) cryptography
 * - No smart contracts
 * - No blockchain transactions
 */

/* -----------------------------
   DOM references
----------------------------- */
const encryptBtn = document.getElementById("encryptBtn");
const receiverInput = document.getElementById("receiverAddress");
const messageInput = document.getElementById("plainMessage");
const resultBox = document.getElementById("result");
const output = document.getElementById("encryptedOutput");
const copyBtn = document.getElementById("copyBtn");

/* -----------------------------
   Helpers
----------------------------- */
function isHexAddress(value) {
    return typeof value === "string" && /^0x[a-fA-F0-9]{40}$/.test(value.trim());
}

function showError(msg) {
    alert(msg);
}

function setResultVisible(visible) {
    resultBox.classList.toggle("hidden", !visible);
}

/* -----------------------------
   Core encryption logic
----------------------------- */
/**
 * Encrypt a message for a specific wallet (receiver).
 *
 * This uses public‑key encryption (NaCl box):
 * - The receiver’s PUBLIC key is used to encrypt
 * - The receiver’s PRIVATE key (inside MetaMask) is required to decrypt
 *
 * The output is NOT just ciphertext.
 * It is a structured payload containing:
 * - version
 * - nonce
 * - ephemeral public key
 * - ciphertext
 *
 * All fields are REQUIRED for decryption.
 */
function encryptMessage(encryptionPublicKey, message) {
    if (!window.nacl) {
        throw new Error("NaCl library not loaded.");
    }

    // MetaMask provides the public key as base64 — convert to Uint8Array
    const pubKeyUint8 = nacl.util.decodeBase64(encryptionPublicKey);
    const messageUint8 = nacl.util.decodeUTF8(message);

    // Create a one‑time (ephemeral) key pair for this message
    const ephemeralKeyPair = nacl.box.keyPair();
    // Nonce ensures the same message encrypts differently every time
    const nonce = nacl.randomBytes(nacl.box.nonceLength);

    const encryptedMessage = nacl.box(
        messageUint8,
        nonce,
        pubKeyUint8,
        ephemeralKeyPair.secretKey
    );

    // This full payload must be sent to the receiver
    return {
        version: "x25519-xsalsa20-poly1305",
        nonce: nacl.util.encodeBase64(nonce),
        ephemPublicKey: nacl.util.encodeBase64(ephemeralKeyPair.publicKey),
        ciphertext: nacl.util.encodeBase64(encryptedMessage),
    };
}

// Ask MetaMask for the receiver’s encryption public key (wallet‑level identity)
/**
 * Request the receiver's encryption public key from MetaMask.
 *
 * NOTE (important for teaching):
 * MetaMask only exposes encryption public keys
 * for accounts that exist in the *current wallet*.
 *
 * ⚠️ MetaMask notice:
 * eth_getEncryptionPublicKey is marked as deprecated, but still supported.
 * It is REQUIRED for educational encrypted messaging demos.
 * There is currently no alternative RPC for browser-based wallet encryption.
 */
async function getReceiverEncryptionPublicKey(receiverAddress) {
    try {
        return await window.ethereum.request({
            method: "eth_getEncryptionPublicKey",
            params: [receiverAddress],
        });
    } catch (err) {
        const msg = String(err?.message || "").toLowerCase();

        if (msg.includes("unauthorized") || msg.includes("unknown account")) {
            throw new Error(
                "MetaMask can only provide encryption keys for accounts inside YOUR wallet.\n\nTip: switch to the receiver account in MetaMask."
            );
        }

        if (msg.includes("deprecated")) {
            throw new Error(
                "MetaMask warned that this method is deprecated.\n" +
                "The demo still works, but future wallet versions may change behavior."
            );
        }

        if (msg.includes("rejected")) {
            throw new Error("Request rejected in MetaMask.");
        }

        throw err;
    }
}

/* -----------------------------
   Teacher mode (?teacher=1)
----------------------------- */
const isTeacherMode = new URLSearchParams(window.location.search).get("teacher") === "1";
let teacherRawBox = null;

function ensureTeacherPanel(rawPayload) {
    if (!isTeacherMode || teacherRawBox) return;

    teacherRawBox = document.createElement("textarea");
    teacherRawBox.rows = 6;
    teacherRawBox.readOnly = true;
    teacherRawBox.style.marginTop = "12px";

    resultBox.appendChild(teacherRawBox);
    teacherRawBox.value = JSON.stringify(rawPayload, null, 2);
}

/* -----------------------------
   Main action
----------------------------- */
encryptBtn.onclick = async () => {
    const receiver = receiverInput.value.trim();
    const message = messageInput.value.trim();

    setResultVisible(false);
    output.value = "";

    if (!window.ethereum) {
        showError("MetaMask not detected.");
        return;
    }

    if (!isHexAddress(receiver)) {
        showError("Invalid receiver address.");
        return;
    }

    if (!message) {
        showError("Message cannot be empty.");
        return;
    }

    // Ensure MetaMask is unlocked and accessible
    try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
    } catch {
        // continue anyway
    }

    try {
        const publicKey = await getReceiverEncryptionPublicKey(receiver);
        // Encrypt locally — nothing is sent to the blockchain
        const encrypted = encryptMessage(publicKey, message);

        // Show the full encrypted payload (copy & send to receiver)
        output.value = JSON.stringify(encrypted, null, 2);
        setResultVisible(true);

        ensureTeacherPanel(encrypted);
    } catch (err) {
        console.error(err);
        showError(err.message || "Encryption failed.");
    }
};

/**
 * Copy encrypted payload to clipboard.
 * Students should share the FULL payload with the receiver.
 */
copyBtn.onclick = async () => {
    if (!output.value) return;

    const originalText = copyBtn.innerText;

    try {
        await navigator.clipboard.writeText(output.value);
    } catch {
        output.select();
        document.execCommand("copy");
    }

    // ✅ Visual feedback for students
    copyBtn.innerText = "Copied ✓";
    copyBtn.disabled = true;

    setTimeout(() => {
        copyBtn.innerText = originalText;
        copyBtn.disabled = false;
    }, 1500);

};