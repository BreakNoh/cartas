import { Sala } from "./sala";

export class Player {
	public sala? : Sala
	constructor(readonly id: number, readonly nome: string){}

}
class Players {
	readonly players: Map<number, Player> = new Map() 

	criarId(): number{
		let id = 0;
		while (true) {
			id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
			
			if (!this.players.has(id)) {
				return id
			}
		}
	}

	registrarPlayer(nome: string): Player{
		const id = this.criarId();
		const player = new Player(id, nome);
		this.players.set(id, player);
		return player;

	}
	apagarPlayer(id: number){
		this.players.delete(id)
	}
}

export const players = new Players();
