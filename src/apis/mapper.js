export const genreInfo = new Map([
    ["fantasy", "판타지"],
    ["romance", "로맨스"],
    ["martial_arts", "무협"],
    ["contemporary_fantasy", "현대판타지"],
    ["sports", "스포츠"],
    ["sf", "SF"]
  ])

  export const episodeCategoryInfo = new Map([
    ["episode", "에피소드"],
    ["notice", "공지사항"],
    ["prologue", "프롤로그"],
    ["epilogue", "에필로그"]
  ])

  export const paymentMethodInfo = new Map([
    ["KakaoPay", "카카오페이"]
  ])

export const ynToBool = (value) => {
  return value === "y" ? true : (value === "n" ? false : false)
}

export const boolToYn = (bool) => {
  return bool === true || bool === "true" ? "y" : (bool === false  || bool === "false" ? "n" : "n")
}