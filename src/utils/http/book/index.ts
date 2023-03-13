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

// 删除图书
export const delBook = async (id: number) => {
  const res = await http.get(`book/delete/${id}`)
  return res
}

// 删除分类
export const delCate = async (id: number) => {
  const res = await http.get(`cate/delete/${id}`)
  return res
}

// 新增分类
export const addCate = async (category_name: string) => {
  const res = await http.post('cate/addcate', {
    category_name
  })
  return res
}

// 根据 id 查询 分类
export const selectCateById = async(id: any) => {
  const res = await http.get(`cate/${id}`)
  return res
}

// 根据图书id查询图书
export const selectBookById = async (id: any) => {
  const res = await http.get(`book/${id}`)
  return res
}

// 更新图书信息
export const updateBookInfo = async (book_id: number, book_name: string, cover: string, author: string, cate_id: number) => {
  const res = await http.post('book/update', {
    book_id,
    book_name,
    cover,
    author,
    cate_id
  })
  return res
}

// 添加图书
export const addBook = async (book_name: string, cover: string, author: string, cate_id: string) => {
  const res = await http.post('book/addbook', {
    book_name,
    cover,
    author,
    cate_id
  })
  return res
}