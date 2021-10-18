import {useRouter} from 'next/router'
import {useSelector} from 'react-redux'
import {useRef, useState} from 'react'

import * as Styles from './styles'
import useOutsideClick from 'hooks/clickOutside'

import DownArrow from '../../images/down-arrow.svg'
import {translations} from 'components/Translations/constants/translations'


const Translations = () => {
  const router = useRouter()
  const translations = useSelector(state => state.translations)
  const currentTranslation = useSelector(state => state.currentTranslation)
  const [open, setOpen] = useState(false)

  const languages = useRef('')
  useOutsideClick(languages, () => setOpen(false))

  const {pathname, asPath, query} = router

  const selectLang = (locale) => {
    router.push({pathname, query}, asPath, {locale})
    setOpen(false)
  }

  return (
    <Styles.LanguagesSelectContainer ref={languages}>
      <Styles.Languages open={open}>
        {translations.filter(t => t.locale !== router.locale).map((t) => (
          <Styles.Language key={t.locale}
                           onClick={() => selectLang(t.locale)}>
            {t.name}
          </Styles.Language>
        ))}
      </Styles.Languages>
      <Styles.ActiveLanguage open={open} onClick={() => setOpen(!open)}>
        {currentTranslation.name}
        <DownArrow />
      </Styles.ActiveLanguage>
    </Styles.LanguagesSelectContainer>
  )
}

export default Translations
