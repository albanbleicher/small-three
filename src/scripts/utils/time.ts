/** From Bruno Simon's 2019 portfolio */
import { Clock } from 'three'
import EventEmitter from './eventEmitter'

export default class Time extends EventEmitter {
  ticker!: number
  tickFn: () => void
  clock: Clock

  /**
   * Constructor
   */
  constructor() {
    super()

    this.tickFn = this.tick.bind(this)
    this.clock = new Clock()
    this.tick()
  }

  /**
   * RAF ticker
   */
  tick() {
    this.ticker = window.requestAnimationFrame(this.tickFn)
    const delta = Math.min(0.5, this.clock.getDelta())
    this.trigger('tick', [delta])
  }

  /**
   * Stop the RAF
   */
  stop() {
    window.cancelAnimationFrame(this.ticker)
  }
}
