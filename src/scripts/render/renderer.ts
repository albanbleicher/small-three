import { Scene, WebGLRenderer } from 'three'
import Camera from './camera'
interface RendererOptions {
  wrapper: HTMLDivElement
  scene: Scene
  camera: Camera
}
export default class Renderer {
  private wrapper: HTMLDivElement
  private scene: Scene
  private camera: Camera
  public renderer!: WebGLRenderer

  constructor(options: RendererOptions) {
    this.wrapper = options.wrapper
    this.camera = options.camera
    this.scene = options.scene
    this.init()
  }

  init() {
    this.renderer = new WebGLRenderer({
      alpha: true,
      antialias: true,
    })
    this.renderer.setSize(this.wrapper.clientWidth, this.wrapper.clientHeight)
    this.wrapper.append(this.renderer.domElement)
  }
  resize() {
    this.renderer.setSize(this.wrapper.clientWidth, this.wrapper.clientHeight)
  }
  render() {
    this.renderer.render(this.scene, this.camera.camera)
  }
}
