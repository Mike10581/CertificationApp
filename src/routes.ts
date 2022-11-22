import { FC } from 'react'
import { Home, About, Tests, DCD, LoginSignUp } from './pages'
import { Logout } from './pages/Logout/Logout'

export interface IRoute {
  key: string
  title?: string
  path: string
  enabled: boolean
  component: FC<{}>
  access?: string
}

export const routes: Array<IRoute> = [
  {
    key: 'home-route',
    title: 'Home',
    path: '/',
    enabled: true,
    component: Home,
  },
  {
    key: 'about-route',
    title: 'About',
    path: '/about',
    enabled: true,
    component: About,
  },
  {
    key: 'tests-route',
    title: 'Tests',
    path: '/tests',
    enabled: true,
    component: Tests,
    access: 'private',
  },
  {
    key: 'dev-color-design-route',
    title: 'Color Design',
    path: '/dcd',
    enabled: true,
    component: DCD,
    access: 'private',
  },
  {
    key: 'login-sign-up',
    path: '/login-sign-up',
    enabled: true,
    component: LoginSignUp,
  },
  {
    key: 'logout',
    path: '/logout',
    enabled: true,
    component: Logout,
  },
]
