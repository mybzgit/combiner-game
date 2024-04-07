import { useDrag } from 'react-dnd'
import { GameContextType } from '../store/context'
import { CellType } from '../types/cell'
import { GeneratorType } from '../types/item'
import { memo } from 'react'
import CircularProgress from './CircularProgress'

type Props = {
  item: GeneratorType
  position: CellType
  generate: GameContextType['generate']
  resetGenerator: GameContextType['resetGenerator']
}

const Generator = memo(
  ({ item, position, generate, resetGenerator }: Props) => {
    const { id, leftItems } = item

    const [{ isDragging }, drag] = useDrag(
      () => ({
        type: 'generator',
        item: { position, type: 'generator' },
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging(),
        }),
      }),
      [position],
    )

    return (
      <div
        role='button'
        className='generator'
        ref={drag}
        style={{
          opacity: isDragging ? 0.5 : 1,
        }}
        onClick={() => (leftItems > 0 ? generate(id) : undefined)}
      >
        {item.image}
        <div
          className='mark'
          style={{
            opacity: leftItems == 0 ? 0.5 : 1,
          }}
        ></div>
        {leftItems == 0 && (
          <div style={{ position: 'absolute', top: 1, right: 1 }}>
            <CircularProgress
              time={10}
              onEnd={() => resetGenerator(id)}
            />
          </div>
        )}
      </div>
    )
  },
  (prev, next) => {
    return (
      prev.position[0] == next.position[0] &&
      prev.position[1] == next.position[1] &&
      prev.item.id == next.item.id &&
      prev.item.leftItems == next.item.leftItems
    )
  },
)

export default Generator
