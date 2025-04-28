// export async function encryptPrivateKey(privateKey, password, crypto) {
//     const enc = new TextEncoder();
//     const salt = crypto.getRandomValues(new Uint8Array(16));
//     const passwordKey = await crypto.subtle.importKey('raw', enc.encode(password), { name: 'PBKDF2' }, false, ['deriveKey']);
//     const aesKey = await crypto.subtle.deriveKey(
//         { name: 'PBKDF2', salt, iterations: 250000, hash: 'SHA-256' },
//         passwordKey,
//         { name: 'AES-GCM', length: 256 },
//         false,
//         ['encrypt']
//     );

//     const iv = crypto.getRandomValues(new Uint8Array(12));

//     const ciphertext = await crypto.subtle.encrypt(
//         { name: 'AES-GCM', iv },
//         aesKey,
//         enc.encode(privateKey)
//     );

//     const encrypted = {
//         salt: Array.from(salt),
//         iv: Array.from(iv),
//         ciphertext: Array.from(new Uint8Array(ciphertext)),
//     };

//     return JSON.stringify(encrypted);
// }

// export async function decryptPrivateKey(encryptedJson, password, crypto) {
//     try {
//         const enc = new TextEncoder();
//         const dec = new TextDecoder();

//         const encrypted = JSON.parse(encryptedJson);
//         const salt = new Uint8Array(encrypted.salt);
//         const iv = new Uint8Array(encrypted.iv);
//         const ciphertext = new Uint8Array(encrypted.ciphertext);

//         const passwordKey = await crypto.subtle.importKey(
//             'raw',
//             enc.encode(password),
//             { name: 'PBKDF2' },
//             false,
//             ['deriveKey']
//         );

//         const aesKey = await crypto.subtle.deriveKey(
//             { name: 'PBKDF2', salt, iterations: 250000, hash: 'SHA-256' },
//             passwordKey,
//             { name: 'AES-GCM', length: 256 },
//             false,
//             ['decrypt']
//         );

//         const decrypted = await crypto.subtle.decrypt(
//             { name: 'AES-GCM', iv, },
//             aesKey,
//             ciphertext
//         );

//         return dec.decode(decrypted);
//     }
//     catch (e) {
//         console.info(e)
//         return null
//     }
// }
export async function encryptPrivateKey(input, key) {
    let output = '';
    for (let i = 0; i < input.length; i++) {
        output += String.fromCharCode(input.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return output;
}


export async function decryptPrivateKey(input, key) {
    let output = '';
    for (let i = 0; i < input.length; i++) {
        output += String.fromCharCode(input.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return output;
}
