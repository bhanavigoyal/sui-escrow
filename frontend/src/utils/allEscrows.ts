import { useCurrentAccount, useSuiClient } from "@mysten/dapp-kit";
import { SuiObjectResponse } from "@mysten/sui/client";
import { useCallback } from "react";

type EscrowFields = {
	sender: string;
	recipient: string;
	exchange_key: string;
};

type EscrowCreatedEvent = {
	id: string;
	sender: string;
	recipient: string;
};

export function useAllEscrows() {
	const currentAccount = useCurrentAccount();
	const client = useSuiClient();

	const fetchEscrowObject = async (id: string) => {
		try {
			const object = await client.getObject({
				id,
				options: {
					showContent: true,
				},
			});
			return object;
		} catch (e) {
			console.error("Failed to fetch escrow object:", e);
			return null;
		}
	};

	const getAllEscrows = useCallback(async () => {
		try {
			const response = await client.queryEvents({
				query: {
					MoveEventType:
						"0x31b818703f625a7521c1a09d95f5cecddbaa0fe163bb83fe84d3105d86d14062::escrow::EscrowCreated",
				},
				limit: 50,
			});

			const events = response.data;

			const objectPromises = events.map((event) => {
					const parsed = event.parsedJson as EscrowCreatedEvent;
					if (parsed?.id) {
						return fetchEscrowObject(parsed.id);
					}
					return null;
				}).filter(Boolean);

			const responses = await Promise.all(objectPromises);

			return responses.filter(
				(response) => response?.data?.content?.dataType === "moveObject"
			) as SuiObjectResponse[];
		} catch (e) {
			console.error("Failed to fetch all escrows:", e);
			return [];
		}
	}, [client]);

	const getMyEscrows = useCallback(async () => {
		const escrows = await getAllEscrows();
		if (!currentAccount?.address) return [];
		return escrows.filter((escrow) => {
            if(escrow.data?.content?.dataType === "moveObject"){
                const fields = escrow.data?.content?.fields as EscrowFields;
                return fields?.sender === currentAccount.address;
            }
            return;
		});
	}, [getAllEscrows, currentAccount?.address]);

	const getNeedsActionEscrows = useCallback(async () => {
		const escrows = await getAllEscrows();
		if (!currentAccount?.address) return [];
		return escrows.filter((escrow) => {
			if(escrow.data?.content?.dataType === "moveObject"){
                const fields = escrow.data?.content?.fields as EscrowFields;
                return fields?.recipient === currentAccount.address;
            }
            return;
		});
	}, [getAllEscrows, currentAccount?.address]);

	return { getAllEscrows, getMyEscrows, getNeedsActionEscrows };
}
