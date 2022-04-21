import React from 'react'
import consumer from '../channels/consumer'

function Square(props) {
  let classNames = "square";
  if(props.active && !props.value)
    classNames += " active";
  return (
    <button className={classNames} onClick={props.active ? props.onClick : null} disabled={!props.active}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        active={this.props.activeTurn}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    var game = this;
    this.channel = consumer.subscriptions.create({channel: 'GameChannel', game: props.gameid}, {
      connected() {
        // Called when the subscription is ready for use on the server
      },

      disconnected() {
        // Called when the subscription has been terminated by the server
      },

      received(data) {
        game.updateSquares(data.squares, data.active_player, data.x_player, data.winner_symbol)
      },
    });
    this.gameid = props.gameid;
    this.playerid = props.playerid;
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true
    };
  }

  async handleClick(i) {

    await fetch('http://localhost:3000/games/' + this.gameid + '/play', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('[name=csrf-token]').content,
      },
      body: JSON.stringify({field: i}),
    });
  }

  updateSquares(squares, activePlayer, xPlayer, winner) {
    this.setState({
      squares: squares,
      xIsNext: activePlayer === xPlayer,
      activePlayer: activePlayer,
      winner: winner,
    });
  }

  render() {
    let status;
    let winner = this.state.winner;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={this.state.squares}
            activeTurn={!winner && this.playerid === this.state.activePlayer}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
        </div>
      </div>
    );
  }
}

export default Game;
