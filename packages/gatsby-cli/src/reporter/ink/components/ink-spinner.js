"use strict"

Object.defineProperty(exports, `__esModule`, {
  value: true,
})
exports.default = void 0

var _react = _interopRequireWildcard(require(`react`))

var _propTypes = _interopRequireDefault(require(`prop-types`))

var _ink = require(`ink`)

var _cliSpinners = _interopRequireDefault(require(`cli-spinners`))

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj }
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj
  } else {
    var newObj = {}
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc =
            Object.defineProperty && Object.getOwnPropertyDescriptor
              ? Object.getOwnPropertyDescriptor(obj, key)
              : {}
          if (desc.get || desc.set) {
            Object.defineProperty(newObj, key, desc)
          } else {
            newObj[key] = obj[key]
          }
        }
      }
    }
    newObj.default = obj
    return newObj
  }
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    })
  } else {
    obj[key] = value
  }
  return obj
}

const enableAnimation = !!process.stdout.isTTY
console.log(enableAnimation)

class Spinner extends _react.Component {
  constructor(...args) {
    super(...args)

    _defineProperty(this, `state`, {
      frame: 0,
    })

    _defineProperty(this, `switchFrame`, () => {
      const { frame } = this.state
      const spinner = this.getSpinner()
      const isLastFrame = frame === spinner.frames.length - 1
      const nextFrame = isLastFrame ? 0 : frame + 1
      this.setState({
        frame: nextFrame,
      })
    })
  }

  render() {
    const spinner = this.getSpinner()
    return _react.default.createElement(
      _ink.Box,
      null,
      spinner.frames[this.state.frame]
    )
  }

  componentDidMount() {
    if (!enableAnimation) {
      return
    }

    const spinner = this.getSpinner()
    this.timer = setInterval(this.switchFrame, spinner.interval)
  }

  componentWillUnmount() {
    if (!this.timer) {
      return
    }

    clearInterval(this.timer)
  }

  getSpinner() {
    return _cliSpinners.default[this.props.type] || _cliSpinners.default.dots
  }
}

exports.default = Spinner

_defineProperty(Spinner, `propTypes`, {
  type: _propTypes.default.string,
})

_defineProperty(Spinner, `defaultProps`, {
  type: `dots`,
})
