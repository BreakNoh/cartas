import type { PageServerLoad, Actions } from './$types';
import { salas } from '$lib/server/sala';
import { redirect } from '@sveltejs/kit';
import { players } from '$lib/server/player';

export const actions = {
	criar: async ({ request }) => {
		const data = await request.formData();

		const nome = data.get('nome')?.toString();
		const id = data.get('id')?.toString();
		const sala = salas.criarSala();

		let jogador;
		if (nome) {
			jogador = players.registrarPlayer(nome);
		} else if (id) {
			jogador = players.players.get(id);
			if (!jogador) return;
		} else {
			return;
		}

		sala.adicionarJogador(jogador);
		throw redirect(303, `/sala/${sala.id}?p=${id}`);
	},
	entrar: async ({ request }) => {
		const data = await request.formData();

		const nome = data.get('nome')?.toString();
		const id = data.get('id')?.toString();
		const idSala = data.get('sala')?.toString();

		if (!idSala) return;

		let jogador;
		if (nome) {
			jogador = players.registrarPlayer(nome);
		} else if (id) {
			jogador = players.players.get(id);
			if (!jogador) return;
		} else {
			return;
		}

		const idNorm = idSala.trim().toUpperCase();
		const sala = salas.pegarSala(idNorm);

		sala?.adicionarJogador(jogador);

		if (!sala) return;

		throw redirect(303, `/sala/${idNorm}?p=${idNorm}`);
	},
	sair: async ({ request, params }) => {
		const data = await request.formData();

		const idPlayer = data.get('id')?.toString();
		const idSala = params.id;

		if (!idSala || !idPlayer) return;

		const sala = salas.pegarSala(idSala);
		sala?.removerJogador(idPlayer);

		throw redirect(303, `/`);
	},
	msg: async ({ request, params }) => {
		const data = await request.formData();

		const idPlayer = data.get('id')?.toString();
		const idSala = params.id;
		const msg = data.get('msg')?.toString();

		if (!idSala || !idPlayer || !msg) return;

		const jogador = players.players.get(idPlayer);
		const sala = salas.pegarSala(idSala);

		if (!jogador || !sala) return;
		sala.mandarMsg(`${jogador.nome}: ${msg}`);
	}
} satisfies Actions;
export const load: PageServerLoad = async ({ params, url }) => {
	const idSala = params.id;

	if (!idSala) return;
	const sala = salas.pegarSala(idSala);
	if (!sala) return;

	return {
		player: url.searchParams.get('p') || '',
		players: JSON.stringify(sala.jogadores),
		idSala,
		chat: sala.chat
	};
};
