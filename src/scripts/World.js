import { IcosahedronGeometry, Mesh, MeshNormalMaterial, Object3D } from "three";

export default class World {
  constructor(params) {
    this.camera = params.camera;
    this.renderer = params.renderer;
    this.time = params.time;
    this.container = new Object3D();
    this.container.name = "World";
    this.init();
  }
  init() {
    const geo = new IcosahedronGeometry(10, 1);
    const mat = new MeshNormalMaterial({ wireframe: true });
    const mesh = new Mesh(geo, mat);
    mesh.position.z = -105;
    this.container.add(mesh);
    this.time.addEventListener("tick", () => {
      mesh.rotation.y += 0.01;
    });
  }
}
