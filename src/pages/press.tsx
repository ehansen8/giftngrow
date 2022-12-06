import Layout from '../components/Layout'

export default function Press() {
  return (
    <main className='p-4 rounded-md mt-4 flex flex-col items-center'>
      <h2>Fox 6 Wakeup News:</h2>
      <iframe
        width='560'
        height='315'
        src='https://www.youtube.com/embed/ejelVL78j_E'
        title='YouTube video player'
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
      />
      <h2>30 West Magazine</h2>
      <h2>December Issue of M Magazine</h2>
    </main>
  )
}
