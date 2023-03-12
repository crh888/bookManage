import http from '../index'

// 获取已借阅的图书列表
export const getBorrowedList = async () => {
  const res = await http.get('affair/repaylist')
  return res
}

// 获取待审批的图书列表
export const getUncheckList = async () => {
  const res = await http.get('affair/tbapplist')
  return res
}

// 发起已审批的图书列表
export const getCheckedList = async () => {
  const res = await http.get('affair/agreelist')
  return res
}

// 还书
export const returnBook = async (affair_id: number) => {
  const res = await http.post('affair/repay', {
    affair_id
  })
  return res
}

// 借书
export const borrowBook = async (book_id: number) => {
  const res = await http.post('affair/borrow', {
    book_id
  })
  return res
}

// 管理员获取借阅请求列表
export const agreeList = async () => {
  const res = await http.get('affair/list')
  return res
}

// 管理员同意借阅请求
export const agreeAffair = async (affair_id: number) => {
  const res = await http.post('affair/agree', {
    affair_id
  })
  return res
}