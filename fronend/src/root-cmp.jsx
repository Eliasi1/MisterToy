// import './assets/style/main.css'
import './assets/newStyle/css/main.css'


import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { ToyIndex } from './pages/toy-index'
import { AppHeader } from './cmps/app-header'
import { AboutUs } from './pages/about-us'
import { HomePage } from './pages/home-page'
import { Provider } from 'react-redux'
import { store } from './store/store.js'

export function App() {
  return (
    <Provider store={store}>
      <Router>
        <section className="main-layout app">
          <AppHeader />
          <main>
            <Routes>
              <Route element={<HomePage />} path="/Home" />
              <Route element={<ToyIndex />} path="/toy" />
              <Route element={<AboutUs />} path="/about" />
            </Routes>
          </main>
        </section>
      </Router>
    </Provider>
  )
}
