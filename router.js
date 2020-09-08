class Router {
    constructor(routes) {
        this.routes= routes;
        this._loadInitialRoutes();
    }
    loadRoute(...urlsegs) {
        const matchedRoute = this._matchUrlToRoute(urlsegs)
        
        const url = `/${urlsegs.join('/')}`;
        history.pushState({},'THIS WORKS', url)
    
        const routerOutElm = document.querySelectorAll('{data-router}')[0]
        routerOutElm.innerHTML = matchedRoute.template
    }

    _matchUrlToRoute(urlsegs) {
        const matchedRoute = this.routes.find(route => {
            const routePathSegs = route.path.split('/').slice(1)

            if(routePathSegs !== urlSegs.length){
                return false
            }

            return routePathSegs
               .every((routePathSeg, i) => routePathSeg === urlSegs[i])
        })

        return matchedRoute;
    }

    _loadInitialRoutes() {
        const pathNameSplit = window.location.pathname.split('/');
        const pathSegs = pathNameSplit.length > 1 ? pathNameSplit.slice(1) : '';
    
        this.loadRoute(...pathSegs);
    }
}
