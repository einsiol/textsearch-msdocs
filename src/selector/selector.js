const selector = ({text, searchTerms}) => {
  for (let i = 0; searchTerms.length > i; i++) {
    const term = searchTerms[i]
    if(text.indexOf(term) >= 0) {
      return true
    }
  }

  return false
}

export default selector