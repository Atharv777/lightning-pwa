const StellarSdk = require('stellar-sdk');
const bip39 = require('bip39');
const ed25519 = require('ed25519-hd-key');


const derivationPath = "m/44'/148'/0'";

export async function deriveKeys(mnemonic) {
    const seed = await bip39.mnemonicToSeed(mnemonic);
    const derived = ed25519.derivePath(derivationPath, seed.toString('hex'));

    const keypair = StellarSdk.Keypair.fromRawEd25519Seed(derived.key);

    return { privateKey: keypair.secret(), publicKey: keypair.publicKey() }
}
