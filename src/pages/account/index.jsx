import {useEffect} from 'react'
import {useRouter} from 'next/router'
import {useSelector} from 'react-redux'

import * as Styles from '../../styles/accountStyles'
import Layout from 'layout'
import Seo from 'components/Seo'
import BaseContainer from 'components/BaseContainer'
import Heading from 'components/Heading'
import PersonalDataForm from 'components/UserData/PersonalData'
import AddressDataForm from 'components/UserData/AddressData'
import PasswordDataForm from 'components/UserData/Password'


function AccountPage() {
  const router = useRouter()
  const translation = useSelector(state => state.currentTranslation)
  const token = useSelector(state => state.token)

  useEffect(() => {
    if (!token) {
      router.push('/account/orders')
    }
  }, [router, token])

  return (
    <>
      <Seo />
      <Layout>
        <Styles.AccountContainer>
          <BaseContainer>
            <Heading>{translation.accountPage.personalData}</Heading>
            <Styles.Forms>
              <PersonalDataForm />
              <AddressDataForm />
              <PasswordDataForm />
            </Styles.Forms>
          </BaseContainer>
        </Styles.AccountContainer>
      </Layout>
    </>
  )
}

export default AccountPage
