import { Component, OnInit } from '@angular/core';
import Minimax from 'tic-tac-toe-minimax';
const { GameStep } = Minimax;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public games: Array<number | string> = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  public winner: string;
  public playing = false;
  public computerFirst = false;
  public difficulty: 'Easy' | 'Normal' | 'Hard' = 'Normal';

  constructor() { }

  ngOnInit() {
  }

  toggleGame(toggle: boolean) {
    if (toggle === this.playing) {
      return;
    }

    this.games = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    this.winner = undefined;

    if (toggle && this.computerFirst) {
      this.makeComputerMove();
    }

    this.playing = toggle;
  }

  makeComputerMove() {
    const symbols = {
      huPlayer: 'X',
      aiPlayer: 'O'
    };

    const winnerMapping = {
      huPlayer: 'You Win!',
      aiPlayer: 'Computer Wins!',
      draw: 'Game Draw!'
    };

    const result = GameStep(this.games, symbols, this.difficulty);
    this.games = result.board;

    if (result.winner) {
      this.winner = winnerMapping[result.winner];
      this.playing = false;
    }
  }

  makeHumanMove(field: number) {
    if (!this.playing || typeof this.games[field] !== 'number') {
      return;
    }

    this.games[field] = 'X';
    this.makeComputerMove();
  }

}
