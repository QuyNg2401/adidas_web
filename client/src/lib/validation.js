/** Chuẩn hóa và kiểm tra email; trả về thông báo lỗi tiếng Việt hoặc chuỗi rỗng nếu hợp lệ. */
export function validateEmail(emailRaw) {
  const email = String(emailRaw ?? '').trim()
  if (!email) return 'Vui lòng nhập email.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Email không hợp lệ.'
  return ''
}

/** Mật khẩu không được để trống / chỉ khoảng trắng. */
export function validatePasswordPresent(passwordRaw) {
  if (!String(passwordRaw ?? '').trim()) return 'Vui lòng nhập mật khẩu.'
  return ''
}

/** Đăng ký: độ dài tối thiểu (không trim giữa chừng để tránh đổi ý nghĩa mật khẩu). */
export function validateRegisterPassword(password) {
  const empty = validatePasswordPresent(password)
  if (empty) return empty
  if (String(password).length < 6) return 'Mật khẩu cần ít nhất 6 ký tự.'
  return ''
}

/** URL tuyệt đối (https/http). */
export function validateHttpUrl(urlRaw) {
  const u = String(urlRaw ?? '').trim()
  if (!u) return 'Vui lòng nhập URL hình ảnh.'
  try {
    const parsed = new URL(u)
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return 'URL cần bắt đầu bằng http:// hoặc https://.'
    }
    return ''
  } catch {
    return 'URL không hợp lệ.'
  }
}
