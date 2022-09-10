import 'uno.css'
import App from './scripts/app'
import Loader from './scripts/utils/loader'
const loader = new Loader()
loader.load().then(() => {
  const app = new App({
    wrapper: document.querySelector('.wrapper') as HTMLDivElement,
    assets: loader.assets,
  })
  app.mount()
})
