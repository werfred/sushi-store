import Head from 'next/head'


const Seo = (props) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width,shrink-to-fit=no,initial-scale=1,maximum-scale=1,user-scalable=0" />
      <meta name="description" content={props.description} />
      <title>{props.title}</title>
    </Head>
  )
}

Seo.defaultProps = {
  title: 'Sushi store',
  description: 'The best sushi store',
}

export default Seo
