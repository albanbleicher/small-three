import { PerspectiveCamera } from 'three'
interface CameraOptions {
  wrapper: HTMLDivElement
}
export default class Camera {
  public camera: PerspectiveCamera
  private wrapper: HTMLDivElement
  constructor(options: CameraOptions) {
    this.wrapper = options.wrapper
    this.camera = new PerspectiveCamera(
      75,
      this.wrapper.clientWidth / this.wrapper.clientHeight,
      1,
      1000
    )
    this.camera.position.z = 5
  }
  resize() {
    this.camera.aspect = this.wrapper.clientWidth / this.wrapper.clientHeight
    this.camera.updateProjectionMatrix()
  }
}
