import type { lobbies } from './lobby';

export type Player = {
	nome: string;
};
class Players {
	constructor(private players: Record<string, Player> = {}) {}

	player_existe(nome: string): boolean {
		return !!this.players[nome];
	}

	registrar_player(nome: string): boolean {
		if (this.players[nome]) return false;

		this.players[nome] = { nome };
		return true;
	}
}

export const players = new Players();
