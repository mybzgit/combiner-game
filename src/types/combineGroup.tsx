import DotOne from '../icons/dot/DotOne'
import DotThree from '../icons/dot/DotThree'
import DotTwo from '../icons/dot/DotTwo'
import HorseFour from '../icons/horse/HorseFour'
import HorseOne from '../icons/horse/HorseOne'
import HorseThree from '../icons/horse/HorseThree'
import HorseTwo from '../icons/horse/HorseTwo'

export type CombineGroup = {
  [generatorName: string]: {
    items: string[]
    images: JSX.Element[]
  }
}

export const combineGroup: CombineGroup = {
  horseGenerator: {
    items: ['horseOne', 'horseTwo', 'horseThree', 'horseFour'],
    images: [
      <HorseOne />,
      <HorseTwo />,
      <HorseThree />,
      <HorseFour />,
    ],
  },
  dotGenerator: {
    items: ['dotOne', 'dotTwo', 'dotThree'],
    images: [<DotOne />, <DotTwo />, <DotThree />],
  },
}
