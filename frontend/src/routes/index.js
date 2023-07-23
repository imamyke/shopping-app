import { Home, Video, Category, Cart, About, Login, Signup } from '../pages'

const routes = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/video',
    element: <Video />
  },
  {
    path: '/cart',
    element: <Cart />
  },
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/category',
    element: <Category />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  }
]

export default routes