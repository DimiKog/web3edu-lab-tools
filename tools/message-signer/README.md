

# ✍️ Message Signer — Proof of Ownership (Lab 03)

Part of **Web3Edu Labs — Lab 03: Message Signing & Ownership**

---

## 🎯 Purpose of This Tool

This tool demonstrates **cryptographic message signing** using raw keys.

Unlike encryption (Lab 02), **signing does not hide a message**.  
Instead, it proves **who created it**.

You will learn how:
- a message is hashed
- a hash is signed using a **private key**
- a signature proves **ownership of an identity**
- signatures change when the message changes

This tool runs **entirely in the browser** and uses **no blockchain**.

---

## 🧠 What You Will Learn

By using this tool, you will understand that:

- Signing uses **public-key cryptography**
- Only the **private key owner** can produce a valid signature
- Anyone can later **verify** that signature
- Signing proves **authorship**, not secrecy
- Changing **even one character** changes the signature

---

## 🧩 Encryption vs Signing (Key Idea)

Both encryption and signing use **public-key cryptography**.

The difference is how the keys are used:

- 🔐 **Encryption** → protects **who can read**
- ✍️ **Signing** → proves **who created the message**

This lab focuses **only on signing**.

---

## 🛠️ How the Tool Works

### Inputs
- **Message** (plain text)
- **Private Key** (hex, 64 characters)

> You can reuse a private key generated in **Lab 02 — Key Generator**.

---

### What Happens Internally

1. The message is hashed using **keccak256**
2. The hash is signed with **secp256k1**
3. The signature updates **live** as you type
4. The result proves that the private key owner signed the message

There is **no “Sign” button** — the signature updates automatically so you can observe how it changes.

---

## 🔍 What to Observe

Try the following:
- Change **one letter**
- Add or remove **one space**
- Paste the same message twice

You will see:
- The hash changes
- The signature changes
- Ownership proof depends on **exact content**

---

## 📦 Libraries Used

- `@noble/secp256k1` — elliptic curve signing
- `js-sha3` — keccak256 hashing
- Web3Edu shared theme (`web3edu-theme.css`)

---

## ❌ What This Tool Is NOT

- It is NOT encryption
- It does NOT hide message content
- It does NOT submit transactions
- It does NOT require MetaMask
- It is NOT a wallet

---

## ⚠️ Important Safety Notice

> **Educational use only**

- Never use real private keys
- Never reuse these keys outside the lab
- Wallets protect keys — this tool does not

---

## 🔗 How This Fits in Lab 03

This tool is used **before** introducing wallets:

1. 🔑 Keys generated in Lab 02
2. ✍️ Messages signed using raw keys (this tool)
3. 🔐 Wallet-based signing introduced later

---

## 🚀 Next Step

Proceed to:
- **Signature Verification** (next tool)
- or the **Lab 03 landing page** for full context

---

---

# ✍️ Υπογραφή Μηνυμάτων — Απόδειξη Ιδιοκτησίας (Lab 03)

Μέρος του **Web3Edu Labs — Lab 03: Υπογραφή Μηνυμάτων & Ιδιοκτησία**

---

## 🎯 Σκοπός του Εργαλείου

Αυτό το εργαλείο παρουσιάζει την **κρυπτογραφική υπογραφή μηνυμάτων** με χρήση ακατέργαστων κλειδιών.

Σε αντίθεση με την κρυπτογράφηση (Lab 02), η υπογραφή:
- **δεν κρύβει** το μήνυμα
- αποδεικνύει **ποιος το δημιούργησε**

---

## 🧠 Τι Θα Μάθετε

Χρησιμοποιώντας το εργαλείο θα καταλάβετε ότι:

- Η υπογραφή βασίζεται σε **δημόσιας κλείδας κρυπτογραφία**
- Μόνο ο κάτοχος του **ιδιωτικού κλειδιού** μπορεί να υπογράψει
- Οποιοσδήποτε μπορεί να επαληθεύσει την υπογραφή
- Η υπογραφή αποδεικνύει **ιδιοκτησία**, όχι μυστικότητα
- Μια μικρή αλλαγή στο μήνυμα αλλάζει την υπογραφή

---

## 🧩 Κρυπτογράφηση vs Υπογραφή

Και οι δύο χρησιμοποιούν την ίδια κρυπτογραφική βάση.

Η διαφορά είναι στη χρήση των κλειδιών:

- 🔐 **Κρυπτογράφηση** → ποιος μπορεί να διαβάσει
- ✍️ **Υπογραφή** → ποιος δημιούργησε το μήνυμα

---

## 🛠️ Πώς Λειτουργεί το Εργαλείο

### Είσοδοι
- **Μήνυμα** (απλό κείμενο)
- **Ιδιωτικό Κλειδί** (hex, 64 χαρακτήρες)

> Μπορείτε να χρησιμοποιήσετε κλειδί από το **Lab 02 — Δημιουργός Κλειδιών**.

---

## 🔍 Τι Να Παρατηρήσετε

Δοκιμάστε:
- Να αλλάξετε **ένα γράμμα**
- Να προσθέσετε **ένα κενό**
- Να επικολλήσετε το ίδιο μήνυμα δύο φορές

Θα δείτε:
- Αλλαγή στο hash
- Αλλαγή στην υπογραφή
- Απόλυτη εξάρτηση από το περιεχόμενο

---

## ❌ Τι ΔΕΝ Είναι Αυτό το Εργαλείο

- ΔΕΝ είναι κρυπτογράφηση
- ΔΕΝ κρύβει μηνύματα
- ΔΕΝ χρησιμοποιεί blockchain
- ΔΕΝ είναι wallet

---

## ⚠️ Σημαντική Σημείωση Ασφαλείας

> **Μόνο για εκπαιδευτική χρήση**

- Μην χρησιμοποιείτε πραγματικά ιδιωτικά κλειδιά
- Μην επαναχρησιμοποιείτε αυτά τα κλειδιά
- Τα wallets προστατεύουν τα κλειδιά — αυτό το εργαλείο όχι

---

## 🚀 Επόμενο Βήμα

Συνεχίστε με:
- **Επαλήθευση Υπογραφής**
- ή τη σελίδα του **Lab 03**