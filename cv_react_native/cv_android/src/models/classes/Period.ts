import { JobMonth, JobYear } from '../../types'

export class JobPeriod {
    
    declare fromMonth: JobMonth
    declare fromYear: JobYear
    declare toMonth: JobMonth
    declare toYear: JobYear
    declare fromDate: Date
    declare toDate: Date

    constructor (from: [JobMonth, JobYear], to: [JobMonth, JobYear]) {

        this.fromMonth = from[0]
        this.fromYear = from[1]

        this.toMonth = to[0]
        this.toYear = to[1]

        const fromMonth = this.fromMonth < 10 ? '0' + this.fromMonth : '' + this.fromMonth
        const toMonth = this.toMonth < 10 ? '0' + this.toMonth : this.toMonth + ''

        this.fromDate = new Date(`${ this.fromYear }-${ fromMonth }-01`)
        this.toDate = new Date(`${ this.toYear }-${ toMonth }-01`)
    }

    get formatted () {

        const monthGetterOpts : [string, { [k: string] : string }] =  ['default', { month: 'short' }]

        return `${ this.fromDate.toLocaleString(...monthGetterOpts) } ${ this.fromDate.getFullYear() } - ${ this.toDate.toLocaleString(...monthGetterOpts) } ${ this.toDate.getFullYear() }`
    }

    get raw () {
        return `from ${ this.fromMonth } ${ this.fromYear } - ${ this.toMonth } ${ this.toYear } `
    }
}