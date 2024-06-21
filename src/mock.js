const _columns_ = [
  { title: 'a', key: 'a' },
  {
    title: 'b',
    key: 'b',
    children: [
      { title: 'b-1', key: 'b-1' },
      {
        title: 'b-2',
        key: 'b-2',
        children: [
          {
            title: 'b-2-1',
            key: 'b-2-1',
            children: [
              { title: 'b-2-1-1', key: 'b-2-1-1' },
              { title: 'b-2-1-2', key: 'b-2-1-2' },
            ],
          },
        ],
      },
    ],
  },
  { title: 'c', key: 'c', children: [{ title: 'c-1', key: 'c-1' }] },
  {
    title: 'd',
    key: 'd',
    children: [
      {
        title: 'd-1',
        key: 'd-1',
        children: [
          { title: 'd-1-1', key: 'd-1-1' },
          {
            title: 'd-1-2',
            key: 'd-1-2',
            children: [
              { title: 'd-1-2-1', key: 'd-1-2-1' },
              { title: 'd-1-2-2', key: 'd-1-2-2' },
            ],
          },
        ],
      },
      { title: 'd-2', key: 'd-2' },
    ],
  },
  { title: 'e', key: 'e' },
]

const _generateData = (len = 5) => {
  const keys = getOnlyChild(_columns_).map(c => c.key)

  return Array(len)
    .fill({})
    .map(() => {
      return keys.reduce(
        (acc, key) => ((acc[key] = String(Math.random()).substr(2, 6)), acc),
        {}
      )
    })
}
const _dataSource_ = _generateData(10)
