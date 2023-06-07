export function memoize(fn: any, ident ?: string) {

    const cache : any = {};

    return async function(...funcArgs : any) {

      const idx = ident ? ident : JSON.stringify(funcArgs);
  
      cache[idx] = cache[idx] || fn.apply(undefined, funcArgs);

      return cache[idx]
    }
}