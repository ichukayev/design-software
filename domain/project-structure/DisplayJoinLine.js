import SvgGroup from '../svg/SvgGroup.js'
import SvgLine from '../svg/SvgLine.js'
import Coordinate from '../svg/attributes/Coordinate.js'
import Radius from '../svg/attributes/Radius.js'
import Fill from '../svg/attributes/Fill.js'
import Stroke from '../svg/attributes/Stroke.js'
import Font from '../svg/attributes/Font.js'
import Color from '../svg/attributes/Color.js'

class DisplayJoinLine {
  #x
  #y
  #color
  #step
  #ratio
  #length

  constructor(coordinate, displayOptions) {
    this.#ratio = displayOptions.calculate().ratio
    this.#step = displayOptions.calculate().step * this.#ratio
    this.#length = displayOptions.calculate().length
    this.#x = coordinate.calculate().x * this.#ratio
    this.#y = coordinate.calculate().y * this.#ratio
    this.#color = displayOptions.calculate().color
  }

  toSvgGroup() {
    const group = new SvgGroup()
    const line = new SvgLine(
      new Coordinate(this.#x, this.#y),
      new Coordinate(this.#x, this.#y),
      new Stroke(new Color(this.#color))
    )
    group.append(line)
    return group
  }
}

export default DisplayJoinLine
