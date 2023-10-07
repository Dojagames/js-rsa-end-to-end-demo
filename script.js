//forge.options.usePureJavaScript = true;

var rsa = forge.pki.rsa;


//var keypair = rsa.generateKeyPair({bits: 4096, e: 0x10001});
var privateKey;
var publicKey;

const msg = "das ist eine Test Nachricht";

async function generateKeys(){
    await rsa.generateKeyPair({bits: 4096, workers: 2}, function(err, keypair) {
        if(err) {
            console.log("error");
            return;
        }
        privateKey = keypair.privateKey;
        publicKey = keypair.publicKey;

        console.log(privateKey);
        console.log(publicKey);

        const bytes = window.btoa(msg);
        var encrypted = publicKey.encrypt(bytes, 'RSA-OAEP');
        console.log(encrypted);

        var decrypted = privateKey.decrypt(encrypted, 'RSA-OAEP');
        var _tempMsg = window.atob(decrypted);
        console.log(_tempMsg);

    });


}

generateKeys();

