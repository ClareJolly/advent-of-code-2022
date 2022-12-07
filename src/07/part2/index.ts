const part2 = (inputData: string[]): number => {
  const filesystemAvailable = 70000000
  const neededSpace = 30000000

  const fs: {
    parentPath: string
    fullPath: string
    node: string
    type: 'file' | 'dir'
    size: number
  }[] = []
  let currentPath: string[] = []

  for (let i = 0; i < inputData.length; i++) {
    const d = inputData[i]
    if (/\$ cd (.*)/.test(d)) {
      const path = d.match(/\$ cd (.*)/)![1]
      if (path === '..') {
        currentPath.pop()
      } else {
        currentPath.push(path)
      }
    }
    if (/\$ ls/.test(d)) {
      let x = i + 1
      while (/^[^\$]/.test(inputData[x]) && x < inputData.length) {
        const [type, name] = inputData[x].split(' ')
        const parentPath = [
          ...currentPath.map(p => {
            if (currentPath.length === 1) return p
            return p === '/' ? '' : p
          }),
        ].join('/')

        const joinWith = currentPath[0] === '/' && currentPath.length === 1 ? '' : '/'
        const fullPath = [parentPath, name].join(joinWith)
        fs.push({
          parentPath: parentPath,
          fullPath: fullPath,
          node: name,
          type: type === 'dir' ? 'dir' : 'file',
          size: type !== 'dir' ? Number(type) : 0,
        })
        x++
      }
      i = x - 1
    }
  }

  const allFilesSize = fs.reduce((a, b) => {
    return a + b.size
  }, 0)
  const dirSizes: Record<string, number> = {
    '/': allFilesSize,
  }
  const directories = fs.filter(f => f.type === 'dir')
  directories.forEach(d => {
    const children = fs.filter(f => f.type === 'file' && f.parentPath.startsWith(d.fullPath))
    const totalSize = children.reduce((a, b) => {
      return a + b.size
    }, 0)
    dirSizes[d.fullPath] = totalSize
  })

  return Object.values(dirSizes).reduce((a, b) => {
    if (b < 100000) {
      return a + b
    }
    return a
  }, 0)
}

export default part2
