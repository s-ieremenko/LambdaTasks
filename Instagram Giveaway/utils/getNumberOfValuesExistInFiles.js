export const getNumberOfValuesExistInFiles = (map, numberOfFiles) => {
    let count = 0
    for (const value of map.values()) {
        if (value.length >= numberOfFiles)
            count++
    }
    return count

}