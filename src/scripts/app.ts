import { Scene } from 'three'
import { Pane } from 'tweakpane'
import Blob from './elements/blob'
import Camera from './render/camera'
import Renderer from './render/renderer'
import Time from './utils/time'
interface AssetsObject {
  textures: object
  models: object
}
interface AppOptions {
  wrapper: HTMLDivElement
  assets: AssetsObject
  debug: boolean
}
export default class App {
  private camera: Camera
  private scene: Scene
  private renderer: Renderer
  private time!: Time
  /** Pane object available project-wide */
  static debug: Pane
  /** Uncomment this line to use loaded assets */
  // private assets: AssetsObject
  constructor(options: AppOptions) {
    this.camera = new Camera({ wrapper: options.wrapper })
    this.scene = new Scene()
    this.renderer = new Renderer({
      camera: this.camera,
      wrapper: options.wrapper,
      scene: this.scene,
    })
    this.time = new Time()
    /** Uncomment this line to use loaded assets */
    // this.assets = options.assets
  }
  mount() {
    /** Add debug pane */
    App.debug = new Pane({ title: 'Debug' })
    /** Hide it if there's no hash debug in URL */
    if (!window.location.hash.includes('debug')) App.debug.hidden = true
    /** Add elements to scene */
    const cubes = new Blob({
      time: this.time,
    })
    this.scene.add(cubes.container)
    /** requestAnimationFrame */
    this.time.on('tick', () => {
      this.renderer.render()
    })

    /** Handle resize */
    window.addEventListener('resize', () => {
      this.camera.resize()
      this.renderer.resize()
    })
  }
}
