const StellarSdk = require('stellar-sdk');

export async function signTransaction(secret, destination) {

    const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');
    console.log(secret)
    const sourceKeypair = StellarSdk.Keypair.fromSecret(secret);
    const sourcePublicKey = sourceKeypair.publicKey();

    const account = await server.loadAccount(sourcePublicKey);

    const transaction = new StellarSdk.TransactionBuilder(account, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: StellarSdk.Networks.TESTNET,
    })
        .addOperation(StellarSdk.Operation.payment({
            destination,
            asset: StellarSdk.Asset.native(),
            amount: '10',
        }))
        .setTimeout(30)
        .build();

    transaction.sign(sourceKeypair);

    const signature = transaction.signatures[0].signature().toString('base64');
    console.log('Signature (base64):', signature);
}