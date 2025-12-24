# 🔑 Key Generator — Cryptographic Identity (Lab 02)

Part of **Web3Edu Labs — Lab 02: Encrypted Messages**

---

## 🎯 Purpose of this Tool

Before we encrypt messages, we must answer a fundamental question:

> **Where do public keys come from?**

This tool introduces **cryptographic identity** in Web3 by showing how:

- a **private key** is created
- a **public key** is derived from it
- an **address** is derived from the public key

All steps are **deterministic**, **transparent**, and **educational**.

---

## 🧠 What Students Will Learn

By using this tool, you will understand that:

- A **private key** is just a number
- A **public key** is mathematically derived from the private key
- An **address** is derived from the public key
- Whoever controls the private key controls the identity
- Wallets (e.g. MetaMask) are **key managers**, not magic systems

---

## 🧩 How It Works (Conceptually)

1. You provide an **input text** (e.g. a name or passphrase)
2. The input is hashed using **keccak256** (Ethereum-style)
3. The hash is interpreted as a **private key** which is a 256-bit number, compatible with Ethereum’s secp256k1 curve.
4. From the private key we derive:
   - the **public key**
   - the **Ethereum‑style address**

🧪 Educational note:
Using text → hash → key allows you to reproduce identities easily.
This is NOT how real wallets generate keys, but it helps you understand the mathematics
without relying on hidden randomness.

⚠️ This process is **deterministic**:
- The same input always produces the same keys
- This is intentional for learning purposes

---

## 🛠️ Tool Flow

### Input
```
Any text string
(e.g. "alice", "student1", "my lab identity")
```

### Output
```json
{
  "input": "alice",
  "privateKey": "0x…",
  "publicKey": "0x…",
  "address": "0x…"
}
```

Outputs are displayed in the UI, with quick-copy buttons for the **public key** and **all fields**.
You can also generate a **QR code** and an **identicon** for the address.

You will use the **public key** in the **Message Encryptor** tool. Encryption requires a public key, not an address — the address is only an identifier.

Note: In real applications, addresses are often used to look up public keys,
but for learning purposes we work with public keys directly.

---

## 📦 Libraries Used

- `@noble/secp256k1` (public key derivation)
- `js-sha3` (keccak256)
- `qrcodejs` (QR code generation)
- `ethereum-blockies` (identicon)

---

## 🔗 Relation to Lab 02 Tools

This tool is the **starting point** of Lab 02:

1. 🔑 **Key Generator** → generate keys
2. 🔐 **Message Encryptor** → encrypt for a public key
3. 🔓 **Message Decryptor** → decrypt using the private key

Only after this pipeline works do we introduce wallets.

---

## ❌ What This Tool Is Not

- It is NOT a wallet
- It does NOT store keys securely
- It does NOT replace MetaMask or hardware wallets
- It does NOT use blockchain accounts

---

## ⚠️ Important Safety Notice

> **This is a learning tool only.**

- Never use these keys for real funds
- Never reuse these keys outside the lab
- Wallets use secure randomness — this tool does not

---

## 🚀 Next Step

Proceed to the **Key Generator UI** to generate your identity and continue to message encryption.

---

# 🔑 Δημιουργός Κλειδιών — Κρυπτογραφική Ταυτότητα (Lab 02)

Μέρος του **Web3Edu Labs — Lab 02: Κρυπτογραφημένα Μηνύματα**

---

## 🎯 Σκοπός του Εργαλείου

Πριν κρυπτογραφήσουμε μηνύματα, πρέπει να απαντήσουμε σε ένα θεμελιώδες ερώτημα:

> **Από πού προέρχονται τα δημόσια κλειδιά;**

Αυτό το εργαλείο εισάγει την **κρυπτογραφική ταυτότητα** στο Web3 δείχνοντας πώς:

- δημιουργείται ένα **ιδιωτικό κλειδί**
- παράγεται ένα **δημόσιο κλειδί** από αυτό
- παράγεται μια **διεύθυνση** από το δημόσιο κλειδί

Όλα τα βήματα είναι **ντετερμινιστικά**, **διαφανή** και **εκπαιδευτικά**.

---

## 🧠 Τι Θα Μάθουν οι Φοιτητές

Χρησιμοποιώντας αυτό το εργαλείο, θα καταλάβετε ότι:

- Ένα **ιδιωτικό κλειδί** είναι απλώς ένας αριθμός
- Ένα **δημόσιο κλειδί** παράγεται μαθηματικά από το ιδιωτικό κλειδί
- Μια **διεύθυνση** παράγεται από το δημόσιο κλειδί
- Όποιος ελέγχει το ιδιωτικό κλειδί ελέγχει την ταυτότητα
- Τα wallets (π.χ. MetaMask) είναι **διαχειριστές κλειδιών**, όχι μαγικά συστήματα

---

## 🧩 Πώς Λειτουργεί (Εννοιολογικά)

1. Δίνετε ένα **κείμενο εισόδου** (π.χ. ένα όνομα ή μια φράση)
2. Η είσοδος κατακερματίζεται με **keccak256** (τύπου Ethereum)
3. Το hash ερμηνεύεται ως **ιδιωτικό κλειδί** που είναι ένας αριθμός 256-bit, συμβατός με την καμπύλη secp256k1 του Ethereum
4. Από το ιδιωτικό κλειδί παράγονται:
   - το **δημόσιο κλειδί**
   - η **διεύθυνση τύπου Ethereum**

🧪 Εκπαιδευτική σημείωση:
Η χρήση κειμένου → hash → κλειδί επιτρέπει την εύκολη αναπαραγωγή ταυτοτήτων.
Αυτό ΔΕΝ είναι ο τρόπος που λειτουργούν τα πραγματικά wallets,
αλλά βοηθά στην κατανόηση των μαθηματικών χωρίς «κρυφή» τυχαιότητα.

⚠️ Αυτή η διαδικασία είναι **ντετερμινιστική**:
- Η ίδια είσοδος παράγει πάντα τα ίδια κλειδιά
- Αυτό είναι σκόπιμο για εκπαιδευτικούς λόγους

---

## 🛠️ Ροή Εργαλείου

### Είσοδος
```
Οποιοδήποτε κείμενο
(π.χ. "alice", "student1", "my lab identity")
```

### Έξοδος
```json
{
  "input": "alice",
  "privateKey": "0x…",
  "publicKey": "0x…",
  "address": "0x…"
}
```

Τα αποτελέσματα εμφανίζονται στο UI, με κουμπιά αντιγραφής για το **δημόσιο κλειδί** και **όλα τα πεδία**.
Μπορείτε επίσης να δημιουργήσετε **QR code** και **identicon** για τη διεύθυνση.

Θα χρησιμοποιήσετε το **δημόσιο κλειδί** στο εργαλείο **Message Encryptor**. Η κρυπτογράφηση απαιτεί δημόσιο κλειδί, όχι διεύθυνση — η διεύθυνση είναι μόνο αναγνωριστικό.

Σημείωση: Στα πραγματικά συστήματα χρησιμοποιούνται συνήθως διευθύνσεις
για την εύρεση δημόσιων κλειδιών, αλλά για εκπαιδευτικούς λόγους
δουλεύουμε απευθείας με δημόσια κλειδιά.

---

## 📦 Βιβλιοθήκες που Χρησιμοποιούνται

- `@noble/secp256k1` (παραγωγή δημόσιου κλειδιού)
- `js-sha3` (keccak256)
- `qrcodejs` (δημιουργία QR code)
- `ethereum-blockies` (identicon)

---

## 🔗 Σχέση με τα Εργαλεία του Lab 02

Αυτό το εργαλείο είναι το **σημείο εκκίνησης** του Lab 02:

1. 🔑 **Δημιουργός Κλειδιών** → δημιουργία κλειδιών
2. 🔐 **Κρυπτογράφος Μηνυμάτων** → κρυπτογράφηση για ένα δημόσιο κλειδί
3. 🔓 **Αποκρυπτογράφος Μηνυμάτων** → αποκρυπτογράφηση με το ιδιωτικό κλειδί

Μόνο αφού λειτουργήσει αυτή η αλυσίδα, εισάγουμε τα wallets.

---

## ❌ Τι ΔΕΝ Είναι Αυτό το Εργαλείο

- ΔΕΝ είναι wallet
- ΔΕΝ αποθηκεύει κλειδιά με ασφάλεια
- ΔΕΝ αντικαθιστά το MetaMask ή hardware wallets
- ΔΕΝ χρησιμοποιεί λογαριασμούς blockchain

---

## ⚠️ Σημαντική Σημείωση Ασφαλείας

> **Αυτό είναι μόνο ένα εργαλείο μάθησης.**

- Ποτέ μην χρησιμοποιείτε αυτά τα κλειδιά για πραγματικά κεφάλαια
- Ποτέ μην επαναχρησιμοποιείτε αυτά τα κλειδιά εκτός του εργαστηρίου
- Τα wallets χρησιμοποιούν ασφαλή τυχαιότητα — αυτό το εργαλείο όχι

---

## 🚀 Επόμενο Βήμα

Προχωρήστε στο **Key Generator UI** για να δημιουργήσετε την ταυτότητά σας και να συνεχίσετε στην κρυπτογράφηση μηνυμάτων.
