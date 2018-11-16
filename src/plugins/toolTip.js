/** @format */

//表格超出字段省略号展示

function renderTip(h, value) {
  let content;
  content = h(
    'div',
    {
      style: {
        wordBreak: 'keep-all',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    },
    value
  );
  return h(
    'Tooltip',
    {
      props: {
        content: value
      }
    },
    [content]
  );
}
window.renderTip = renderTip;
export default renderTip;
