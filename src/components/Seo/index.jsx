import Head from 'next/head'


const Seo = (props) => {
  return (
    <Head>
      <link rel="icon" type="icon" href="/favicon.ico" />
      <meta name="viewport" content="width=device-width,shrink-to-fit=no,initial-scale=1,maximum-scale=1,user-scalable=0" />
      <meta name="keywords" content="sushi store japan" />
      <meta name="theme-color" content="var(--color-white-bg)" />
      <meta name="description" content={props.description} />
      <title>{props.title}</title>
    </Head>
  )
}

Seo.defaultProps = {
  title: 'Sushi Store',
  description: 'The best sushi store',
}

export default Seo
