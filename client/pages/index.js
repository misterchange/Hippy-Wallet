import Head from 'next/head'
import Header from '../components/Header'
import Main from '../components/Main'

const style = {
  wrapper:`h-screen max-h-screen h-min-screen w-screen bg-[#12131A] text-white select-none flex flex-col justify-between`
}

export default function Home() {
  return (
    <div className={style.wrapper}>
      <Header />
      <Main />
      <h2>Transaction History</h2>
     
    </div>
  )
}

