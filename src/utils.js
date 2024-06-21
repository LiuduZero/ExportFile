function getOnlyChild(l = []) {
  return l.reduce(
    (a, t) => a.concat(t.children?.length ? getOnlyChild(t.children) : t),
    []
  )
}

function getMaxDepth(l, init = 1) {
  return l.reduce(
    (a, t) =>
      t.children?.length
        ? Math.max(getMaxDepth(t.children, init + 1), 1)
        : Math.max(init, a),
    init
  )
}
/**
 * 将列数据转换为表头数据, 添加 rowSpan 和 colSpan, startRow, startCol
 * @param {Array<T>} cols 列数据数组
 * @returns {Array<T>} 转换后的表头数据数组
 */
function transformColumns(cols = []) {
  const maxLevel = getMaxDepth(cols)

  /**
   * 将列表转换为表格头信息
   * @param l 列表数据
   * @param initR 初始行号
   * @param initC 初始列号
   * @returns 返回表格头信息数组
   */
  const _toHeaders = (l = [], initR = 0, initC = 0) => {
    let startC = initC

    return l.map((t, i) => {
      let startR = initR
      const oldSC = startC

      if (t.children?.length) {
        const children = _toHeaders(t.children, startR + 1, startC)
        const colSpans = children.reduce((a, t) => a + t.colSpan, 0)
        startC += colSpans

        return {
          title: t.title,
          startRow: startR,
          startCol: oldSC,
          rowSpan: 1,
          colSpan: colSpans,
          children,
        }
      } else {
        startC += 1

        return {
          title: t.title,
          startRow: startR,
          startCol: oldSC,
          rowSpan: maxLevel - startR,
          colSpan: 1,
        }
      }
    })
  }

  return _toHeaders(cols)
}
