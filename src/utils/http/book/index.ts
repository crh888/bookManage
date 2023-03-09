import http from '../index'

// 获取全部分类
export const getCateList = async () => {
  const res = await http.get('cate/list')
  return res
}

// 按分类ID查找图书
export const getBookListByCate = async (cateId: number) => {
  const res = await http.get(`book/booklist/${cateId}`)
  return res
}

// 按图书名称进行查找
export const getBookByName = async (bookname: string) => {
  const res = await http.get(`book/bookname/${bookname}`)
  return res
}