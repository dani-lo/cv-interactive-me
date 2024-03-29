import { JobPeriod } from "../../src/models/classes/Period"
import { StyledTabber } from "../../styles/main.styled"

type WithPeriodData = {
    uid: number,
    period: JobPeriod
}

export interface DateRangedItem extends WithPeriodData {}

type Props = {
    items: DateRangedItem[][],
    page: number,
    onPageSelect: (pageNum: number) => void,
}

const pageTitle = (items: DateRangedItem[]) => {
    const yearFrom = items[items.length - 1].period.fromYear
    const yearTo = items[0].period.toYear 
    
    return `${ yearFrom } - ${ `${yearTo}`.substring(2, 4) }`
}

export const pageSize = {
    dense: 4,
    sparse: 3
}

export const pageForItem = (items: DateRangedItem[][], uid: number) => {
    
    let i = 0

    for (const chunk of items) {
        
        if (chunk.some(c => c.uid == uid)) {
            return i
        }
        i = i + 1
    }
    return 0
} 

export const Tabber = ({ items, page, onPageSelect }: Props) => {
    
    // items.map((chunk, i) => console.log(`${ chunk[0].uid }${ chunk[1].uid }`))

    return <StyledTabber className="top-slot">
        {
            items.map((chunk, i) => <li key={ `${ chunk[0].uid }${ chunk[1].uid }` }>
                <button 
                    className={ i == page ? "disabled" : "" }
                    onClick={() =>  onPageSelect(i) }>
                        { pageTitle(chunk) }
                    </button>
            </li>)
        }
    </StyledTabber>

}