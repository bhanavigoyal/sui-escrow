module contracts::nft;

use std::string;
use sui::event;
use sui::url::{Self, Url};

// nft
public struct NFT has key, store {
    id : UID,
    name: string::String,
    description: string::String,
    url: url::Url
}

//event
public struct NFTMinted has copy, drop {
    object_id: ID,
    creator: address,
    name: string::String
}


//view functions
public fun nft_name(nft: &NFT): &string::String{
    &nft.name
}

public fun nft_description(nft: &NFT): &string::String{
    &nft.description
}

public fun nft_url(nft: &NFT): &Url{
    &nft.url
}


// self transfer
#[allow(lint(self_transfer))]
public fun mint_to_sender(
    name: vector<u8>,
    description: vector<u8>,
    url: vector<u8>,
    ctx : &mut TxContext
){
    let sender = ctx.sender();

    let nft = NFT {
        id: object::new(ctx),
        name: string::utf8(name),
        description: string::utf8(description),
        url: url::new_unsafe_from_bytes(url)

    };

    event::emit(NFTMinted{
        object_id: object::id(&nft),
        creator: sender,
        name: nft.name
    });

    transfer::public_transfer(nft, sender);
}


public fun transfer_nft(nft: NFT, recipient: address, _: &mut TxContext){
    transfer::public_transfer(nft, recipient)
}

public fun burn(nft: NFT, _: &mut TxContext){
    let NFT {id, name:_, description:_, url:_} = nft;

    id.delete();
}