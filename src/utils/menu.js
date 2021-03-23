import {getRequest} from "./api";




export const initMenu = (router,store)=>{
    if(store.state.routes.length>0){
        return
    }
    getRequest('/system/config/menu').then(data=>{
        if(data){
            let fmtRoutes = formatRoutes(data)
            router.addRoutes(fmtRoutes)
            store.commit('initRoutes',fmtRoutes)
        }
    })
}

export const formatRoutes = (routes) => {
    let fmtRoutes = []
    routes.forEach(router=>{
        let{
            path,
            component,
            name,
            iconCls,
            children
        } = router
        if(children && children instanceof Array){
            children = formatRoutes(children)
        }
        let fmRouter = {
            path:path,
            name:name,
            iconCls:iconCls,
            children:children,
            component(resolve){
                if(component.startWith('Home')){
                    require(['../views/' + component + '.Vue'] , resolve)
                }else if(component.startWith('Emp')){
                    require(['../views/emp/' + component + '.Vue'] , resolve)
                }else if(component.startWith('Per')){
                    require(['../views/per/' + component + '.Vue'] , resolve)
                }else if(component.startWith('Sal')){
                    require(['../views/sal/' + component + '.Vue'] , resolve)
                }else if(component.startWith('Sta')){
                    require(['../views/sta/' + component + '.Vue'] , resolve)
                }else if(component.startWith('Sys')){
                    require(['../views/sys/' + component + '.Vue'] , resolve)
                }

            }
        }
        fmtRoutes.push(fmRouter)
    })
    return fmtRoutes;

}