function createTable(columns = [], dataSource = [], options = {}) {
  const table = document.createElement('table')

  table.setAttribute('border', 2)
  table.style = 'border-collapse: collapse'

  const { dataIndex = 'key', cellRender } = options

  // 创建表头
  const createTHead = columns => {
    let tHead = '<thead">'

    // 创建表头行
    const _createTr = (cols = []) => {
      if (!cols.length) return ''

      let tr = '<tr>',
        children = []

      cols.forEach(col => {
        tr += `<th rowspan=${col.rowSpan} colspan=${col.colSpan}>${col.title}</th>`

        if (col.children?.length) {
          children.push(...col.children)
        }
      })

      tr += '</tr>'
      tHead += tr

      children.length && _createTr(children)
    }

    _createTr(transformColumns(columns))
    tHead += '</thead>'

    return tHead
  }

  const createTBody = (columns, dataSource) => {
    const children = getOnlyChild(columns)

    if (!dataSource.length) return ''

    let tbody = '<tbody>'

    dataSource.forEach(row => {
      let tr = '<tr>'

      children.forEach(col => {
        let v = row[col[dataIndex]] || ''
        v = typeof cellRender === 'function' ? cellRender(v, row, col) : v
        tr += `<td>${v}</td>`
      })

      tr += '</tr>'
      tbody += tr
    })

    tbody += '</tbody>'
    return tbody
  }

  const thead = createTHead(columns)
  const tbody = createTBody(columns, dataSource)

  table.innerHTML = `<table>${thead}${tbody}</table>`

  return table
}
