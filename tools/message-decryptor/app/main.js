/****
 * Web3Edu — Message Decryptor
 * Lab 02 Tool: Decrypt messages encrypted for your wallet.
 *
 * IMPORTANT:
 * - Requires MetaMask
 * - Uses wallet-native private key decryption
 * - No blockchain, no gas, no contracts
 */

/* -----------------------------
   DOM references
----------------------------- */
const decryptBtn = document.getElementById("decryptBtn");
const privateKeyInput = document.getElementById("privateKeyInput");
const payloadInput = document.getElementById("encryptedPayload");
const resultBox = document.getElementById("result");
const output = document.getElementById("decryptedOutput");
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

function requireSecp256k1() {
    const secp = window.secp256k1 || window.nobleSecp256k1;
    if (!secp) {
        throw new Error("secp256k1 library not loaded.");
    }
    return secp;
}

/* -----------------------------
   Core decryption logic
----------------------------- */
function decryptMessage(encryptedPayload, privateKeyHex) {
    const secp = requireSecp256k1();
    const privateKeyBytes = hexToBytes(normalizeHex(privateKeyHex));
    const ephemPublicKey = hexToBytes(
        normalizeHex(encryptedPayload.ephemPublicKey)
    );
    const sharedSecret = secp.getSharedSecret(
        privateKeyBytes,
        ephemPublicKey,
        true
    );
    const symmetricKey = nacl.hash(sharedSecret).slice(0, 32);
    const nonce = nacl.util.decodeBase64(encryptedPayload.nonce);
    const ciphertext = nacl.util.decodeBase64(encryptedPayload.ciphertext);
    const messageBytes = nacl.secretbox.open(ciphertext, nonce, symmetricKey);

    if (!messageBytes) {
        throw new Error("Decryption failed.");
    }

    return nacl.util.encodeUTF8(messageBytes);
}

/* -----------------------------
   Main action
----------------------------- */
decryptBtn.onclick = async () => {
    setResultVisible(false);
    output.value = "";

    let payload;
    let privateKey;

    if (!privateKeyInput || !payloadInput) {
        showError("Missing required inputs on the page.");
        return;
    }

    privateKey = privateKeyInput.value.trim();
    if (!privateKey) {
        showError("Private key cannot be empty.");
        return;
    }

    try {
        payload = JSON.parse(payloadInput.value);
    } catch {
        showError("Invalid JSON payload.");
        return;
    }

    if (!payload || !payload.ephemPublicKey || !payload.nonce || !payload.ciphertext) {
        showError("Encrypted payload is missing required fields.");
        return;
    }

    try {
        const decrypted = decryptMessage(payload, privateKey);
        output.value = decrypted;
        setResultVisible(true);
    } catch (err) {
        console.error(err);
        showError("Decryption failed. Check the private key and payload.");
    }
};

/* -----------------------------
   Copy helper
----------------------------- */
copyBtn.onclick = async () => {
    if (!output.value) return;

    try {
        await navigator.clipboard.writeText(output.value);
        copyBtn.innerText = "Copied!";
        setTimeout(() => (copyBtn.innerText = "Copy"), 1500);
    } catch {
        output.select();
        document.execCommand("copy");
    }
};
