import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import './App.scss'
import Board from './components/Board'
import GameContextProvider from './store/GameContextProvider'

function App() {
  return (
    <>
      <h1 className='game-title'>Combiner Game</h1>
      <GameContextProvider>
        <DndProvider backend={HTML5Backend}>
          <Board />
        </DndProvider>
      </GameContextProvider>
    </>
  )
}

export default App
