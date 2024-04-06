import { useDrag } from 'react-dnd'
import { GameContextType } from '../store/context'
import { CellType } from '../types/cell'
import { GeneratorType } from '../types/item'
import { memo } from 'react'

type Props = {
  item: GeneratorType
  position: CellType
  generate: GameContextType['generate']
}

const Generator = memo(
  ({ item, position, generate }: Props) => {
    const { id } = item

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
        onClick={() => generate(id)}
      >
        {item.image}
        <div className='mark'></div>
      </div>
    )
  },
  (prev, next) => {
    return (
      prev.position[0] == next.position[0] &&
      prev.position[1] == next.position[1] &&
      prev.item.id == next.item.id
    )
  },
)

export default Generator
