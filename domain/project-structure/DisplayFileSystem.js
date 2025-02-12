import DisplayOptions from './DisplayOptions.js'
import DisplayRootDirectory from './DisplayRootDirectory.js'
import DisplayDirectory from './DisplayDirectory.js'
import DisplayFile from './DisplayFile.js'
import FileSystemElement from './FileSystemElement.js'
import Svg from '../svg/Svg.js'
import Coordinate from '../svg/attributes/Coordinate.js'
import Size from '../svg/attributes/Size.js'
import Matrix from './Matrix.js'
import DisplayJoinLine from './DisplayJoinLine.js'

class DisplayFileSysytem {
  #tree
  #column = 0
  #ratio = 1
  #step = 20

  constructor(path = './data/project.json') {
    this.#getFileTree(path)
  }

  #getFileTree(path) {
    if (!this.#tree) {
      fetch(path)
        .then((file) => file.json())
        .then((json) => {
          this.#tree = json
          this.#createMatrix(this.#tree)
        })
        .catch((error) => {
          throw new Error(error.message)
        })
    } else {
      this.#createMatrix(this.#tree)
    }
  }

  #createMatrix(tree) {
    const matrix = new Matrix(tree)
    return this.#matrixToSvg(matrix.getMatrix())
  }

  #calculateContainerSize(matrix) {
    const width = matrix.length
    let height = 0
    for (const row of matrix) {
      if (height < row.length) {
        height = row.length
      }
    }
    return {
      width: width * this.#step * this.#ratio * 4,
      height: height * this.#step * this.#ratio,
    }
  }

  #matrixToSvg(matrix) {
    const { width, height } = this.#calculateContainerSize(matrix)
    const svgContainer = new Svg(new Size(width + 20, height + 20))

    for (let xi = 0; xi < matrix.length; xi++) {
      const column = matrix[xi]
      for (let yi = 0; yi < column.length; yi++) {
        if (matrix[xi][yi]) {
          const node = new DisplayDirectory(
            new Coordinate(
              xi * this.#step * this.#ratio + 20,
              yi * this.#step * this.#ratio + 20
            ),
            new DisplayOptions({
              step: this.#step,
              ratio: this.#ratio,
              color: 'black',
            }),
            new FileSystemElement(matrix[xi][yi].path)
          )
          svgContainer.append(node.toSvgGroup())
        }
      }
    }

    const container = document.getElementById('svg-container')
    container.innerHTML = ''
    container.append(svgContainer.toExtractHTML())

    // setTimeout(() => {
    //   const svgContainer = new Svg(new Size(`50%`, `97svh`))
    //   for (const svgElement of arraySvgElements) {
    //     svgContainer.append(svgElement.toSvgGroup())
    //   }
    //   document
    //     .getElementById('svg-container')
    //     .append(svgContainer.toExtractHTML())
    // }, 1000)
    //
    // new Promise((resolve, reject) => {
    //   // this.#processing(this.#tree)
    // }).then((array) => {
    // const svgContainer = new Svg(new Size(`50%`, `97svh`))
    // for (const svgElement of array) {
    //   svgContainer.append(svgElement.toSvgGroup())
    // }
    // svgContainer.append(root.toSvgGroup())
    // document
    //   .getElementById('svg-container')
    //   .append(svgContainer.toExtractHTML())
    // })
  }
}

export default DisplayFileSysytem
