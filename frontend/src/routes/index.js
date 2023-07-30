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
  FillOrder,
  Order 
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
    path: '/fillorder',
    element: <FillOrder />
  },
  {
    path: '/order/:id',
    element: <Order />
  },
]

export default routes