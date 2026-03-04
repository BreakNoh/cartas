import { Sala } from './sala';

export class Player {
	public sala?: Sala;
	constructor(
		readonly id: string,
		readonly nome: string
	) {}

	toJSON(): Object {
		return {
			id: this.id,
			nome: this.nome
		};
	}
}
class Players {
	readonly players: Map<string, Player> = new Map();

	criarId(): string {
		let id = '';
		while (true) {
			id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16);

			if (!this.players.has(id)) {
				return id;
			}
		}
	}

	registrarPlayer(nome: string): Player {
		const id = this.criarId();
		const player = new Player(id, nome);
		this.players.set(id, player);
		return player;
	}
	apagarPlayer(id: string) {
		this.players.delete(id);
	}
}

export const players = new Players();
