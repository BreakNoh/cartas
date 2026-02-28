import type { Player } from './player';

const LETRAS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

type Sala = {
	jogadores: Record<string, string>;
	chat: string[];
};
class Salas {
	constructor(private salas: Record<string, Sala> = {}) {}

	sala_existe(id: string): boolean {
		return !!this.salas[id];
	}

	get_sala(id: string): Sala | undefined {
		return this.salas[id];
	}

	adicionar_jogador(id_sala: string, j: string): boolean {
		const sala = this.get_sala(id_sala);
		if (!sala) return false;

		sala.jogadores[j] = j;
		// j.sala = this;
		console.log(j, 'entrou no sala', id_sala);
		return true;
	}

	remover_jogador(id_sala: string, j: string): boolean {
		const sala = this.get_sala(id_sala);
		if (!sala) return false;

		delete sala.jogadores[j];
		if (Object.keys(sala.jogadores).length == 0) {
			this.apagar_sala(id_sala);
		}

		console.log(j, 'sair do sala', id_sala);
		return true;
	}

	criar_sala(): string {
		let id: string = this.criar_id();

		const sala: Sala = { jogadores: {}, chat: [] };

		this.salas[id] = sala;

		console.log('sala criado:', id);
		return id;
	}

	apagar_sala(id: string) {
		const sala = this.salas[id];

		if (!sala) return;

		delete this.salas[id];
		console.log('sala deletado:', id);
	}

	criar_id(): string {
		let id = '';
		for (let i = 0; i < 5; i++) {
			const idx = Math.floor(Math.random() * LETRAS.length);
			const char = LETRAS.charAt(idx);
			id += char;
		}

		if (this.salas[id]) {
			id = this.criar_id();
		}

		return id;
	}

	mandar_msg(id_sala: string, msg: string) {
		const sala = this.get_sala(id_sala);

		if (!sala) return;

		sala.chat.push(msg);
	}

	get_chat(id_sala: string): string[] | undefined {
		const sala = this.get_sala(id_sala);

		if (!sala) return;

		return sala.chat;
	}
}

export const salas: Salas = new Salas();
