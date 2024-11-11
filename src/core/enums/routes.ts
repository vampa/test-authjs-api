export enum PublicRoute {
  Home = "/",
  Login = "/signin",
  Logout = "/signout",
}

// Protected Routes (require active session)
export enum Route {
  Dashboard = "/dash",
}

export enum APIRoute {
  Authed = "/api/1/authed",
}
