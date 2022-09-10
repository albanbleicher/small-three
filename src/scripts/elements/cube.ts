import { Mesh, Object3D, ShaderMaterial, SphereGeometry } from 'three'
import Time from '../utils/time'
import vertex from '@/assets/shaders/vertex.glsl'
import fragment from '@/assets/shaders/fragment.glsl'
interface CubeOptions {
  time: Time
}
export default class Cube {
  public container: Object3D
  private time: Time
  constructor(options: CubeOptions) {
    this.container = new Object3D()
    this.container.name = 'Cubes'
    this.time = options.time
    this.create()
  }
  create() {
    const geo = new SphereGeometry(1, 40, 40)
    const mat = new ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        uTime: {
          value: 0,
        },
      },
      wireframe: true,
      wireframeLinewidth: 0.1,
    })
    const mesh = new Mesh(geo, mat)
    this.container.add(mesh)
    this.time.on('tick', () => {
      mat.uniforms.uTime.value += 0.005
    })
  }
}
