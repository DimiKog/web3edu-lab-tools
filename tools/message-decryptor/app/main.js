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
   Core decryption logic
----------------------------- */
async function decryptMessage(encryptedPayload) {
    if (!window.ethereum) {
        throw new Error("MetaMask not detected.");
    }

    // MetaMask expects the payload as a STRING, not an object
    const payloadString =
        typeof encryptedPayload === "string"
            ? encryptedPayload
            : JSON.stringify(encryptedPayload);

    const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
    });

    return await window.ethereum.request({
        method: "eth_decrypt",
        params: [payloadString, accounts[0]],
    });
}

/* -----------------------------
   Main action
----------------------------- */
decryptBtn.onclick = async () => {
    setResultVisible(false);
    output.value = "";

    let payload;

    try {
        payload = JSON.parse(payloadInput.value);
    } catch {
        showError("Invalid JSON payload.");
        return;
    }

    try {
        const decrypted = await decryptMessage(payload);
        output.value = decrypted;
        setResultVisible(true);
    } catch (err) {
        console.error(err);
        showError(
            "Decryption failed.\n\n" +
            "Make sure you are logged into the receiver account in MetaMask."
        );
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