export const checkIntersection = (map, line, file) => {
    let fileNames = map.get(line)
    if (map.has(line)) {
        if (!fileNames.includes(file)) {
            map.set(line, [...fileNames, file])
        }
    } else {
        map.set(line, [file])
    }

}