export class NullableT<T> {

    private val: T | null | undefined

    constructor (val: T | null | undefined)  {
        this.val = val
    }

    extract(): T {
        if (this.val === null || this.val === undefined) {
            throw new Error('You can not access a null or undefined nullable type')
        }

        return this.val
    }

    isOk (): boolean {
        return this.val != null && this.val !== undefined
    }
}

export const toNullableT = <T>(val: T | null | undefined) => new NullableT(val)
