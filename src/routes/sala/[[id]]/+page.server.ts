import type { PageServerLoad, Actions } from './$types';
import { salas } from '$lib/server/sala';
import { redirect } from '@sveltejs/kit';

export const actions = {
	criar: async ({ request }) => {
		const data = await request.formData();
		const nome = data.get('nome')?.toString();
		const id = salas.criar_sala();
		if (nome) {
			salas.adicionar_jogador(id, nome);
		}
		console.log(data);
		throw redirect(303, `/sala/${id}?p=${nome}`);
	},
	entrar: async ({ request }) => {
		const data = await request.formData();
		const nome = data.get('nome')?.toString();
		console.log(data);
		const id_lobby = data.get('lobby')?.toString();

		if (!id_lobby) return;

		const id_norm = id_lobby.trim().toUpperCase();

		console.log(id_norm);
		if (salas.sala_existe(id_norm) && nome) {
			salas.adicionar_jogador(id_norm, nome);
			throw redirect(303, `/sala/${id_norm}?p=${nome}`);
		}
	},
	sair: async ({ request, params }) => {
		const nome = (await request.formData()).get('nome')?.toString();
		console.log(nome, 'quer sair');

		if (nome && params.id) {
			salas.remover_jogador(params.id, nome);
		}
		throw redirect(303, `/`);
	},
	msg: async ({ request, params }) => {
		const data = await request.formData();
		const nome = data.get('nome')?.toString();
		const msg = data.get('msg')?.toString();
		console.log(nome, ':', msg);

		if (nome && params.id && msg) {
			salas.mandar_msg(params.id, `${nome}: ${msg}`);
		}
	}
} satisfies Actions;

export const load: PageServerLoad = async ({ params, url }) => {
	const id_sala = params.id;

	if (id_sala) {
		return {
			player: url.searchParams.get('p') || '',
			players: JSON.stringify(salas.get_sala(id_sala)?.jogadores),
			id_sala,
			chat: salas.get_chat(id_sala)
		};
	}
};
