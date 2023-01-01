export const checkIntersection = (map, line, file) => {
    if (map.has(line)) {
        map.set(line, [...map.get(line), file])
    } else {
        map.set(line, [file])
    }

}