
export const namedListSort = (
    itemA: { name: string } | null,
    itemB: { name: string } | null
) => {

if (itemA === null) {
    if (itemB !== null) {
        return -1
    }
    return 0
}
if (itemB === null) {
    if (itemA !== null) {
        return 1
    }
    return 0
}

if (itemA.name.toUpperCase() > itemB.name.toUpperCase()) {
    return 1
} else if (itemA.name.toUpperCase() < itemB.name.toUpperCase()) {
    return -1
}
return 0
}