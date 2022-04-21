# README

Demo project that compares React and Hotwire on Rails 7.

It combines the React tutorial (tic-tac-toe) with the Hotwire demo (messaging system). Both clients implement a multi-player tic-tac-toe game with a chat feature that broadcasts updates via WebSockets.

Demo at: https://hotwire-react-ttt.herokuapp.com/

## Hotwire client

* Only uses Turbo/Stimulus JS
* Receives updates via ActionCable as rendered HTML
* Uses ActiveRecord hooks to trigger broadcasts

## Hotwire client
* Uses React 18
* Compiled via `webpack` and integrated via `jsbundling-rails` gem
* Uses different ActionCable channels that get updated via the rails controllers