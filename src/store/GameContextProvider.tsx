import { produce } from 'immer'
import { PropsWithChildren, useState } from 'react'
import { generateBoardCells, getNext } from '../lib/lib'
import { BoardCellType, CellType } from '../types/cell'
import GameContext, { GameContextType } from './context'
import { GeneratorType, ItemType } from '../types/item'
import { combineGroup } from '../types/combineGroup'

const GameContextProvider = ({ children }: PropsWithChildren) => {
  const [board, setBoard] = useState<BoardCellType[]>(
    generateBoardCells(),
  )

  const handleMove = (
    type: 'generator' | 'item',
    start: CellType,
    end: CellType,
  ) => {
    setBoard(
      produce((draft) => {
        const startCell = draft.find(
          (c) =>
            c.position[0] == start[0] && c.position[1] == start[1],
        )
        const endCell = draft.find(
          (c) => c.position[0] == end[0] && c.position[1] == end[1],
        )
        if (type === 'generator') {
          // moved element is generator
          if (endCell!.content === null) {
            // end cell is empty
            endCell!.content = {
              ...startCell!.content,
            } as GeneratorType
            startCell!.content = null
          } else {
            const temp = { ...endCell!.content }
            endCell!.content = {
              ...startCell!.content,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any
            startCell!.content = {
              ...temp,
            }
          }
        } else {
          //moved element is item
          if (endCell!.content === null) {
            // end cell is empty
            endCell!.content = {
              ...startCell!.content,
            } as ItemType
            startCell!.content = null
          } else {
            if ('generator' in endCell!.content) {
              // end cell is item
              const temp = { ...startCell!.content } as ItemType
              const generatorId = temp.generator
              if (
                endCell!.content.id == startCell!.content.id &&
                startCell!.content.id ==
                  combineGroup[generatorId].items.slice(-1)[0]
              )
                return draft
              else {
                if (endCell!.content.id == startCell!.content.id) {
                  startCell!.content = null
                  const nextIndex = getNext(
                    temp.id,
                    combineGroup[generatorId].items,
                  )
                  endCell!.content = {
                    id: combineGroup[generatorId].items[nextIndex],
                    generator: generatorId,
                    image:
                      combineGroup[generatorId].images[nextIndex],
                  } as ItemType
                } else {
                  const temp = { ...endCell!.content }
                  endCell!.content = {
                    ...startCell!.content,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  } as any
                  startCell!.content = {
                    ...temp,
                  }
                }
              }
            } else {
              // end cell is generator
              const temp = { ...endCell!.content }
              endCell!.content = {
                ...startCell!.content,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
              } as any
              startCell!.content = {
                ...temp,
              }
            }
          }
        }
      }),
    )
  }
  const handleGenerate = (generatorId: string) => {
    setBoard(
      produce((draft) => {
        const emptyCell = draft.find((c) => c.content === null)
        if (emptyCell !== undefined) {
          emptyCell!.content = {
            id: combineGroup[generatorId].items[0],
            generator: generatorId,
            image: combineGroup[generatorId].images[0],
          } as ItemType
        }
      }),
    )
  }

  const gameContext: GameContextType = {
    board,
    move: handleMove,
    generate: handleGenerate,
  }

  return (
    <GameContext.Provider value={gameContext}>
      {children}
    </GameContext.Provider>
  )
}
export default GameContextProvider
