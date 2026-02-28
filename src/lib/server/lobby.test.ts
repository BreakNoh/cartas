import { test, expect } from 'bun:test';
import { Lobby } from './lobby.ts';

test('jogador entrar no lobby', () => {
	const lobby = new Lobby('teste', []);

	expect(lobby.adicionar_jogador('teste')).toBe(true);
});
test('jogador sair do lobby', () => {
	const lobby = new Lobby('teste', ['teste']);

	expect(lobby.remover_jogador('teste')).toBe(true);
});
