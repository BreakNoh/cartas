import type { Player } from './player';

const LETRAS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export class Sala {
	readonly jogadores: Record<string, Player> = {};
	readonly chat: string[] = []
	constructor (readonly id: string, readonly senha?: string){};

	adicionarJogador(jogador: Player) {
		this.jogadores[jogador.nome] = jogador;
		jogador.sala = this;
	}
	removerJogador(id: number){
		const player = this.jogadores[id];
		if (!player) return;
		
		player.sala = this;
		delete this.jogadores[id]
	}

	mandarMsg(msg:string) {
		this.chat.push(msg)
	}
}

class Salas {
	readonly salas: Map<string, Sala> = new Map();

	salaExiste(id: string): boolean {
		return this.salas.has(id);
	}


	criarSala(senha?: string): Sala {
		let id: string = this.criarId();

		const sala: Sala = new Sala(id, senha);

		this.salas.set(id, sala);

		console.log('sala criado:', id);
		return sala;
	}

	apagarSala(id: string) {
		this.salas.delete(id);
		console.log('sala deletado:', id);
	}
	
	criarId(): string {
		let id = '';
		while (true) {
			id = '';
			for (let i = 0; i < 5; i++) {
				id += LETRAS.charAt(Math.floor(Math.random() * LETRAS.length));
			}
			if (!this.salas.has(id)) break; 
		}
		return id;
	}
}

export const salas: Salas = new Salas();
