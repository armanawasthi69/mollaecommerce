export function baseUrl(){
    return window.location.origin
}

export function BackToTop(){
    window.scroll(0,0)
}

export function PageCount(count,perPageItem){
    let arr = []
    let totalPages = Math.floor(count/perPageItem)
    let reminder = count%perPageItem !== 0 ? 1 : 0 
    for(let i = 0;i<totalPages+reminder;i++){
       arr.push(i)
    }
    return arr;
}
