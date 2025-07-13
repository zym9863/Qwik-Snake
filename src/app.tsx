import { component$ } from '@builder.io/qwik'
import { SnakeGame } from './components/SnakeGame'
import './app.css'
import './components/SnakeGame.css'

export const App = component$(() => {
  return <SnakeGame />
})
