import { TextureLoader } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
const textureImports = import.meta.glob(
  [
    '../../assets/textures/**/*.jpeg',
    '../../assets/textures/**/*.jpg',
    '../../assets/textures/**/*.png',
  ],
  { eager: true, as: 'url' }
)

const modelImports = import.meta.glob(
  [
    '../../assets/models/**/*.glb',
    '../../assets/models/**/*.gltf',
    '../../assets/models/**/*.fbx',
    '../../assets/models/**/*.obj',
  ],
  { eager: true, as: 'url' }
)

interface AssetsObject {
  textures: { [key: string]: never }
  models: { [key: string]: never }
}
function getExtension(url: string) {
  return url.split(/[#?]/)[0]!.split('.').pop()?.trim()
}
const createNestedObject = (base: { [key: string]: never }, key: string, value: never) => {
  key = key.replace('../../assets/', '')
  const tree = key.split('/')
  tree.shift()
  tree[tree.length - 1] = tree[tree.length - 1]!.split('.')[0] as string

  const lastName = value ? tree.pop() : false
  for (let i = 0; i < tree.length; i++) {
    base = base[tree[i] as string] = (base[tree[i] as string] as never) || {}
  }
  if (lastName) base = base[lastName] = value
}

export default class Loader {
  public assets: AssetsObject
  constructor() {
    this.assets = {
      textures: {},
      models: {},
    }
  }
  async load() {
    /** Textures */
    const textureLoader = new TextureLoader()
    Object.keys(textureImports).map((key, i) => {
      textureLoader.load(Object.values(textureImports)[i] as string, (texture) => {
        createNestedObject(this.assets.textures, key, texture as never)
      })
    })
    /** Models */
    const gltfLoader = new GLTFLoader()
    const draco = new DRACOLoader()
    draco.setDecoderConfig({ type: 'js' })
    draco.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
    gltfLoader.setDRACOLoader(draco)
    const fbxLoader = new FBXLoader()
    Object.keys(modelImports).map((key, i) => {
      const ext = getExtension(key)
      switch (ext) {
        case 'gltf':
          gltfLoader.load(Object.values(textureImports)[i] as string, (model) => {
            createNestedObject(this.assets.models, key, model as never)
          })
          break
        case 'glb':
          gltfLoader.load(Object.values(modelImports)[i] as string, (model) => {
            createNestedObject(this.assets.models, key, model as never)
          })
          break
        case 'fbx':
          fbxLoader.load(Object.values(modelImports)[i] as string, (model) => {
            createNestedObject(this.assets.models, key, model as never)
          })
          break
        default:
          break
      }
    })
  }
}
