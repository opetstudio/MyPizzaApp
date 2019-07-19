let prevTarget = 0

export const setPrevTarget = target => {
  prevTarget = target
}

export const getPrevTarget = () => prevTarget

export const resetPrevTarget = () => {
  prevTarget = 0
}
