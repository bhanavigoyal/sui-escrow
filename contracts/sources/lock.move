module contracts::lock;

public struct Locked<T: store> has key, store {
    id: UID,
    key: ID,
    obj: T
}

public struct Key has key, store {
    id: UID
}

const ELockKeyMismatch:u64 =0;

public fun lock<T: store>(obj: T, ctx: &mut TxContext):(Locked<T>, Key){
    let key = Key{id: object::new(ctx)};

    let lock = Locked {
        id: object::new(ctx),
        key: object::id(&key),
        obj,
    };

    (lock,key)
}

public fun unlock<T: store>(locked: Locked<T>, key: Key): T {
    assert!(locked.key == object::id(&key), ELockKeyMismatch);
    let Key {id} = key;
    object::delete(id);

    let Locked {id, key:_, obj} = locked;
    object::delete(id);
    obj
}
