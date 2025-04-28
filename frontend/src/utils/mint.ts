import { getFaucetHost, requestSuiFromFaucetV2 } from '@mysten/sui/faucet';

export async function mintToken(address:string){
    await requestSuiFromFaucetV2({
        // connect to Devnet
        host: getFaucetHost('devnet'),
        recipient: address,
    });
}