declare module 'routes' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type CallbackFunction = (...args: any[]) => any

  const Router: () => {
    routes: {
      re: RegExp
      src: string
      keys: string[]
      fn: CallbackFunction
    }[]
    routeMap: { [key: string | RegExp]: CallbackFunction }
    addRoute: (path: string | RegExp, fn: CallbackFunction) => void
    removeRoute: (path: string | RegExp) => void
    // match: () => { re: RegExp, src: string, keys: string[] };
    match: (
      pathname: string,
      startAt?: number
    ) => {
      params: { [key: string]: string }
      splats: string[]
      route: string
      fn: CallbackFunction
      next: () => void
    }
  }

  export default Router
}
