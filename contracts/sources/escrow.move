module contracts::escrow;

use contracts::lock::{Self, Locked, Key};

public struct Escrow<T: key+store> has key, store {
    id: UID,
    sender: address,
    recipient: address,
    exchange_key: ID,
    escrowed_obj: Option<T>
}

const EMismatchedSenderRecipient: u64 = 0;

const EMismatchedExchangeObject: u64 = 1;

const EAlreadyExchangedOrReturned: u64 = 2;


public fun create_escrow<T: key+store>(
    escrowed_obj: T,
    exchange_key: ID,
    recipient: address,
    ctx: &mut TxContext
){
    let escrow = Escrow{
        id: object::new(ctx),
        sender: ctx.sender(),
        recipient,
        exchange_key,
        escrowed_obj: option::some(escrowed_obj)
    };

    transfer::public_share_object(escrow);
}

//a person sends the request to swap. it has locked nft. the escrow obj is extracted in which the item is present
// the extracted is given to the request sender and the locked nft is sent to the creator of escrow
public fun swap<T:key+store, U:key+store>(
    escrow : &mut Escrow<T>,
    key: Key,
    locked: Locked<U>,
    ctx: &TxContext
): T{
    assert!(option::is_some(&escrow.escrowed_obj), EAlreadyExchangedOrReturned);
    assert!(escrow.recipient == tx_context::sender(ctx), EMismatchedSenderRecipient);
    assert!(escrow.exchange_key == object::id(&key), EMismatchedExchangeObject);

    let escrow1 = option::extract<T>(&mut escrow.escrowed_obj);
    let escrow2= lock::unlock(locked,key);

    transfer::public_transfer(escrow2, escrow.sender);
    escrow1
}


public fun return_to_sender<T: key+store>(
    escrow: &mut Escrow<T>,
    ctx: &mut TxContext
):T {
    assert!(escrow.sender == tx_context::sender(ctx), EMismatchedSenderRecipient);
    assert!(option::is_some(&escrow.escrowed_obj), EAlreadyExchangedOrReturned);

    option::extract<T>(&mut escrow.escrowed_obj)
}