import { 
  Home, 
  Video, 
  Category, 
  Cart, 
  About, 
  Login, 
  Signup, 
  Logout, 
  Profile,
  ProductDetail,
  Shipping 
} from '../pages'

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
  },
  {
    path: '/logout',
    element: <Logout />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/product/:id',
    element: <ProductDetail />
  },
  {
    path: '/shipping',
    element: <Shipping />
  },
]

export default routes