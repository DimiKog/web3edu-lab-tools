/**
 * Web3Edu — Message Encryptor
 * Lab 02 Tool: Encrypted Messages
 *
 * 🎯 Educational Goal
 * Demonstrate end-to-end encryption using raw cryptography
 * derived from a deterministic identity (Key Generator).
 *
 * - Encryption happens OFF-CHAIN
 * - Keys are derived from a private key
 * - No wallet, no MetaMask, no blockchain
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
function showError(msg) {
    alert(msg);
}

function setResultVisible(visible) {
    resultBox.classList.toggle("hidden", !visible);
}

/* -----------------------------
   Helpers
----------------------------- */
function normalizeHex(input) {
    const trimmed = input.trim();
    return trimmed.startsWith("0x") ? trimmed.slice(2) : trimmed;
}

function hexToBytes(hex) {
    if (!hex || hex.length % 2 !== 0) {
        throw new Error("Invalid hex string.");
    }

    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < bytes.length; i += 1) {
        bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
    }
    return bytes;
}

function bytesToHex(bytes) {
    return Array.from(bytes, b => b.toString(16).padStart(2, "0")).join("");
}

function requireSecp256k1() {
    const secp = window.secp256k1 || window.nobleSecp256k1;
    if (!secp) {
        throw new Error("secp256k1 library not loaded.");
    }
    return secp;
}

/* -----------------------------
   Encryption (secp256k1 ECDH + NaCl secretbox)
----------------------------- */
function encryptMessage(receiverPublicKeyHex, message) {
    const secp = requireSecp256k1();
    const receiverBytes = hexToBytes(normalizeHex(receiverPublicKeyHex));

    try {
        secp.Point.fromHex(receiverBytes);
    } catch {
        throw new Error("Receiver public key is invalid.");
    }

    const messageBytes = nacl.util.decodeUTF8(message);
    const nonce = nacl.randomBytes(nacl.secretbox.nonceLength);
    const ephemPrivateKey = secp.utils.randomPrivateKey();
    const ephemPublicKey = secp.getPublicKey(ephemPrivateKey, false);
    const sharedSecret = secp.getSharedSecret(
        ephemPrivateKey,
        receiverBytes,
        true
    );
    const symmetricKey = nacl.hash(sharedSecret).slice(0, 32);
    const ciphertext = nacl.secretbox(messageBytes, nonce, symmetricKey);

    return {
        version: "secp256k1-xsalsa20-poly1305",
        nonce: nacl.util.encodeBase64(nonce),
        ephemPublicKey: "0x" + bytesToHex(ephemPublicKey),
        ciphertext: nacl.util.encodeBase64(ciphertext)
    };
}

/* -----------------------------
   Main action
----------------------------- */
encryptBtn.onclick = () => {
    setResultVisible(false);
    output.value = "";

    try {
        if (!receiverInput || !messageInput) {
            throw new Error("Missing required inputs on the page.");
        }

        if (!receiverInput.value.trim()) {
            throw new Error("Receiver public key cannot be empty");
        }

        if (!messageInput.value.trim()) {
            throw new Error("Message cannot be empty");
        }

        const encrypted = encryptMessage(receiverInput.value, messageInput.value);

        output.value = JSON.stringify(encrypted, null, 2);
        setResultVisible(true);
    } catch (err) {
        console.error(err);
        showError(err.message);
    }
};

/* -----------------------------
   Copy helper
----------------------------- */
copyBtn.onclick = async () => {
    if (!output.value) return;

    const original = copyBtn.innerText;
    try {
        await navigator.clipboard.writeText(output.value);
    } catch (err) {
        output.select();
        document.execCommand("copy");
    }

    copyBtn.innerText = "Copied ✓";
    setTimeout(() => (copyBtn.innerText = original), 1200);
};
