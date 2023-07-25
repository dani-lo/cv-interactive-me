export class FixedStr {

    buffer: number 

    constructor (numChars: number) {
        this.buffer = numChars
    }

    getString (str: string) {

        if (str.length > this.buffer) {
            throw new Error('You can not get a FixedStr structure longer than the allocated buffer')
        }

        const filler = ' '.repeat(this.buffer - str.length)

        return `${ str }${ filler }` 
    }
}